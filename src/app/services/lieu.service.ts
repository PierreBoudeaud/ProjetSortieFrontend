import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathService } from './path.service';
import { Observable } from 'rxjs';
import { Lieu } from '../models/lieu.model';

@Injectable()
export class LieuService {

    private static path: string = PathService.getAPIUrl() + 'lieux';

    constructor(private http: HttpClient) {}

    getLieux(): Observable<Lieu[]> {
        return this.http.get<Lieu[]>(LieuService.path);
    }

    getLieu(id: String): Observable<Lieu> {
        return this.http.get<Lieu>(LieuService.path + id);
    }
}
