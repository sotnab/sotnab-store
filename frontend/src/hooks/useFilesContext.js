import { useContext } from 'react'
import { FilesContext } from '../context/FilesContext'

const useFilesContext = () => {
    const context = useContext(FilesContext)

    if (!context) {
        throw Error('useFilesContext must be used inside of FilesContextProvider')
    }

    return context
}

export default useFilesContext