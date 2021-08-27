import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Add from '../components/Add'
import Words from '../components/Words'

const Home: NextPage = () => {
  return (
    <Layout>
      <Add />
      <br />
      <Words />
    </Layout>
  )
}

export default Home
