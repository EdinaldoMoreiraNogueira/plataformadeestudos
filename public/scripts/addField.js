//procurar o botão
document.querySelector("#add-time")
//quando clicar no botão
.addEventListener("click", cloneField)

//executar uma ação
function cloneField() {
  //duplicar os campos. que campos?
  const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true);

  //pegar os campos. quais?
  const fields =  newFieldContainer.querySelectorAll('input');

  fields.forEach(function(field){
    field.value=""

  })
   
  
  //para cada campo limpar

    //pegar o fild do momento e limpa ele
    
 
  //colocar na página. Onde colocar?
   document.querySelector("#schedule-itens").appendChild(newFieldContainer)

}