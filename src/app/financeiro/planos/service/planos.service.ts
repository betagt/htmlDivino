import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class PlanosService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/plano');
    }

    /**
     * Get all users
     **/
    getTabelaPreco(idProduto, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/tabela_preco/' + idProduto, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    getByCidadeEstado(estadoId, cidadeId, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + `/por-cidade-estado/${estadoId}/${cidadeId}`, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    showTabelaPreco(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/tabela_preco/show/' + id, params)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    cadastrarTabelaPreco(params, id = null) {
        if (id) {
            return this.httpClienteSevice.put(this.url + '/tabela_preco/' + id, params).map(res => {
                return res.json();
            }).catch(this.handleError);
        }
        return this.httpClienteSevice.post(this.url + '/tabela_preco', params).map(res => {
            return res.json();
        }).catch(this.handleError);
    }

    excluirPreco(params, itens) {

        if (itens.length == 1) {
            return this.httpClienteSevice.delete(this.url + '/tabela_preco/' + itens[0]);
        }

        return this.deleteAll(this.url + '/tabela_preco/destroy-all', params);
    }
}
