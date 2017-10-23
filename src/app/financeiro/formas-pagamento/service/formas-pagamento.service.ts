import {Injectable} from "@angular/core";
import {BaseServiceService} from "../../../../core/base-service.service";
import {HttpClientService} from "../../../../core/http-client.service";
import {Observable} from "rxjs/Observable";
declare var PagSeguroDirectPayment;
@Injectable()
export class FormasPagamentoService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/forma_pagamento');
    }

    /**
     * Get all users
     **/
    formaPagamentoAtivas(params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/ativas', params)
            .map(res => {
                return this.formatSelect(res.json().data, 'nome', 'id');
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    sessionPagSeguro(params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/pagseguro/session')
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }
}