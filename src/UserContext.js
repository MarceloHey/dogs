import React, { useCallback, useEffect, useState } from 'react';
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const getUser = async (token) => {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
    setLogin(true)
  }

  const userLogin = async (username, password) => {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({ username, password })
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const { token } = await response.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    } catch (err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  const userLogout = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          setError(null)
          setLoading(true)
          if (!response.ok) throw new Error('Token inválido')
          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }

      } else {
        setLogin(false)
      }
    }
    autoLogin()
  }, [userLogout])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, error, loading, login, data }}>
      {children}
    </UserContext.Provider>
  )
}