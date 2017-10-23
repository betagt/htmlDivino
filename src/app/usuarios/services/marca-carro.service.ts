import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {HttpClientService} from "../../../core/http-client.service";
import {BaseServiceService} from "../../../core/base-service.service";

@Injectable()
export class MarcaCarroService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/marca-carro');
    }

    todos(formater = false) {
        return this.httpClienteSevice.setSkypePreload(this.skyPreload).get(this.url + '/todos')
            .map(res => {
                if (!formater) {
                    return res.json();
                }
                return this.formatSelect(res.json().data, 'nome', 'id');
            })
            .catch(this.handleError);
    }

}
