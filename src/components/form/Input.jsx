import styles from '../../styles/form/Input.module.css'

export default function Input({ label, type, name, value, validate, onBlur, error, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={(ev) => onChange(ev)} id={name}
        type={type}
        className={styles.input}
        onBlur={onBlur}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}