const app = require("./app")
const initAdminUser = require('./initAdminUser')

initAdminUser()

app.listen(4000, ()=>{
    console.log("server arriba")
})