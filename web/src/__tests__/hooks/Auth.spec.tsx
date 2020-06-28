import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/Auth';
import api from '../../services/api';
import AxiosMockAdapter from 'axios-mock-adapter';

const apiMock = new AxiosMockAdapter(api);

const setItemInStorage = jest.spyOn(Storage.prototype, 'setItem');

const johnDoe = {
    id: 'user-test-id',
    name: 'John Doe',
    email: 'johndoe@test.com',
};

describe('Auth hook', () => {
    it('should be able to sign in', async () => {
        apiMock.onPost('sessions').reply(200, {
            user: johnDoe,
            token: 'token-test',
        });

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        result.current.signIn({
            email: johnDoe.email,
            password: '123123',
        });

        await waitForNextUpdate();

        expect(setItemInStorage).toHaveBeenCalledWith(
            '@GoBarber:token',
            'token-test',
        );
        expect(setItemInStorage).toHaveBeenCalledWith(
            '@GoBarber:user',
            JSON.stringify(johnDoe),
        );
        expect(result.current.user.email).toEqual(johnDoe.email);
    });
    it('should restore saved data from storage when user init the hook', async () => {
        const storageGetItemSpy = jest
            .spyOn(Storage.prototype, 'getItem')
            .mockImplementation((key) => {
                switch (key) {
                    case '@GoBarber:token':
                        return 'token-test';
                    case '@GoBarber:user':
                        return JSON.stringify(johnDoe);
                    default:
                        return null;
                }
            });

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        expect(storageGetItemSpy).toHaveBeenCalledTimes(2);
        expect(result.current.user.email).toEqual(johnDoe.email);
    });
    it('should be able to sign out', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            switch (key) {
                case '@Gobarber:token':
                    return 'token-test';
                case '@Gobarber:token':
                    return JSON.stringify(johnDoe);
                default:
                    return null;
            }
        });

        const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

        const { result, waitForValueToChange } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        act(() => {
            result.current.signOut();
        });

        expect(removeItemSpy).toHaveBeenCalledTimes(2);
        expect(result.current.user).toBeUndefined();
    });
    it('should be able to update user', () => {
        const storageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForValueToChange } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        const updatedUser = {
            id: 'user-test-id-two',
            email: 'johntwo@test.com',
            name: 'jhon two',
            avatar_url: 'jhontwo.jpg',
        };

        act(() => {
            result.current.updateUser(updatedUser);
        });

        expect(storageSetItemSpy).toHaveBeenCalledWith(
            '@GoBarber:user',
            JSON.stringify(updatedUser),
        );

        expect(result.current.user).toEqual(updatedUser);
    });
});
