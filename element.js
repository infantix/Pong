class Position
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}

class Velocity
{
    constructor(velx = 0, vely = 0)
    {
        this.velx = velx;
        this.vely = vely;
    }
}

class Size
{
    constructor(width = 0, height = 0)
    {
        this.width = width;
        this.height = height;
    }
}

class Element
{
    constructor(posX, posY, width, height)
    {
        this.position = new Position(posX, posY);
        this.size = new Size(width, height);
    }
}

class Ball extends Element
{
    constructor(posX, posY, width, height)
    {
        super(posX, posY, width, height);
        this.velocity = new Velocity();
    }
}