import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { PHOTO_GET } from "../../api"
import { Error } from "../helpers/Error"
import Loading from "../helpers/Loading"
import PhotoContent from "./PhotoContent"
import useFetch from "../../hooks/useFetch"
import Head from "../helpers/Head"

const Photo = () => {
  const { id } = useParams()
  const { data, loading, error, request } = useFetch()

  useEffect(() => {
    const { url, options } = PHOTO_GET(id)
    request(url, options)
  }, [id, request])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data) {
    return (
      <section className='container mainContainer'>
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    )
  }
  return null
}

export default Photo