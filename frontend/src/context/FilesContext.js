import { createContext, useReducer } from 'react'

export const FilesContext = createContext()

const filesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILES':
            return { files: action.payload }
        default:
            return state
    }
}

const FilesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filesReducer, { files: null })

    return (
        <FilesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FilesContext.Provider>
    )
}

export default FilesContextProvider