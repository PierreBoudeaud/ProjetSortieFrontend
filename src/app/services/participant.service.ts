import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../models/participant.model';
import { PathService } from './path.service';
import { Observable } from 'rxjs';

@Injectable()
export class ParticipantService {

    private static path: string = PathService.getAPIUrl() + 'participants';

    constructor(private http: HttpClient) {}

    getParticipants() {
        return this.http.get<Participant[]>(ParticipantService.path);
    }

    getParticipant(id: String): Observable<Participant> {
        return this.http.get<Participant>(ParticipantService.path + '/' +  id);
    }

    createParticipant(participant: Participant): Observable<Participant> {
        return this.http.post<Participant>(ParticipantService.path, participant);
    }

    updateParticipant(participant: Participant): Observable<Participant> {
        return this.http.put<Participant>(ParticipantService.path + '/' + + participant.id, participant);
    }
}
