import { createContext, ReactElement, useState} from 'react';

type MessageType = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}
const initMessage:MessageType = {
    message: '',
    setMessage: ()=>{}
}


type ChildrenType = {
    children?: ReactElement | ReactElement[]
}


const MessageContext = createContext<MessageType>(initMessage);


export const MessageProvider = ({children}:ChildrenType ): ReactElement =>{
    const [message, setMessage] = useState<string>(initMessage.message)
    
    return (
        <MessageContext.Provider value={{message, setMessage}}> 
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext;