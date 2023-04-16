
const PIPE_SPAWN_TIME=3000;
const PIPE_VELOCITY=150;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE=[50,250]
const DEFAULT_PIPE_GAP_SIZE_RANGE=[100,300]

export default class Cactuses{
    constructor(scene,layer){
        this.scene=scene;
          this.group=scene.physics.add.group({
            allowGravity:false,
            immovable:true
          }); 
        this.obstacles=[];
        this.pool=[];
        this.layer=layer;
        this.onPipeExited= ()=>{};
    }

    start(){
        this.spawnPipe();
        this.scene.time.addEvent({
          delay: PIPE_SPAWN_TIME,
          callback: () => {
            this.spawnPipe();
          },
          loop: true
         });
    } 
    update(){
        for(let i=0;i<this.obstacles.length;i++){
            const pipe=this.obstacles[i];
            if(pipe.hasExitScreen()){
                this.moveToPool(pipe,i);
                this.onPipeExited();
                break;
            }
        }
    }
    spawnPipe(){
       let obstacl=null;
       //Object pooling
        if(this.pool.length>0){
         obstacl=this.pool[0];
         obstacl.resetPosition();
         this.pool.splice(0,1);
       }else{
        pipe=new Cactus(this.group,this.scene.config.width,this.layer);
       
       }
       
       obstacl.setVelocity(PIPE_VELOCITY);
       obstacl.setVisible(true);
       this.obstacles.push(obstacl);
      }
      moveToPool(pipe,index){
        this.obstacles.splice(index,1);
        this.pool.push(pipe);
        pipe.setVisible(false);
        pipe.setVelocity(0);
      }
      getGroup(){
        return this.group;
      }
}

class Cactus{
    constructor(group,spawnX,layer){
        this.group=group;
        this.spawnX=spawnX;
        this.pipeSpawnPositionRange=DEFAULT_PIPE_SPAWN_POSITION_RANGE;
        this.pipeGapSizeRange=DEFAULT_PIPE_GAP_SIZE_RANGE;
        var spawnPosition=Phaser.Math.Between(...this.pipeSpawnPositionRange);
        var gapSize=Phaser.Math.Between(...this.pipeGapSizeRange);
        this.upper=group.create(spawnX,spawnPosition,"pipe").setOrigin(0,1);
        this.lower=group.create(spawnX,spawnPosition+gapSize,"pipe").setOrigin(0);
       layer.add([this.upper,this.lower]);
    }

    resetPosition(){
        this.upper.x=this.spawnX;
        this.lower.x=this.spawnX;
    }
    setVelocity(velocity){
        this.upper.body.velocity.x= -velocity;
        this.lower.body.velocity.x= -velocity;
    }
    setVisible(state){
        this.upper.visible=state;
        this.lower.visible=state;
    }
    hasExitScreen(){
        return this.upper.getBounds().right < 0;
    }
} 