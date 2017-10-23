import {Injectable} from "@angular/core";
const COOKIE_CONSENT = 'MyCookie';
const COOKIE_CONSENT_EXPIRE_DAYS = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
@Injectable()
export class CoockieService {

    private isConsented: boolean = false;

    constructor() {
        this.isConsented = this.getCookie(COOKIE_CONSENT) === '1';
    }

    getCookie(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        const cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < ca.length; i += 1) {
            if (ca[i].indexOf(name, 0) > -1) {
                c = ca[i].substring(cookieName.length + 1, ca[i].length);
                return c;
            }
        }
        return null;
    }

    private deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        const d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires: string = `expires=${d.toUTCString()}`;
        const cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

    private consent(isConsent: boolean, e: any) {
        if (!isConsent) {
            return this.isConsented;
        } else if (isConsent) {
            this.setCookie(COOKIE_CONSENT, '1', COOKIE_CONSENT_EXPIRE_DAYS);
            this.isConsented = true;
            e.preventDefault();
        }
    }
}