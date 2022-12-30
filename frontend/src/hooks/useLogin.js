import { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        
        const json = await response.json()
        
        setError(false)
        setIsLoading(false)

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })
        }
    }

    return { error, isLoading, login }
}

export default useLogin