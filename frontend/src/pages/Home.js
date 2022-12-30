import { useEffect, useState } from 'react'
import { FaPlus, FaRegSadTear } from 'react-icons/fa'

import useFilesContext from '../hooks/useFilesContext'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'
import useFileUpload from '../hooks/useFileUpload'

import File from '../components/File'
import FileSkeleton from '../components/FileSkeleton'

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [reload, setReload] = useState(0)
    const [loading, setLoading] = useState(false)

    const { upload, isLoading, error } = useFileUpload()
    const { files, dispatch } = useFilesContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true)
            const response = await fetch('/api/file', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (response.status === 401) {
                logout()
            }

            const json = await response.json()

            dispatch({ type: 'SET_FILES', payload: json.files })
            setLoading(false)
        }

        fetchFiles()
    }, [user, reload])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            return
        }

        await upload(selectedFile)

        e.target.reset()
        setSelectedFile(null)

        reloadFiles()
    }

    const reloadFiles = () => {
        setReload((value) => value + 1)
    }

    return (
        <div className="home">
            <div className="files">
                {(files && !loading) && files.map((item) => (
                    <File file={item} reloadFiles={reloadFiles} key={item._id} />
                ))}
                
                {loading && Array(7).fill().map((item, index) => (
                    <FileSkeleton key={index} />
                ))}

                {(!files?.length && !loading) && (
                    <p className="files__info">
                        <FaRegSadTear />
                        No files to show
                    </p>
                )}
            </div>

            <form className="home__form form" onSubmit={handleSubmit}>
                <h2 className="form__title">Add file</h2>

                <div className="form__row">
                    <p htmlFor="file" className="form__file-name">
                        File: {selectedFile ? selectedFile.name : 'No files selected'}
                    </p>

                    <label htmlFor="file" className="form__file-add">
                        <FaPlus className="form__icon" />
                    </label>
                </div>

                <input
                    type="file"
                    id="file"
                    className="form__file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />

                {error && (
                    <div className="form__error">{error}</div>
                )}

                <button className="form__btn" disabled={isLoading}>Add</button>
            </form>
        </div>
    )
}

export default Home