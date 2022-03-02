import React from 'react';

import * as helpers from '../../components/SubmitQuestionForm/helpers';
import { mockQuestions } from '../../services/mockup';
import { Question } from '../../utils/types';
import { getEmptyQuestionObject } from '../../components/SubmitQuestionForm/helpers';
const testObjects = {
    fullObject: {
        a: '1',
        b: '2',
        c: '3',
    },
    notFullObject: {
        a: '1',
        b: '',
        c: '2',
    },
    emptyObject: {
        a: '',
        b: '',
        c: '',
    },
};

const testQuestions: { [key: string]: Question } = {
    validQuestion: mockQuestions[0],
    invalidNameQuestion: {
        ...mockQuestions[0],
        user: 'Dima',
    },
    invalidEmailQuestion: {
        ...mockQuestions[0],
        email: 'DimaDima@',
    },
    invalidTextQuestion: {
        ...mockQuestions[0],
        text: '    ',
    },
    invalidCarBrandQuestion: {
        ...mockQuestions[0],
        carBrand: 'DimaDimaввв123',
    },
    invalidCarModelQuestion: {
        ...mockQuestions[0],
        carModel: 'Йцукен',
    },
};

describe('isFilled', () => {
    test('handles full objects', () => {
        expect(helpers.isFilled(testObjects.fullObject)).toBeTruthy();
    });
    test('handles not full objects', () => {
        expect(helpers.isFilled(testObjects.notFullObject)).toBeFalsy();
    });
    test('handles empty objects', () => {
        expect(helpers.isFilled(testObjects.emptyObject)).toBeFalsy();
    });
});

describe('isNotEmpty', () => {
    test('handles full objects', () => {
        expect(helpers.isNotEmpty(testObjects.fullObject)).toBeTruthy();
    });
    test('handles not full objects', () => {
        expect(helpers.isNotEmpty(testObjects.notFullObject)).toBeTruthy();
    });
    test('handles empty objects', () => {
        expect(helpers.isNotEmpty(testObjects.emptyObject)).toBeFalsy();
    });
});

const emptyQuestionObject: Question = {
    user: '',
    email: '',
    carBrand: '',
    carModel: '',
    text: '',
};

describe('getEmptyQuestionObject', () => {
    test('returns empty Question object', () => {
        expect(helpers.getEmptyQuestionObject()).toStrictEqual(emptyQuestionObject);
    });
});

describe('validateForm', () => {
    test('passes if data is valid', () => {
        expect(helpers.validateForm(testQuestions.validQuestion)).toStrictEqual({
            errors: emptyQuestionObject,
            isValid: true,
        });
    });
    test('not passes if email is incorrect', () => {
        expect(helpers.validateForm(testQuestions.invalidEmailQuestion)).toStrictEqual({
            errors: {
                ...emptyQuestionObject,
                email: 'Неверный формат email',
            },
            isValid: false,
        });
    });
    test('not passes if username is incorrect', () => {
        expect(helpers.validateForm(testQuestions.invalidNameQuestion)).toStrictEqual({
            errors: {
                ...emptyQuestionObject,
                user: 'Только русские буквы от 2х до 30 символов',
            },
            isValid: false,
        });
    });
    test('not passes if text is incorrect', () => {
        expect(helpers.validateForm(testQuestions.invalidTextQuestion)).toStrictEqual({
            errors: {
                ...emptyQuestionObject,
                text: 'Пожалуйста, заполните это поле',
            },
            isValid: false,
        });
    });
    test('not passes if carModel is incorrect', () => {
        expect(helpers.validateForm(testQuestions.invalidCarModelQuestion)).toStrictEqual({
            errors: {
                ...emptyQuestionObject,
                carModel: 'Только латинские буквы и цифры от 4х до 20 символов',
            },
            isValid: false,
        });
    });
    test('not passes if carBrand is incorrect', () => {
        expect(helpers.validateForm(testQuestions.invalidCarBrandQuestion)).toStrictEqual({
            errors: {
                ...emptyQuestionObject,
                carBrand: 'Только латинские буквы от 4х до 20 символов',
            },
            isValid: false,
        });
    });
});
