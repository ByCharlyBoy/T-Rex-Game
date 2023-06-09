const JUMP_VELOCITY = 250;
const OFFBOUNS_THERSHOLD = 15;
const MAX_JUMPS = 2; // registra el número máximo de saltos permitidos
let jumps = 0; // registra el número de saltos realizados

export default class TRex extends Phaser.GameObjects.Sprite{
   
    constructor(scene, x, y, texture){
        super(scene,x,y,texture);
        this.scene=scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        scene.input.keyboard.on("keydown-SPACE",this.jump,this);
        scene.input.keyboard.on("keydown-W",this.jump,this); 
        scene.input.keyboard.on("keydown-S",this.shrink,this);
    
        /*scene.input.keyboard.on("keydown-S", () => {
            scene.setScale(1.5, 0.5); 
            console.log("se te encoje la raja"); 
        }); */

        this.body.setCollideWorldBounds(true);
        this.isShrunk = false; 
        this.jumpCount = 0; 
        this.body.onWorldBounds = true; 
        this.scene.physics.world.on('worldbounds', this.checkOffbounds, this);

    }

    checkOffbounds(callback){
       if(this.getBounds().top >= 0-OFFBOUNS_THERSHOLD&&this.getBounds().bottom<=this.scene.config.height+OFFBOUNS_THERSHOLD){
           return;
        }
        callback();

        /*if(this.getBounds().top >= this.scene.physics.world.bounds.height - OFFBOUNS_THERSHOLD){
            this.jumpCount = 0;
        }*/
    }

    jump(){
        
        //if (this.jumpCount < 2) { // permitir solamente dos saltos
            this.body.velocity.y = -JUMP_VELOCITY;
        //    this.jumpCount++;
        //}
    }

    hitCactus() {
        this.jumpCount = 0;
    }

    shrink(){
        
        if (this.isShrunk) {
            this.setScale(1); 
            this.isShrunk = false; 
        }
        else {
            this.setScale(1, 0.5); 
            this.isShrunk = true; 
        }
    }
}
    
