
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 150,
  parent: 'game', 
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
let cactusGroup; 
let nextCactusDistance = 0;
let tRex;

function Input()
{
  tRex.setVelocityY(-300); 
  console.log("ando salti"); 
}

function preload() { // Aquí se cargan los recursos necesarios, como las imágenes y los sonidos del juego.
  this.load.image('background', 'assets/fondo.png'); //Fondo
  this.load.image('ground', 'assets/ground.png'); //Suelo
  this.load.spritesheet('trex', 'assets/trex.png', { frameWidth: 88, frameHeight: 94 });
  this.load.image('cactus', 'assets/cactus.png'); //Obstaculo
}

function create() { // Aquí se crean los objetos del juego, como el personaje principal y los obstáculos.
  this.add.image(0, 0, 'background').setOrigin(0);
  this.add.image(0, 105, 'ground').setOrigin(0);

  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('trex', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1
  });

  tRex = this.physics.add.sprite(50, 100, 'trex');
  tRex.setCollideWorldBounds(true);
  //tRex.play('run'); //problemaaaaaa
  tRex.body.setSize(44, 52);

  cactusGroup = this.physics.add.group();

  this.input.keyboard.on("keydown-W", Input); 

}

function startGame() {
  this.tRex.setVelocityX(80);
  this.tRex.play('run', 1);
}

function update() {  // Aquí se actualiza el estado del juego, como la posición del personaje y los obstáculos en la pantalla.

  this.physics.world.collide(tRex, cactusGroup, () => {
    // Game Over
    console.log("Game Over");
  });

  cactusGroup.getChildren().forEach((cactus) => {
    if (cactus.x < -cactus.width) {
      cactus.destroy();
    }
  });

  if (nextCactusDistance <= 0) {
    let newCactus = this.physics.add.sprite(800, 95, 'cactus');
    newCactus.setVelocityX(-200);
    cactusGroup.add(newCactus);
    nextCactusDistance = Phaser.Math.Between(200, 400);
  } else {
    nextCactusDistance -= 1;
  }



}
