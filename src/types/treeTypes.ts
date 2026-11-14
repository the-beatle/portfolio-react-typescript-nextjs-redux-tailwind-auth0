interface Data {
    data: TreeBranch;

}

export default Data;

export interface TreeBranch {
    readonly id: string | number
    readonly name: string
    children?: Tree
}

export type Tree = ReadonlyArray<TreeBranch>

interface TreeItemProps {
    readonly id: string | number
    readonly name: string
    readonly children: ReadonlyArray<JSX.Element>
}

interface RecursiveTreeProps {
    readonly listMeta: Tree
    readonly onSelectCallback: (value: TreeBranch) => void
}