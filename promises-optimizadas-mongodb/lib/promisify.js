function promisify(fn) {
    return new Promise((resolve, reject) => {
        fn((err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = promisify