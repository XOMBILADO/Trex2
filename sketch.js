var trex, trex_correndo, trexcol, imgtrexcol;
var imagemdosolo;
var solo;
var solo2;
var nuvem;
var imgnuvem;
var pontuacao = 0;
var imgobstaculo1, imgobstaculo2, imgobstaculo3, imgobstaculo5;
var grupoobstaculo, gruponuvens
var JOGAR= 1
var ENCERRAR= 0
var estadojogo= JOGAR
var gameOver, Restart, imgGameover, imgRestart;
var somjump, somdie, somcheckpoint
var Variavel = "oi"

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  imagemdosolo = loadImage("ground2.png")
  imgobstaculo1 = loadImage ("obstacle1.png")
  imgnuvem = loadImage("cloud.png")
  imgobstaculo2 = loadImage ("obstacle2.png");
  imgobstaculo3 = loadImage ("obstacle3.png");
  imgobstaculo5 = loadImage ("obstacle5.png");
  imgtrexcol = loadImage ("trex_collided.png")
  imgRestart = loadImage ("restart.png")
  imgGameover = loadImage ("gameOver.png")
  somjump = loadSound ("jump.mp3")
  somdie = loadSound ("die.mp3")
  somcheckpoint = loadSound ("checkPoint.mp3")
  
  //console.log (Variavel)
}
  
function setup(){
  createCanvas(600,200);
  
  // criando o trex 
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collid", imgtrexcol );
  trex.scale = 0.5;
  trex.x = 50
  
  
  grupoobstaculo = new Group();
  
  
  gruponuvens = new Group();
  
  
  
  solo = createSprite(0,180,600,5)
  solo.addImage("solo", imagemdosolo) 
  solo.velocityX =-2;
  solo.x= solo.width /2;
  solo2 = createSprite(0,185,600,5)
  
  //nuvem = Math.round (random(10,100));
  //console.log (nuvem)
  //console.log (trex.depth)
    
  //console.log ("oi" + 5)
  
  gameOver = createSprite (276,150)
  Restart = createSprite (276,105)
  gameOver.addImage ("gameOver", imgGameover);
  Restart.addImage ("Restart", imgRestart)
  gameOver.visible = false;
  Restart.visible = false;
  gameOver.scale = 0.5
}

function draw(){
  // definir cor de fundo
  background("white");
  text ("Pontuação: "+ pontuacao, 490,12);
  pontuacao = pontuacao + Math.round(frameCount%60 )
  
  text(mouseX+","+mouseY,20,20)
    
  //console.log(trex.y)
 
  
  trex.collide(solo2);
  
  //console.log (Variavel)
  
  solo2.visible = false
  
  
    
    
    
  
  
  
  drawSprites();
  
  if(estadojogo == JOGAR){
    if(solo.x < 0){
    solo.x = solo.width /2;
      solo.velocityX =-2;
      
    }
    gerarnuvens ()
      gerarobstaculos ()
  if(grupoobstaculo.isTouching (trex)) {
      estadojogo= ENCERRAR;
    }
  if(keyDown("space") && trex.y > 158){
    trex.velocityY = -10;
    //console.warn("erro")
    somjump.play ()
  }
    trex.velocityY = trex.velocityY + 0.5;
  }
  else if (estadojogo == ENCERRAR){
    solo.velocityX= 0
    grupoobstaculo.setVelocityXEach(0)
    gruponuvens.setVelocityXEach(0)
    grupoobstaculo.setLifetimeEach (-1)
    gruponuvens.setLifetimeEach (-1)
    trex.velocityY= 0
    trex.changeAnimation ("collid")
    gameOver.visible = true;
    Restart.visible = true;
    pontuacao = 0
    if (mousePressedOver(Restart)){
      resetar()
  }
  }
}
function gerarnuvens (){
  if (frameCount%60 == 0){
  nuvem = createSprite (600,100,55,44)
  nuvem.velocityX = -2
  nuvem.addImage (imgnuvem)
    nuvem.y = Math.round (random(5,100))
    nuvem.scale = 0.7
    //console.log (nuvem.depth)
    nuvem.depth = trex.depth
    trex.depth = trex.depth +1;
    nuvem.lifetime= 350
  gruponuvens.add(nuvem);
  }
}
    function resetar(){
      estadojogo = JOGAR
      gameOver.visible = false
      Restart.visible = false
      grupoobstaculo.destroyEach()
      gruponuvens.destroyEach()
      trex.changeAnimation("running",trex_correndo)
      pontuacao = 0
    }

function gerarobstaculos (){
  if (frameCount%60 == 0){
  obstaculo = createSprite (600,170,10,10)
  obstaculo.velocityX = -6
  var rand = Math.round (random(1,4));
  switch(rand){
    case 1: obstaculo.addImage (imgobstaculo1);
    break;
    case 2: obstaculo.addImage (imgobstaculo2);
    break;
    case 3: obstaculo.addImage (imgobstaculo3);
    break;
    case 4: obstaculo.addImage (imgobstaculo5);
    break;
    default: break;
  }
  grupoobstaculo.add(obstaculo);
  
    obstaculo.scale= 0.5;
    obstaculo.lifetime = 105
  }
}