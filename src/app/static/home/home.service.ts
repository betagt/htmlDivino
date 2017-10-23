import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

    private slideUrl = 'http://localhost:4000/slide_principal';

    constructor (private http: Http) {}

    getSliderShow() {
        return this.http.get(this.slideUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Erro ao requesitar o Servidor'));
        }
}