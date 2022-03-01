import { useEffect } from "react"
import FeedPhotosItem from "./FeedPhotosItem"
import { PHOTOS_GET } from "../../api"
import useFetch from "../../hooks/useFetch"
import { Error } from '../helpers/Error'
import Loading from '../helpers/Loading'
import styles from '../../styles/feed/FeedPhotos.module.css'

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, error, loading, request } = useFetch()
  const total = 6

  useEffect(() => {
    async function getPhotos() {
      const { url, options } = PHOTOS_GET({ page, total, user })
      const { response, json } = await request(url, options)
      if (response && response.ok && json.length < total) {
        setInfinite(false)
      }
    }
    getPhotos()
  }, [request, user, page])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data) {
    return (
      <ul className={`animeLeft ${styles.feed}`}>
        {data.map(item => <FeedPhotosItem key={item.id} photo={item} setModalPhoto={setModalPhoto} />)}
      </ul>
    )
  }
  else return null
}

export default FeedPhotos