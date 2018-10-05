import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participant } from '../models/participant.model';

@Injectable()
export class ParticipantService {

    constructor(private http: HttpClient) {}

    getParticipants() {
        return this.http.get<Participant[]>('http://10.43.101.21:8082/api/participants');
    }

    getParticipant(id: String) {
        return this.http.get<Participant>('http://10.43.101.21:8082/api/participants/' + id);
    }

    updateParticipant(participant: Participant) {
        return this.http.put('http://10.43.101.21:8082/api/participants/' + participant.id, participant);
    }
}
