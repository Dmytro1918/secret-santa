import mongoose, { Schema, Document } from 'mongoose';

 export interface IParticipant extends Document {
    name: string;             
    email: string;           
    eventCode: string;        
    wishList: string;         
    drawnRecipientId?: mongoose.Types.ObjectId; 
    exclusions: mongoose.Types.ObjectId[];      
    hasDrawn: boolean;
}

const ParticipantSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: false 
    },
    eventCode: { 
        type: String, 
        required: true 
    },
    wishList: { 
        type: String, 
        default: 'Not mentioned' 
    },
    drawnRecipientId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Participant', 
        default: null 
    },
    exclusions: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Participant' 
    }],
    hasDrawn: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true 
});

const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);

export default Participant;