import Phaser from "phaser";
import GameScene from "./scenes/gameScene"

const SHARED_CONFIG={
  width: 100,
  height: 150,
}

const config = {
  type: Phaser.AUTO,
  //parent: 'game', 
  //transparent, 
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true 
    }
  },
  scene:[new GameScene(SHARED_CONFIG)]
};

/*let game = */ new Phaser.Game(config);
