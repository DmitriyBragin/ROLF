import { render } from '@testing-library/react';
import React from 'react';

import { SubmitQuestionForm } from '../../components/SubmitQuestionForm';

describe('SubmitQuestionForm', () => {
    test('renders', () => {
        const { container } = render(<SubmitQuestionForm cb={() => {}} />);
        expect(container).toMatchSnapshot();
    });
});
