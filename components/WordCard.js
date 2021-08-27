import { useState } from 'react'
import { mutate } from 'swr'


export default function WordCard({ id, name, trans }) {
  const [deleting, setDeleting] = useState(false)

  async function DeleteWord() {
    setDeleting(true)
    let res = await fetch(`${process.env.BE_API}/word/${id}`, { method: 'DELETE' })
    let json = await res.json()

    if (json.status === "success") {
      mutate(`${process.env.BE_API}/words`)      
    } else {
      console.log('Error:', json)
      setDeleting(false)
    }
  }

  return (
    <div>
      <strong>{name}: </strong>
      <span>{trans} </span>
      <button disabled={deleting} onClick={DeleteWord}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}