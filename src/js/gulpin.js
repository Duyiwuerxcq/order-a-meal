define([],function(){
	var Gulpin = function(option){
		 if(typeof option == 'undefined') option = {};
		this._class={
			showClass: option.show_class || "gulp-in",
			hideClass: option.hide_class || "gulp-out"
		};
		var gul=document.querySelector(".gulpin");
		if(gul){
			this.gulDom=gul;
			gul.className="gulpin "+ this._class.hideClass
		}else{
			var dom=document.createElement("div");
			dom.className="gulpin "+ this._class.hideClass
			document.querySelector(".container").appendChild(dom);
			this.gulDom=dom;
		};
		
		this.bindEvent();
	};
	Gulpin.prototype={
		_show:function(){
			this.gulDom.className=this.gulDom.className+" "+this._class.showClass;
		},
		_hide:function(){
			this.gulDom.className=this.gulDom.className.replace(this._class.showClass,"");
		},
		bindEvent:function(){
			var that=this;
			this.gulDom.addEventListener("click",function(e){
				var target= e.target || e.srcElement;
				if(target.className.indexOf("back")>-1){
					that._hide();
				}
			},false);
		}
	}
	return Gulpin;
})