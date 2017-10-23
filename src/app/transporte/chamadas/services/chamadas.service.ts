import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ChamadasService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/chamada');
    }

    listarByUser(params: URLSearchParams): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/minhas-chamadas', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }
}
