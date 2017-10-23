import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AlertService} from './services/alert.service.com';
import {HttpClientService} from './http-client.service';
import {URLSearchParams} from '@angular/http';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export abstract class BaseServiceService {
    protected skyPreload = false;

    constructor(protected httpClienteSevice: HttpClientService, protected url) {
    }

    public setSkyPreload(value) {
        this.skyPreload = value;
        return this;
    }

    protected handleError(error: any) {
        if (error.status == 422) {
            let text = '';
            const errors = JSON.parse(error._body);
            for (const i in errors) {
                text += `<b>${i}:</b> ${errors[i]}<br>`;
            }
            AlertService.flashMessage(text);
        }
        return Observable.throw(error);
    }

    public formatSelect(itens, label, value) {
        const selectItens = [];
        for (let i = 0; i < itens.length; i++) {
            selectItens.push({
                label: itens[i][label],
                value: itens[i][value]
            });
        }
        return selectItens;
    }

    /**
     * Get all users
     **/
    getList(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    lixeira(): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/lixeira', null)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    show(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/' + id, params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    delete(url) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).delete(url).map(res => {
            return res.json();
        })
            .catch(this.handleError);
    }

    deleteAll(url, params) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).post(url, params).map(res => {
            return res.json();
        }).catch(this.handleError);
    }

    updateOrCreate(params: FormData, id: number = null): Observable<any> {
        let url = this.url;

        if (id) {
            url = this.url + '/' + id;
        }

        if (id) {
            return this.httpClienteSevice
                .put(url, params)
                .map(res => {
                    return res.json().data;
                })
                .catch(this.handleError);
        }

        return this.httpClienteSevice
            .post(url, params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }


    excluir(params, itens) {

        if (itens.length == 1) {
            return this.httpClienteSevice.setSkypePreload(this.skyPreload).delete(this.url + '/' + itens[0]);
        }

        return this.deleteAll(this.url + '/destroy-all', params);

    }


    restaurar(params) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).post(this.url + '/restaurar', params).map(res => {
            return res.json();
        }).catch(this.handleError);
    }


}
