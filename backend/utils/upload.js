const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(process.cwd(), 'public', 'uploads'))
    },
    filename: function(req, file, cb) {
        const splittedName = file.originalname.split('.')
        const extension = splittedName.slice(-1)[0]

        cb(null, Date.now() + '.' + extension)
    }
})

module.exports = multer({ storage })