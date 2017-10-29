class Player
{
    constructor(barPosX, barPosY)
    {
        this.bar = new Element(barPosX, barPosY, Player.barWidth, Player.barHeight);
        this.score = 0;
    }

    setBarPositionY(value, canvas)
    {
        this.bar.center = value;

        if(this.bar.bottom < 0) {
            this.bar.position.y = 0;
        }

        if(this.bar.top > canvas.height) {
            this.bar.position.y = canvas.height - this.bar.height;
        }
    }
}

Player.barHeight = 150;
Player.barWidth = 25;

