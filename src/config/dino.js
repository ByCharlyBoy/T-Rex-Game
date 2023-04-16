const JUMP_VELOCITY = 250;
const OFFBOUNS_THERSHOLD = 15;

export default class TRex extends Phaser.GameObjects.Sprite{
   
    constructor(scene, x, y, texture){
        super(scene,x,y,texture);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.input.keyboard.on("keydown-SPACE",this.jump,this);
        scene.input.keyboard.on("keydown-W",this.jump,this); 
        scene.input.keyboard.on("keydown-S",this.jump,this); 

        this.body.setCollideWorldBounds(true);

    }

    checkOffbounds(callback){
        if(this.getBounds().top >= 0-OFFBOUNS_THERSHOLD&&this.getBounds().bottom<=this.scene.config.height+OFFBOUNS_THERSHOLD){
           return;
        }
        callback();
    }

    jump(){
        this.body.velocity.y = -JUMP_VELOCITY;
    }

    /*crunch(){
        this.body
    }*/
    
}