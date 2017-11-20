import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ContaService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/conta');
    }

    principal(userid, id): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/principal/' + userid + '/' + id)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

}
