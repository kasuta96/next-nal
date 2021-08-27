import useSWR from 'swr'
import WordCard from './WordCard'

async function fetcher(url) {
  const res = await window.fetch(url)
  return await res.json()
}

export default function Words() {
  const { data, error } = useSWR(`${process.env.BE_API}/words`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (Object.keys(data).length == 0) return <div>empty!</div>
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <WordCard id={item.id} name={item.name} trans={item.translation} />
          <hr />
        </div>
      ))}
    </div>
  )
}