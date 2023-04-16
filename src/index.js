import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 150,
  parent: 'game', 
  //transparent, 
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false 
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);

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

  /*this.physics.add.collider(tRex, ca, () => { 
    alert("You Lose"); 
  })*/

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
  /*this.time.addEvent({
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
  }); */
  
}

function spawnCactus(scene)
{
  //consultrar proyecto flappybird
}

function update() {  

}
