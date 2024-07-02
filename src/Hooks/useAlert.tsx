import { Id, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function showSuccessMessage(message: string) {
    return toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000
    });
};

function showErrorMessage(message: string) {
    return toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000
    })
}

function showLoadingMessage(message: string) {
    const id = toast.loading(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    })
    return id;
}

function resolveSuccessLoadingMessage(id: Id, message: string) {
    return toast.update(id, {
        render: message,
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 1000
    });
}

function resolveErrorLoadingMessage(id: Id, message: string) {
    return toast.update(id, {
        render: message,
        type: "error",
        isLoading: false,
        closeButton: true,
        autoClose: 3000
    });
}

export { showErrorMessage, showSuccessMessage, showLoadingMessage, resolveSuccessLoadingMessage, resolveErrorLoadingMessage }