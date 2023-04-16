import TRex from "../config/dino";
import Cactuses from "../config/invironment";
import Score from "../config/scores";

export default class GameScene extends Phaser.Scene{
  constructor(config){
    super();
    this.config=config;
    this.dino=null;
    this.invironment=null;
    this.score=null;

    this.backgroundLayer={

        background:null,
        game:null,
        ui:null
        
    }
  } 
  preload(){
    this.load.image("fondo","assets/ground2.png");
    this.load.image("bird","assets/rexi-idle.png");
    this.load.image("pipe","assets/cactuses_small_1.png");
    this.load.image("pause_button","assets/restart.png")
  }
  create(){

    //instancea laayerr
    this.backgroundLayer.background=this.add.layer();
    this.backgroundLayer.game=this.add.layer();
    this.backgroundLayer.ui=this.add.layer();

    let fondo=this.add.image(0, 250,"fondo").setScrollFactor(0, 1); 
    this.backgroundLayer.background.add(fondo);

    this.dino=new TRex(this,100,this.config.height/2,"bird");
    this.backgroundLayer.game.add(this.dino);

    //this.physics.add.collider(this.pipes, this.bird);
    this.invironment=new Cactuses(this,this.backgroundLayer.game);
    this.physics.add.collider(this.dino,this.invironment.getGroup(),this.gameOver,null,this);

    this.score=new Score(this,16,16,this.backgroundLayer.ui);
    var pause_button=this.add.image(this.config.width-10,10,"pause_button").setOrigin(1,0);
    /*-> no funciona el button*/pause_button.on("pointer-down",this.pause,this);

    this.invironment.onPipeExited=()=>{
        this.score.addScore(1);
    }
    this.invironment.start();
  }

  update(){
    this.dino.checkOffbounds(()=>{
        this.gameOver();
    })
    this.invironment.update();
  }


  gameOver(){
    //alert("Mamaste");
    this.score.checkHighScore();
    this.scene.restart();
  }
  pause(){
    this.physics.pause();
    this.scene.pause();
  }
}

/*let game = new Phaser.Game(config);

function preload() { 
  this.load.image('background', 'assets/fondo.png'); //Fondo
  this.load.image('ground', 'assets/ground.png'); //Suelo
  this.load.spritesheet('trex', 'assets/trex.png', { frameWidth: 88, frameHeight: 94 });
  this.load.image('cactus', 'assets/cactus.png'); //Obstaculo
}

function create() { 
  //Carga los sprites
  this.add.image(400, 75, 'background').setScrollFactor(0, 0); 
  this.add.image(400, 130, 'ground').setScrollFactor(0, 1); 
  let trex = this.physics.add.sprite(80, 100, 'trex').setScale(1.5); 

  //this.physics.add.collider(tRex, ca, () => { 
  //  alert("You Lose"); 
  //})

  // Hacer que el Trex colisione en teoria con el suelo
  trex.setCollideWorldBounds(true); 
  this.physics.add.collider(trex, this.physics.world.bounds); 

  //Controlar el salto y la agachada del Trex
  this.input.keyboard.on("keydown-SPACE", () => {
    trex.setVelocityY(-300); 
  }); 

  this.input.keyboard.on("keydown-W", () => {
    trex.setVelocityY(-300); 
  }); 

  this.input.keyboard.on("keydown-S", () => {
    trex.setScale(1.5, 0.5);  
    console.log("encojess"); 
  }); 
 
  this.input.keyboard.on("keydown-S", () => {
    trex.setScale(1.5, 1.5);  
    console.log("agranda"); 
  }); 

  // Crear grupo de obstáculos usando Object Pooling
  this.time.addEvent({
    delay: Phaser.Math.Between(2000, 5000),  
    loop: true, 
    callback: () => {
      const obstacle = obstacleGroup.get(); 
      obstacle.x = 800;
      obstacle.y = 120; 
      obstacle.setVelocityX(-200); 
      obstacle.body.checkCollision.left = false;
      obstacle.body.checkCollision.right = false;
      obstacle.body.checkCollision.down = false;
    }
  }); 
  
}

function spawnCactus(scene)
{
  //consultrar proyecto flappybird
}

function update() {  

}*/