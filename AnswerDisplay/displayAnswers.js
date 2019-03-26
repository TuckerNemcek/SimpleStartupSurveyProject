let questionArray
let answers
document.addEventListener('DOMContentLoaded', () => {
  getdisplayAnswers()
  localStorage.clear()
  let appendHere = document.getElementById('appendHere')

  function getdisplayAnswers() {
    axios.get('https://simple-startup-survey-backend.herokuapp.com/client_answers')
      .then(function(response) {
        let answers = response.data
        questionArray = response.data
        console.log("This your GET request ", answers)
        for (let i = 0; i < answers.length; i++) {
          // if (answers[i].isMultipleChoice) {
          //   let p = document.createElement('p')
          //   p.id = answers[i].id
          //   p.innerText = `${i + 1}. ` + answers[i].answer
          //   let form = document.createElement('form')
          //   appendHere.appendChild(p)
          //
          //
          //   for (let k = 0; k < answers[i].mcAnswers.length; k++) {
          //     //console.log('mcAnswers is ', answers[i].mcAnswers[k])
          //     let div = document.createElement('div')
          //     div.classList.add('row', )
          //     let radioInput = document.createElement('input')
          //     radioInput.classList.add('mc')
          //     radioInput.setAttribute('type', 'radio')
          //     radioInput.setAttribute('id', `${answers[i].mcAnswers[k].id}${k+ i}`)
          //     radioInput.setAttribute('value', `${answers[i].mcAnswers[k].id}`)
          //     let choice = document.createElement("label")
          //     choice.setAttribute('for', `${answers[i].mcAnswers[k].id}${k+ i}`)
          //     radioInput.setAttribute('name', `${answers[i].id + 1000}`)
          //     choice.innerHTML = answers[i].mcAnswers[k].mc_answers
          //     div.appendChild(radioInput)
          //     div.appendChild(choice)
          //     p.appendChild(div)
          //
          //   }
          // } else {
            let p = document.createElement('p')
            my_form = document.createElement('FORM');
            questInput = document.createElement('form')
            questInput.class = 'form-inline'

            questInputInner = document.createElement('input')
            questInputInner.class = 'form-control'
            questInputInner.id = answers[i].id
            p.innerText = `${i + 1}. ` + answers[i].answer
            appendHere.appendChild(p)
            appendHere.appendChild(questInput)
            questInput.appendChild(questInputInner)
        //  }
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
        answer: document.getElementById(`${i}`).value
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


  for (let i = 0; i < storedData.length; i++) {
    if (storedData[i].answer === "") {
      storedData = []
      return alert(`it appears you forgot to answer question number ${i + 1}. All answers must be complete in order to give you the best analysis.`)
    }
    else if (i >= 4 && isNaN(storedData[i].answer)) {
      storedData = []
      return alert(`it appears you did not enter a valid number for question ${i + 1}`)
    }
  }

  axios.post('https://simple-startup-survey-backend.herokuapp.com/client_answers/', storedData)
    .then(function(response) {
      console.log(response.data, ' save success')
    })
  localStorage.setItem("storedData", JSON.stringify(storedData))
    window.location.href = "../IncomeStatement/incomeStatement.html";

}
