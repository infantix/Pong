const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    const player0 = pong.players[0];
    player0.setBarPositionY(event.offsetY, canvas);
});


function gameLoop()
{
    let lastTime = 0;
    let accumulator = 0;
    let step = 1/60;
    
    const loop = (millis) => {
        if(lastTime) {
            accumulator += (millis - lastTime) / 1000;
    
            while(accumulator > step) {
                pong.update(step);
                accumulator -= step;
            }
        }
        lastTime = millis;
        requestAnimationFrame(loop);
    }

    loop();
}

gameLoop();


