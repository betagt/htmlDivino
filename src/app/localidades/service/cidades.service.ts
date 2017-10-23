import {Injectable} from "@angular/core";
import {BaseServiceService} from "../../../core/base-service.service";
import {HttpClientService} from "../../../core/http-client.service";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class CidadesService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/localidade/cidades');
    }

    /**
     * Get all users
     **/
    selectCidades(estadoId: number): Observable<any> {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload)
            .get('/api/v1/admin/localidade/cidades/select-cidades/' + estadoId)
            .map(res => {
                return this.formatSelect(res.json(), 'titulo', 'id');
            })
            .catch(this.handleError);
    }
}