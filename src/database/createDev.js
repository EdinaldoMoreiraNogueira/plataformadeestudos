module.exports = async function(db, {devValue, classValue, classSheduleValues}){

const insertedDev = await db.run(`
  INSERT INTO devs (
  name,
  avatar,
  whatsapp,
  bio

  ) VALUES (
    "${devValue.name}",
    "${devValue.avatar}",
    "${devValue.whatsapp}",
    "${devValue.bio}"

  );
`) 

const dev_id = insertedDev.lastID

const insertedClass = await db.run(`
INSERT INTO classes (
subject,
cost,
dev_id

) VALUES (
  "${classValue.subject}",
  "${classValue.cost}",
  "${dev_id}"
 
);
`)

const class_id = insertedClass.lastID

const insertedAllClassSheduleValue = classSheduleValues.map(
  (classSheduleValue) => {
 return db.run(`
 INSERT INTO class_shedule (
   class_id,
   weekday,
   time_from,
   time_to

 ) VALUES (
   "${class_id}",
   "${classSheduleValue.weekday}",
   "${classSheduleValue.time_from}",
   "${classSheduleValue.time_to}"
 );
 `)
})

 await Promise.all(insertedAllClassSheduleValue)
}