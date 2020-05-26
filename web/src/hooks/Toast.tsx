import React, { createContext, useCallback, useState, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';
import { uuid } from 'uuidv4';

export interface IToastMessage {
    id: string;
    title: string;
    type?: 'success' | 'error' | 'info';
    description?: string;
}

interface IToastContextData {
    addToast(message: Omit<IToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [toastMessages, setToastMessages] = useState<IToastMessage[]>([]);

    const addToast = useCallback(
        ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
            const id = uuid();
            console.log(id);
            setToastMessages((oldTostMessages) => [
                ...oldTostMessages,
                { id, type, title, description },
            ]);
        },
        [],
    );

    const removeToast = useCallback((id: string) => {
        setToastMessages((oldTostMessages) =>
            oldTostMessages.filter((toastMessage) => toastMessage.id !== id),
        );
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <ToastContainer toastMessages={toastMessages} />
            {children}
        </ToastContext.Provider>
    );
};

function useToast(): IToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            'You should execute this hook only inside of one react component',
        );
    }
    return context;
}

export { useToast, ToastProvider };
