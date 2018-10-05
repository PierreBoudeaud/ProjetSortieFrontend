import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site.model';

@Injectable()
export class SiteService {

    data: any = {};

    constructor(private http: HttpClient) {}

    getSites() {
        return this.http.get<Site[]>('http://10.43.101.21:8082/api/sites');
    }

    getSite(id: String) {
        return this.http.get<Site>('http://10.43.101.21:8082/api/sites/' + id);
    }
}
