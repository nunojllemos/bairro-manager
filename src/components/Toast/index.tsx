import { CheckCircleOutline } from '@mui/icons-material'
import React from 'react'

interface ToastProps {
    message: string
    status: 'success' | 'error' | 'info'
}

const Toast = ({ message, status }: ToastProps) => {
    return (
        <div
            className={`grid grid-cols-[auto_1fr] gap-x-6 rounded-md px-6 py-4 text-md fixed top-10 right-10 z-10 ${
                status === 'success' ? 'bg-green-300 text-green-700' : status === 'error' ? 'bg-red-300' : 'bg-blue-300'
            }`}
        >
            <CheckCircleOutline fontSize="medium" className="text-green-700" />
            <p>{message}</p>
        </div>
    )
}

export default Toast
