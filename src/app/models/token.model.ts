import { Participant } from './participant.model';

export class Token {
    token: string;
    participant: Participant;
    creationDate: Date;
    expirationDate: Date;
    remember: boolean;
}