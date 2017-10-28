class Pong
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ball = initBall(canvas);
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
        const ball = this.ball;
        const player0 = this.players[0];
        const player1 = this.players[1];

        ball.position.x += ball.velocity.velx * deltaTime;
        ball.position.y += ball.velocity.vely * deltaTime;
        
        if(ball.left <= 0 || ball.right >= this.canvas.width) {
            ball.velocity.velx *= -1;

            if(ball.left <= 0) {
                player1.score++;
                console.log("player1: " + player1.score);
            }
            
            if(ball.right >= this.canvas.width) {
                player0.score++;
                console.log("player0: " + player0.score);
            }

        }
        
        if(ball.bottom <= 0 || ball.top >= this.canvas.height) {
            ball.velocity.vely *= -1;
        }
        
        player1.setBarPositionY(ball.position.y, this.canvas);

        let player = ball.velocity.velx > 0 ? player1 : player0;

        if(this.collide(player.bar, this.ball)) {
            ball.velocity.velx *= -1;
        }

        this.draw();
    }

    collide(bar, ball)
    {
        return ball.left <= bar.right && ball.right >= bar.left
            && ball.bottom >= bar.bottom && ball.top <= bar.top;
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

let initBall = function(canvas) {
    const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 10);
    ball.velocity.velx = 400;
    ball.velocity.vely = 400;

    return ball;
}


