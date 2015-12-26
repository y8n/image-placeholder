# image-placeholder

Image's placeholder.If image loading failure,placeholder image will shown in image's position.  
 
图像占位符。当图片加载失败的时候，占位符图片会显示在失败的图片位置上。

## Import Script [Download](https://raw.githubusercontent.com/yangjiyuan/image-placeholder/master/dist/image-placeholder.min.js)

```
<script src="path/to/image-placeholder/image-placeholder(.min).js"></script>
```

## Usage

```
// use with node
var img = document.querySelector('#image');
placeholder(img);

// use with selector
placeholder('#image');

// use with options
placeholder('#image',{
	icon:true,
	text:'Image loading failure'
})

// get canvas object
var canvas = placeholder.getCanvas({
	height:120,
	width:200
});
// get base64 data
var base64Data = placeholder.getBase64Data({
	height:120,
	width:200,
	icon:true
});
```
## Options
- **width** : placeholder's width
	- type:`number`
	- default: if use `placeholder` function,default value id image node's width.if use `placeholder.getCanvas` or `placeholder.getBase64Data` no default value and `width` is required.

- **height**:placeholder's height
	- type:`number`
	- default: if use `placeholder` function,default value id image node's height use `placeholder.getCanvas` or `placeholder.getBase64Data` no default value and `height ` is required.
	
- **icon**:show icon or not.
	- type:`boolean`
	- default:`true`

- **iconWidth**:icon's width when `icon` is set to `true
	- type:`number`
	- default:15% of the canvas's width 

- **iconHeight**:icon's height when `icon` is set to `true
	- type:`number`
	- default:15% of the canvas's height 

- **text**:text shown on the placeholder
	- type:`string`
	- default:`"image is unavailable"`

- **fontSize**:font size of the text
	- type : `number`
	- default : 15% of the minimum between canvas's width and height

- **bgColor**:background color of the placeholder
	- type : `string`
	- default : "#ddd"

- **textColor**:text color of the placeholder
	- type : `string`
	- default : "#fff"

## Result
#### Default image
![Default](images/default-image.png)
#### config options
![options1](images/options-image.png)
	 
## License
MIT license