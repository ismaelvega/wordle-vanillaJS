function checkUserInput({userInput, isLostInTime}){
  const lastAttempt = currentRow === numberOfAttempts-1
  const wrongWord = userInput !== currentWord
  const outOfAttempts = lastAttempt && wrongWord

  if(outOfAttempts){
    console.log('jo');
    lostAlert({outOfAttempts: true, isLostInTime: false})
    userInput = currentWord
  }

  if(!outOfAttempts && !isLostInTime){
    console.log('hey');
    initiCountdown()
  }
  
  const rows = document.querySelectorAll('.grid_row')
  let checkingRow = rows[currentRow]
  let elementsFromCurrentRow = getElementsFromCurrentRow(checkingRow)
  fillRow(elementsFromCurrentRow, userInput)

  for(let i = 0; i < wordsLength; i++){
    const letterToValidate = elementsFromCurrentRow[i].parentElement
    const isWithinTheWordAndInTheSamePlace = userInput.charAt(i) === currentWord.charAt(i)
    const isWithinTheWordButNotInTheSamePlace = currentWord.includes(userInput.charAt(i))
    const isNotWithinTheWord = !isWithinTheWordAndInTheSamePlace && !isWithinTheWordButNotInTheSamePlace
    if(isNotWithinTheWord){
      letterToValidate.style.background = '#787C7E'
    }
    if(isWithinTheWordButNotInTheSamePlace){
      letterToValidate.style.background = '#C9B458'
    }
    if(isWithinTheWordAndInTheSamePlace){
      letterToValidate.style.background = '#166916f0'
      // return
    }
  }
}

function getElementsFromCurrentRow(row){
  let elementsArray = []
  const letterElements = row.querySelectorAll('h2')
  Object.entries(letterElements).forEach((element) => {
    elementsArray.push(element[1])
  })

  return elementsArray
}

function initiCountdown(){
  secondsPerAttempt = 45
  window.countdown.textContent = String(secondsPerAttempt)
  var countdownInterval = setInterval(() => {
    // if(outOfAttempts){
    //   clearInterval(countdownInterval)
    // }
    let timeIsOver = secondsPerAttempt === -1
    if(timeIsOver){
      lostAlert({userInput: currentWord, isLostInTime: true})
      clearInterval(countdownInterval)
    }
    window.countdown.textContent = String(secondsPerAttempt--)
  }, 1000);
  if(currentRow !== 0){
    clearInterval(countdownInterval)
    clearInterval(countdownInterval)
  }
}

function fillRow(lettersToReplace, submittedWord){
  lettersToReplace.forEach((letter, index) => {
    let letterToReplace = letter
    let newLetter = submittedWord.charAt(index)
    letterToReplace.textContent = newLetter
  })
}

function lostAlert({outOfAttempts, isLostInTime}){
  alert(`sorry mate, the word was ${currentWord}`)
  console.log(isLostInTime);
  if(outOfAttempts){
    window.countdown.style.display = 'none'
  }

  if(isLostInTime){
    console.log('time')
    console.log(secondsPerAttempt);
    checkUserInput({userInput: currentWord})
    secondsPerAttempt = 0
  }
  userInput.disabled = true
  userInput.value = ''
}



// UTILS
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// STARTUP
var wordsLength = 6
var numberOfAttempts = 6
var secondsPerAttempt = 45
var words = [
  "cielos",
  "lengua",
  "Daniel",
  "Romano",
  "pecado",
  "Moises",
  "cielos",
  "lengua",
  "Daniel",
  "Romano",
  "pecado",
  "Moises"
]
var currentWord = words[getRandomInt(words.length)].toUpperCase()
console.log(`Word: ${currentWord}`)
var currentRow = 0

var userInput = document.querySelector('#userInput')
userInput.addEventListener('keydown', (event) => {
  if(event.code === 'Enter'){
    if(userInput.value.length < wordsLength){
      alert(`${wordsLength} letters`)
    } else {
      checkUserInput({userInput: userInput.value.toUpperCase()})
      userInput.value = ''
      currentRow++
    }
  } 
})





