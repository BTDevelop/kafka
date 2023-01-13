exports.Welcome = async (req, res) => {
    const email = req.body.email

    if(email){
        res.send('Welcome to Babil.com')
    }
}