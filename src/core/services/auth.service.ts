import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {UtilService} from "./util.service";
import {BaseServiceService} from "../base-service.service";
import {Usuario} from "../../app/usuarios/usuario";
import {unescape} from "querystring";
import {escape} from "querystring";
import {StorageService} from "./storage.service";
import {AlertService} from "./alert.service.com";
import {ConfigService} from "./config.service";

const CLIENT_ID: number = ConfigService.config().client_id;
const SECRET: string = ConfigService.config().secret;
const OauthLoginEndPointUrl: any = ConfigService.config().host + '/api/v1/token';
const KEY_TOKEN = 'token';

@Injectable()
export class AuthService {

    private params: Object = {};

    public refreshToken;

    static getRefreshTokenStatic() {
        let json = JSON.parse(localStorage.getItem('token'));

        if (json == null)
            return null;

        return json['refresh_token'];
    }

    constructor(private http: Http,
                private utilService: UtilService,
                private storageService: StorageService) {
        this.refreshToken = this.requestRefreshToken().share();
        this.params = {
            'client_id': CLIENT_ID,
            'client_secret': SECRET,
            'grant_type': 'password'
        };
    }

    protected handleError(error: any) {
        if (error.status == 422) {
            let text = '';
            let errors = JSON.parse(error._body);
            for (let i in errors) {
                for (let c in errors) {
                    text = `<b>${i}:</b> ${errors[c]}<br>`;
                }
            }
            AlertService.flashMessage(text);
        }
        return Observable.throw(error);
    }

    getAccessToken(user): Observable<any> {
        let params = this.params;
        params['username'] = user.username;
        params['password'] = user.password;
        return this.http.post(OauthLoginEndPointUrl, this.utilService.queryBuilder(params))
            .map(resullt => {
                return this.handleData(resullt);
            }, this.handleError);
    }

    requestRefreshToken(params = null): Observable<any> {
        if (!params) {
            params = {
                client_id: 1,
                client_secret: 'Z6UTO36NWuPGqTcIb7cdrO9BAGQSAu7AISBe2UEU',
                grant_type: 'refresh_token',
                refresh_token: AuthService.getRefreshTokenStatic()
            };
        }

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post(OauthLoginEndPointUrl, params, {headers: headers})
            .map(resullt => {
                this.handleData(resullt);
            })
            .catch(this.handleError);
    }


    private handleData(res: Response) {
        let body = res.json();
        if (body.access_token) {
            this.setToken(JSON.stringify(body));
        }
        return body;
    }


    getHeader() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (this.isAuthenticated()) {
            headers.append('Authorization', `Bearer ` + this.getToken());
        }

        return headers;
    }

    // Check user Authenticated
    isAuthenticated() {
        return !!this.getToken();
    }

    setAuthenticated(data) {
        return this.set('u', this.baseEncodeObj(data));
    }

    setToken(token) {
        this.set(KEY_TOKEN, token);
    }

    getToken() {
        return this.getItemJson('access_token');
    }

    getRefreshToken(): string {
        return AuthService.getRefreshTokenStatic();
    }

    setRotas(rotas) {
        this.setItemJson('r', rotas);
        return this;
    }

    getRotas() {
        return this.get('r');
    }

    private baseEncodeObj(obj) {
        return btoa(encodeURIComponent(JSON.stringify(obj)));
    }

    private baseDecodeObj(key) {
        return JSON.parse(decodeURIComponent(atob(this.get(key))));
    }

    removeToken() {
        this.remove(KEY_TOKEN);
    }

    removeUser() {
        this.remove('u');
    }

    removeRotas() {
        this.remove('r');
    }

    setItemJson(key, obj) {
        this.set(key, JSON.stringify(obj));
    }

    setItem(key, obj) {
        this.set(key, obj);
    }

    getUser(): Usuario {
        return this.baseDecodeObj('u');
    }

    getItem(item) {
        return this.get(item);
    }

    getItemJson(item) {
        let json = this.get(KEY_TOKEN);

        if (json == null)
            return null;

        return json[item];
    }

    logout() {
        this.removeUser();
        this.removeToken();
        this.removeRotas();
    }

    private localStorage() {
        return this.storageService;
    }

    private get(key) {
        return this.localStorage().get(key);
    }

    private set(key, value: any, expiry?: any) {
        this.localStorage().set(key, value, expiry);
        return this;
    }

    private remove(key) {
        this.localStorage().remove(key);
    }
}
