let iconList = [
  'bacon',
  'cheese',
  'bread-slice',
  'carrot',
  'hamburger',
  'fish',
  'ice-cream',
  'hotdog',
  'bacon',
  'cheese',
  'bread-slice',
  'carrot',
  'hamburger',
  'fish',
  'ice-cream',
  'hotdog'
]

let flipped = []
let cards = []
let timer = setInterval(timerFunction, 1000)
let time = 0

let timerSpan = document.querySelector('.timer')

function timerFunction() {
  time = time + 1
  timerSpan.innerHTML = time
}

//redo button
const redoBtn = document.querySelector('.fa-redo-alt')
redoBtn.addEventListener('click', () => {
  redo()
})

//move tracking
const movesSpan = document.querySelector('.moves')
let moves = 0

//star tracking
let starListItems = document.querySelectorAll('.stars > li')
let starUl = document.querySelector('.stars')

function removeStar() {
  starListItems[0].remove()
  starListItems = document.querySelectorAll('.stars > li')
}

function removeCards() {
  const cards = document.querySelectorAll('.card')
  for (card of cards) {
    card.parentNode.removeChild(card)
  }
}
function resetStars() {
  for (let i = 0; i < 3; i++) {
    let newStarLi = document.createElement('li')
    let newStarIcon = document.createElement('i')
    newStarIcon.className = 'fa fa-star'
    starUl.appendChild(newStarLi)
    newStarLi.appendChild(newStarIcon)
  }
  starListItems = document.querySelectorAll('.stars > li')
  while (starListItems.length > 3) {
    removeStar()
  }
}

function createCards() {
  iconList = shuffle(iconList)
  for (let i = 0; i < 16; i++) {
    let card = document.createElement('li')
    card.className = 'card'
    let icon = document.createElement('i')
    icon.className = 'fa fa-' + iconList[i]
    card.addEventListener('click', () => {
      openCard(card)
    })
    card.appendChild(icon)
    let deck = document.querySelector('.deck')
    deck.appendChild(card)
  }
  cards = document.querySelectorAll('.cards')
}

function openCard(card) {
  moves = moves + 1
  movesSpan.innerHTML = moves
  checkStars(moves)
  if (checkFlipped(flipped)) {
    card.className = 'card open show'
    flipped.push(card)
    checkMatch(flipped)
    if (!checkFlipped(flipped)) {
      checkMatch(flipped)
    }
  }
}

function checkFlipped(flipped) {
  if (flipped.length === 2) {
    return false
  } else {
    return true
  }
}
function checkStars(moves) {
  if (moves === 10) {
    removeStar()
  } else if (moves === 20) {
    removeStar()
  } else if (moves === 35) {
    removeStar()
  }
}

function checkMatch(currentFlipArray) {
  if (currentFlipArray.length === 2) {
    let [cardOne, cardTwo] = currentFlipArray
    iconOne = cardOne.childNodes[0]
    iconTwo = cardTwo.childNodes[0]
    if (iconOne.className === iconTwo.className) {
      console.log('matched')
      cardOne.className = 'card match'
      cardTwo.className = 'card match'
      flipped = []
    } else {
      console.log('no match')
      cardOne.className = 'card'
      cardTwo.className = 'card'
      flipped = []
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function redo() {
  removeCards()
  createCards()
  resetStars()
  clearInterval(timer)
  time = 0
  timerSpan.innerHTML = time
  timer = setInterval(timerFunction, 1000)
  flipped = []
  moves = 0
  movesSpan.innerHTML = moves
}

//create initial game board
createCards()

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
