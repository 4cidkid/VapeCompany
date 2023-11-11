import { httpStatus } from "@/constants/httpStatus";
import validator from "validator";
export function throwCustomError(message: string = httpStatus.http_message_internal_server_error, status: number = httpStatus.http_status_internal_server_error) {
    const customError = {
        message,
        status
    };

    throw customError;
}

export function validateSignUpData(name: string, lastname: string, username: string, password: string):void {
    if (!name || !lastname || !username || !password) {
        var fieldsMissing = [!name ? 'Name' : '', !lastname ? 'Last name' : '', !username ? 'Email' : '', !password ? 'Password' : ''].filter(Boolean).join(', ');
        throwCustomError('The following fields are missing: ' + fieldsMissing, httpStatus.http_status_bad_request)
    }
    if (!validator.isEmail(username)) {
        throwCustomError('You\'ve to enter a valid email', httpStatus.http_status_bad_request)
    }
    if (!validator.isAlpha(name) || !validator.isAlpha(lastname)) {
        var fieldsNotAlpha = [!name ? 'name' : '', !lastname ? 'Last name' : ''].filter(Boolean).join(' and ');
        throwCustomError('Your ' + fieldsNotAlpha + ' must only contain letters', httpStatus.http_status_bad_request)
    }
    if (name.length > 100 || lastname.length > 100) {
        var fieldsNotMaxLength = [!name ? 'name' : '', !lastname ? 'Last name' : ''].filter(Boolean).join(' and ');
        throwCustomError('Your ' + fieldsNotMaxLength + ' must be a maximum of 100 characters long.')
    }
    if (password.length < 8) {
        throwCustomError('Your password must be at least 8 characters long.', httpStatus.http_status_bad_request);
    }

    if (password.length > 100) {
        throwCustomError('Your password must be a maximum of 100 characters long.', httpStatus.http_status_bad_request);
    }
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false
    })) {
        throwCustomError('Your password is not strong enough', httpStatus.http_status_bad_request);
    }
}


export function generateVerificationCode(length = 6) {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      verificationCode += possibleCharacters[randomIndex];
    }
  
    return verificationCode;
  }