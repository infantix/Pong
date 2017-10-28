class Player
{
    constructor(barPosX, barPosY)
    {
        this.bar = new Element(barPosX, barPosY, 25, 150);
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