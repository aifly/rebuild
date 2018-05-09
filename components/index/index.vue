<template>
	<transition name='index'>
		<div   class="lt-full zmiti-index-main-ui " :style="{background: 'url('+imgs.index2+') no-repeat right bottom',backgroundSize:'cover'}"  v-if='show'>

			<div class="zmiti-cover lt-full" :class="{'hide':hideCover}" >
				<div>
					<img :src="imgs.cover" alt="" @touchstart='imgStart($event)'>
				</div>
			</div>
			<div class="zmiti-title">
				<img :src="index" alt="" @touchstart='imgStart($event)'>
			</div>

			<div v-if='hideCover' v-tap='[entry]' class="zmiti-entry" :class="{'active':press}" @touchstart='press = true' @touchend='press=false'>
				去建造
			</div>

		</div>
	</transition>
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
				show:true,
				toastMsg:'',
				hideCover:false,
				cloudIndex:0,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				showMasks:false,
				dots:[],
				index:imgs.index,
				press:false

			}
		},
		components:{
			 Toast
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},

			entry(){
				clearInterval(this.timer);
				this.show = false;
				var {obserable} = this;
				obserable.trigger({
					type:'toggleMain',
					data:{
						show:true
					}
				})

			}
			
		},
		mounted(){


			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			});

			setTimeout(()=>{
				this.hideCover = true;
			},4000)

			this.timer  = setInterval(()=>{
				if(this.index === imgs.index){
					this.index = imgs.index1
				}else{
					this.index = imgs.index
				}
			},1000)



		}
	}
</script>