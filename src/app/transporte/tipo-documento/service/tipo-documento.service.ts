import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class TipoDocumentoService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/tipo-documento');
    }

    todos() {
        return this.httpClienteSevice.get(this.url + '/todos').map(res => {
            return res.json().data;
        }).catch(this.handleError);
    }
    todosPessoa() {
        return this.httpClienteSevice.get(this.url + '/todos-pessoa').map(res => {
            return res.json().data;
        }).catch(this.handleError);
    }
    todosVeiculo() {
        return this.httpClienteSevice.get(this.url + '/todos-veiculo').map(res => {
            return res.json().data;
        }).catch(this.handleError);
    }
    show(id: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/' + id, params)
            .map(res => {
                const mudanca =  res.json().data;
                mudanca.tipo = mudanca.tipo_list;
                return mudanca;
            })
            .catch(this.handleError);
    }
}
