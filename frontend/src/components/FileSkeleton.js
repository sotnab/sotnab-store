const FileSkeleton = () => {
    return (
        <div className="file-skeleton">
            <div className="file-skeleton__display">
                <div className="file-skeleton__icon skeleton"></div>
            </div>

            <p className="file-skeleton__name skeleton"></p>

            <div className="file-skeleton__download skeleton"></div>

            <div className="file-skeleton__delete skeleton"></div>
        </div>
    )
}

export default FileSkeleton