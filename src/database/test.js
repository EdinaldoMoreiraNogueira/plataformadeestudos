const Database = require('./db')
const createDev = require('./createDev')

Database.then(async(db)=>{

  devValue = {
  name: "Edinaldo Nogueira", 
  avatar: "https://avatars1.githubusercontent.com/u/65551161?s=460&u=d1a41321172b9234a575b3cdd1afd71e138fef62&v=4", 
  whatsapp: "24998500233", 
  bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
  
  }

  classValue = {
  subject: 1, 
  cost:"R$ 20,00", 
  
  }

  classSheduleValues = [
    {
      weekday: 1, 
      time_from: 720, 
      time_to: 1220
    },

    {
      weekday: 0, 
      time_from: 520, 
      time_to: 1220
    },
  ]

 //await createDev(db, { devValue, classValue, classSheduleValues})
 const selectedDevs =  await db.all("SELECT * FROM devs")
  //console.log(selectedDevs)

  const selectedClassesAndDevs = await db.all(`
    SELECT classes.*, devs.*
    FROM devs
    JOIN classes ON (classes.dev_id = devs.id)
    WHERE classes.dev_id = 1;

    
  `)
 // console.log(selectedClassesAndDevs)

  const selectedClassesShedules = await db.all(`
   SELECT class_shedule.*
   FROM class_shedule
   WHERE class_shedule.class_id = "1"
   AND class_shedule.weekday = "0"
   AND class_shedule.time_from  <= "520"
   AND class_shedule.time_to > "520"

  `)
  console.log(selectedClassesShedules)
})