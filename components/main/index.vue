<template>
	<transition name='main'>
		<div @touchmove='creatingBuild($event)' class="lt-full zmiti-main-main-ui "  :class="{'show':show}" ref='page'>
			
			<canvas v-show='!createImg' ref='canvas' :width='viewW' :height='viewH'></canvas>
			<transition name="zmiti-scale"
				@after-enter="afterEnter"
			 >
			    <div ref='createimgs'  class="zmiti-createimg"  v-if='createImg'>
					<img :src="createImg" alt="">
				</div>
			</transition>

			<div class="zmiti-building-C" :class="{'hide':beginPhoto}">
				<section class="zmiti-build-bar">
					<div v-tap='[tab,0]' :class="{'active':index === 0}"><img :src="imgs.housebar"></div>
					<div v-tap='[tab,1]' :class="{'active':index === 1}"><img :src="imgs.roadbar"></div>
					<div v-tap='[tab,2]' :class="{'active':index === 2}"><img :src="imgs.grassbar"></div>
					<div v-tap='[tab,3]' :class="{'active':index === 3}"><img :src="imgs.carbar"></div>
					<div v-tap='[photo]'>
						<img :src="imgs.photo">
						<span>拍照分享</span>
					</div>
				</section>
				<div ref='scroll' style="overflow: hidden">
					<section :style='{width:builingList[index].length*220+"px"}'>
						<div @touchstart='beginCreate($event)' @touchend="endCreate($event,build)" v-for='build in builingList[index]' class="zmiti-build" :key='build.url' :style="{background:' url('+build.url+') no-repeat center center',backgroundSize:build.size?build.size:'contain'}">
							<img @touchstart='imgStart($event)' :src="build.url" style="opacity:0;width:100%;height:100%;border:1px solid red">
						</div>
					</section>
				</div>
			</div>
			<transition name='btn'>
				<div class="zmiti-share-btns" v-if='showBtns'>
					<div v-tap='[restart]' :class="{'active':isrestart}" @touchstart='isrestart = true' @touchend='isrestart=false'>重建</div> <div v-tap='[share]' :class="{'active':isshare}" @touchstart='isshare = true' @touchend='isshare=false'>分享</div>
		 		</div>
			</transition>
			<div class="zmiti-target" v-if='target.src' :style='target.style'>
				<img :src="target.src">
			</div>
			<div class="zmiti-mask" v-if='showMasks' @touchstart='showMasks = false'>
				<img :src="imgs.arrow" alt="">
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import $ from 'jquery';
	import {Build} from './obstacle'
	import IScroll from 'iscroll';
	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showTeam:false,
				show:false,
				showMasks:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				createImg:'',
				isUp:false,
				index:0,
				showTrash:false,
				isshare:false,
				count:0,
				isrestart:false,
				beginPhoto:false,
				showBtns:false,
				target:{
					src:'',
					style:{

					}
				},
				lastBuild:null,
				groups:[
					[],
					[],
					[],
					[]
				],

				builingList:[
					[

						{url:imgs.house16,scale:1},
						{url:imgs.grass4,scale:2},
						{url:imgs.grass5,scale:2},
						{url:imgs.house15,scale:2},
						
						{url:imgs.house17,scale:1},
						{url:imgs.house18,scale:1},
						{url:imgs.house4,scale:1},
						{url:imgs.grass6,scale:2},
						{url:imgs.grass7,scale:2},
						
						{url:imgs.grass9,scale:2},
						{url:imgs.house5,scale:1},
						{url:imgs.house6,scale:1},
						{url:imgs.grass8,scale:2},
						{url:imgs.house7,scale:1},
						{url:imgs.house8,scale:1},
						{url:imgs.house9,scale:1.5},
						{url:imgs.house10,scale:1.5},
						{url:imgs.house11,scale:2},
						{url:imgs.house12,scale:1.5},
						{url:imgs.house13,scale:1},
						{url:imgs.house14,scale:2},
						{url:imgs.house2,scale:1},
					],
					[
						{url:imgs.road1},
						{url:imgs.road2},
						{url:imgs.road3},
						{url:imgs.road4},
						{url:imgs.road5},
						{url:imgs.road6},
						{url:imgs.road7},
					],
					[
						
						{url:imgs.grass1,scale:3,left:225},
						{url:imgs.grass2,scale:3,left:225},
						{url:imgs.grass3,scale:3,left:225}
					],[
						{url:imgs.car1,scale:1,size:'auto'},
						{url:imgs.car2,scale:1,size:'auto'},
						{url:imgs.car3,scale:1,size:'auto'},
						{url:imgs.car4,scale:1,size:'auto'},
						{url:imgs.car5,scale:1,size:'auto'},
						{url:imgs.car6,scale:1,size:'auto'},
						{url:imgs.car7,scale:1,size:'auto'},
						{url:imgs.car8,scale:1,size:'auto'},
						{url:imgs.car9,scale:1,size:'auto'},
					]
				]
				 
			}
		},
		components:{
		},
		
		methods:{
			afterEnter(){
				this.showBtns = true;
			},
			photo(){
				this.beginPhoto = true;
				var copyright = new createjs.Bitmap(imgs.copyright);
				copyright.x = 0;
				copyright.y = this.viewH - 200;

				
				this.stage.addChild(copyright);

				setTimeout(()=>{
					this.createImg = this.$refs['canvas'].toDataURL();
		        	this.showBtns = true;
				},100)
			},
			share(){
				this.showMasks = true
			},
			restart(){
				setTimeout(()=>{
					window.location.href = window.location.href.split('?')[0]; 
				},100)
			},
			imgStart(e){
				e.preventDefault()
			},
			tab(index){
				this.index = index;
				setTimeout(()=>{
					this.scroll.refresh();
				},100)
			},
			initCanvas(){
				var canvas = this.$refs['canvas'];
				var stage = new createjs.Stage(canvas);
				this.stage = stage;
				createjs.Touch.enable(stage,true,false);

				var bg = new createjs.Shape();
				bg.graphics.beginFill('#d0d0d0').drawRect(0,0,this.viewW,this.viewH);//eceac6
				stage.addChild(bg);

				this.bg = bg;
				///bg.graphics._fill.style = 'red'

				var start = new createjs.Bitmap(imgs.start);
				this.start = start;
				start.y = -10;
				stage.addChild(start);

				var trash = new createjs.Bitmap(imgs.trash);
				trash.y = this.viewH - 300 - 133;
				trash.x = -10;
				trash.alpha = 0;
				trash.name = 'trash';
				stage.addChild(trash);


				
				var data = {
			        images: [imgs.subtitle],
			        framerate: 20,
			        frames: {width:270, height:330,count:4},
			        animations: {
			            run:[0,3]
			        }
			    };
				var subtitle = new createjs.SpriteSheet(data);
		
				var animation = new createjs.Sprite(subtitle, "run");
				animation.name = 'subtitle';

				stage.addChild(animation);
				var angle = 0;
				//createjs.Ticker.timingMode = createjs.Ticker.RAF;

				createjs.Ticker.addEventListener("tick", ()=>{
					angle+=4;
					angle %= 360;
					animation.y = Math.sin(angle/180*Math.PI)*10;

					stage.update();
				});
				
				this.trash = trash;



				/*createjs.Ticker.setFPS(30);
				createjs.Ticker.addEventListener("tick", handleTick);
				function handleTick(event) {
				    stage.update();
				}*/
				
				//this.createBuild({url:this.imgs.logo,stage});

			},
			createBuild(option){
				var {obserable} = this;

				var b = new Build({
					stage:option.stage,
					img:option.url,
					x:option.x,
					y:option.y,
					scale:option.scale,
					groups:this.groups,
					index:this.index,
					lastBuild:this.lastBuild,
					lastRoad:this.lastRoad,
					obserable,
					
				});
				this.stage.count = this.stage.count || 0;
				this.stage.count+=1;
				if(this.stage.count>3){
					this.bg.graphics._fill.style = '#eceac6';
					this.start.visible = false;
					//this.stage.update();

				}
				if(!this.lastBuild && this.index !==2 ){
					this.lastBuild = b.image
				}
				
				if(this.index === 1 && !this.lastRoad ){
					this.lastRoad = b.image;
				}


				this.groups[this.index].push(b);
				
			},
			beginCreate(e){
				var ev = e.changedTouches[0];
				var startX = ev.pageX,
					startY = ev.pageY;
				this.startX = startX ;
				this.startY = startY;
				this.iNow = 0;
				//document.title = 'begin drag'
			},
			creatingBuild(e){
				var ev = e.changedTouches[0];

				if(this.iNow <= 5){
					this.iNow++;
					this.isUp = Math.abs(ev.pageY - this.startY) > Math.abs(ev.pageX - this.startX);
					if(this.isUp){
						this.target = {
							startX:this.startX,
							startY:this.startY,
							src:e.target.src,
							style:{
								width:100+'px',
								height:e.target.height/e.target.width*100+'px',
								left:e.target.offsetLeft+this.scroll.x+'px',
								top:this.viewH - 180 + 'px',
								opacity:.6
							}
						}
					}
				}
				if(this.isUp){

					this.target.style= {
						width:100+'px',
						height:e.target.height/e.target.width*100+'px',
						left:e.target.offsetLeft+(ev.pageX-this.target.startX)+70+this.scroll.x+'px',
						top:this.viewH - 180  +(ev.pageY-this.target.startY) + 'px',
					}

					//document.title = 'dragging....'
				}else{
					//document.title = 'dragging left right';
				}
			},
			endCreate(e,build){
				var ev = e.changedTouches[0];
				var endX = ev.pageX,
					endY = ev.pageY;
					this.iNow = 0;
				var {stage,target,isUp} =  this;

				this.target = {};
				if(!isUp){
					return;
				}
				if(endY>this.viewH - 300){
					return;//还没拖到界面上面去。
				}

				//document.title = 'drag end....'

				this.createBuild({
					stage,
					url:target.src,
					x:endX - (build.left||0) ,
					y:endY-(build.left||0),
					scale:build.scale,
					isGrass:build.isGrass
				});



				
			}
		},
	
		mounted(){

			window.s = this;
			
			

			var {obserable} = this;

			this.scroll = new IScroll(this.$refs['scroll'],{
				scrollX:true,
				scrollY:false
			});

			setTimeout(()=>{
				this.scroll.refresh();
			},100)
		
			obserable.on('toggleMain',(data)=>{
				this.show = data.show;
				this.initCanvas();
			});

			obserable.on('toggleTrash',data=>{
				this.trash.alpha = data;
				this.stage.update();

				return this.trash;
			})

			obserable.on('showBg',()=>{
				this.bg.graphics._fill.style = '#d0d0d0';
				this.start.visible = true;
				
			})
		}
	}
</script>