import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import edulogo from "../../img/edulogo.png"
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
  <section data-testid="123" className='centered grid grid-rows-3'>
    <div>
          <img src={edulogo} className="object-fill h-48 w-96" alt="logo" />
    </div>
    <div className=''>

        <header className='pb-10'>
            <h1 className='text-4xl'>Welcome Back</h1>
            <p className='text-base'>Please enter your details</p>
        </header>
        <main >
            <p className='bg-error' ref={errRef} aria-live="assertive">{errMsg}</p>
            <form  onSubmit={handleSubmit}>
                <label className='text-sm font-bold block' htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    className='block w-500 border border-rich-gray rounded p-2 mb-6'
                    ref={employeeRef}
                    value={employeeEmail}
                    onChange={handleUserInput}
                    autoComplete="off"
                    placeholder='email'
                    required
                    />

                <label className='text-sm font-bold block' htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className='block w-500 border border-rich-gray rounded p-2 mb-4'
                    onChange={handlePwdInput}
                    value={employeePassword}
                    placeholder='password'
                    required
                    />

                    <div className='flex mb-6'>
                <label htmlFor="persist">
                    <input
                        type="checkbox"
                        id="persist"
                        className='text-base'
                        onChange={handleToggle}
                        checked={persist}
                        />
                    Remember me
                </label>
                <div className='grow'></div>
                <Link to='/'><p className='text-primary font-extrabold '>Forgot Password?</p></Link>
                        </div>
                <button className='w-500 text-center p-2 bg-primary text-sm font-bold rounded text-color-white mb-4'>Log in</button>
                <button disabled className='w-500 text-center p-2 bg-power-gray text-sm font-bold rounded text-color-white cursor-not-allowed'>Sign in with google</button>
            </form>
        </main>
      </div>
        <footer>
            <p className='text-power-gray'>Copyright 2022. All rights reserved.</p>
        </footer>
    </section>
)

  return content
}

export default Login
