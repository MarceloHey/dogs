import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import { UserContext } from '../UserContext'
import { ReactComponent as Logo } from '../assets/dogs.svg'
import { useContext } from 'react'


export default function Header() {
  const { data } = useContext(UserContext)
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Logo />
        </Link>
        {data
          ? <Link className={styles.login} to="/conta">{data.nome}</Link>
          : <Link className={styles.login} to="/login">Login / Criar</Link>
        }
      </nav>
    </header>
  )
}