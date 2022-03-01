import { render } from '@testing-library/react';
import React from 'react';

import { Header } from '../../components/Header';

describe('Header', () => {
    test('renders', () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
});
