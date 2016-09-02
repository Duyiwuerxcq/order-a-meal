define(['lib/arttemplate'],function(tpl){
	var deTpl =//'{{each success}}'+
			'<div class="detop">'+
				'<dl>'+
				'<dt><img class="imgs" src="../{{img}}" alt=""></dt>'+
				'<dd>'+
					'<p class="title">{{name}}</p>'+
					'<p>'+
						'<span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span>'+
						'<span class="sale">月售{{sales}}份</span>'+
					'</p>'+
					'<p>'+
						'<span class="startTip">起送费￥{{startTip}}</span>'+
						'<span class="tip">配送费￥{{tip}}</span>'+
						'<span class="time">预计{{time}}min送达</span>'+
					'</p>'+
				'</dd>'+
			'</dl>'+
			'</div>'+
			'<div class="debottom">'+
				'<div class="left">'+
					'<li class="bg"><a href="#">热销菜品</a></li>'+
					'<li><a href="#">经典套餐</a></li>'+
					'<li><a href="#">凉菜</a></li>'+
					'<li><a href="#">砂锅</a></li>'+
					'<li><a href="#">进口小吃</a></li>'+
				'</div>'+
				'<div class="right">'+
					'{{each goods}}'+
					'<div>'+
					'<p class="tit">{{$index}}</p>'+
					'{{each $value}}'+
					'<dl>'+
						'<dt><img src="../img/f01.jpg" alt="" /></dt>'+
						'<dd>'+
							'<p class="foodName">{{$value.foodName}}</p>'+
							'<p><span class="foodSale">月售{{$value.foodSale}}份</span><span class="good">好评{{$value.good}}</span></p>'+
							'<p class="price">￥{{$value.price}}</p>'+
							'<p class="choosenum">'+
								'<span class="reduce btn" name="{{$value.foodName}}" price="{{$value.price}}">-</span><span class="num">0</span><span class="add btn" name="{{$value.foodName}}" price="{{$value.price}}">+</span>'+
							'</p>'+
						'</dd>'+
					'</dl>'+
					'{{/each}}'+
					'</div>'+
					'{{/each}}'+
				'</div>'+
			'</div>';//+
			//'{{/each}}';
	return {
		detpl : deTpl
	}
})