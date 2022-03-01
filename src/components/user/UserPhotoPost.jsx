import styles from '../../styles/user/UserPhotoPost.module.css'
import Input from '../form/Input'
import Button from '../form/Button'
import { Error } from '../helpers/Error'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { PHOTO_POST } from '../../api'
import { useNavigate } from 'react-router-dom'
import Head from '../helpers/Head'

function UserPhotoPost() {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = useState({})
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  function handleSubmit(ev) {
    ev.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem('token')
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options)
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    })
  }

  return (
    <section className={`${styles.photoPost} anime-left`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type='text' name='nome' {...nome} />
        <Input label="Peso" type='text' name='peso' {...peso} />
        <Input label="Idade" type='text' name='idade' {...idade} />
        <input className={styles.file} type="file" name='img' id='img' onChange={handleImgChange} />
        {loading ? <Button disabled>Enviando...</Button> : <Button >Enviar</Button>}
        <Error error={error} />
      </form>
      {
        img.preview &&
        <div className={styles.preview} style={{ backgroundImage: `url(${img.preview})` }} />
      }

    </section>
  );
}

export default UserPhotoPost;