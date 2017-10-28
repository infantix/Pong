class Pong
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ball = initBall();
        this.players = [
            //20 = margin from canvas.
            //75 = BAR HEIGHT/2.
            //45 = 20 + BAR WIDTH.
            new Player(20, canvas.height / 2 - 75), 
            new Player(canvas.width - 45 , canvas.height / 2 - 75),
        ];
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

        const player1 = this.players[1];
        player1.setBarPositionY(this.ball.position.y, this.canvas);

        this.draw();
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

let resetCanvas = function(context, canvas) {
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
}

let drawElement = function(context, element) {
    context.fillStyle = '#fff';
    context.fillRect(element.left, element.bottom, element.width, element.height);
}

let initBall = function() {
    const ball = new Ball(0, 0, 10, 10);
    ball.velocity.velx = 400;
    ball.velocity.vely = 400;

    return ball;
}


