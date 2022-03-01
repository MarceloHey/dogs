import Input from "../form/Input"
import Button from "../form/Button"
import { Error } from "../helpers/Error"
import useForm from "../../hooks/useForm"
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link } from "react-router-dom"
import styles from '../../styles/form/LoginForm.module.css'
import btnStyles from '../../styles/form/Button.module.css'
import Head from "../helpers/Head"

export default function LoginForm() {
  const username = useForm()
  const password = useForm()

  const { userLogin, data, error, loading } = useContext(UserContext)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name="username" type="text" label="Usuario" {...username} />
        <Input name="password" type="password" label="Senha" {...password} />
        {loading
          ? <Button disabled>Carregando...</Button>
          : <Button >Entrar</Button>
        }
        {error && <Error error={error && 'Dados incorretos'} />}
      </form>
      <Link className={styles.perdeu} to='/login/perdeu'>Perdeu a senha ?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={btnStyles.button} to='/login/criar'>Cadastro</Link>
      </div>
    </section>
  )
}