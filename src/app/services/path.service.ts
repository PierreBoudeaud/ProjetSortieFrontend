import {Injectable} from '@angular/core';

@Injectable()
export class PathService {

    constructor() {}

    static getAPIUrl() {
        return 'http://10.43.0.254:8082/api/';
    }
}
