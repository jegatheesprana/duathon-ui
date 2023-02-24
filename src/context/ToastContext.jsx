import { createContext, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext)
}

export function ToastProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const toastMessage = (message) => {
        setOpen(false)
        setTimeout(() => {
            setMessage(message)
            setOpen(true)
        }, 5)
    }

    const value = {
        toastMessage
    }

    return (
        <ToastContext.Provider value={value} >
            {children}

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
                TransitionComponent={SlideTransition}
            />
        </ToastContext.Provider>
    )
}