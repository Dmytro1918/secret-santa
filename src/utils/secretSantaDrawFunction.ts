import mongoose from "mongoose";
import { type IParticipant } from "../models/participant.ts";

export interface SantaPair {
    santaId: mongoose.Types.ObjectId,
    recepientId: mongoose.Types.ObjectId
}

const isExcluded = (santa: IParticipant, recepient: IParticipant): boolean => {
    if(santa._id.toString() === recepient._id.toString()){
        return true
    }
    const excludedIds = santa.exclusions.map(ex => ex.toString())
    return excludedIds.includes(recepient._id.toString())
}

const shuffle = (arr: IParticipant[]): IParticipant[] => {
    for(let i = arr.length-1; i>0; i--) {
        let j = Math.floor(Math.random()*(i+1))
        const temp: IParticipant = arr[i]!;        
        arr[i] = arr[j]!
        arr[j] = temp
    }
    return arr
}

const secretSantaDrawFunction = (participants: IParticipant[]): SantaPair[] | null  => {
    const n = participants.length 
    const santas = [...participants]
    let recepients = [...participants]
    const drawResult: SantaPair[] = []
    const complexityConstant = 3
    const maxAttempt = complexityConstant * n * n

    for(let i = 0; i<maxAttempt; i++){
        drawResult.length = 0
        let success = true
        recepients = shuffle(recepients)

        for(let k = 0; k<santas.length; k++){
            const santa = santas[k] as IParticipant
            const recepient = recepients[k] as IParticipant

            if(isExcluded(santa,recepient)){
                success = false
                break
            }

            drawResult.push({
                santaId: santa._id,
                recepientId: recepient._id
            })
        }
        if(success){
            return drawResult
        }
    }
    return null;
}

export default secretSantaDrawFunction;