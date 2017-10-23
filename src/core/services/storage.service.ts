import {Injectable} from "@angular/core";
import {CoolLocalStorage, CoolSessionStorage} from 'angular2-cool-storage';

@Injectable()
export class StorageService {

    constructor(private coolLocalStorage: CoolLocalStorage,
                private coolSessionStorage: CoolSessionStorage) {
    }

    memory() {
        return this.coolSessionStorage;
    }

    local() {
        return this.coolLocalStorage;
    }

    session() {
        return this.coolSessionStorage;
    }

    cookie() {
        return this.coolLocalStorage;
    }

    set(key, value, expiry = null) {
        if (expiry) {
            this.setExpire(key, expiry);
        }
        if (value instanceof Object) {
            this.local().setObject(key, value);
            return;
        }
        this.local().setItem(key, value);
    }

    get(key) {
        const json = this.local().getItem(key);
        if (this.isJson(json)) {
            return JSON.parse(json);
        }
        return json;
    }

    private isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(key) {
        this.local().removeItem(key);
    }

    setMemory(key, value: any, expiry?: any) {
        this.setExpire(key, expiry);
        if (value instanceof Object) {
            this.memory().setObject(key, value);
            return;
        } else {
            this.memory().setItem(key, value);
        }
        return this;
    }

    getMemory(key: any) {
        if (!this.checkExpire(this.memory(), key)) {
            return null;
        }
        const json = this.memory().getItem(key);
        if (this.isJson(json)) {
            return JSON.parse(json);
        }
        return json;
    }

    hasMemory(key: any) {
        return this.checkExpire(this.memory(), key);
    }

    setLocal(key, value: any, expiry?: any) {
        this.setExpire(key, expiry);

        if (value instanceof Object) {
            this.local().setObject(key, value);
            return;
        } else {
            this.local().setItem(key, value);
        }
        return this;
    }

    getLocal(key: any) {
        if (!this.checkExpire(this.local(), key)) {
            return null;
        }
        const json = this.local().getItem(key);
        if (this.isJson(json)) {
            return JSON.parse(json);
        }
        return json;
    }

    has(key: any) {
        return this.checkExpire(this.local(), key);
    }

    hasLocal(key: any) {
        return this.checkExpire(this.local(), key);
    }

    setSession(key, value: any, expiry?: any) {
        this.setExpire(key, expiry);
        if (value instanceof Object) {
            this.session().setObject(key, value);
            return;
        } else {
            this.session().setItem(key, value);
        }
        return this;
    }

    getSession(key: any) {
        if (!this.checkExpire(this.session(), key)) {
            return null;
        }
        const json = this.session().getItem(key);
        if (this.isJson(json)) {
            return JSON.parse(json);
        }
        return json;
    }

    hasSession(key: any) {
        return this.checkExpire(this.session(), key);
    }

    setCookie(key, value: any, expiry?: any) {
        this.setExpire(key, expiry);
        if (value instanceof Object) {
            this.cookie().setObject(key, value);
            return;
        } else {
            this.cookie().setItem(key, value);
        }
        return this;
    }

    getCookie(key: any) {
        if (!this.checkExpire(this.cookie(), key)) {
            return null;
        }
        const json = this.cookie().getItem(key);
        if (this.isJson(json)) {
            return JSON.parse(json);
        }
        return json;
    }

    hasCookie(key: any) {
        return this.checkExpire(this.cookie(), key);
    }

    private checkExpire(drive, key, expiry: any = null) {
        const expirename = key + '_expiry';
        const beforeExpire = this.memory().getItem(expirename);
        if (this.checkEmpty(drive.getItem(key))) {
            return !((new Date(beforeExpire)) < (new Date()));
        }
        drive.removeItem(key);
        this.memory().removeItem(expirename);
        return false;
    }

    private checkEmpty(item) {
        return !!item;
    }

    private setExpire(name, expiry) {
        if (!expiry) {
            return;
        }
        const expirename = name + '_expiry';
        this.memory().setItem(expirename, expiry);
    }
}
