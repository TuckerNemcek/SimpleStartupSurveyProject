
document.addEventListener('DOMContentLoaded', ()=>{
  let questionArray
  getgeneralQuestions()
  let appendHere = document.getElementById('appendHere')

  function getgeneralQuestions(){
    axios.get('https://simple-startup-survey-backend.herokuapp.com/questions/balanceSheet')
    .then(function (response) {
      let questions = response.data
      questionArray = response.data
      console.log("This your GET request " , questionArray)
        for (let i = 0; i < questions.length; i++){
          // console.log('questions at i is ',questions[i])
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
            let span = document.createElement('span')
            span.innerHTML = "$"
            questInputInner.class='form-control'
            questInputInner.id=questions[i].id
            p.innerText = `${i + 17}. ` + questions[i].questionContents
            span.appendChild(questInputInner)
            appendHere.appendChild(p)
            appendHere.appendChild(questInput)
            questInput.appendChild(span)
        //  }
       }
       console.log('this is questionArray ', questionArray)
       storedData = JSON.parse(localStorage.getItem('storedData'))
       storedData2 = []
       console.log('question array is ',questionArray)
       console.log('your storedData is ', storedData)
       let submitButton = document.getElementById('submitButton')
       submitButton.addEventListener("click", () => {
         for (let i = 17; i <= 24; i++) {
           storedData2.push({ questionID: i ,
              answer: document.getElementById(`${i}`).value,
               email_address: storedData[3].answer})
           // console.log(document.getElementById(`${i}`))
         }
         for (let i = 0; i < storedData2.length; i++) {
           if (storedData2[i].answer.includes(',')) {
            storedData2[i].answer = storedData2[i].answer.replace(/,/gi, '')
           }
           if (storedData2[i].answer === "") {
             storedData2 = []
             return alert(`it appears you forgot to answer question number ${i + 17}. All questions must be complete in order to give you the best analysis`)
           }
           else if (isNaN(storedData2[i].answer)) {
             storedData2 = []
             return alert(`it appears you did not enter a valid number for question ${i + 17}`)
           }
         }
         storedData = storedData.concat(storedData2)
         axios.post('https://simple-startup-survey-backend.herokuapp.com/client_answers',storedData, {crossDomain:true})
         .then(function(response){
           console.log(response.data , ' save success')
           localStorage.setItem("storedData", JSON.stringify(storedData))
           window.location.href = "../AnalysisPage/analysis.html";
         }).catch(err => console.log(err))
       })
    //    submitButton.onclick = function(){
    //      for (let i = 17; i <= 24; i++) {
    //        storedData2.push({ questionID: i , answer: document.getElementById(`${i}`).value, clientID: storedData[3]})
    //        // console.log(document.getElementById(`${i}`))
    //      }
    //      for (let i = 0; i < storedData2.length; i++) {
    //        if (storedData2[i].answer === "") {
    //          storedData2 = []
    //          return alert(`it appears you forgot to answer question number ${i + 1}. All questions must be complete in order to give you the best analysis`)
    //        }
    //      }
    //      axios('https://simple-startup-survey-backend.herokuapp.com/client_answers',storedData, {crossDomain:true})
    //      .then(function(response){
    //        console.log(response.data , ' save success')
    //        storedData = storedData.concat(storedData2)
    //        localStorage.setItem("storedData", JSON.stringify(storedData))
    //        window.location.href = "../AnalysisPage/analysis.html";
    //      }).catch(err => console.log(err))
    // }
  })
    .catch(function (error) {
      console.log(error)
    })
  }
})
