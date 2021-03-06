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

    get vector()
    {
        return Math.sqrt(this.velx * this.velx + this.vely * this.vely);
    }
    
    set vector(value)
    {
        const factor = value / (this.vector || 1);
        this.velx *= factor;
        this.vely *= factor;
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
    
    set center(value)
    {
        this.position.y = value - this.size.height / 2;
    }

    get width()
    {
        return this.size.width;
    }

    get height()
    {
        return this.size.height;
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