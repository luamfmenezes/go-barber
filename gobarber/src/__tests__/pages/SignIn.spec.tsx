import React from 'react';
import SignIn from '../../pages/SignIn';
import {render} from 'react-native-testing-library';

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
    };
});

describe('SignIn page', () => {
    it('should contains email/password inputs', () => {
        const {getByPlaceholder} = render(<SignIn />);

        expect(getByPlaceholder('Your email')).toBeTruthy();
        expect(getByPlaceholder('Your password')).toBeTruthy();
    });
});
