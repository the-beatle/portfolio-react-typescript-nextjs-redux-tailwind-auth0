import React from "react"
import type {GetStaticProps} from 'next'
import Head from 'next/head'

import Header from "../components/Header"
import TreeChart from "../components/TreeChart"
import ContactForm from "../components/ContactForm"
import Data, {Tree} from "../types/treeTypes"
import categories from "../data/categories.json"

export const getStaticProps: GetStaticProps = async () => {
    const data: Tree = categories
    return {props: {data}}
}

function Page({data}: Data) {
    return (
        <div className={""}>
            <Head>
                <title>Mario - Portfolio</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="flex flex-col items-center gap-3 mx-5 py-10">
                <Header/>
                <div className={"w-screen font-custom1 px-10 sm:px-40 mt-10 text-xs"}>
                    <TreeChart data={{name: "Me", children: data}}/>
                    <ContactForm/>
                </div>
            </div>
        </div>
    )
}

export default Page;
