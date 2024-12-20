
export type DocsType = {
    id: string
    allcode: Code[]
    credits?: Credits
}
type Credits = {
    name: string
    desc?: string
    github?: string
    twitter?: string
    url?: string
}
type Code = {
    name: string
    code: string
    desc?: string
    lang?: string
}