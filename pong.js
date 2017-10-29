class Pong
{
    constructor(canvas, score)
    {
        this.canvas = canvas;
        this.score = score;
        this.context = canvas.getContext('2d');
        this.ball = new Ball(0, 0, 10, 10);
        
        const marginFromLeft = 20;
        const marginFromRight = canvas.width - (marginFromLeft + Player.barWidth);
        const barPositionY = (canvas.height / 2) - (Player.barHeight / 2);
        
        this.players = [
            new Player(marginFromLeft, barPositionY), 
            new Player(marginFromRight, barPositionY),
        ];

        this.resetBall();
    }

    update(deltaTime)
    {
        const ball = this.ball;
        const canvas = this.canvas;
        const players = this.players;

        updateBallPosition(ball, deltaTime);
        
        moveCpuPlayer(players[1], ball, canvas);

        if(collideVerticalLimit(canvas, ball)) {
            ball.velocity.vely *= -1;
        }
        
        if(collideHorizontalLimit(canvas, ball)) {
            updateScore(ball, players, canvas);
            this.resetBall();
        }

        if(collideBar(players, ball)) {
            increaseBallSpeed(ball);
        }

        refreshScore(score, players);

        this.draw();
    }

    startGame()
    {
        const velocity = this.ball.velocity;
        
        if(velocity.vector == 0) {
            const initVelocity = 300;
            velocity.velx = initVelocity * (Math.random() > 0.5 ? 1 : -1);
            velocity.vely = initVelocity * (Math.random() > 0.5 ? 1 : -1);
        }
    }

    resetBall()
    {
        this.ball.position.x = this.canvas.width / 2;
        this.ball.position.y = this.canvas.height / 2;
        this.ball.velocity.vector = 0
    }

    draw()
    {
        resetCanvas(this.context, this.canvas);
        
        //draw ball
        drawElement(this.context, this.ball);
        
        //draw players' bars
        this.players.forEach(player => {
            drawElement(this.context, player.bar);
        });
    }
}

let increaseBallSpeed = function (ball) {
    const oldVector = ball.velocity.vector;
    ball.velocity.velx *= -1;
    ball.velocity.vely += 150 * (Math.random() - 0.5);
    ball.velocity.vector = oldVector * 1.05;
}

let collideVerticalLimit = function (canvas, ball) {
    return ball.bottom <= 0 || ball.top >= canvas.height;
}

let collideHorizontalLimit = function (canvas, ball) {
    return ball.left <= 0 || ball.right >= canvas.width;
}

let collideBar = function (players, ball) {
    const player = ball.velocity.velx > 0 ? players[1] : players[0];
    const bar = player.bar;

    return ball.left <= bar.right && ball.right >= bar.left
        && ball.bottom >= bar.bottom && ball.top <= bar.top;
}

let moveCpuPlayer = function (player, ball, canvas) {
    player.setBarPositionY(ball.position.y, canvas);
}

let updateScore = function (ball, players, canvas) {
    if(ball.left <= 0) {
        players[1].score++;
    }
    
    if(ball.right >= canvas.width) {
        players[0].score++;
    }
}

let updateBallPosition = function (ball, deltaTime) {
    ball.position.x += ball.velocity.velx * deltaTime;
    ball.position.y += ball.velocity.vely * deltaTime;
}

let resetCanvas = function (context, canvas) {
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
}

let drawElement = function (context, element) {
    context.fillStyle = '#fff';
    context.fillRect(element.left, element.bottom, element.width, element.height);
}

let refreshScore = function (score, players) {
    let text = players[0].score + " - " + players[1].score;
	score.innerText = text;
}

