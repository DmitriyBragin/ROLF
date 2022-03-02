import { Question } from '../../utils/types';

type FormValidationProps = {
    errors: Question;
    isValid: boolean;
};

type TextLengthRules = {
    minChars: number;
    maxChars: number;
};

type TextRules = {
    lengthRules?: TextLengthRules;
    regexp: RegExp;
};

export const isFilled = (object: Object): boolean => Object.values(object).every(x => x !== '');
export const isNotEmpty = (object: Object): boolean => Object.values(object).some(x => x !== '');

export const getEmptyQuestionObject = (): Question => {
    return {
        user: '',
        email: '',
        carBrand: '',
        carModel: '',
        text: '',
    };
};

const textFollowsRules = (text: string, rules: TextRules): boolean => {
    const invalidChars = text.trim().replaceAll(rules.regexp, '').length;
    if (!rules.lengthRules) return invalidChars === 0;
    return (
        text.trim().length >= rules.lengthRules.minChars &&
        text.trim().length <= rules.lengthRules.maxChars &&
        invalidChars === 0
    );
};

const validateUserField = (text: string): string => {
    let res: string = '';
    const userRegexp = /[\p{Script=Cyrillic}\p{White_Space}]/gu;
    const userLengthRules: TextLengthRules = {
        minChars: 2,
        maxChars: 30,
    };
    const userTextRules: TextRules = {
        lengthRules: userLengthRules,
        regexp: userRegexp,
    };
    if (!textFollowsRules(text, userTextRules)) {
        res = 'Только русские буквы от 2х до 30 символов';
    }
    return res;
};

const validateCarModelField = (text: string): string => {
    let res: string = '';
    const carModelRegexp = /[\p{Script=Latin}\p{Number}\p{White_Space}]/gu;
    const carModelLengthRules: TextLengthRules = {
        minChars: 4,
        maxChars: 20,
    };
    const carModelTextRules: TextRules = {
        lengthRules: carModelLengthRules,
        regexp: carModelRegexp,
    };
    if (!textFollowsRules(text, carModelTextRules)) {
        res = 'Только латинские буквы и цифры от 4х до 20 символов';
    }
    return res;
};

const validateCarBrandField = (text: string): string => {
    let res: string = '';
    const carBrandRegexp = /[\p{Script=Latin}\p{White_Space}]/gu;
    const carBrandLengthRules: TextLengthRules = {
        minChars: 4,
        maxChars: 20,
    };
    const carBrandTextRules: TextRules = {
        lengthRules: carBrandLengthRules,
        regexp: carBrandRegexp,
    };
    if (!textFollowsRules(text, carBrandTextRules)) {
        res = 'Только латинские буквы от 4х до 20 символов';
    }
    return res;
};

const validateEmailField = (text: string): string => {
    let res: string = '';
    const emailRules: TextRules = {
        regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    };
    if (!textFollowsRules(text, emailRules)) {
        res = 'Неверный формат email';
    }
    return res;
};

const filterTextFromSpecificCharacters = (text: string): string => {
    const normalTextRegexp =
        /([\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Punctuation}\p{Join_Control}]+)/gu;
    let res: string | undefined = text.match(normalTextRegexp)?.join(' ');
    if (!res) res = '';
    return res;
};

const validateTextField = (text: string): string => {
    let res: string = '';
    if (!filterTextFromSpecificCharacters(text.trim()).length) {
        res = 'Пожалуйста, заполните это поле';
    }
    return res;
};

export const validateForm = (form: Question): FormValidationProps => {
    const res: FormValidationProps = {
        errors: getEmptyQuestionObject(),
        isValid: true,
    };
    const { user, text, carBrand, email, carModel } = form;

    res.errors = {
        user: validateUserField(user),
        carModel: validateCarModelField(carModel),
        carBrand: validateCarBrandField(carBrand),
        email: validateEmailField(email),
        text: validateTextField(text),
    };

    if (isNotEmpty(res.errors)) res.isValid = false;
    return res;
};

const getFormattedDate = (): string => {
    const today = new Date();
    const curDay = today.getDay() < 10 ? '0' + today.getDay() : today.getDay();
    const curMonth =
        today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const ddmmyyyy = curDay + '.' + curMonth + '.' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    return ddmmyyyy + 'T' + time;
};

export const preparePayload = (data: Question): Question => {
    const dateTime = getFormattedDate();
    return {
        ...data,
        text: filterTextFromSpecificCharacters(data.text),
        date: dateTime,
    };
};
