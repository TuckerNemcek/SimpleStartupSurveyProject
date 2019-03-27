let questionArray
let questions
document.addEventListener('DOMContentLoaded', () => {
  getgeneralQuestions()
  localStorage.clear()
  let appendHere = document.getElementById('appendHere')

  function getgeneralQuestions() {
    axios.get('https://simple-startup-survey-backend.herokuapp.com/questions/generalQuestions')
      .then(function(response) {
        let questions = response.data
        questionArray = response.data
        console.log("This your GET request ", questions)
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].isMultipleChoice) {
            let p = document.createElement('p')
            p.id = questions[i].id
            p.innerText = `${i + 1}. ` + questions[i].questionContents
            let form = document.createElement('form')
            form.appendChild(p)
            appendHere.appendChild(form)


            for (let k = 0; k < questions[i].mcAnswers.length; k++) {
              //console.log('mcAnswers is ', questions[i].mcAnswers[k])
              let div = document.createElement('div')
              div.classList.add('row', )
              let radioInput = document.createElement('input')
              radioInput.classList.add('mc')
              radioInput.setAttribute('type', 'radio')
              radioInput.setAttribute('id', `${questions[i].mcAnswers[k].id}${k+ i}`)
              radioInput.setAttribute('value', `${questions[i].mcAnswers[k].id}`)
              let choice = document.createElement("label")
              choice.setAttribute('for', `${questions[i].mcAnswers[k].id}${k+ i}`)
              radioInput.setAttribute('name', `${questions[i].id + 1000}`)
              choice.innerHTML = questions[i].mcAnswers[k].mc_answers
              div.appendChild(radioInput)
              div.appendChild(choice)
              p.appendChild(div)

            }
          } else {
            let p = document.createElement('p')
            my_form = document.createElement('FORM');
            questInput = document.createElement('form')
            questInput.class = 'form-inline'

            questInputInner = document.createElement('input')
            questInputInner.class = 'form-control'
            questInputInner.id = questions[i].id
            p.innerText = `${i + 1}. ` + questions[i].questionContents
            appendHere.appendChild(p)
            appendHere.appendChild(questInput)
            questInput.appendChild(questInputInner)
          }
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }
})


storedData = []
console.log('your stored data is', storedData)

//// POST ROUTE

let submitButton = document.getElementById('submitButton')
submitButton.onclick = function() {

  for (let i = 1; i <= questionArray.length -2; i++) {
      storedData.push({
        questionID: i,
        answer: document.getElementById(`${i}`).value,
        clientID: document.getElementById(`${3}`).value
      })
    }
      storedData.push({
        questionID: 8,
        answer: document.querySelector('input[name="1008"]:checked').value
      })
      storedData.push({
        questionID: 9,
        answer: document.querySelector('input[name="1009"]:checked').value
      })


    // if (storedData[i].answer.includes(",")) {
    //   storedData[i].answer = storedData[i].answer.replace(/,/g, ' ')
    //   return alert(`it appears you forgot to answer question number ${i + 1}. All questions must be complete in order to give you the best analysis.`)
    // }
    for (let i = 0; i < storedData.length; i++){
      if (storedData[i].answer.includes(',')) {
       storedData[i].answer = storedData[i].answer.replace(/,/gi, '')
      }
      if (storedData[i].answer === "") {
        storedData = []
        return alert(`it appears you forgot to answer question number ${i + 17}. All questions must be complete in order to give you the best analysis.`)
      }
      else if (i >= 4 && isNaN(storedData[i].answer)) {
        storedData = []
        return alert(`it appears you did not enter a valid number for question ${i + 17}`)
      }
      else if (storedData[i] === null) {
        storedData = []
        return alert(`it appears you did not enter a valid number for question ${i + 17}`)
      }
    }


      localStorage.setItem("storedData", JSON.stringify(storedData))
      window.location.href = "../IncomeStatement/incomeStatement.html";


}
