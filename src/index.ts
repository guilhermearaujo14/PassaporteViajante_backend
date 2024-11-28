import express from "express";
import routes from "./routes";
import cors from 'cors'


const app  = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000


app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Servidor funcionando na porta ${port}`)
})