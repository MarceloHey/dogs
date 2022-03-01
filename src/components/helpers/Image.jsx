import { useState } from 'react'
import styles from '../../styles/Image.module.css'
const Image = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = useState(true)

  function handleLoad({ target }) {
    setSkeleton(false)
    target.style.opacity = 1
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      {<img className={styles.img} {...props} alt={alt} onLoad={handleLoad} />}

    </div>
  )
}

export default Image