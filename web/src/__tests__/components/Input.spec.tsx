import React from 'react';
import Input from '../../components/Input';
import { render, fireEvent, wait } from '@testing-library/react';

describe('Input Componnent', () => {
    it('should be able to render an input', async () => {
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="TestPlaceHolder" />,
        );

        expect(getByPlaceholderText('TestPlaceHolder')).toBeTruthy();
    });
    it('should render highlight on input when is focused', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="TestPlaceHolder" />,
        );

        const input = getByPlaceholderText('TestPlaceHolder');
        const containerInput = getByTestId('input-container');

        fireEvent.focus(input);

        await wait(() => {
            expect(containerInput).toHaveStyle('border-color:#ff9000');
            expect(containerInput).toHaveStyle('color:#ff9000');
        });
    });
});
