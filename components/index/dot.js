export default class Dot {
	constructor(option){

		this.context = option.context;
		this.x = option.x;
		this.y = option.y;

		this.r = option.r;
		this.g = option.g;
		this.b = option.b;
		this.a = option.a;

		this.height = option.context.canvas.height;

		this.speed = Math.random()*10;

		this.render();

	}

	render(){
		var { context,x,y,r,g,b,a } = this;
		context.fillStyle = 'rgba(' + r + ',' + g + ' ,' + b  + ' ,' + a  + ')';
		context.beginPath();
		context.arc(x,y,1,0,Math.PI*2,false);
		context.closePath()
		context.fill()
	}
	update(){
		this.y += this.speed;
		if(this.y>this.height){
			this.y = this.height;
		}

		this.render();
	}
}