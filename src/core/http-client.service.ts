import {Injectable} from '@angular/core';
import {
    Http, Headers, Response, URLSearchParams, RequestOptions, XHRBackend,
    RequestOptionsArgs, Request
} from '@angular/http';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs';
import {PreloaderService} from './services/preloader.service';
import {Router} from "@angular/router";
import {ConfigService} from "./services/config.service";

const OauthLoginEndPointUrl: any = ConfigService.config().host;

@Injectable()
export class HttpClientService extends Http {

    private headers: Headers;

    private url;

    skypePreload = false;

    private needAuth;

    private literalUrl;

    constructor(private authService: AuthService,
                private preloaderService: PreloaderService,
                private router: Router,
                backend: XHRBackend,
                defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        this.url = OauthLoginEndPointUrl;
        this.needAuth = true;
        this.literalUrl = false;
        this.headers = new Headers();
    }

    /**
     * Elimina o bearer da requisição
     * @param value
     * @returns {HttpClientService}
     */
    skypeAuth(value) {
        this.needAuth = value;
        return this;
    }

    /**
     * Da a possibilidade de passar uma url completa Ex: http:exemplo.com
     * @param value
     * @returns {HttpClientService}
     */
    setLiteralUrl(value) {
        this.literalUrl = value;
        return this;
    }

    setSkypePreload(value) {
        this.skypePreload = value;
        return this;
    }

    addHeader(key: string, value: string) {
        this.headers.append(key, value);
        return this;
    }

    removeHeader(key: string) {
        this.headers.delete(key);
        return this;
    }

    private getUrlDefault() {
        if (this.literalUrl) {
            return this.literalUrl;
        }
        return this.url;
    }

    setUrlDefault(url) {
        this.url = url;
        return this;
    }

    getHeaders() {
        if (this.authService.isAuthenticated() && this.needAuth) {
            this.headers.delete('Authorization');
            this.headers.append('Authorization', `Bearer ` + this.authService.getToken());
        }
        return this.headers;
    }

    get(url, params = null) {
        if (!params)
            params = new URLSearchParams();

        return this.intercept(super.get(this.getUrlDefault() + url, {
            headers: this.getHeaders(),
            search: params
        }));
    }

    post(url, data) {
        return this.intercept(super.post(this.getUrlDefault() + url, data, {
            headers: this.getHeaders()
        }));
    }

    patch(url, data) {
        return this.intercept(super.patch(this.getUrlDefault() + url, data, {
            headers: this.getHeaders()
        }));
    }

    put(url, data) {
        const headers = this.getHeaders();
        headers.set('Method', 'PUT');
        return this.intercept(super.put(this.getUrlDefault() + url, data, {
            headers: headers
        }));
    }

    delete(url) {
        return this.intercept(super.delete(this.getUrlDefault() + url, {
            headers: this.getHeaders()
        }));
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

    private intercept(observable: Observable<Response>): Observable<Response> {
        if (!this.skypePreload) {
            this.requestInterceptor();
        }
        return observable.catch((err, source) => {
            if (err.status === 401 || err.status === 403) {
                return this.authService.refreshToken.flatMap(authenticationResult => {
                    this.authService.refreshToken = this.authService.requestRefreshToken().share();
                    return this.removeHeader('authorization')
                        .get(err.url.replace(OauthLoginEndPointUrl, ''));
                });
            }
            return Observable.throw(err);
        }).do((res: Response) => {
            this.onSubscribeSuccess(res);
        }, (error) => {
            if (Number(error.status) == 400) {
                const err = JSON.parse(error._body);
                if (err.error && err.error == 'invalid_request') {
                    this.authService.logout();
                    this.router.navigate(['/login']);
                }
            }
            this.onSubscribeError(error);
        }).finally(() => {
            if (!this.skypePreload)
                this.onFinally();
            else
                this.skypePreload = false;
        });
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch(this.catchAuthError(this));
    }

    private catchAuthError(self: HttpClientService) {
        return (res: Response) => {
            return Observable.throw(res);
        };
    }

    /**
     * onFinally
     */
    private onFinally(preloaderType = 'full'): void {
        this.responseInterceptor(preloaderType);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: Response): void {
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {
    }

}
