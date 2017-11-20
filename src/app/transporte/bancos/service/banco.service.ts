import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';

@Injectable()
export class BancoService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/banco');
    }

    todos() {
        return this.httpClienteSevice.get(this.url + '/codigos').map(res => {
            return this.formatSelect(res.json().data, 'nome', 'codigo');
        }).catch(this.handleError);
    }
}
