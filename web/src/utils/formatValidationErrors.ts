import { ValidationError } from 'yup';

interface IErrors {
    [key: string]: string;
}

export default function formatValidationErros(err: ValidationError) {
    let errors: IErrors = {};

    err.inner.forEach((error) => {
        console.log(error.path);
        if (error.path && error.message) {
            errors[error.path] = error.message;
        }
    });

    return errors;
}
