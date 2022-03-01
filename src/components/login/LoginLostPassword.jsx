import Input from '../form/Input'
import Button from '../form/Button'
import { Error } from '../helpers/Error'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Head from '../helpers/Head'

export default function LoginLostPassword() {
  const login = useForm()
  const { data, loading, error, request } = useFetch()

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({ login: login.value, url: window.location.href.replace('perdeu', 'resetar') })
      await request(url, options)
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Perdeu a senha ?" />
      <h1 className="title">Perdeu a senha ?</h1>
      {data
        ? <p style={{ color: '#4c1' }}>{data}</p>
        : <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? <Button disabled >Enviando...</Button> : <Button>Enviar E-mail</Button>}
          {error && <Error error={error} />}
        </form>
      }

    </section>
  )
}