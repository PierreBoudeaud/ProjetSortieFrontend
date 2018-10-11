import { InscriptionId } from './inscriptionId.model';
import { Participant } from './participant.model';
import { Sortie } from './sortie.model';

export class Inscription {
    id: InscriptionId;
    sortie: Sortie;
    participant: Participant;
    dateInscription: Date;
}
