import { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'

const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { dispatch } = useAuthContext()

    const signup = async (email, password, repeatedPassword) => {
        setIsLoading(true)
        
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, repeatedPassword })
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

    return { signup, error, isLoading }
}

export default useSignup