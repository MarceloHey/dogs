import styles from '../styles/Footer.module.css'
import { ReactComponent as Dogs } from '../assets/dogs-footer.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados</p>
    </footer>
  )
}