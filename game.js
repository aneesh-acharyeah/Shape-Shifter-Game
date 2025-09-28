const targetShapeContainer = document.getElementById('target-shape');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 60;
let gameInterval, shapeInterval;

// Sample target shape (3x3 grid)
const targetShape = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 0],
];

// Function to create the target shape
function createTargetShape() {
  targetShapeContainer.innerHTML = '';
  targetShape.forEach(row => {
    row.forEach(cell => {
      const shape = document.createElement('div');
      shape.classList.add('shape');
      shape.style.backgroundColor = cell ? 'blue' : 'lightgray';
      targetShapeContainer.appendChild(shape);
    });
  });
}

// Function to create a random shape piece
function createShapePiece() {
  const piece = document.createElement('div');
  piece.classList.add('shape');
  piece.style.backgroundColor = 'blue';
  piece.draggable = true;
  
  piece.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', piece.outerHTML);
  });
  
  return piece;
}

// Function to generate shapes and add to game board
function generateShapes() {
  for (let i = 0; i < 5; i++) {
    const shapePiece = createShapePiece();
    gameBoard.appendChild(shapePiece);
  }
}

// Function to handle the timer countdown
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(shapeInterval);
      alert(`Game Over! Your final score is ${score}`);
    }
  }, 1000);
}

// Function to handle shape drop
gameBoard.addEventListener('dragover', (e) => {
  e.preventDefault();
});

gameBoard.addEventListener('drop', (e) => {
  e.preventDefault();
  const droppedShape = e.dataTransfer.getData('text');
  const shapeElement = document.createElement('div');
  shapeElement.innerHTML = droppedShape;
  gameBoard.appendChild(shapeElement.firstChild);
  score++;
  scoreDisplay.textContent = score;
});

// Start the game
function startGame() {
  createTargetShape();
  generateShapes();
  startTimer();
  shapeInterval = setInterval(generateShapes, 3000);
}

startGame();
