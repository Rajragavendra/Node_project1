    const express = require('express')
    const router = require('../backend/Routers/routerindex')
    require('dotenv').config();
    const cors = require('cors')

    const app = express()
    app.use(cors())
    app.use(express.json())

    const port = process.env.APP_PORT

    app.get('/get', (req, res) => {
        res.send('Success')
    })

    app.use(router);

    app.listen(port, () => {
        console.log('Server is running..', port)
    })