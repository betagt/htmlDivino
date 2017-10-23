import {Injectable} from "@angular/core";
import {BaseServiceService} from "../../../core/base-service.service";
import {HttpClientService} from "../../../core/http-client.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BairroService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/localidade/bairro');
    }

    /**
     * Get all users
     **/
    selectBairros(cidadeId: number, params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get('/api/v1/admin/localidade/bairro/select-bairros/' + cidadeId, params)
            .map(res => {
                return this.formatSelect(res.json(), 'titulo', 'id');
            })
            .catch(this.handleError);
    }
}
