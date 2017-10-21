const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball(150,50, 10, 10);

function update(deltaTime)
{
    ball.position.x += ball.velocity.velx * deltaTime;
    ball.position.y += ball.velocity.vely * deltaTime;

    ball.velocity.velx++;
    ball.velocity.vely++;

    draw();
}

function resetCanvas() {
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
}

function drawBall() {
    context.fillStyle = '#fff';
    context.fillRect(ball.position.x, ball.position.y, ball.size.width, ball.size.height);
}

function draw() {
    resetCanvas();
    drawBall();
}

function gameLoop()
{
    let lastTime = 0;
    let accumulator = 0;
    let step = 1/60;
    
    function loop(millis)
    {
        if(lastTime) {
            accumulator += (millis - lastTime) / 1000;
    
            while(accumulator > step) {
                update(step);
                accumulator -= step;
            }
            draw();
        }
        lastTime = millis;
        requestAnimationFrame(loop);
    }

    loop();
}

gameLoop();


