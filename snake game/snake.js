//board
var blockSize = 25; //25 pixels make a block
var rows = 20;
var cols = 20;
var board;
var context; //for drawing

//snake head
var snakeX =  blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//food
var foodX;
var foodY;

//misc
var gameOver = false;
var score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update(){
    if(gameOver){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width, board.height);
    //from corner of canvas to width and height

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        score ++;
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
        //starts from end of snake body and goes up
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
        //moves first snake body part up where head was
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //game over conditions
    //out of bounds
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize)
    {
        gameOver = true;
        alert("Game Over");
    }
    //snake bumps into itself
    for(let i = 0; i < snakeBody.length; i++)
    {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1])
        { //looping through to check if one is the same pos as the other
            gameOver = true;
            alert("Game Over");
        }
    }

    //score
    context.fillStyle="white";
    context.font="20px courier";
    context.fillText(score, 5, 20);
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1; //moves snake up
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1; //moves snake down
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0; //moves snake left
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0; //moves snake right
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}
