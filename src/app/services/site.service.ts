import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from '../models/site.model';
import { PathService } from './path.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class SiteService {

    private static path: string = PathService.getAPIUrl() + 'sites';

    constructor(private http: HttpClient) {}

    getSites() {
        return this.http.get<Site[]>(SiteService.path);
    }

    getSite(id: String) {
        return this.http.get<Site>(SiteService.path + id);
    }

    createSite(site: Site): Observable<Site> {
        return this.http.post<Site>(SiteService.path, site);
    }

}
