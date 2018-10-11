import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    getLieuOfVille(idVille: number): Observable<Lieu[]> {
        let param = new HttpParams();
        param = param.append('ville', idVille.toString());
        return this.http.get<Lieu[]>(LieuService.path, { params: param });
    }
}
