/*!
 * 图片占位符 v0.0.1
 * http://github.com/yangjiyuan/image-placeholder
 *
 * Copyright (c) 2015, YangJiyuan <yjy972080142@gmail.com>
 * MIT license
 * Date: 2015-12-26
 */
'use strict';

(function(doc,win){
    var cache = {}, /* 缓存上一次生成canvas的宽高和base64，如果下一次和上一次的宽高一样，
                      也就是连续两次的图大小一样，那么canvas就不用再生成一次，直接获取缓存的。
                      因为当有大量的图片时，尤其是统一格式的图片列表，这种情况下，图片的宽高都一样，
                      没有必要每一个图片都生成一次canvas，而是只需要获取上一次缓存的就行，性能会好一点。
                      但是同时由于闭包的原因，全局变量DEFAULT_MARGIN等都需要重置。cache也要在每一次调用的时候清空*/
        DEFAULT_MARGIN = 0,
        TEXT_COLOR,//文本颜色
        BG_COLOR; //背景颜色
    var placeholder = function (element,options) {
        if(!element){
            return;
        }
        if(!options){
            options = {};
        }
        cache = {}; //每新调用一次函数，清空一次缓存
        if('string' === typeof element){
            element = doc.querySelectorAll(element);
        }else if('undefined' === typeof element.length){
            element = [element];
        }
        var i,len = element.length;
        for(i=0;i<len;i++){
            bindErrorEvent(element[i],options);
        }
    };

    /**
     * 根据ele生成canvas，并绑定error事件
     * @param element
     * @param options
     */
    function bindErrorEvent(element,options){
        if(!element){
            return;
        }
        element.onerror = function () {
            var style;
            try{
                style = win.getComputedStyle(element);
            }catch(e){
                style = {};
            }
            options.height = parseInt(style.height,10);
            options.width = parseInt(style.width,10);
            var base64Data,key;
            key = options.height + ':' + options.width;
            if(key in cache){
                base64Data = cache[key];
            }else{
                base64Data = placeholder.getBase64Data(options);
                cache[key] = base64Data;
            }
            if(base64Data){
                element.src = base64Data;
            }
        };
    }
    win.placeholder = placeholder;

    placeholder.getCanvas = function (options) {
        if(!options){
            options = {};
        }
        DEFAULT_MARGIN = 0;
        TEXT_COLOR = options.textColor || '#fff';
        BG_COLOR = options.bgColor || '#ddd';
        var canvas = doc.createElement('canvas');

        var canvasWidth = +options.width,
            canvasHeight = +options.height;
        if(!canvasWidth || !canvasHeight || canvasWidth <0 || canvasHeight < 0 || win.isNaN(canvasHeight)|| win.isNaN(canvasWidth)){
            win.console.warn('[image-placeholder]:minssing height or width!');
            canvas.setAttribute('width','0');//如果没有传递宽高的话生成一个宽高都是0的canvas，因为生成的canvas是有默认宽高的
            canvas.setAttribute('height','0');
            canvas.available = false;
            return canvas;
        }
        canvas.available = true; //定义一个变量，记录生成的canvas是否可用，即是否有宽高等必要属性
        canvas.setAttribute('width',''+canvasWidth);
        canvas.setAttribute('height',''+canvasHeight);
        canvas.iconWidth = options.iconWidth;
        canvas.iconHeight = options.iconHeight;
        var cxt = canvas.getContext('2d');

        var text = options.text || 'image is unavailable',//默认文字
            fontSize = options.fontSize || Math.min(canvasWidth,canvasHeight)*0.15; //默认字体大小为最小边的0.15
        //绘制整体背景色
        cxt.fillStyle=BG_COLOR;
        cxt.fillRect(0,0,canvasWidth,canvasHeight);
        if(options.icon){
            DEFAULT_MARGIN = fontSize/2;
            drawIcon(canvas);
        }
        //显示文字
        cxt.fillStyle=TEXT_COLOR;
        cxt.font= fontSize+"px Times New Roman";
        cxt.textAlign = 'center';
        cxt.textBaseline = 'middle';
        cxt.fillText(text,canvasWidth/2,canvasHeight/2+2*DEFAULT_MARGIN,canvasWidth*0.8);
        return canvas;
    };
    placeholder.getBase64Data = function (options) {
        var canvas = placeholder.getCanvas(options);
        if(canvas.available){
            console.log(canvas.toDataURL())
            return canvas.toDataURL();
        }
        return '';
    };
    /**
     * 绘制图标
     * @param {object} canvas - canvas对象
     */
    function drawIcon(canvas){
        var canvasWidth = canvas.getAttribute('width'),
            canvasHeight = canvas.getAttribute('height');
        var cxt = canvas.getContext('2d');
        var iconWidth = canvas.iconWidth || canvasWidth*0.15,
            iconHeight = canvas.iconHeight || canvasHeight*0.15,
            padding = iconWidth*0.0857;
        // 计算内部图形偏移值
        var offsetX = (canvasWidth - iconWidth)/2,
            offsetY = (canvasHeight - iconHeight)/2-iconHeight/2-padding;
        //最外层的白色，带圆角
        cxt.fillStyle=TEXT_COLOR;
        cxt.beginPath();
        cxt.moveTo(offsetX-padding,offsetY);
        cxt.arcTo(offsetX-padding,offsetY-padding,offsetX,offsetY-padding,padding);
        cxt.lineTo(offsetX + iconWidth,offsetY-padding);
        cxt.arcTo(offsetX + iconWidth+padding,offsetY-padding,offsetX+iconWidth+padding,offsetY,padding);
        cxt.lineTo(offsetX + iconWidth+padding,offsetY + iconHeight);
        cxt.arcTo(offsetX + iconWidth+padding,offsetY + iconHeight+padding,offsetX + iconWidth,offsetY+iconHeight+padding,padding);
        cxt.lineTo(offsetX,offsetY+iconHeight+padding);
        cxt.arcTo(offsetX-padding,offsetY+iconHeight+padding,offsetX-padding,offsetY+iconHeight,padding);
        cxt.closePath();
        cxt.fill();
        //图标背景
        cxt.fillStyle=BG_COLOR;
        cxt.fillRect(offsetX,offsetY,iconWidth,iconHeight);
        cxt.fillStyle = TEXT_COLOR;
        //山
        cxt.beginPath();
        cxt.moveTo(iconWidth*0.0476+offsetX,iconHeight*0.8974+offsetY);
        cxt.bezierCurveTo(iconWidth*0.1476+offsetX, iconHeight*0.3013+offsetY, iconWidth*0.2714+offsetX, iconHeight*0.8462+offsetY, iconWidth*0.4476+offsetX, iconHeight*0.6154+offsetY);
        cxt.bezierCurveTo(iconWidth*0.6429+offsetX, iconHeight*0.2244+offsetY, iconWidth*0.8429+offsetX, iconHeight*0.1410+offsetY, iconWidth*0.9048+offsetX, iconHeight*0.8974+offsetY);
        cxt.closePath();
        cxt.fill();
        // 太阳
        cxt.beginPath();
        cxt.arc(iconWidth*0.2857+offsetX,iconHeight*0.2436+offsetY,iconHeight*0.15,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
    }
})(document,window);