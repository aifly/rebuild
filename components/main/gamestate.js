import {imgs} from '../lib/assets.js';
import {Stone,Split,SafeArea,Person} from './obstacle';
var mainGameState = {
	preload(){
		for (var img in imgs){
			this.game.load.image(img,imgs[img]);
		}
		this.game.stage.backgroundColor ='#f1ebcb';

	},
	create(){

		var arr =  [];
		var arr1 = [];


		this.game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎

		var viewW = window.innerWidth,
			viewH = window.innerHeight;
		this.viewW = viewW;
		this.viewH = viewH;
		for(var i =0 ; i<4;i++){
			if(i<6){
				var s1 = new Split({
					game:this.game,
					x:Math.random()*viewW,
					y:Math.random()*viewH,
					w:129,
					h:69,
					scale:Math.random()*2+.8,
					key:'split'
				})

				arr1.push(s1);
				this.game.world.setChildIndex(s1.stone,0);

				this.game.physics.enable(s1.stone, Phaser.Physics.ARCADE);

				//console.log(s1.stone.body)

			}
			var s = new Stone({
				game:this.game,
				x:Math.random()*(viewW - 100),
				y:-100
			})
			this.game.world.setChildIndex(s.stone,this.game.world.children.length-1);
			this.game.physics.enable(s.stone, Phaser.Physics.ARCADE);

			s.stone.body.velocity = new Phaser.Point(0, s.speed|0)
			s.stone.body.acceleration = new Phaser.Point(0,Math.random()*120+10)
			arr.push(s);

		}

		this.stoneArr = arr;
		this.splitArr = arr1;


		//安全区域

		var safe = new SafeArea({
			game:this.game,
			x:Math.random()*(viewW-248),
			y:Math.random()*(viewH/3-241),
			w:248,
			h:241,
			key:'safe'
		})

		this.game.physics.enable(safe.stone, Phaser.Physics.ARCADE);



		
	},
	update(){
		var {viewW,viewH} = this;
		this.num = this.num || 0;
		this.num++;
		if(this.num % 80 === 0){
			var s = new Stone({
				game:this.game,
				x:Math.random()*(viewW - 100),
				y:-100
			})
			this.game.world.setChildIndex(s.stone,this.game.world.children.length-1);
			this.game.physics.enable(s.stone, Phaser.Physics.ARCADE);

			s.stone.body.velocity = new Phaser.Point(0, s.speed|0)
			s.stone.body.acceleration = new Phaser.Point(0,Math.random()*120+10)
			this.stoneArr.push(s);

			this.stoneArr.forEach((item,i)=>{
				if(item.die){
					this.stoneArr.splice(i,1);
				}
			})
		}


		/*if(this.splitArr && this.splitArr.length){
			this.splitArr.map((item,i)=>{
				item.iNow++;

				if(item.iNow>=item.delay){
					item.stone.alpha = 0;
					this.splitArr.splice(i,1);
					var obj = new Split({
							game:this.game,
							x:Math.random()*viewW,
							y:Math.random()*viewH,
							w:129,
							h:69,
							scale:Math.random()*2+.2,
							key:'split'
						});
					this.splitArr.push(
						obj
					)
					
					this.game.world.setChildIndex(obj.stone,0);

				}
			});
		}*/

		if(this.stoneArr && this.stoneArr.length){
			this.stoneArr.map((item,i)=>{
			 
				if(item.stone.y>=item.maxHeight){
					item.stone.y = item.maxHeight;
					
					setTimeout(()=>{
						var tween = this.game.add.tween(item.stone);
						tween.to({
							alpha:0
						},1500, Phaser.Easing.Linear.None, true,0);

						tween.onComplete.add(()=>{
							
							item.stone.alpha  = 1;
							item.init();
							item.stone.y = -100;
							item.die = true;
							item.destroy();
						})
					},2000)
					
				}
 
			})
		}
	}
}
export default {mainGameState};