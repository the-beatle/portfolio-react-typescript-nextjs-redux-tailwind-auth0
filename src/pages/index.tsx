import React, {Fragment, useEffect, useState} from "react"
import {useUser} from '@auth0/nextjs-auth0'
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Router from 'next/router'

import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import TreeChart from "../components/TreeChart"
import ContactForm from "../components/ContactForm"
import Data from "../types/treeTypes"

import {useDispatch, useSelector} from "react-redux"
import {getCatsFetch} from "../slices/catState"


export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`${process.env.BACKEND_URL}/category`)
    const data = await res.json()
    // Pass data to the page via props
    return {props: {data}}
}


function Page({data}: Data) {
    const {user, error, isLoading} = useUser();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCatsFetch())
    })

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