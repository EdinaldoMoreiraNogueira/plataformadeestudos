const Database = require('./database/db')
const { subjects, weekdays, getSubject, 
  convertHoursToMinutes } = require('./utils/format')




function pageLanding(request, response ){
  return response.render("index.html")
}

async function pageStudy(request, response ){
  const filters = request.query

  if(!filters.subject || !filters.weekday || !filters.time){
    return response.render("study.html", { filters, subjects, weekdays })
  }

  const timeToMinutes = convertHoursToMinutes(filters.time)


const query = `
  SELECT classes.*, devs.*
  FROM devs
 JOIN classes ON (classes.dev_id = devs.id)
 WHERE EXISTS(
   SELECT class_shedule.*
   FROM class_shedule
   WHERE class_shedule.class_id = classes.id
   AND class_shedule.weekday = ${filters.weekday}
   AND class_shedule.time_from  <= ${timeToMinutes}
   AND class_shedule.time_to > ${timeToMinutes}
)
   AND classes.subject = '${filters.subject}'
`
//WHERE classes.dev_id = 1;

try {

  const db = await Database

  const devs = await db.all(query)

  devs.map((dev)=>{
    dev.subject = getSubject(dev.subject)
  })

  return response.render('study.html', {devs, subjects, filters, weekdays})

} catch(error){
  console.log(error)
}

  
}

function pageGiveClasses(request, response ){
  return response.render("give-classes.html", {subjects, weekdays})
}

 async function saveClass(request, response){

  const devsCreate = require('./database/createDev') 

   const devValue = {
    name: request.body.name,
    avatar: request.body.avatar,
    whatsapp: request.body.whatsapp,
    bio: request.body.bio
  }

  const classValue = {
    subject: request.body.subject,
    cost: request.body.cost
  }

  const classSheduleValues = request.body.weekday.map((weekday, index)=>{

   return {
    
    weekday, 
    time_from:convertHoursToMinutes (request.body.time_from[index]), 
    time_to: convertHoursToMinutes (request.body.time_to[index])
   }

  })
    try {

      const db = await Database
      await devsCreate(db, { devValue, classValue, classSheduleValues })

      let queryString = "?subject=" + request.body.subject
      queryString +=  "&weekday=" + request.body.weekday[0]
      queryString +=  "&time=" + request.body.time_from[0]

    return response.redirect("/study" + queryString)
    } catch(error) {
      console.log(error)
    }
 
  }
  


module.exports = {
  pageLanding, pageStudy, pageGiveClasses, saveClass
}