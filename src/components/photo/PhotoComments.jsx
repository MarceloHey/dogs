import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from '../../UserContext'
import PhotosCommentsForm from '../photo/PhotoCommentsForm'
import styles from '../../styles/photo/PhotoComments.module.css'

const PhotoComments = (props) => {
  const { login } = useContext(UserContext)
  const [comments, setComments] = useState(() => props.comments || [])
  const commentSection = useRef(null)

  useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight
  }, [comments])

  return (
    <>
      <ul ref={commentSection} className={`${props.single ? styles.single : ''} ${styles.comments}`}>
        {comments.map(comment => {
          return <li key={comment.comment_ID} >
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        })}
      </ul>
      {login && <PhotosCommentsForm single={props.single} id={props.id} setComments={setComments} />}
    </>
  )
}

export default PhotoComments