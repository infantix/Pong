const canvas = document.getElementById('pong');
const pong = new Pong(canvas);


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
            pong.draw();
        }
        lastTime = millis;
        requestAnimationFrame(loop);
    }

    loop();
}

gameLoop();


