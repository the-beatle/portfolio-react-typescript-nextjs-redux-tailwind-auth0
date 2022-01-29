import React, {Fragment, useState} from "react"
import {useUser} from '@auth0/nextjs-auth0'
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Router from 'next/router'


import Counter from '../features/counter/Counter'
import styles from '../styles/Home.module.css'
import TreeChart from "../components/TreeChart"

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
        <div className={""}>
            <Head>
                <title>Mario - Portfolio</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header>
                <div className="flex flex-col items-center gap-3 mx-5 py-10">
                    <h3 className="text-5xl font-custom1 text-red-600">
                        Hello world,
                    </h3>
                    <h3 className="text-5xl font-custom1 text-green-600">
                        My Name is Mario
                    </h3>
                    <h3 className="text-4xl font-custom1 text-yellow-300">
                        I'm a Senior Web developer!
                    </h3>
                    <h3 className="text-2xl font-custom2 text-green-100 mt-5">
                        I make full stack web integrations with next generation technologies!
                    </h3>
                    <div className={"w-screen font-custom1 px-10 sm:px-40 mt-10 text-xs"}>
                        <TreeChart data={{name: "Mario", children: data}}/>
                    </div>
                    <div className={"w-screen font-custom1 px-10 sm:px-40 mt-10 text-xs"}>
                        {data.map((item: any) => <TreeChart data={item}/>)}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Page;

interface TreeBranch {
    readonly id: string
    readonly name: string
    children?: Tree
    readonly selected?: boolean
}

type Tree = ReadonlyArray<TreeBranch>


interface TreeItemProps {
    readonly id: string
    readonly onSelectCallback: (e: React.MouseEvent<HTMLInputElement>) => void
    readonly name: string
    readonly isSelected: boolean | undefined
    readonly children: ReadonlyArray<JSX.Element>
}

interface RecursiveTreeProps {
    readonly listMeta: Tree
    readonly onSelectCallback: (value: TreeBranch) => void
}
