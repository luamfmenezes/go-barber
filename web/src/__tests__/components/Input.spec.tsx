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
    it('should render highlight-off when input is blured', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="TestPlaceHolder" />,
        );

        const containerInput = getByTestId('input-container');

        await wait(() => {
            expect(containerInput).not.toHaveStyle('border-color:#ff9000');
            expect(containerInput).not.toHaveStyle('color:#ff9000');
        });
    });
    it('should render highlight-red and tooltip on input when error is true', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input
                name="email"
                placeholder="TestPlaceHolder"
                error="Error test"
            />,
        );

        const containerInput = getByTestId('input-container');
        const toolTipContainer = getByTestId('tool-tip-container');

        await wait(() => {
            expect(containerInput).toHaveStyle('color:#c53030');
            expect(toolTipContainer).toBeTruthy();
        });
    });
});
