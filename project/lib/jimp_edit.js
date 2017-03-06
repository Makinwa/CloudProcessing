Jimp = require('jimp');

function JimpEdit(context)
{
	this.context = context;
}

JimpEdit.prototype.algorithm = function()
{
	var context = this.context; //JSON data input from user
	var style = context.getStyles(); //styles that user selected
	var value = context.getValues(); //value of the style, if needed

	//returns promise so others know when to execute
	return new Promise ( (res,rej) => {
		//reads image and performs edits
		Jimp.read('./public/img/'+value['fname']).then( function(image)
		{
			for (let key in style)
			{
				style[key](image,value[key]);

			}
			image.write("./public/img/edited/edited_"+value['fname']);

			res(value['fname']);

		}).catch( (err) => { console.log(err);rej(undefined); } );
	});
}

//Jimp functions for styles
var STYLE =
{
	crop: (image,v)=>{image.crop(parseInt(v[0]),parseInt(v[1]),parseInt(v[2]),parseInt(v[3])); },
	flip: (image,v)=>{  image.flip(v[0],v[1]);},
	brightness: (image,v)=>{image.brightness(parseInt(v))},
	fade: (image,v)=>{image.fade(parseInt(v))},
	background: (image,v)=>{image.background(''+v)},
	gaussian: (image,v)=>{image.gaussian(parseInt(v))},
	blur: (image,v)=>{ image.blur( parseInt(v) )},
	posterize: (image,v)=>{image.posterize(parseInt(v))},
	sepia: (image,v)=>{image.sepia()},
	greyscale: (image,v)=>{image.greyscale()},
	invert: (image,v)=>{image.invert()},
	mirror: (image,v)=>{image.mirror(v[0],v[1])},
	mask: (image,v)=>{image.mask(v[0],v[1],v[2])}
}

module.exports = JimpEdit;
module.exports.STYLE = STYLE;
