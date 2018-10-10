import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participant } from '../models/participant.model';

@Injectable()
export class PathService {

    constructor() {}

    static getAPIUrl() {
        return 'http://10.43.101.21:8082/api/';
    }
}
