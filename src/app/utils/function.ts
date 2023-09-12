import { FormGroup, AbstractControl } from "@angular/forms";
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";
import { Expence } from "../model/expence.model";
import { HttpListResponse, HttpResponse } from "./http-response";



/**
 * @description Used to get AbstractControl to check behaviour of elements such as (HTML) input elements
 * @param formGroup
 * @param formControllerName
 * @returns AbstractControl | null
 */
export function getAbstractController(formGroup: FormGroup, formControllerName: string): AbstractControl | null {
    return formGroup.get(formControllerName);
}

/**
 * @description Used to Check and Touch form Validations
 * @param formGroup
 * @returns boolean
 */
export function checkAndTouchFormValidation(formGroup: FormGroup): boolean {

    const isValid = formGroup.valid;
    if (!isValid) {
        formGroup.markAllAsTouched();
    }
    return isValid;
}

/**
 *@description Used to scroll to the top of the window
 */
export function scrollTop(): void {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
    /**
 * @description Used to get Http Response List Data
 * @param observable
 * @returns Promise<Array<T>>
 */
export async function setHttpListResponse<T>(observable: Observable<HttpListResponse<Expence>>){
    return new Promise((resolve, reject) => {

        observable.pipe((map)(ob => {

            if (ob?.status && ob.status !== 'SUCCESS') {
                displayNotifficationMessage('Error', ob.error?.message, "error");
            }
            return ob.data;

        })).subscribe(
            {
                next: resp => { resolve(resp); },
                error: error => {
                    let errorMsg = ` <b>Error Code </b>: ${error.status}<br> <b>Message </b>: ${error.statusText}`
                    displayNotifficationMessage("Http Response Error", errorMsg, "error");
                    reject(error);
                }
            }
        )
    })
}

/**
 * @description Used to get Http Response simple Data objects & messages
 * @param observable
 * @param isDisplaySuccessNotifcation
 * @returns Promise<T>
 */
export async function setHttResponse<T>(observable: Observable<HttpResponse<Expence>>, isDisplaySuccessNotifcation = true): Promise<any> {

    let successMsg: any;
    let respStatus: string = '';

    return new Promise((resolve, reject) => {
        observable

            .subscribe(
                {
                    next: (resp:any) => {
                        respStatus = resp.status;
                        if (resp.status === 'SUCCESS') {
                            successMsg = resp.data.message;
                            resolve(resp.data);
                            if (isDisplaySuccessNotifcation) {
                                displayNotifficationMessage("Success", successMsg);
                            }
                        } else {

                            let errorMsg = "";
                            if (resp.error?.invalidFields) {

                                for (const [key, value] of Object.entries(resp.error?.invalidFields)) {
                                    let newKey = key.replace(/([a-z])([A-Z])/g, '$1 $2'); // Seperate the variable name
                                    // Set uppercase of the first letter
                                    const finalKey = key.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + newKey.slice(1);
                                    errorMsg += `<b>${finalKey} :</b> ${value} <br>`;
                                }

                            } else if (resp.error?.message) {
                                errorMsg = resp.error.message;
                            } else {
                                errorMsg = "Something went wrong, Please try again"
                            }

                            displayNotifficationMessage('Error', errorMsg, "error");
                            reject(new Error(errorMsg));

                        }
                    },
                    error: error => {
                        displayNotifficationMessage(error.name, error.message, "error");
                        reject(error.message);
                    }
                }
            )
    })
}

/*
 * @description Used to display Notification messages
 * @param title
 * @param message
 * @param icon
 * @param duration
 */
export function displayNotifficationMessage(title = "Success", message: any = "", icon: any = "success", duration = 5000): void {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        didOpen: (toast:any) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title,
        html: message
    })
}