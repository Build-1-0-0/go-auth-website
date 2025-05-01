import { useAuth } from './auth'

function App() {
  const { user, login, register, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.email}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        login(email, password).catch(alert)
      }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        register(email, password)
          .then(() => alert('Registration successful! Please login.'))
          .catch(alert)
      }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
      }
