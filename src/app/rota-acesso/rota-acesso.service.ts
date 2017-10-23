import {Injectable} from '@angular/core';
import {HttpClientService} from "../../core/http-client.service";
import {Observable} from "rxjs";
import {BaseServiceService} from "../../core/base-service.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class RotaAcessoService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/rota_acesso');
    }

    /**
     * Get all users
     **/
    getRotas(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    getList(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    lixeira(): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/lixeira', null)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    show(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/' + id, params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    delete(url) {
        return this.httpClienteSevice.delete(url).map(res => {
            return res.json();
        })
            .catch(this.handleError);
    }

    deleteAll(url, params) {
        return this.httpClienteSevice.post(url, params).map(res => {
            return res.json();
        })
            .catch(this.handleError);
    }

    updateOrCreate(params: FormData, id: number = null): Observable<any> {
        let url = '/api/v1/admin/rota_acesso';

        if (id) {
            url = '/api/v1/admin/rota_acesso/' + id;
        }

        if (id) {
            return this.httpClienteSevice
                .put(url, params)
                .map(res => {
                    return res.json();
                })
                .catch(this.handleError);
        }

        return this.httpClienteSevice
            .post(url, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }


    excluir(params, itens) {
        const url = '/api/v1/admin/rota_acesso';

        if (itens.length == 1) {
            return this.httpClienteSevice.delete(url + '/' + itens[0]);
        }

        return this.deleteAll(url + '/destroy-all', params);

    }
}
