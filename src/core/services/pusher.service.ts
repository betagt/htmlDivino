declare var Pusher: any;
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class PusherService {
    private pusher: any;
    private channels: any[];

    private _messages: BehaviorSubject<any> = new BehaviorSubject([]);
    public messages: Observable<any> = this._messages.asObservable();

    constructor() {
        this.pusher = new Pusher('e0f85a06365aff56b910', {
            cluster: 'us2',
            encrypted: false //criptografia
        });
    }

    observarChamada() {
        this.pusher.logToConsole = true;
        this.channels = [];
        const channel = this.pusher.subscribe('chamada.motorista');
        channel.bind('Modules\\Transporte\\Events\\ChamarMotorista', (data) => {
            this._messages.next(data);
        });
        return this;
    }
}
