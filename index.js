const express = require('express')
const app = express()
const port = 3000

app.get('/TrangChu', (req, res) => {
    res.send('Con Me May!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})