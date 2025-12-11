import express, { Router, type Request, type Response } from 'express';
import Participant from '../models/participant.ts'; 
import mongoose from 'mongoose';
import secretSantaDrawFunction, { type SantaPair} from '../utils/secretSantaDrawFunction.ts';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { name, email, eventCode, wishList, exclusionEmails } : { name: string, email: string, eventCode: string, wishList?: string, exclusionEmails?: string[] } = req.body;

    if (!name || !email || !eventCode) {
        return res.status(400).json({ message: 'Please type name and email' });
    }

    try{
        let exclusionsIds: mongoose.Types.ObjectId[] = [];
        if(exclusionEmails && exclusionEmails.length > 0) {
            const exclusions = await Participant.find({
                email: { $in: exclusionEmails},
                eventCode: eventCode,
            })
            exclusionsIds = exclusions.map(e => e._id)
        }

        const newParticipant = await Participant.create({
            name,
            email,
            eventCode,
            wishList: wishList || '',
            exclusions: exclusionsIds,
        })

        res.status(201).json({
            message: "Successfully created",
            participant: newParticipant,
        })
    } catch (error) {
        console.error(error) 
        res.status(500).json({message: "Issue while registration." })
    }
})

router.post('/draw/:eventCode', async(req:Request, res:Response) => {
    const eventCode =  req.params.eventCode;
    if(!eventCode){
        return res.status(400).json({ message:"The Event Code was not found"})
    }
    try {

        const participants = await Participant.find({ eventCode: eventCode }).lean()
        
        if(participants.length < 3) {
            return res.status(400).json({message: "Secret Santa game requires at least 3 players in order for game to be interested."})
        }
        
        const hasDrawn = participants.some(participant => participant.hasDrawn)
        if(hasDrawn){
            return res.status(400).json({message: "The draw for this event has been already created."})
        }
        
        const drawResult = secretSantaDrawFunction(participants)
        
        if(!drawResult){
            return res.status(400).json({ message: "The result of tossing was failed. Please try again."})
        }
        
        const bulkOperations = drawResult.map((santaPair: SantaPair) => ({
            updateOne: {
                filter: { _id: santaPair.santaId.toString() },
                update: {
                    $set: {
                        drawnRecipientId: santaPair.recepientId.toString(),
                        hasDrawn: true,
                    },
                },
            },
        }));
        await Participant.bulkWrite(bulkOperations as any);
        
        res.status(200).json({ message:"The draw has been completed successfully!", drawDetails: drawResult })
        
    } catch(error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong with servers resoinse while shuffeling.'})
    }

})
export default router;