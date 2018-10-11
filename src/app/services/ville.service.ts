import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathService } from './path.service';
import { Ville } from '../models/ville.model';
import { Observable } from 'rxjs';

@Injectable()
export class VilleService {

    private static path: string = PathService.getAPIUrl() + 'villes';

    constructor(private http: HttpClient) {}

    getVilles(): Observable<Ville[]> {
        return this.http.get<Ville[]>(VilleService.path);
    }

    getVille(id: String): Observable<Ville> {
        return this.http.get<Ville>(VilleService.path + id);
    }

    createVille(ville: Ville): Observable<Ville> {
        console.log(ville);
        return this.http.post<Ville>(VilleService.path, ville);
    }
}
