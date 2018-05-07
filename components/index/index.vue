<template>
	<div v-tap='[entry]'  class="lt-full zmiti-index-main-ui "   :class="{'show':show}">
		
		<div class="zmiti-title">
			<img :src="imgs.title" @load='initCanvas($event)'  />
		</div>

		<div class="zmiti-index">
			<img :src="imgs.index">
		</div>
		<canvas ref='canvas' class="zmiti-canvas" :width="viewW" :height='290'></canvas>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import Toast from '../toast/toast';
	import Dot from './dot';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:false,
				toastMsg:'',
				cloudIndex:0,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				showMasks:false,
				dots:[],

			}
		},
		components:{
			 Toast
		},
		
		methods:{

			initCanvas(e){
				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');


				var offCanvas = document.createElement('canvas');
				var width = canvas.width,
					height= canvas.height;
				offCanvas.width = width;
				offCanvas.height = height;
				var offContext = offCanvas.getContext('2d');

				offContext.drawImage(e.target,65,0);


				var imgData = offContext.getImageData(0,0,width,height);
				context.putImageData(imgData,0,0);
				var gap = 4;
				for(var x =0;x<imgData.width;x+=gap){
					for(var y =0 ; y < imgData.height;y+=gap){
						var a = (x + y * imgData.width)*4;
						if(imgData.data[a+3]>50){
							/*var dot = new Dot({
								context,
								x,
								y,
								r:imgData.data[a],
								g:imgData.data[a+1],
								b:imgData.data[a+2],
								a:imgData.data[a+3]
							})
							this.dots.push(dot)*/
						}
					}
				}
				

				setTimeout(()=>{
					//
					

				},2000)




			},

			imgStart(e){
				e.preventDefault(); 
			},

			entry(){

				
			}
			
		},
		mounted(){


			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})


			setTimeout(()=>{
				//this.entry();
			},100)

		}
	}
</script>