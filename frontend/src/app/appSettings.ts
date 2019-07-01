import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AppSettings {
    private apiEndpoint: string;

    constructor() {
        if (environment.production) {
            this.apiEndpoint = 'https://localhost:44301/api';
        } else if (environment.tst) {
            this.apiEndpoint = 'https://localhost:44301/api';
        } else if (environment.hml) {
            this.apiEndpoint = 'https://localhost:44301/api';
        } else {
            this.apiEndpoint = 'https://localhost:44301/api';
        }
    }

    getApiEndpoint() {
        return this.apiEndpoint;
    }
}