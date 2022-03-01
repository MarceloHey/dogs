import styles from '../../styles/feed/FeedPhotosItem.module.css'
import Image from '../helpers/Image'

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo)
  }
  return (
    <li onClick={handleClick} className={`${styles.photo}`}>
      <Image src={photo.src} alt={photo.title} />
      <span>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotosItem