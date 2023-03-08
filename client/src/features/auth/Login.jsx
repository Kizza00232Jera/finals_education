import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'



const Login = () => {
  
  //user ref to set the focus on the user
  const employeeRef = useRef()
  const errRef = useRef()
  //state for username, password and error message
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  //bringing navigate and dispatch
  const navigate = useNavigate()
  const dispatch = useDispatch()

   //bringng login functoin that is going to be used when needed
   const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
      employeeRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [employeeEmail, employeePassword])

     //creating handler for button
     const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const { accessToken } = await login({ employeeEmail, employeePassword }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setEmployeeEmail('')
        setEmployeePassword('')
        navigate('/dash')
      } catch (err) {
        if (!err.status) {
                setErrMsg('No Server Response');
              } else if (err.status === 400) {
                setErrMsg('Missing Email or Password');
              } else if (err.status === 401) {
                setErrMsg('Unauthorized');
              } else {
                setErrMsg(err.data?.message);
              }
              errRef.current.focus();
            }
          }

  //creating handlers for user and password 
  const handleUserInput = (e) => setEmployeeEmail(e.target.value)
  const handlePwdInput = (e) => setEmployeePassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  if (isLoading) return <p>Loading...</p>

   const content = (
    <section >
        <header>
            <h1>Employee Login</h1>
        </header>
        <main >
            <p ref={errRef} aria-live="assertive">{errMsg}</p>

            <form  onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={employeeRef}
                    value={employeeEmail}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={employeePassword}
                    required
                />
                <button>Sign In</button>
                <label htmlFor="persist">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={persist}
                    />
                    Trust This Device
                </label>
            </form>
        </main>
        <footer>
            <Link to="/">Back to Home</Link>
        </footer>
    </section>
)

  return content
}

export default Login
