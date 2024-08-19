import { createContext, useState } from 'react'

type Status = 'warning' | 'error' | 'success'

interface IMessageContext {
    message: { text: string; status: Status }
    setMessage: (text: string) => void
    setStatus: (status: string) => void
}

const DEFAULT_VALUE = {
    message: {
        text: '',
        status: 'error',
    },
    setMessage: (text: string) => console.log(text),
    setStatus: (status: Status) => console.log(status),
}

export const MessageContext = createContext(DEFAULT_VALUE)

const MessageContextProvider = () => {
    const [message, _setMessage] = useState({ text: '', status: 'error' })

    const setMessage = (text: string) => _setMessage({ ...message, text })

    const setStatus = (status: Status) => _setMessage({ ...message, status })

    return (
        <MessageContext.Provider
            value={{ message, setMessage, setStatus }}
        ></MessageContext.Provider>
    )
}

export default MessageContextProvider
