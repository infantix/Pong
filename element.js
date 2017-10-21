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

    get left()
    {
        return this.position.x;
    }

    get right()
    {
        return this.position.x + this.size.width;
    }
    
    get top()
    {
        return this.position.y + this.size.height;
    }

    get bottom()
    {
        return this.position.y;
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