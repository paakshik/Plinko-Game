class Plinko {
    constructor(x, y) {
        var options = {
            restitution: 1,
            friction: 0,
            isStatic:true
        }
        this.colors =color(random(1,255),random(1,255),random(1,255),random(1,255));
        this.r = 10;
        this.body = Bodies.circle(x, y, this.r, options);
        this.body.label = 'Plinko'
        World.add(world, this.body);
    }
    display() {

        var pos = this.body.position;
        var angle = this.body.angle;

        push();
       
      
        imageMode(CENTER);
        noStroke();
        fill(this.colors);
        ellipseMode(RADIUS);
        ellipse(pos.x,pos.y,this.r);
        pop();
    }

};