import {useContext, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext.jsx";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://back-partiel.malakayalauvergnat.com/api/login_check', {
                username,
                password
            })
            login(username, response.data.token)
            console.log('réussi')
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Connexion</h1>
            <form onSubmit={handleLogin} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Nom d'utilisateur
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nom d'utilisateur"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Mot de passe
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        required
                    />
                </div>
                <div>
                    <Link to="/register" className="mx-1">
                        <button className="btn btn-secondary">
                            S'inscrire
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-primary mx-1">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login