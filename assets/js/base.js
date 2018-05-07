var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	arrow: './assets/images/arrow.png',
	title: './assets/images/title.png',
	
	house1: './assets/images/house1.png',
	house2: './assets/images/house2.png',
	house3: './assets/images/house3.png',
	house4: './assets/images/house4.png',
	house5: './assets/images/house5.png',

	house6: './assets/images/house6.png',
	house7: './assets/images/house7.png',
	house8: './assets/images/house8.png',
	house9: './assets/images/house9.png',
	house10: './assets/images/house10.png',

	house11: './assets/images/house11.png',
	house12: './assets/images/house12.png',
	house13: './assets/images/house13.png',
	house14: './assets/images/house14.png',
	house15: './assets/images/house15.png',

	house16: './assets/images/house16.png',
	
	photo: './assets/images/photo.png',
	housebar: './assets/images/house-bar.png',
	carbar: './assets/images/car-bar.png',
	lightbar: './assets/images/light-bar.png',
	roadbar: './assets/images/road-bar.png',



}


var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}


var levels = [
		
	{
		duration:4
	},
	{
		duration:3
	},
	{
		duration:2
	},
	{
		duration:1
	}

];
 
	
var musics = {
	music: {
		src: './assets/music/bg.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
}