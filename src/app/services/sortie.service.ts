import { Injectable } from '@angular/core';
import { PathService } from './path.service';
import { HttpClient } from '@angular/common/http';
import { Sortie } from '../models/sortie.model';
import { Observable } from 'rxjs';

@Injectable()
export class SortieService {
    private static path: string = PathService.getAPIUrl() + 'sorties';

    constructor(private http: HttpClient) {}

    getSorties() {
        return this.http.get<Sortie[]>(SortieService.path);
    }

    getSortie(id: String) {
        return this.http.get<Sortie>(SortieService.path + '/' + id);
    }

    createSortie(sortie: Sortie): Observable<Sortie> {
        return this.http.post<Sortie>(SortieService.path, sortie);
    }
}
