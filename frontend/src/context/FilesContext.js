import { createContext, useReducer } from 'react'

const FilesContext = createContext()

const filesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILES':
            return { files: action.payload }
        case 'ADD_FILE':
            return { files: [action.payload, ...state.files] }
        case 'DELETE_FILE':
            return { files: state.files.filter((item) => item._id !== action.payload._id) }
        default:
            return state
    }
}

const FilesContextProvider = ({ children }) => {
    const { state, dispatch } = useReducer(filesReducer, { files: [] })

    return (
        <FilesContext.Provider value={{ state, dispatch }}>
            {children}
        </FilesContext.Provider>
    )
}

export default FilesContextProvider