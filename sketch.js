var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
let score1;
let score2;
let score3;
let counter, score = 0;
let  blockG = [];
let particles = [];
let plinkos = [];
let divisionHeight=300;
let chances = 0;
let gameState = 'start';
let restart;
let gameStates = 'start';
function  collision(event){
  
  event.pairs.forEach(particle => {
    bodyA = particle.bodyA;

    bodyB = particle.bodyB;
    if (bodyA.label === 'particle' && bodyB.label === 'Plinko' && gameState === 'start'){
      console.log('ouch')
      ding.play();
    }
    if (bodyA.label === 'Plinko' && bodyB.label === 'particle' && gameState === 'start'){
      console.log('ouch');
      ding.play();
    }
    if (bodyA.label === 'particle' && bodyB.label === 'ground' && gameState === 'start'){
      console.log('ouch');
      hit.play();
    }
    if (bodyA.label === 'ground' && bodyB.label === 'particle' && gameState === 'start'){
      console.log('ouch');
      hit.play();
    }
  })
}
function preload(){
  ding = loadSound('zapsplat_impacts_wood_thin_pole_like_hit_clunk_light_001_44152.mp3')
  hit = loadSound('zapsplat_impacts_wood_thin_pole_like_hit_clunk_light_002_44153.mp3')
you_lose =loadSound('You-lose-sound-effect.mp3')
you_win =loadSound('Ta Da-SoundBible.com-1884170640.mp3')
}
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
Events.on(engine,'collisionStart',collision)

  ground = new Ground(width/2,height,width,20);

  for (i = 7;i < 797;i = i+ 100){
blockG.push(new Ground(i,760,10,90));

}

for (var j = 50; j <=width; j = j + 75) {
  plinkos.push(new Plinko(j,0));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
    for (var j = 75; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,475));
    }
    
    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,575));
    }

    
Engine.run(engine)
    
}
 


function draw() {
background('blue')

  if (gameState === 'start'){
textSize(20)
  text("Score : "+score,20,30);
  text('Chances: '+chances,650,30)
  for (i = 40;i < 340;i = i + 100){
  text(score1,i ,750)

  }
  
  for (i = 340;i < 540;i = i + 100){
    text(score2,i ,750)
  
    }
  
    for (i = 540;i < 840;i = i + 100){
      text(score3,i ,750)
    
      }
if (frameCount % 120 === 0 && gameState === 'start'){
  particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  score1 =Math.floor(random(200,500));
  score2 = Math.floor(random(200,500));
  score3 = Math.floor(random(200,500));
  console.warn(particles)
  
}

      text(mouseX + ',' + mouseY,mouseX,mouseY);

      for (i=0;i <blockG.length;i++){
  blockG[i].display();
  
}

  plinkos.forEach(element => {
    element.display()
  })
     

  
 
  for (var j = 0; j < particles.length; j++) {
        particles[j].display();


     if (particles[j].body.position.x > 17 &&particles[j].body.position.y > 740 &&particles[j].body.position.x < 307){
      score = score +   score1;
      World.remove(world,particles[j].body);
      particles.splice(j,1);
      chances = chances + 1;

          }
   
          if (particles[j].body.position.x > 307 &&particles[j].body.position.y > 750 &&particles[j].body.position.x < 507){
        score = score + score2;
        World.remove(world,particles[j].body);
        particles.splice(j,1);
       
        chances = chances + 1;
         }
   
         if (particles[j].body.position.x > 507 &&particles[j].body.position.y > 750 &&particles[j].body.position.x < 800){
          score = score + score3;
          World.remove(world,particles[j].body);
          particles.splice(j,1);
          chances = chances + 1;
       
           }
   }
   for (var k = 0; k < particles.length; k++) {
     
    particles[k].display();

   
       if (particles[k].body.position.x > 17 &&particles[k].body.position.y > 750 &&particles[k].body.position.x < 307){
        score = score +   score1
        World.remove(world,particles[k].body);
        particles.splice(k,1);
        chances = chances + 1;
     
         }
   
         if (particles[k].body.position.x > 307 &&particles[k].body.position.y > 750 &&particles[k].body.position.x < 507){
          score = score +   score2
          World.remove(world,particles[k].body);
          particles.splice(k,1);
        
          chances = chances + 1;
           }
   
           if (particles[k].body.position.x > 507 &&particles[k].body.position.y > 750 &&particles[k].body.position.x < 800){
            score = score +   score3
            World.remove(world,particles[k].body);
            particles.splice(k,1);
           
            chances = chances + 1;
             }
    if (score > 1600 && chances < 5){
      gameState ='win';
      you_win.play();

    }
    if (chances > 5){
      gameState ='end';
      you_lose.play();
    }
   }
  }
  if (gameState === 'end'){
    text('YOU  LOSE!!',350,400);
    text('Press the DOWN_ARROW key to restart the game!!',200,480);
  }
  if (gameState === 'win'){
    text('YOU  WIN!!',350,400);
    text('Press the DOWN_ARROW key to restart the game!!',200,480);
  
}
}
function keyPressed(){
  
  if(keyCode === 40 && gameState != 'start'){
    gameState = 'start';
    score = 0;
    chances = 0;
    particles = [];
  score1  = 0;
  score2  = 0;
  score3  = 0;
  }
  if(keyCode === 32 && gameState === 'start'){
    
  }
    

}
