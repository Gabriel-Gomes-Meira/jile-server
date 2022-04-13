const express = require("express")
const cors = require("cors")
const SystemFiles = require("./SystemFiles")



server = express();
server.use(express.json())

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    server.use(cors());
    next();
})

server.get("/",(req, res) => {
    var path = req.query.path
    if(path){
        var listagem = new SystemFiles().listarArquivos(path)
        // listagem.teste = "algo"
        res.json(listagem)
    } else {
        res.json({handshake:true})        
    }
})

server.get('/disks/', (req, res) => {    
    res.json(new SystemFiles().getDiskInfo())
})

server.get("/files/", (req, res) =>{
    var path = req.query.path
    res.download(path)
})

server.post("/save/", (req,res) => {
    new SystemFiles().saveFile(req.body.address+req.body.filename, req.body.content)
    res.json("Successfuly saved file!")
    
})
server.listen(3000)









