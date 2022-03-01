import { useEffect, useState } from "react"
import Input from '../form/Input'
import Button from '../form/Button'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { PASSWORD_RESET } from "../../api"
import { Error } from "../helpers/Error"
import { useNavigate } from "react-router-dom"
import Head from "../helpers/Head"

export default function LoginResetPassword() {
  const [login, setLogin] = useState('')
  const [key, setKey] = useState('')
  const { error, loading, request } = useFetch()
  const password = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login, key, password: password.value
      })
      const { response } = await request(url, options)
      if (response.ok) {
        navigate('/login')
      }
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resete sua senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Nova senha' type="password" name="password" {...password} />
        {loading ? <Button disabled>Resetando...</Button> : <Button>Resetar</Button>}
      </form>
      {error && <Error error={error} />}
    </section>
  )
}