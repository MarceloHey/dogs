import Feed from "./feed/Feed"
import Head from "./helpers/Head"
export default function Home() {
  return (
    <section className="container mainContainer">
      <Head title='Fotos' />
      <Feed />
    </section>
  )
}