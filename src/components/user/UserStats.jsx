import Head from "../helpers/Head";
import useFetch from '../../hooks/useFetch'
import { lazy, Suspense, useEffect } from "react";
import { STATS_GET } from '../../api'
import Loading from '../helpers/Loading'
import { Error } from '../helpers/Error'
const UserStatsGraphs = lazy(() => import('./UserStatsGraphs'))

function UserStats() {
  const { data, error, loading, request } = useFetch()
  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET()
      await request(url, options)
    }

    getData()
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data)
    return (
      <div>
        <Head title="Estatisticas" />
        <Suspense fallback={<div></div>}>
          <UserStatsGraphs data={data} />
        </Suspense>
      </div>
    );
  else return null
}

export default UserStats;