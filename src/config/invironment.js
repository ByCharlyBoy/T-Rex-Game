
const CACTU_SPAWN_TIME=2000;
const CATU_VELOCITY=300;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE=[300,250]//bajar rangos
const DEFAULT_PIPE_GAP_SIZE_RANGE=[100,300] //Rango de tamanos 

export default class Cactuses{
  constructor(scene,layer){
    this.scene=scene;
      this.group=scene.physics.add.group({
        allowGravity:false,
        immovable:true
      }); 

    this.obstacle=[];
    this.pool=[];
    this.layer = layer;
    this.onPipeExited = ()=>{};
  }

  start(){
    this.spawnObstacle();
    this.scene.time.addEvent({
      delay: CACTU_SPAWN_TIME,
      callback: () => {
        this.spawnObstacle();
      },
      loop: true
     });
  } 

  update(){
    for(let i=0;i<this.obstacle.length;i++){ //metodo object pooling
        const cactu=this.obstacle[i];
        if(cactu.hasExitScreen()){
            this.moveToPool(cactu,i);
            this.onPipeExited();
            break;
        }
    }
  }

  spawnObstacle(){
    let cactus=null;
    //Object pooling
     if(this.pool.length>0){
      cactus=this.pool[0];
      cactus.resetPosition();
      this.pool.splice(0,1);
    }else{
     cactus=new Cactus(this.group,this.scene.config.width,this.layer);
    }
    
    cactus.setVelocity(CATU_VELOCITY);
    cactus.setVisible(true);
    this.obstacle.push(cactus);
    //se mueve basatante random jajaja
    /*let distance = Phaser.Math.Between(...DEFAULT_PIPE_GAP_SIZE_RANGE) + 300; //anade dis fija
    this.scene.tweens.add({
      targets: cactus.group.getChildren(),
      x: '-=' + distance,
      duration: 1000,
      ease: 'Power2',
    }); */
   }

   moveToPool(obstac,index){
     this.obstacle.splice(index,1);
     this.pool.push(obstac);
     obstac.setVisible(false);
     obstac.setVelocity(0);
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
    let spawnPosition=Phaser.Math.Between(...this.pipeSpawnPositionRange);
    let gapSize=Phaser.Math.Between(...this.pipeGapSizeRange);
    this.upper=group.create(spawnX,spawnPosition,"obstacle-1").setOrigin(0,1);
    this.lower=group.create(spawnX,spawnPosition+gapSize,"obstacle-1").setOrigin(0);
    layer.add([this.upper,this.lower]);
  }

  resetPosition(){
    this.upper.x=this.spawnX; ///
    //this.lower.x=this.spawnX;
  }

  setVelocity(velocity){
    this.upper.body.velocity.x= -velocity; //
    //this.lower.body.velocity.x= -velocity;
  }

  setVisible(state){
    //this.upper.visible=state; //
    this.lower.visible=state;
  }

  hasExitScreen(){
    return this.upper.getBounds().right < 0;
  }
} 

