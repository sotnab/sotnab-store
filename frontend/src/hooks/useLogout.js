import useAuthContext from './useAuthContext';
import useFilesContext from './useFilesContext';

const useLogout = () => {
    const { dispatch: dispatchAuth } = useAuthContext()
    const { dispatch: dispatchFiles } = useFilesContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatchAuth({ type: 'LOGOUT' })
        dispatchFiles({ type: 'SET_FILES', payload: null })
    }

    return { logout }
}

export default useLogout