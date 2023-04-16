
const CACTU_SPAWN_TIME=3000;
const CATU_VELOCITY=150;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE=[50,250]//bajar rangos
const DEFAULT_PIPE_GAP_SIZE_RANGE=[100,300]

export default class Cactuses{
    constructor(scene,layer){
      this.scene=scene;
        this.group=scene.physics.add.group({
          allowGravity:false,
          immovable:true
        }); 
      this.obstacle=[];
      this.pool=[];
      this.layer=layer;
      this.onPipeExited= ()=>{};
    }

    start(){
      this.spawnPipe();
      this.scene.time.addEvent({
        delay: CACTU_SPAWN_TIME,
        callback: () => {
          this.spawnPipe();
        },
        loop: true
       });
    } 
    update(){
      for(let i=0;i<this.obstacle.length;i++){
          const pipe=this.obstacle[i];
          if(pipe.hasExitScreen()){
              this.moveToPool(pipe,i);
              this.onPipeExited();
              break;
          }
      }
    }
    spawnPipe(){
     let pipe=null;
     //Object pooling
      if(this.pool.length>0){
       pipe=this.pool[0];
       pipe.resetPosition();
       this.pool.splice(0,1);
     }else{
      pipe=new Cactus(this.group,this.scene.config.width,this.layer);
     
     }
     
     pipe.setVelocity(CATU_VELOCITY);
     pipe.setVisible(true);
     this.obstacle.push(pipe);
    }
    moveToPool(pipe,index){
      this.obstacle.splice(index,1);
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