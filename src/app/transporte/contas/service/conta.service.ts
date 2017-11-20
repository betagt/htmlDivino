import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../../core/http-client.service';
import {BaseServiceService} from '../../../../core/base-service.service';

@Injectable()
export class ContaService extends BaseServiceService {
    constructor(http: HttpClientService) {
        super(http, '/api/v1/admin/conta');
    }
}
