import {useUser} from '@auth0/nextjs-auth0'
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'

import Counter from '../features/counter/Counter'
import styles from '../styles/Home.module.css'

interface Data {
    data: any;
}


export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`${process.env.BACKEND_URL}/category`)
    const data = await res.json()


    // Pass data to the page via props
    return {props: {data}}
    // ...
}


function Page({data}: Data) {
    const {user, error, isLoading} = useUser();
    console.log(data)

    return (
        <div className={styles.container}>
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                <img src="/logo.svg" className={styles.logo} alt="logo"/>
                <Counter/>
                {user && <div>{user.name}</div>}
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>
          <span className={"text-red-600 bg-blue-300 rounded"}>
            if this text is red is because tailwind is working!
          </span>
          <span>Learn </span>
          <a
              className={styles.link}
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
              className={styles.link}
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
              className={styles.link}
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
              className={styles.link}
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
            </header>
        </div>
    )
}

export default Page;