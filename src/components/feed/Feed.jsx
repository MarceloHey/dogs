import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = useState(null)
  const [pages, setPages] = useState([1, 2, 3])
  const [infinite, setInfinite] = useState(true)

  useEffect(() => {
    let wait = false
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY
        const height = window.document.body.offsetHeight - window.innerHeight;
        if (scroll > height * .75 && wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true
          setTimeout(() => {
            wait = false
          }, 5000)
        }
      }
    }
    window.addEventListener('wheel', infiniteScroll)
    window.addEventListener('scroll', infiniteScroll)
    return () => {
      window.removeEventListener('wheel', infiniteScroll)
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [infinite])
  return (
    <div>
      {modalPhoto && <FeedModal setModalPhoto={setModalPhoto} photo={modalPhoto} />}
      {pages.map(page => <FeedPhotos setInfinite={setInfinite} key={page} page={page} user={user} setModalPhoto={setModalPhoto} />)}
    </div>
  );
}

Feed.defaultProps = {
  user: 0,
}

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
}

export default Feed;