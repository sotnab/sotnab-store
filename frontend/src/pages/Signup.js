import { useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'

import useSignup from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password, repeatedPassword)
    }

    return (
        <div className="signup">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Sign up</h2>

                <input
                    type="text"
                    className="form__control"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form__control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    className="form__control"
                    placeholder="Repeat password"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                />

                <div className={['form__error', error ? 'form__error--visible' : ''].join(' ')}>
                    <BiErrorCircle className="form__icon" />
                    {error}
                </div>

                <button className="form__btn" disabled={isLoading}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup