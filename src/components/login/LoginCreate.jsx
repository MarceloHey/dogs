import Input from '../form/Input'
import Button from '../form/Button'
import { Error } from '../helpers/Error'
import useForm from '../../hooks/useForm'
import { USER_POST } from '../../api'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import useFetch from '../../hooks/useFetch'
import Head from '../helpers/Head'

export default function LoginCreate() {
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const { userLogin } = useContext(UserContext)
  const { loading, error, request } = useFetch()

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const { url, options } = USER_POST(
      { username: username.value, email: email.value, password: password.value }
    )
    const { response } = await request(url, options)

    if (response.ok) userLogin(username.value, password.value)
  }
  return (
    <section className='animeLeft'>
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {!loading
          ? <Button>Cadastrar</Button>
          : <Button disabled>Cadastrando...</Button>
        }
        <Error error={error} />
      </form>
    </section>
  )
}