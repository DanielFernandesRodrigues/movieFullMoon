import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppSettings } from 'app/appSettings';
import { Observable } from 'rxjs/Observable';
import { ITMDbResult } from 'app/models/tmdb-result';
import { HttpService } from './http.service';

@Injectable()
export class MovieService {
    private movieUrl = '/Values';

    constructor(private _http: HttpService, private _appSettings: AppSettings) { }

    getMovies(page: number): Observable<ITMDbResult> {
        return this._http.get(this.movieUrl + '/' + page)
            .map((response: Response) => {
                return <ITMDbResult>response.json();
            });
    }
}
