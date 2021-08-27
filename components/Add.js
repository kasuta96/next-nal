import { useState } from "react"
import { mutate } from 'swr'

export default function Add() {
  const [name, setName] = useState('')
  const [trans, setTrans] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.BE_API}/word`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name":name,
          "translation":trans,
        }),
      })
      const json = await res.json()
      if (!res.ok) console.log('Error:', res)
      console.log('Status:', json.status);
      mutate(`${process.env.BE_API}/words`)
      setName('')
      setTrans('')
    } catch (e) {
      console.log(e.message)
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        Name:
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Translation:
        <input type="text" name="trans" value={trans} onChange={(e) => setTrans(e.target.value)} />
      </div>
      <button disabled={submitting} type="submit">
        {submitting ? 'Creating' : 'Create   '}
      </button>
    </form>
  )
}