const express = require('express')

const server = express()
server.use(express.json())

let numberRequests = 0
const projects = []

const checkProjectExist = (req,res,next) =>{
    const { id } = req.params
    const project = projects.find(p => p.id == id)
    !project ? 
        res.status(400).json({ error: 'Project not found' }) : 
        next()
}

const logReuests = (req,res,next) =>{
    numberRequests++;
    console.log(`Número de requisições: ${numberRequests}`);
    return next();
}

server.use(logReuests)

server.post('/projects',(req,res)=>{
    const { id , title } = req.body
    projects.push({
        id: id,
        title: title,
        tasks: []
    })
    return res.json(projects)
})

server.get('/projects',(req,res)=>{
    return res.json(projects)
})

server.put('/projects/:id',checkProjectExist,(req,res)=>{
    const { id } = req.params
    const project = projects.find(p => p.id == id)
    project.title = req.body.title
    return res.json(project)
})

server.delete('/projects/:id',checkProjectExist,(req,res)=>{
    const { id } = req.params
    index = projects.findIndex(p => p.id == id)
    projects.splice(index,1)
    return res.json(projects)
})

server.post('/projects/:id/tasks',checkProjectExist,(req,res)=>{
    const { id } = req.params
    project = projects.find(p => p.id == id)
    project.tasks.push(req.body.title)
    return res.json(project)
})

server.listen(3000)