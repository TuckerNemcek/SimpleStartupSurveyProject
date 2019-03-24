
document.addEventListener('DOMContentLoaded', ()=>{
  let questionArray
  getgeneralQuestions()
  let appendHere = document.getElementById('appendHere')

  function getgeneralQuestions(){
    axios.get('http://localhost:3000/questions/incomeStatement')
    .then(function (response) {
      let questions = response.data
      questionArray = response.data
      console.log("This your GET request " , questionArray)
        for (let i = 0; i < questions.length; i++){
          // if(questions[i].isMultipleChoice){
          //   let f = document.createElement('form')
          //   let p = document.createElement('p')
          //   p.innerText = `${i}. ` + questions[i].questionContents
          //   for(let i = 0; i < questions.mcAnswers.length; i++){
          //     let input[i] = document.createElement('input')
          //     input.value = question[i].mc_answers
          //   }
          //
          //   p.innerText = "this one is multiple choice"
          //   appendHere.appendChild(p)
          // }
        // else{
            let p = document.createElement('p')
            my_form=document.createElement('FORM');
            questInput =document.createElement('form')
            questInput.class='form-inline'

            questInputInner= document.createElement('input')
            questInputInner.class='form-control'
            questInputInner.id=questions[i].id
            p.innerText = `${i + 10}. ` + questions[i].questionContents
            appendHere.appendChild(p)
            appendHere.appendChild(questInput)
            questInput.appendChild(questInputInner)
        //  }
       }
       storedData = JSON.parse(localStorage.getItem('storedData'))
       storedData2 = []
       console.log('question array is ',questionArray)
       console.log('your storedData is ', storedData)
       let submitButton = document.getElementById('submitButton')
       submitButton.onclick = function(){
         for (let i = 10; i <= 16; i++) {

           storedData2.push({
              questionID: i,
              answer: document.getElementById(`${i}`).value})
         }
         // ASK ABOUT REMOVING COMMAS FROM USER INPUT AND NOT USING ALERTS

         // for (let i = 0; i < storedData2.length; i++) {
         //   if (storedData2[i].answer.includes(',')) {
         //    storedData2[i].answer = storedData2[i].answer.replace(/,/gi, '')
         //   }
         // }
         for (let i = 0; i < storedData2.length; i++) {
           if (storedData2[i].answer === "") {
             storedData2 = []
             return alert(`it appears you forgot to answer question number ${i + 10}. All questions must be complete in order to give you the best analysis`)
           }
           else if (isNaN(storedData2[i].answer)) {
             storedData2 = []
             return alert(`it appears you did not enter a valid number for question ${i + 10}`)
           }
         }
         axios.post('http://localhost:3000/client_answers/',storedData)
         .then(function(response){
           console.log(response.data , ' save success')
         })
         storedData = storedData.concat(storedData2)
         console.log('your stored data is ', storedData)
         localStorage.setItem("storedData", JSON.stringify(storedData))
         window.location.href = "../BalanceSheet/balanceSheet.html";
    }
  })
    .catch(function (error) {
      console.log(error)
    })
  }
})
