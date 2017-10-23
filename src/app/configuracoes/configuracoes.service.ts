import {Injectable} from '@angular/core';
import {HttpClientService} from "../../core/http-client.service";
import {Observable} from "rxjs";
import {BaseServiceService} from "../../core/base-service.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class ConfiguracoesService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/configuracao');
    }

    /**
     * Get all users
     **/
    view(params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/configuracao', params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }


    lixeira(): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/user/configuracao', null)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    show(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/configuracao')
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

    sendFile(id: number, params: FormData): Observable<any> {
        return this.httpClienteSevice
            .removeHeader('Content-Type')
            .addHeader('Content-Type', 'multipart/form-data')
            .removeHeader('Content-Type')
            .post('/api/v1/admin/user/alterar_imagem_admin/' + id, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    update(params: FormData, id: number = null) {
        let url = '/api/v1/admin/configuracao';

        if (id) {
            url = '/api/v1/admin/configuracao/' + id;
        }
        return this.httpClienteSevice
            .put(url, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError)
    }

    create(params: FormData, id: number = null) {
        let url = '/api/v1/admin/configuracao';

        if (id) {
            url = '/api/v1/admin/configuracao/' + id;
        }
        return this.httpClienteSevice
            .post(url, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    updateOrCreate(params: FormData, id: number = null): Observable<any> {
        if (id) {
            return this.update(params, id);
        }
        return this.create(params);
    }

    excluir(params, itens) {
        const url = '/api/v1/admin/configuracao';

        if (itens.length == 1) {
            return this.httpClienteSevice.delete(url + '/' + itens[0]);
        }

        return this.deleteAll(url + '/destroy-all', params);

    }
}
