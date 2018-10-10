import {Injectable} from '@angular/core';

@Injectable()
export class PathService {

    constructor() {}

    static getAPIUrl() {
        return 'http://10.43.101.21:8082/api/';
    }
}
