class Build{
	constructor(option = {}){
		this.stage = option.stage;
		this.img = option.img;
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.scale = option.scale || 1;

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
		this.stage.addChild(bitmap);

		this.stage.update();

	}

	bindEvent(){

		var {image,stage} = this;
        var oldX;
        var oldY;
        image.addEventListener("mousedown",function(e){
            oldX= e.stageX-image.x;
            oldY= e.stageY - image.y;
            image.iNow = 0;
        });
        
        image.addEventListener("pressmove", function (e) {
        	
    		image.x = e.stageX - oldX;
        	image.y = e.stageY - oldY;
            stage.update();

        });

        image.addEventListener('pressup',()=>{
        	image.iNow = 0;
        })
	}


	update(){

	}
}

export default {Build}
