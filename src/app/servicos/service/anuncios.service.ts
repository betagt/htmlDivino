import {Injectable} from "@angular/core";
import {BaseServiceService} from "../../../core/base-service.service";
import {HttpClientService} from "../../../core/http-client.service";

@Injectable()
export class AnunciosService extends BaseServiceService {

    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/anuncio');
    }

    suspender(idAnuncio) {
        return this.httpClienteSevice.get(this.url + '/suspender/' + idAnuncio)
            .map(res => {
                return res.json();
            }).catch(this.handleError);
    }

    reOrdenar(data: any) {
        return this.httpClienteSevice.post(this.url + '/imagem/reordenar', data)
            .map(res => {
                return res.json();
            }).catch(this.handleError);
    }

    deleteImage(id) {
        return this.httpClienteSevice.delete(this.url + '/imagem/destroy-image/' + id).map(res => {
            return res.json();
        })
            .catch(this.handleError);
    }

    getImagens(id) {
        return this.httpClienteSevice.get(this.url + '/imagens/' + id).map(res => {
            return res.json();
        }).catch(this.handleError);
    }
}
