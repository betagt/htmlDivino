import {FormControl} from '@angular/forms';
import {isNullOrUndefined} from "util";

export class BasicValidators {

    static email(control: FormControl) {

        const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return EMAIL_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    static qtdarquivos(control: FormControl) {
        let error = true;
        if (isNullOrUndefined(control.value)) {
            return null;
        }
        for (let i = 0; i < control.value.length; i++) {
            const byteLength = Number((control.value[i]).replace(/=/g, "").length * 0.75);
            console.log(byteLength);
            if (control.value.size > 100) {
                error = false;
            }
        }
        return error ? null : {
            validateQtdarquivos: {
                valid: false
            }
        };
    }

}
