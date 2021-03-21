exports.error500 = (err, res) => {
    console.log(err);
    res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        error: err,
    })
}

exports.error404 = (msg, res) => {
    res.status(404).json({
        code: 404,
        message: msg,
    })
}