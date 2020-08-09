const express = require('express')
const server = express()
const nunjucks = require ('nunjucks')
const { pageLanding, pageStudy, pageGiveClasses, saveClass } = require('./pages')



nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

server.use(express.static("public"))
.use(express.urlencoded({extended: true}))

.get("/", pageLanding) 
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClass)

 
 .listen(5500)