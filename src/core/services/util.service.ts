import {Injectable} from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";
import {conformToMask} from "text-mask-core/dist/textMaskCore";

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

    readThisMultiple(inputValue: any) {
        let myReader: FileReader = new FileReader();
        const resultFile = [];
        for (let i = 0; i < inputValue.files.length; i++) {
            myReader = new FileReader();
            myReader.readAsDataURL(inputValue.files[i]);
            resultFile.push(myReader);
        }
        return resultFile;
    }

    static numberMasc(cifrao = 'R$ ') {
        return createNumberMask({
            prefix: cifrao,
            suffix: '',
            decimalLimit: 2,
            allowDecimal: true,
            // decimalSymbol: ',',
            // thousandsSeparatorSymbol: '.',
            // includeThousandsSeparator: true
        });
    }

    static maskData() {
        return [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    }
    static cepMasc() {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    }

    static dataMasc() {
        return [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }

    static cpfMasc() {
        return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }

    static cnpjMasc() {
        return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }

    static dddMasc() {
        return ['(', /[1-9]/, /[1-9]/, ')'];
    }

    static phoneMask(value, self = null) {
        if (value == null) {
            return value;
        }
        if (value.length < 5)
            return value;


        const phoneNumberMask9 = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        const phoneNumberMask8 = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let conformedPhoneNumber: any;
        if (value.length >= 9) {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask9,
                {guide: false}
            );
        } else {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask8,
                {guide: false}
            );
        }

        return conformedPhoneNumber.conformedValue;

    }

    static phoneMaskWithDdd(value, self = null) {
        if (value == null) {
            return value;
        }
        const phoneNumberMask9 = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        const phoneNumberMask8 = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let conformedPhoneNumber: any;
        if (value.length > 9) {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask9,
                {guide: false}
            );
        } else {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask8,
                {guide: false}
            );
        }

        return conformedPhoneNumber.conformedValue;

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

    static converterData(data: Date) {
        return data.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).split(' ').join('/');
    }

    static getEstados() {
        const estados = [
            {
                label: 'Acre',
                value: 'AC'
            },
            {
                label: 'Alagoas',
                value: 'AL'
            },
            {
                label: 'Amapá',
                value: 'AP'
            },
            {
                label: 'Amazonas',
                value: 'AM'
            },
            {
                label: 'Amazonas',
                value: 'AM'
            },
            {
                label: 'Bahia',
                value: 'BA'
            },
            {
                label: 'Distrito Federal',
                value: 'DF'
            },
            {
                label: 'Espírito Santo',
                value: 'ES'
            },
            {
                label: 'Goiás',
                value: 'GO'
            },
            {
                label: 'Maranhão',
                value: 'MA'
            },
            {
                label: 'Mato Grosso',
                value: 'MT'
            },
            {
                label: 'Mato Grosso do Sul',
                value: 'MS'
            },
            {
                label: 'Minas Gerais',
                value: 'MG'
            },
            {
                label: 'Pará',
                value: 'PA'
            },
            {
                label: 'Paraíba',
                value: 'PB'
            },
            {
                label: 'Paraná',
                value: 'PR'
            },
            {
                label: 'Pernambuco',
                value: 'PE'
            },
            {
                label: 'Piauí',
                value: 'PI'
            },
            {
                label: 'Rio de Janeiro',
                value: 'RJ'
            },
            {
                label: 'Rio Grande do Norte',
                value: 'RN'
            },
            {
                label: 'Rio Grande do Sul',
                value: 'RS'
            },
            {
                label: 'Rondônia',
                value: 'RO'
            },
            {
                label: 'Roraima',
                value: 'RR'
            },
            {
                label: 'Santa Catarina',
                value: 'SC'
            },
            {
                label: 'São Paulo',
                value: 'SP'
            },
            {
                label: 'Sergipe',
                value: 'SE'
            },
            {
                label: 'Tocantins',
                value: 'TO'
            },
        ];
        return estados;
    }
}
