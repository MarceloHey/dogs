import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import styles from '../../styles/feed/FeedModal.module.css'
import { PHOTO_GET } from '../../api'
import { Error } from '../helpers/Error'
import Loading from '../helpers/Loading'
import PhotoContent from '../photo/PhotoContent'

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch()

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id)
    const { json } = request(url, options)

  }, [photo, request])

  function handleOutsideClick(ev) {
    if (ev.target === ev.currentTarget) {
      setModalPhoto(null)
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  )
}

export default FeedModal