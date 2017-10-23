import {BaseServiceService} from "../../../core/base-service.service";
import {Injectable} from "@angular/core";
import {HttpClientService} from "../../../core/http-client.service";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class EstadosService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/localidade/estados');
    }

    /**
     * Get all users
     **/
    selectEstados(params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get('/api/v1/admin/localidade/estados/select-estados', params)
            .map(res => {
                return this.formatSelect(res.json(), 'titulo', 'id');
            })
            .catch(this.handleError);
    }
}