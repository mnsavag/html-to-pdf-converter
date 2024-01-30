import { resolve } from 'path'


const getDefaultPath = async (path) => {
    const fileSystemPath = resolve('')
    if (fileSystemPath === path.slice(0, fileSystemPath.length)) {
        return path.slice(fileSystemPath.length + 1 + 'public'.length + 1)
    }//убрать public.length
    return path
}

export default getDefaultPath