import {Injectable} from '@angular/core';
import {HttpClientService} from "../../core/http-client.service";
import {Observable} from "rxjs";
import {BaseServiceService} from "../../core/base-service.service";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class UsuariosService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/user');
    }

    /**
     * Get all users
     **/
    getUsers(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/user', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    selectList(query) {
        return this.httpClienteSevice.get('/api/v1/admin/user/select-list/' + query)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    getList(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get('/api/v1/admin/user', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get all users
     **/
    lixeira(): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/user/lixeira', null)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    /**
     * Get perfil user
     **/
    getUserPerfil(): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/user/perfil?include=roles,permissions')
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    /**
     * Get perfil user
     **/
    getRotaAcessos(rota: string = 'admin'): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/rota_por_regra/' + rota)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    /**
     * Get perfil user
     **/
    getCheckRota(rota: string = 'admin'): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/check_rota/' + rota)
            .map(res => {
                return res.json().data;
            })
            .catch(this.handleError);
    }

    show(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/user/' + id, params)
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

    sendFileUser(params: FormData): Observable<any> {
        return this.httpClienteSevice
            .removeHeader('Content-Type')
            .addHeader('Content-Type', 'multipart/form-data')
            .removeHeader('Content-Type')
            .post('/api/v1/admin/user/alterar_imagem', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    updateOrCreate(params: FormData, id: number = null): Observable<any> {
        let url = '/api/v1/admin/user/';

        if (id) {
            url = '/api/v1/admin/user/' + id;
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

    recuperarSenha(params) {
        return this.httpClienteSevice
            .post('/api/v1/admin/user/password/reset', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    changePassword(params: FormData) {
        return this.httpClienteSevice
            .post('/api/v1/admin/user/password/change', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    changePerfil(params: FormData) {
        return this.httpClienteSevice
            .put('/api/v1/admin/user/userupdate', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    changePessoa(params: FormData) {  
        return this.httpClienteSevice
            .put('/api/v1/admin/user/update-user-pessoa', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    excluir(params, itens) {
        const url = '/api/v1/admin/user';

        if (itens.length == 1) {
            return this.httpClienteSevice.delete(url + '/' + itens[0]);
        }

        return this.deleteAll(url + '/destroy-all', params);

    }

    registrar(params) {
        return this.httpClienteSevice
            .post(this.url + '/registrar', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    restaurar(params) {
        return this.httpClienteSevice.post('/api/v1/admin/user/restaurar', params).map(res => {
            return res.json();
        }).catch(this.handleError);
    }
}
