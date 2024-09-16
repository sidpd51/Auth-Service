const express = require('express')
const {PORT } = require('./config/serverConfig')

const app = express()


const prepareAndStartServer = async ()=>{
    app.listen(PORT, ()=>{
        console.log(`App is listen on port no:${PORT}`)
    })
}

prepareAndStartServer()