class Pong
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ball = initBall();
    }

    update(deltaTime)
    {
        this.ball.position.x += this.ball.velocity.velx * deltaTime;
        this.ball.position.y += this.ball.velocity.vely * deltaTime;
    
        if(this.ball.left <= 0 || this.ball.right >= this.canvas.width) {
            this.ball.velocity.velx = this.ball.velocity.velx * -1;
        }
    
        if(this.ball.bottom <= 0 || this.ball.top >= this.canvas.height) {
            this.ball.velocity.vely = this.ball.velocity.vely * -1;
        }
    }

    draw()
    {
        resetCanvas(this);
        drawBall(this);
    }
}

let resetCanvas = function(pong) {
    pong.context.fillStyle = '#000';
    pong.context.fillRect(0,0, pong.canvas.width, pong.canvas.height);
}

let drawBall = function(pong) {
    pong.context.fillStyle = '#fff';
    pong.context.fillRect(pong.ball.position.x, pong.ball.position.y, 
        pong.ball.size.width, pong.ball.size.height);
}

let initBall = function() {
    const ball = new Ball(20,20, 10, 10);
    ball.velocity.velx = 100;
    ball.velocity.vely = 100;

    return ball;
}


