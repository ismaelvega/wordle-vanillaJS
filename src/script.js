function checkUserInput(userInput){
  const rows = document.querySelectorAll('.grid_row')
  let checkingRow = rows[currentRow]
  let elementsFromCurrentRow = getElementsFromCurrentRow(checkingRow)
  fillRow(elementsFromCurrentRow, userInput)

  for(let i = 0; i < wordsLength; i++){
    elementsFromCurrentRow[i].parentElement.style.background = '#787C7E'
    if(currentWord.includes(userInput.charAt(i))){
      elementsFromCurrentRow[i].parentElement.style.background = '#C9B458'
    }
    if(userInput.charAt(i) === currentWord.charAt(i)){
      elementsFromCurrentRow[i].parentElement.style.background = '#166916f0'
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

function fillRow(lettersToReplace, submittedWord){
  lettersToReplace.forEach((letter, index) => {
    let letterToReplace = letter
    let newLetter = submittedWord.charAt(index)
    letterToReplace.textContent = newLetter
  })
}


// UTILS
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// STARTUP
var wordsLength = 6
var words = [
  "cielos",
  "lengua",
  "Daniel",
  "Romanos",
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

let userInput = document.querySelector('#userInput')
userInput.addEventListener('keydown', (event) => {
  if(event.code === 'Enter'){
    if(userInput.value.length < 6){
      alert('6 letters')
    } else {
      checkUserInput(userInput.value.toUpperCase())
      userInput.value = ''
      currentRow++
    }
  } 
})





