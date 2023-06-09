import TRex from "../config/dino";
import Cactuses from "../config/invironment";
import Score from "../config/scores";

export default class GameScene extends Phaser.Scene{
  constructor(config){
    super();
    this.config = config;
    this.dino = null;
    this.invironment = null;
    this.score = null;

    this.backgroundLayer={

        background: null,
        game: null,
        ui: null
        
    }
  } 
  preload(){
    this.load.image("fondo","assets/ground2.png");
    this.load.image("Trex","assets/rexi-idle.png");
    this.load.image("obstacle-1","assets/cactuses_small_1.png");
    this.load.image("pause_button","assets/restart.png")
  }
  create(){

    //instancea laayerr
    this.backgroundLayer.background=this.add.layer();
    this.backgroundLayer.game=this.add.layer();
    this.backgroundLayer.ui=this.add.layer();

    let fondo=this.add.image(0, 280 ,"fondo").setScrollFactor(0, 1); //270
    this.backgroundLayer.background.add(fondo);

    this.dino=new TRex(this,100,this.config.height/2,"Trex");
    this.backgroundLayer.game.add(this.dino);

    //this.physics.add.collider(this.pipes, this.bird);
    this.invironment=new Cactuses(this,this.backgroundLayer.game);
    this.physics.add.collider(this.dino,this.invironment.getGroup(),this.gameOver,null,this);

    //this.physics.add.collider(this.dino, this.invironment, this.dino.hitCactus, null, this.dino); deteccion doble salto cuando saltas un catus

    this.score=new Score(this,16,16,this.backgroundLayer.ui);
    var pause_button=this.add.image(this.config.width-10,10,"pause_button").setOrigin(1,0);
    /*-> no funciona el button*/pause_button.on("pointer-down",this.pause,this);

    this.invironment.onObstacleExited=()=>{
        this.score.addScore(1);
    }
    this.invironment.start(); //Descomentar para que jale
  }

  update(){
    /*this.dino.checkOffbounds(()=>{
        this.gameOver();
    })*/ //Por esto se reiniciaba el nivel cada que se reseteaba la escala del dino
    this.invironment.update();
  }


  gameOver(){
    alert("Game Over");
    this.score.checkHighScore();
    this.scene.restart();
  }
  pause(){
    this.physics.pause();
    this.scene.pause();
  }
}

