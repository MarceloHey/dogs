import { useState } from "react"
import useFetch from '../../hooks/useFetch'
import { COMMENT_POST } from "../../api"
import { ReactComponent as Enviar } from '../../assets/enviar.svg'
import { Error } from '../helpers/Error'
import styles from '../../styles/photo/PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = useState('')
  const { request, error } = useFetch()

  async function handleSubmit(ev) {
    ev.preventDefault()
    const token = window.localStorage.getItem('token')
    const { url, options } = COMMENT_POST(id, { comment }, token)
    const { response, json } = await request(url, options)
    if (response.ok) {
      setComment('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${single ? styles.single : ''} ${styles.form}`} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form >
  )
}

export default PhotoCommentsForm