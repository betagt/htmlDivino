import {Injectable} from "@angular/core";
import {HttpClientService} from "../../../core/http-client.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GeoService {

    constructor(private httpClientService: HttpClientService) {
    }

    /**
     * Get all users
     **/
    geo(cidade, endereco, estado): Observable<any> {
        return this.httpClientService.get('/api/v1/admin/localidade/geo-localizacao/' + cidade + '/' + endereco + '/' + estado)
            .map(res => {
                return res.json();
            });
    }

    /**
     * Get all users
     **/
    localidadeByCep(cep): Observable<any> {
        return this.httpClientService.get('/api/v1/front/localidade/cep-localidade/' + cep)
            .map(res => {
                return res.json().data;
            });
    }
}
