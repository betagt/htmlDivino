import {Injectable} from "@angular/core";
@Injectable()
export class TimeHelper {

    private _time: Date;

    constructor() {
        this._time = new Date();
    }

    get time(): Date {
        return this._time;
    }

    set time(value: Date) {
        this._time = value;
    }

    addSeconds(seconds) {
        this._time.setSeconds(this._time.getSeconds() + seconds);
        return this._time;
    }

    addMinutes(minutes) {
        this._time.setMinutes(this._time.getMinutes() + minutes);
        return this._time;
    }

    addHours(hours) {
        this._time.setSeconds(this._time.getHours() + hours);
        return this._time;
    }

}
