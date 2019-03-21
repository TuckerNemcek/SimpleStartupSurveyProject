let questionArray

document.addEventListener('DOMContentLoaded', ()=>{
  getgeneralQuestions()
  let appendHere = document.getElementById('appendHere')

  function getgeneralQuestions(){
    axios.get('http://localhost:3000/questions/generalQuestions/')
    .then(function (response) {
      let questions = response.data
      questionArray = response.data
      console.log("This your GET request " , questions)
        for (let i = 0; i < questions.length; i++){
        //  if(questions[i].isMultipleChoice){
          //   let p = document.createElement('p')
          //   p.innerText = `${i + 1}. ` + questions[i].questionContents
          //   appendHere.appendChild(p)
          //   for(let k = 0; k < questions[i].mcAnswers.length; k++){
          //     let choice = document.createElement("form")
          //     choice.setAttribute('type','radio')
          //     choice.name = questions[i].mcAnswers[k].mc_answers
          //     appendHere.appendChild(p)
          //     appendHere.appendChild(choice)
          //   }
          // }
  //       else{
            let p = document.createElement('p')
            my_form=document.createElement('FORM');
            questInput =document.createElement('form')
            questInput.class='form-inline'

            questInputInner= document.createElement('input')
            questInputInner.class='form-control'
            questInputInner.id=questions[i].id
            p.innerText = `${i + 1}. ` + questions[i].questionContents
            appendHere.appendChild(p)
            appendHere.appendChild(questInput)
            questInput.appendChild(questInputInner)
      //    }
       }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
})

storedData = []
console.log('your question array is ',questionArray)
console.log('your stored data is', storedData)

//// POST ROUTE
let submitButton = document.getElementById('submitButton')
submitButton.onclick = function(){
  for (let i = 1; i <= questionArray.length; i++) {
    storedData.push({ questionID: i , answer: document.getElementById(`${i}`).value})
  }
  axios.post('http://localhost:3000/client_answers/',storedData)
  .then(function(response){
    console.log(response.data , ' save success')
  })
  localStorage.setItem("storedData", JSON.stringify(storedData))
  window.location.href = "../IncomeStatement/incomeStatement.html";

}

////////////////////
// <!-- Default unchecked -->
// <div class="custom-control custom-radio">
//   <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios">
//   <label class="custom-control-label" for="defaultUnchecked">Default unchecked</label>
// </div>
//
// <!-- Default checked -->
// <div class="custom-control custom-radio">
//   <input type="radio" class="custom-control-input" id="defaultChecked" name="defaultExampleRadios" checked>
//   <label class="custom-control-label" for="defaultChecked">Default checked</label>
// </div>



// <form class="form-inline" id="todoInputForm">
//   <div class="form-group">
//     <input type="text" class="form-control" id="todoTitle" placeholder="Todo Title ...">
//   </div>
//   <button type="submit" class="btn btn-primary">Send</button>
// </form><br/>
