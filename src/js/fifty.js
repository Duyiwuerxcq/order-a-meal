define(['jquery'],function($){
	if(location.href.indexOf('fifty.html')==-1) return;
	$('.nav ul').on('click','span',function(){
		$(this).addClass('active').parents('li').siblings('li').find('span').removeClass('active');
	})

	var html='<dl img="{img}" name="{name}" sales="{sales}" startTip="{startTip}" tip="{tip}" time="{time}">'+
		'<dt><img src="../{img}" alt=""></dt>'+
		'<dd>'+
		'<h4>{name}</h4>'+
		'<p><img src="../img/star.jpg" alt="">月售{sales}份</p>'+
		'<p>起送费￥<span>{startTip}</span>配送费￥<span>{tip}</span> 预计<span>{time}</span>min送达</p>'+
		'</dd>'+
		'</dl>';
	var arr=[];
	$.ajax({
		url:'../data/diningHall.json',
		success:function(e){
			var fiftyHtml='';
			//初始化渲染
			$.each(e.success,function(key,val){
				fiftyHtml+=html.replace(/{img}/g,val.img)
					.replace(/{name}/g,val.name)
					.replace(/{sales}/g,val.sales)
					.replace(/{startTip}/g,val.startTip)
					.replace(/{tip}/g,val.tip)
					.replace(/{time}/g,val.time)
				arr.push(val);
			})
			$('.dls').html(fiftyHtml);
			//送达时间
			$('.time').on('click',function(){
				arr.sort(function(a,b){
					if(a.time>b.time){
						return 1;
					}else if(a.time<b.time){
						return -1;
					}else{
						return 0;
					}
				});
				sortShow(arr)
			})
			//起送价
			$('.start').on('click',function(){
				arr.sort(function(a,b){
					if(a.startTip>b.startTip){
						return 1;
					}else if(a.startTip<b.startTip){
						return -1;
					}else{
						return 0;
					}
				});
				sortShow(arr)
			})
			//配送费
			$('.tip').on('click',function(){
				arr.sort(function(a,b){
					if(a.tip>b.tip){
						return 1;
					}else if(a.tip<b.tip){
						return -1;
					}else{
						return 0;
					}
				});
				sortShow(arr)
			})

			//按照排序重新渲染
			function sortShow(arr){
				fiftyHtml=''
				for(var i=0;i<arr.length;i++){
					fiftyHtml+=html.replace('{img}',arr[i].img)
						.replace('{name}',arr[i].name)
						.replace('{sales}',arr[i].sales)
						.replace('{startTip}',arr[i].startTip)
						.replace('{tip}',arr[i].tip)
						.replace('{time}',arr[i].time)
				}

				$('.dls').html(fiftyHtml);
			}

		}
	})
	$(".dls").on("click",'dl',function(){
		var name=$(this).attr("name"),
			img=$(this).attr("img"),
			startTip=$(this).attr("startTip"),
			time=$(this).attr("time"),
			sales=$(this).attr("sales"),
			tip=$(this).attr("tip");
		location.href='detail.html?name='+name+'&img='+img+'&startTip='+startTip+'&time='+time+'&tip='+tip+'&sales='+sales;
	})
})

