import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Zone {
    zip_code: string;
    lat: number;
    lng: number;
    city: string;
    state: string;
    timezone: { timezone_identifier: string, timezone_abbr: string };
}


@Injectable({
    providedIn: 'root',
})

export class ApiService {
    url = 'http://localhost:5000/api/timezone/';

    constructor(private http: HttpClient) {
    }

    getTimeZone(zipCode) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'X-Application-Key': 'b064b6d2-8fbd-48b0-ac29-1a88237ce022'
            })
        };

        return this.http.get<Zone>(this.url + '' + zipCode.toString(), httpOptions);

    }

}