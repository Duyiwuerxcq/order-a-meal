 define(['jquery','js/gulpin','../data/citydata'],function($,gulpin,citydata){
 var City=function(){
  		gulpin.apply(this,[""]);
  		this.cityall=citydata.cityList;
  		var obj={};
  		var alphabet=[];
  		this.cityall.forEach(function(v,i){
  			if(!obj[v[1].charAt(0).toUpperCase()]){
  				obj[v[1].charAt(0).toUpperCase()]=[];
  				alphabet.push(v[1].charAt(0).toUpperCase());
  			}else{
  				obj[v[1].charAt(0).toUpperCase()].push(v);
  			}
  		})
  		this.obj=obj
  		this.alphabet=alphabet.sort();
  		
    }
    City.prototype = gulpin.prototype;
	City.prototype.init=function(){
		this.strs='<div class="city">\
		 		<div class="title">\
		 			<em class="angle-left back"></em>\
					选择配送城市\
		 		</div>\
		 		<div class="city-content">\
		 			<div class="current">\
		 				<p>搜索</p>\
		 				<div>\
		 					<input type="input" class="search" placeholder="请输入beijing/北京">\
		 				</div>\
		 			</div>\
		 			<div class="hot">\
		 				<p>热门</p>\
		 				<div class="hot-city"></div>\
		 			</div>\
		 			<div class="alphabet">\
		 				<p>更多</p>\
		 				<div class="alphabet-list"></div>\
		 			</div>\
		 			<div class="city-detail">\
		 			</div>\
		 		</div>\
		 	</div>\
		 	<div class="search-box"></div>';
		this.gulDom.innerHTML=this.strs;
		this.render();
		this.onEvent();
		$(".alphabet-list li[data=A]").click();
	};
	City.prototype.onEvent=function(){
		var that=this;
		$(".alphabet-list").on("click","li",function(){
			var data=$(this).attr("data");
			var str="<p>"+data+"</p><div>";
			that.obj[data].forEach(function(v,i){
				str+="<span>"+v[0]+"</span>";
			})
		 	str+="</div>";		
		 	$('.city-detail').html(str);			
		})		
		var hotcity=citydata.hotList;
		var hotstr="";
		hotcity.forEach(function(v,i){
			hotstr+="<span>"+v[0]+"</span>";
		})				
		$(".hot-city").html(hotstr);
		$(".gulpin .city").on("click","span",function(){
			var content=$(this).text();
			that.target.val(content);
			that._hide();
		})
		$(".search").on("input propertychange",function(){
			$(".search-box").show();
			var val=$(this).val();
			that.tests(val);

		})

	};
	City.prototype.render=function(){
		var str="";
		this.alphabet.forEach(function(v,i){
			str += '<li data="'+v+'">'+v+'</li>';
		})		
		$(".alphabet-list").html(str);			
	};
	City.prototype.tests=function(val){
		var len=val.length;
		if(len==0){
			$(".search-box").hide();
		}
		var resultarr=[];
		this.cityall.forEach(function(v,i){
			if(v[0].slice(0,len) == val || v[1].slice(0,len) == val || v[2].slice(0,len) == val){
				resultarr.push(v);
			}	
		})
		var resultstr="";
		$.each(resultarr,function(i,v){
			resultstr+="<span>"+v[0]+"</span>";
		})
		$(".search-box").html(resultstr);
	};
	City.prototype.show=function(target){
		this.init();
		this._show();
		this.target=target;
	};
	return new City;
})