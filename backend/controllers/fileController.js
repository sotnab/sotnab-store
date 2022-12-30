const path = require('path')
const fs = require('fs').promises
const File = require('../models/File')

const getFiles = async (req, res) => {
    try {
        const files = await File.find({ user_id: req.user._id }).sort({ createdAt: -1 })

        res.status(200).json({ files })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const uploadFile = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({ error: 'No files provided' })
    }

    const filesData = req.files.map((file) => ({
        name: file.originalname,
        path: path.join('/uploads', file.filename),
        user_id: req.user._id
    }))

    try {
        const file = await File.create(filesData)

        res.status(200).json({ file })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteFile = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ error: 'Id not provided' })
    }

    try {
        const file = await File.findOne({ _id, user_id: req.user._id })
        
        if(!file) {
            throw Error('File does not exist')
        }

        await fs.unlink(path.join(process.cwd(), 'public', file.path))

        await file.delete()

        res.status(200).json({ file })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getFiles, uploadFile, deleteFile }