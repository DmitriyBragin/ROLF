import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { SubmitQuestionForm } from '../../components/SubmitQuestionForm';

const setup = () => {
    const utils = render(<SubmitQuestionForm cb={() => {}} isSubmitLoading={false} />);
    const userInput = utils.getByTestId('user');
    const emailInput = utils.getByTestId('email');
    const carModelInput = utils.getByTestId('carModel');
    const carBrandInput = utils.getByTestId('carBrand');
    const textInput = utils.getByTestId('text');
    const sendButton = utils.getByText('Отправить');
    return {
        userInput: userInput as HTMLInputElement,
        emailInput: emailInput as HTMLInputElement,
        carModelInput: carModelInput as HTMLInputElement,
        carBrandInput: carBrandInput as HTMLInputElement,
        textInput: textInput as HTMLInputElement,
        sendButton: sendButton as HTMLDivElement,
        ...utils,
    };
};

describe('SubmitQuestionForm', () => {
    test('renders', () => {
        const { container } = render(<SubmitQuestionForm cb={() => {}} isSubmitLoading={false} />);
        expect(container).toMatchSnapshot();
    });
    test('user field can be changed to whatever', () => {
        const { userInput } = setup();
        fireEvent.change(userInput, { target: { value: 'Дима' } });
        expect(userInput.value).toBe('Дима');
    });
    test('email field can be changed to whatever', () => {
        const { emailInput } = setup();
        fireEvent.change(emailInput, { target: { value: 'Дима' } });
        expect(emailInput.value).toBe('Дима');
    });
    test('carModel field can be changed to whatever', () => {
        const { carModelInput } = setup();
        fireEvent.change(carModelInput, { target: { value: 'Дима' } });
        expect(carModelInput.value).toBe('Дима');
    });
    test('carBrand field can be changed to whatever', () => {
        const { carBrandInput } = setup();
        fireEvent.change(carBrandInput, { target: { value: 'Дима' } });
        expect(carBrandInput.value).toBe('Дима');
    });
    test('text field can be changed to whatever', () => {
        const { textInput } = setup();
        fireEvent.change(textInput, { target: { value: 'Дима' } });
        expect(textInput.value).toBe('Дима');
    });
    test('send button is disabled if there is not enough fields changed', () => {
        const { userInput, emailInput, carBrandInput, carModelInput, sendButton } = setup();
        fireEvent.change(userInput, { target: { value: 'Дима' } });
        fireEvent.change(emailInput, { target: { value: 'Дима' } });
        fireEvent.change(carBrandInput, { target: { value: 'Дима' } });
        fireEvent.change(carModelInput, { target: { value: 'Дима' } });
        expect(sendButton).toBeDisabled();
    });
    test('send button is enabled if all fields are present', () => {
        const { userInput, emailInput, carBrandInput, carModelInput, textInput, sendButton } =
            setup();
        fireEvent.change(userInput, { target: { value: 'Дима' } });
        fireEvent.change(emailInput, { target: { value: 'Дима' } });
        fireEvent.change(carBrandInput, { target: { value: 'Дима' } });
        fireEvent.change(carModelInput, { target: { value: 'Дима' } });
        fireEvent.change(textInput, { target: { value: 'Дима' } });
        expect(sendButton).not.toBeDisabled();
    });
});
