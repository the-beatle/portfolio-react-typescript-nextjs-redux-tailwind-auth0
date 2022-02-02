import React, {Fragment, useState} from "react"
import {useUser} from '@auth0/nextjs-auth0'
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Router from 'next/router'

import Counter from '../features/counter/Counter'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import TreeChart from "../components/TreeChart"
import ContactForm from "../components/ContactForm"


interface Data {
    data: TreeBranch;

}

interface TreeBranch {
    readonly id: string
    readonly name: string
    children?: Tree
}

type Tree = ReadonlyArray<TreeBranch>

interface TreeItemProps {
    readonly id: string
    readonly name: string
    readonly children: ReadonlyArray<JSX.Element>
}

interface RecursiveTreeProps {
    readonly listMeta: Tree
    readonly onSelectCallback: (value: TreeBranch) => void
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`${process.env.BACKEND_URL}/category`)
    const data = await res.json()
    // Pass data to the page via props
    return {props: {data}}
}


function Page({data}: Data) {
    const {user, error, isLoading} = useUser();

    return (
        <div className={""}>
            <Head>
                <title>Mario - Portfolio</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body>
            <div className="flex flex-col items-center gap-3 mx-5 py-10">
                <Header/>
                <div className={"w-screen font-custom1 px-10 sm:px-40 mt-10 text-xs"}>
                    <TreeChart data={{name: "Me", children: data}}/>
                    <ContactForm/>
                </div>
            </div>
            </body>
        </div>
    )
}

export default Page;