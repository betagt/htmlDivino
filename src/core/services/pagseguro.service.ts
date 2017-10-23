import {ChangeDetectorRef, EventEmitter, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {StorageService} from "./storage.service";
import {TimeHelper} from "../helpers/time.helper";
import {FormasPagamentoService} from "../../app/financeiro/formas-pagamento/service/formas-pagamento.service";
import {HttpClientService} from "../http-client.service";
import {PreloaderService} from "./preloader.service";

declare var PagSeguroDirectPayment;

export class CreditCard {
    num: string;
    cvv: string;
    monthExp: string;
    yearExp: string;
    brand: string;
    token: string;
}

@Injectable()
export class PagseguroService {

    //segment: Segment;
    payment: EventEmitter<any> = new EventEmitter();
    paymentMethods: any = [];
    paymentMethod = 'CREDIT_CARD';
    creditCard;

    constructor(private http: Http,
                private httpClientService: HttpClientService,
                private storageService: StorageService,
                private preloaderService: PreloaderService,
                private timeHelper: TimeHelper,
                private formasPagamentoService: FormasPagamentoService) {
        this.validateToken();

    }

    emitPaymentSendEvent(number) {
        this.payment.emit(number);
    }

    getPaymentSendEmitter() {
        return this.payment;
    }

    getSenderHash() {
        return PagSeguroDirectPayment.getSenderHash();
    }

    private emitPaymentError(error: any) {
        this.responseInterceptor();
        this.payment.error(error);
    }

    validateToken(refresh = false) {
        console.log(this.storageService.hasLocal('pagseguro_session'));
        if (!this.storageService.hasLocal('pagseguro_session') && !refresh) {
            this.formasPagamentoService.sessionPagSeguro().subscribe(response => {
                this.storageService.setLocal('pagseguro_session', response, this.timeHelper.addSeconds(50));
                PagSeguroDirectPayment.setSessionId(response.sessionId);
            });
            return;
        }
        PagSeguroDirectPayment.setSessionId(this.storageService.getLocal('pagseguro_session').sessionId);
    }

    paymentCreditCard(data) {
        this.creditCard = data;
        this.getCreditCardBrand();
        return this;
    }

    getMethodsPayments(amount: any) {
        PagSeguroDirectPayment.getPaymentMethods({
            amount: amount,
            success: response => {
                this.paymentMethods = response;
            }
        });
    }

    getCreditCardBrand() {
        this.requestInterceptor();
        PagSeguroDirectPayment.getBrand({
            cardBin: this.creditCard.num.substring(0, 6),
            success: response => {
                this.creditCard.brand = response.brand.name;
                this.getCreditCardToken();
            },
            error: error => {
                error.status = this.messageErrorMount(error);
                this.emitPaymentError(error);
            }
        });
    }

    getCreditCardToken() {
        PagSeguroDirectPayment.createCardToken({
            cardNumber: this.creditCard.num,
            brand: this.creditCard.brand,
            cvv: this.creditCard.cvv,
            expirationMonth: this.creditCard.monthExp,
            expirationYear: this.creditCard.yearExp,
            success: response => {
                this.creditCard.token = response.card.token;
                this.responseInterceptor();
                this.sendPayment();
            },
            error: error => {
                error.status = this.messageErrorMount(error);
                this.emitPaymentError(error);
            }
        });
    }

    sendPayment() {
        this.httpClientService.post('/api/v1/admin/forma_pagamento/pagseguro/pagamento', {
            token: this.creditCard.token,
            hash: this.getSenderHash(),
            method: this.paymentMethod,
            forma_pagamento: this.creditCard.forma_pagamento,
            code_contratacao: this.creditCard.code_contratacao,
        }).subscribe(response => {
            this.emitPaymentSendEvent(response);
            this.storageService.remove('pagseguro_session');
            this.validateToken();
        }, error => {
            this.emitPaymentError(error);
            this.validateToken();
        });
    }

    boletoGenerate(forma_pagamento, code_contratacao) {
        return this.httpClientService.post('/api/v1/admin/forma_pagamento/pagseguro/pagamento', {
            hash: this.getSenderHash(),
            method: 'BOLETO',
            forma_pagamento: forma_pagamento,
            code_contratacao: code_contratacao
        }).map(res => {
            return res.json();
        });
    }

    private messageErrorMount(error) {
        //TODO verificar retornos para desenvolver corretamente.
        let keys = Object.keys(error.errors);
        return error.errors[keys[0]];
    }

    /**
     * Request interceptor.
     */
    private requestInterceptor(preloaderType = 'full'): void {
        this.preloaderService.showPreloader(preloaderType);
    }

    /**
     * Response interceptor.
     */
    private responseInterceptor(preloaderType = 'full'): void {
        this.preloaderService.hidePreloader(preloaderType);
    }
}