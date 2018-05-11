class Build{
	constructor(option = {}){
		this.stage = option.stage;
		this.img = option.img;
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.scale = option.scale || 1;
		this.groups = option.groups;
		this.index = option.index;
		this.lastBuild = option.lastBuild;
		this.lastRoad = option.lastRoad;
		this.obserable = option.obserable;
		this.isGrass= option.isGrass;
		this.render();
		this.bindEvent();

	}

	render(){

		var bitmap = new createjs.Bitmap(this.img);
		this.image = bitmap;
		this.image.scaleX = this.scale;
		this.image.scaleY = this.scale;

		this.image.x = this.x;
		this.image.y = this.y;
		this.image.name = this.img;

		var subtitle = this.stage.getChildByName('subtitle');



		switch(this.index){
			case 0:
			case 3:
				this.stage.addChild(bitmap);
			break;
			case 1:
				if(this.lastBuild){
					this.stage.addChildAt(bitmap,this.stage.getChildIndex(this.lastBuild));	
				}else{
					this.stage.addChild(bitmap);	
				}
			break;
			case 2:
				if(this.lastBuild ){
					var obj = this.lastBuild;
					if(this.lastRoad){
						obj = this.lastRoad;
					}
					this.stage.addChildAt(bitmap,2);
				}else{
					this.stage.addChild(bitmap);	
				}
			break;
		}
		/*if(this.groups[1].length){

			
		}else{

			this.stage.addChild(bitmap);
		}*/
		this.stage.setChildIndex(subtitle,this.stage.children.length-1)
		this.stage.update();

	}

	bindEvent(){

		var {image,stage,obserable} = this;
        var oldX;
        var oldY;
        image.addEventListener("mousedown",function(e){
            oldX= e.stageX-image.x;
            oldY= e.stageY - image.y;
            image.iNow = 0;
            obserable.trigger({
            	type:'toggleTrash',
            	data:1
            })
        });
        
        image.addEventListener("pressmove", function (e) {
        	
    		image.x = e.stageX - oldX;
        	image.y = e.stageY - oldY;

            //stage.update();

        });

        image.addEventListener('pressup',(e)=>{
        	image.iNow = 0;

        	var trash = obserable.trigger({
            	type:'toggleTrash',
            	data:0
            });

            var dis = Math.sqrt(Math.pow( image.x - trash.x ,2) + Math.pow(image.y + image.image.height - (trash.y +  trash.image.height),2));
			var d = 128;
			if(this.index === 2){
				d = 152;
			}
            if(dis <= d || (image.x<0 && image.y>window.innerHeight-300-image.image.height*3)){
            	image.visible = false;
            	stage.count -=1;
            	if(stage.count<=3){
            		obserable.trigger({
            			type:'showBg'
            		})
            	}
            	//stage.update();
            }
        })
	}


	update(){

	}
}

export default {Build}
