const User = require('../models/userModel')
const { NotFoundError } = require('../errors/not-found-error')

exports.deleteOne = async(req, res, next) => {
    
    await User.findByIdAndDelete(req.params.id)
        .then((deletedUser) => {
            res.status(200).json({"Successfully deleted the user": deletedUser.email})
        })
        .catch((err) => {
           next(new NotFoundError('Error', err.constructor.name + ":" + err.message))
        })
}