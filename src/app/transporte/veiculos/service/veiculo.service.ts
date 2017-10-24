import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../core/http-client.service";
import {Observable} from "rxjs";
import {BaseServiceService} from "../../../../core/base-service.service";

@Injectable()
export class VeiculoService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/veiculo');
    }

    enviar(params: FormData, id: number = null): Observable<any> {
        return this.httpClienteSevice
            .post(this.url + '/user-cadastro', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    atualizar(params, id: number = null): Observable<any> {
        return this.httpClienteSevice
            .post(this.url + '/atualizar-cadastro/' + id, params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }


    meusVeiculos(params: URLSearchParams = null): Observable<any> {
        return this.httpClienteSevice.get(this.url + '/meus-veiculos', params)
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

    cores(formater = false) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/cores')
            .map(res => {
                if (!formater) {
                    return res.json();
                }
                return this.formatSelect(res.json().data, 'NOME', 'NOME');
            })
            .catch(this.handleError);
    }
}
