import { useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'

import useLogin from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Login</h2>

                <input
                    type="text"
                    className="form__control"
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form__control"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={['form__error', error ? 'form__error--visible' : ''].join(' ')}>
                    <BiErrorCircle className="form__icon" />
                    {error}
                </div>

                <button className="form__btn" disabled={isLoading}>Send</button>
            </form>
        </div>
    )
}

export default Login