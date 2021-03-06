﻿ imgs = {
    play: './assets/images/play.png',
    logo: './assets/images/logo.png',
    arrow: './assets/images/arrow.png',
    title: './assets/images/title.png',

   // house1: './assets/images/house1.png',
    //house2: './assets/images/house2.png',
    //house3: './assets/images/house3.png',
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
    house17: './assets/images/house17.png',
    house18: './assets/images/house18.png',
    house20: './assets/images/house20.png',
    hand: './assets/images/hand.png',


    car1: './assets/images/car1.png',
    car2: './assets/images/car2.png',
    car3: './assets/images/car3.png',
    car4: './assets/images/car4.png',
    car5: './assets/images/car5.png',

    car6: './assets/images/car6.png',
    car7: './assets/images/car7.png',
    car8: './assets/images/car8.png',
    car9: './assets/images/car9.png',

    road1: './assets/images/road1.png',
    road2: './assets/images/road2.png',
    road3: './assets/images/road3.png',
    road4: './assets/images/road4.png',
    road5: './assets/images/road5.png',
    road6: './assets/images/road6.png',
    road7: './assets/images/road7.png',

    trash: './assets/images/trash.png',
    subtitle: './assets/images/subtitle2.png',
    title:'./assets/images/title.gif',
    start: './assets/images/start.jpg',

    grass1: './assets/images/grass1.png',
    grass2: './assets/images/grass2.png',
    grass3: './assets/images/grass3.png',
    grass4: './assets/images/grass4.png',
    grass5: './assets/images/grass5.png',

    grass6: './assets/images/grass6.png',
    grass7: './assets/images/grass7.png',
    grass8: './assets/images/grass8.png',
    grass9: './assets/images/grass9.png',

    index: './assets/images/index4.png',
    index1: './assets/images/index5.png',
    index2: './assets/images/index.jpg',
    cover: './assets/images/cover7.png',

    copyright: './assets/images/copyright4.jpg',
    photo: './assets/images/photo.png',
    housebar: './assets/images/house-bar.png',
    carbar: './assets/images/car-bar.png',
    grassbar: './assets/images/grass-bar.png',
    roadbar: './assets/images/road-bar.png'
}


var arr = [];
for (var attr in imgs) {
    arr.push(imgs[attr]);
}


var musics = {
    music: {
        src: './assets/music/bg.mp3',
        autoplay: false,
        name: 'bg',
        loop: true
    },
    photo: {
        src: './assets/music/photo.mp3',
        autoplay: false,
        name: "photo",
        loop: false
    }
};

(function() {
   if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
       handleFontSize();
   } else {
       if (document.addEventListener) {
           document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
       } else if (document.attachEvent) {
           document.attachEvent("WeixinJSBridgeReady", handleFontSize);
           document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
   }
   function handleFontSize() {
       // 设置网页字体为默认大小
       WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
       // 重写设置网页字体大小的事件
       WeixinJSBridge.on('menu:setfont', function() {
           WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
       });
   }
})();