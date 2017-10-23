import {Injectable} from "@angular/core";
import {BaseServiceService} from "../../../core/base-service.service";
import {HttpClientService} from "../../../core/http-client.service";

@Injectable()
export class CaracteristicasService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/caracteristica');
    }

    selectlist() {
        return this.httpClienteSevice.get(this.url + '/lista')
            .map(res => {
                return this.formatSelect(res.json().data, 'titulo', 'id');
            }).catch(this.handleError);
    }
}
