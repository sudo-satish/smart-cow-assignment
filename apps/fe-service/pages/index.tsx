import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProjectForm from '../components/ProjectForm'
import Projects from '../components/Projects'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Cow</title>
        <meta name="description" content="Smart Cow Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Projects />
      </main>
    </div>
  )
}

export default Home
