import styles from '../../styles/form/Button.module.css'

export default function Button({ children, ...props }) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  )
}