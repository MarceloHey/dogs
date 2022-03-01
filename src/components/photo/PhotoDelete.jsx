import useFetch from "../../hooks/useFetch"
import styles from '../../styles/photo/PhotoDelete.module.css'
import { PHOTO_DELETE } from "../../api"

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch()

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar ?')
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id)
      const { response } = await request(url, options)
      if (response.ok) window.location.reload()
    }
  }

  return (
    <div>
      {loading
        ? <button className={styles.delete} disabled> Deletar </button>
        : <button onClick={handleClick} className={styles.delete}> Deletar </button>
      }
    </div>
  )
}

export default PhotoDelete