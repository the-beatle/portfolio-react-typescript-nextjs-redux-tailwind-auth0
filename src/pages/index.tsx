import React, {Fragment, useState} from "react"
import {useUser} from '@auth0/nextjs-auth0'
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Router from 'next/router'


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
    console.log(data[0].children)

    return (
        <div className={styles.container}>
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                <div className={"bg-gray-800 w-full"}>
                    <div className="flex flex-col items-center h-screen gap-3 mx-5 mt-10">
                        <h3 className="text-5xl font-custom1 text-red-600">
                            Hello world,
                        </h3>
                        <h3 className="text-5xl font-custom1 text-green-600">
                            My Name is Mario
                        </h3>
                        <h3 className="text-3xl font-custom1 text-yellow-300">
                            I'm a Senior Web developer!
                        </h3>
                        <h3 className="text-2xl font-custom2 text-green-100">
                            I make full stack web integrations with next generation technologies!
                        </h3>
                        <div className={"my-2"}>
                            <RecursiveTree listMeta={data} onSelectCallback={() => null}/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Page;

const TreeItem = ({
                      onSelectCallback,
                      name,
                      isSelected,
                      children,
                  }: TreeItemProps) => {
    const [isOpen, toggleItemOpen] = useState<boolean | null>(true)
    const [selected, setSelected] = useState(isSelected)


    return (
        <div>
            <div className={"flex"}>
                {children.length > 0 && (
                    <div
                        className="icon-container"
                        onClick={() => toggleItemOpen(!isOpen)}
                    >
                        {isOpen ? <div className={"mx-2 text-red-400"}>close</div> :
                            <div className={"mx-2 text-green-400"}>open</div>}
                    </div>
                )}
                <div
                    className="name"
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                        setSelected(!selected)
                        onSelectCallback(e)
                    }}
                    style={{
                        marginLeft: `${children.length === 0 ? "24px" : ""}`,
                        background: `${selected ? "#d5d5d5" : ""}`,
                    }}
                >
                    {name}
                </div>

            </div>
            <div className={"pl-10"}>{isOpen && children}</div>
        </div>
    )
}

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

const RecursiveTree = ({listMeta, onSelectCallback}: RecursiveTreeProps) => {
    const createTree = (branch: TreeBranch) =>
        branch.children && (
            <TreeItem
                id={branch.id}
                key={branch.id}
                onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
                    onSelectCallback(branch)
                }}
                isSelected={branch.selected}
                name={branch.name}
            >
                {branch.children.map((branch: TreeBranch) => {
                    return <Fragment key={branch.id}>{createTree(branch)}</Fragment>
                })}
            </TreeItem>
        )

    return (
        <div className={"text-white"}>
            {listMeta.map((branch: TreeBranch, i: any) => (
                <div key={i}>{createTree(branch)}</div>
            ))}
        </div>
    )
}