import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DocumentoService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/documento');
    }

    aceitar(id) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/aceitar/' + id)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    recusar(id) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/recusar/' + id)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);

    }

    todosByUser() {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/meus-docuemntos')
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    uploadDocumento(params: FormData): Observable<any> {
        return this.httpClienteSevice
            .post(this.url + '/documento-user', params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    sendFile(params: FormData, id): Observable<any> {
        return this.httpClienteSevice
            .removeHeader('Content-Type')
            .addHeader('Content-Type', 'multipart/form-data')
            .removeHeader('Content-Type')
            .post(this.url + '/arquivo-user/' + id, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }
}
