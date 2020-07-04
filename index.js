// initialize player objects
let playerOne = {
  name: prompt('Please enter player the name of player one'),
  shipCount: 4,
  gameBoard: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
}

let playerTwo = {
  name: prompt('Please enter player the name of player two'),
  shipCount: 4,
  gameBoard: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
}

// Lets the user know their ships are being chosen for them
alert('Excellent! Preparing game board and ship placement...')

// prepares the game board
for(let i=0; i < 4; i++) {
  // builds individual rows
  let rwPlayerOne = document.createElement('div')
  rwPlayerOne.classList.add('row')
  let rwPlayerTwo = document.createElement('div')
  rwPlayerTwo.classList.add('row')

  // adds them to each players game board
  document.getElementById('playerOne').appendChild(rwPlayerOne)
  document.getElementById('playerTwo').appendChild(rwPlayerTwo)

  // builds individual tiles
  for(let j=0; j < 4; j++) {
    let tilePOne = document.createElement('div')
    let tilePTwo = document.createElement('div')
    tilePOne.id = `${i}-${j}-pOne`
    tilePTwo.id = `${i}-${j}-pTwo`
    tilePOne.classList.add('tile-default')
    tilePTwo.classList.add('tile-default')
    rwPlayerOne.appendChild(tilePOne)
    rwPlayerTwo.appendChild(tilePTwo)
  }
}

// Putting the random number generation into a function to avoid repitition
const createRandomCoordinates = (ship) => {
  let x = Math.round(Math.random() * (3 - 0))
  let y = Math.round(Math.random() * (3 - 0))

  // Deals with it if another ship is at that coordinate
  while(ship.gameBoard[y][x] === 1) {
    x = Math.round(Math.random() * (3 - 0))
    y = Math.round(Math.random() * (3 - 0))
  }

  ship.gameBoard[y][x] = 1
}

const evaluateWinner = () => {
  if(playerOne.shipCount > playerTwo.shipCount) {
    return `${playerOne.name} is the winner!`
  } else {
    return `${playerTwo.name} is the winner!`
  }
}

const battleship = () => {
  for(let i=0; i < 4; i++) {
    // set up each players ships at random positions
    const pOne = createRandomCoordinates(playerOne)
    const pTwo = createRandomCoordinates(playerTwo)
  }

  // game logic, giving players turns to guess coordinates
  while(playerOne.shipCount && playerTwo.shipCount) {
    // player ones turn
    const playerOneGuessX = prompt('Enter your guess for x coordinate')
    const playerOneGuessY = prompt('Enter your guess for y coordinate')
    let pOneNode = document.getElementById(`${playerOneGuessY}-${playerOneGuessX}-pOne`)

    // evaluates whether a ship was struck
    if(playerTwo.gameBoard[playerOneGuessY][playerOneGuessX] === 1) {
      alert('Hit! You destroyed a ship')
      pOneNode.classList.remove('tile-default')
      pOneNode.classList.add('tile-hit')
      pOneNode.innerText = 'X'
      playerTwo.shipCount -= 1
    } else {
      pOneNode.classList.remove('tile-default')
      pOneNode.classList.add('tile-empty')
      alert('Miss! Better luck next time')
    }

    // I realized there is one flaw: player two gets prompted for input 1 time after pOne sunk their last ship
    // so this is an early escape hatch
    if(playerTwo.shipCount === 0) {
      return evaluateWinner()
    }

    // player two's turn
    const playerTwoGuessX = prompt('Enter your guess for x coordinate')
    const playerTwoGuessY = prompt('Enter your guess for y coordinate')
    let pTwoNode = document.getElementById(`${playerTwoGuessY}-${playerTwoGuessX}-pTwo`)

    if(playerOne.gameBoard[playerTwoGuessY][playerTwoGuessX] === 1) {
      alert('Hit! You destroyed a ship')
      pTwoNode.classList.remove('tile-default')
      pTwoNode.classList.add('tile-hit')
      pTwoNode.innerText = 'X'
      playerOne.shipCount -= 1
    } else {
      pTwoNode.classList.remove('tile-default')
      pTwoNode.classList.add('tile-empty')
      alert('Miss! Better luck next time')
    }
  }

  return evaluateWinner() 
}

const gameResult = battleship()

const htmlTarget = document.getElementById('result')
htmlTarget.innerHTML = gameResult
