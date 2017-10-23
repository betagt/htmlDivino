/*
 CPF: <input type="text" diMask="999.999.999-99">
 CNPJ: <input type="text" diMask="99.999.999/9999-99">
 CEP: <input type="text" diMask="99999-999">
 */

import {Directive, HostListener, Input} from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
    selector: '[diMask]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DiMaskDirective,
        multi: true
    }]
})
export class DiMaskDirective implements ControlValueAccessor {

    onTouched: any;
    onChange: any;

    @Input('diMask') diMask: string;
    @Input('recursive') recursive: boolean;

    writeValue(value: any): void {
        console.log(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.diMask.replace(/\D/g, '').replace(/9/g, '_');
        var valorMask = valor + pad.substring(0, pad.length - valor.length);

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        var valorMaskPos = 0;
        valor = '';
        for (var i = 0; i < this.diMask.length; i++) {
            if (isNaN(parseInt(this.diMask.charAt(i)))) {
                valor += this.diMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.diMask.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }
}