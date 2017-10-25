import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';

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
}
