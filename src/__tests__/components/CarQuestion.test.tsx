import { render } from '@testing-library/react';
import React from 'react';

import { CarQuestion } from '../../components/CarQuestion';
import { Question } from '../../utils/types';
import { mockQuestions } from '../../services/mockup';

const validQuestion = mockQuestions[0];

describe('CarQuestion', () => {
    test('renders with empty object', () => {
        const { container } = render(<CarQuestion question={{} as Question} />);
        expect(container).toMatchSnapshot();
    });

    test('renders with valid question', () => {
        const { container } = render(<CarQuestion question={validQuestion} />);
        expect(container).toMatchSnapshot();
    });

    test('renders with undefined', () => {
        const { container } = render(<CarQuestion question={undefined as unknown as Question} />);
        expect(container).toMatchSnapshot();
    });
});
