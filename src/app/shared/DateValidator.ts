import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function DateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = new Date(control.value);
        
        if (!value) {
            return null;
        }

        const today = new Date();
        const dateValid = value.getTime() < today.getTime() && value.getFullYear() >= 1950;

        return !dateValid ? {dateBirth:true}: null;
    }
}