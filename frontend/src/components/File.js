import { FaImage, FaFile, FaFilm, FaFileCode, FaFileAlt, FaDownload, FaTrashAlt } from 'react-icons/fa'
import useAuthContext from '../hooks/useAuthContext'

const icon = (extension) => {
    switch (extension) {
        case 'jpg':
        case 'png':
        case 'svg':
        case 'gif':
            return FaImage
        case 'mp4':
            return FaFilm
        case 'js':
        case 'css':
        case 'html':
        case 'ts':
        case 'cpp':
        case 'php':
        case 'py':
            return FaFileCode
        case 'txt':
            return FaFileAlt
        default:
            return FaFile
    }
}

const File = ({ file, reloadFiles }) => {

    const { user } = useAuthContext()

    const splittedName = file.name.split('.')
    const extension = splittedName.slice(-1)[0]

    const Icon = icon(extension)

    const handleDownload = async () => {
        const response = await fetch(file.path)
        const blob = await response.blob()

        const url = window.URL.createObjectURL(new Blob([blob]))

        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', file.name)

        document.body.append(link)

        link.click()
        link.remove()
    }

    const handleDelete = async () => {
        await fetch('/api/file', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ _id: file._id })
        })

        reloadFiles()
    }

    return (
        <div className="file">
            <a
                className="file__display"
                href={'http://localhost:4000/' + file.path}
                target="_blank"
                rel="noreferrer"
            >
                <Icon className="file__icon" />
            </a>

            <p className="file__name" title={file.name}>{file.name}</p>

            <button className="file__button" onClick={handleDownload}>
                <FaDownload className="file__button-icon" />
            </button>

            <button className="file__button file__button--delete" onClick={handleDelete}>
                <FaTrashAlt className="file__button-icon" />
            </button>
        </div>
    )
}

export default File