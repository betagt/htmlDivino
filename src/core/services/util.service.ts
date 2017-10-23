import {Injectable} from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";

@Injectable()
export class UtilService {
    private urlSearchParams: URLSearchParams;

    static urlSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    readThis(inputValue: any) {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();
        /*myReader.onloadend = (e) => {
            const image = myReader.result;
        }*/
        myReader.readAsDataURL(file);
        return myReader;
    }

    static numberMasc(cifrao = 'R$ ') {
        return createNumberMask({
            prefix: cifrao,
            suffix: '', // This will put the dollar sign at the end, with a space.
            allowDecimal: true,
        });
    }

    constructor() {
        this.urlSearchParams = new URLSearchParams();
    }

    queryBuilder(params): URLSearchParams {
        for (let param in params) {
            this.urlSearchParams.set(param, params[param]);
        }
        return this.urlSearchParams;
    }
}
