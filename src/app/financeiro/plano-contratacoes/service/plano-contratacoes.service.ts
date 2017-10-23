import {Injectable} from '@angular/core';
import {BaseServiceService} from '../../../../core/base-service.service';
import {HttpClientService} from '../../../../core/http-client.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlanoContratacoesService extends BaseServiceService {

    constructor(httpClientService: HttpClientService) {
        super(httpClientService, '/api/v1/admin/plano_contratacao');
    }

    /**
     * Get all users
     **/
    getListLancamentos(idContratacao, params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/lancamentos/' + idContratacao, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    sendBoletoEmail(data) {
        return this.httpClienteSevice
            .post(this.url + '/enviar-email-contratacao', data)
            .map(res => {
                return res.json();
            });
    }
}