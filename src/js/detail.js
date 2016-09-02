define(['jquery','lib/arttemplate','js/detpl'],function($,tpl,detpl){
	if(location.href.indexOf('detail.html')==-1)return false;

	function getUrl(){
		var date=decodeURI(location.search);
		date=date.slice(1).split("&");
		var arr=[];
		var obj={}
		for(var i=0;i<date.length;i++){
			arr=date[i].split("=")
			obj[arr[0]]=arr[1]
		}
		return obj
	}
	var url=getUrl();
    console.log(url)
	//数据渲染

	$.when($.ajax('../data/diningHall.json'))
	.done(function(data){
		var render = tpl.compile(detpl.detpl);
		var html = render(data.success[0]);

		$('.content').html(html).trigger('rendered');
		var detop=$(".detop");
		$(".title",detop).html(url.name);
		$(".sale",detop).html('月售'+url.sales+'份');
		$(".startTip",detop).html('起送费￥'+url.startTip);
		$(".tip",detop).html('配送费￥'+url.tip);
		$(".time",detop).html('预计'+url.time+'min送达');
		$(".imgs",detop).attr("src",'../'+url.img)
		localStorage.clear();

	})

	//加减
	$('.detail').on('rendered',function(){
		$('.right').find('.reduce').hide();
		$('.right').find('.num').hide();
		
		//点击增加按钮
		$('.right').on('click','.add',function(){
			$(this).siblings('.reduce').show();
			$(this).siblings('.num').show();
			var num=$(this).siblings('.num').text();
			num++;
			$(this).siblings('.num').html(num);
			
			var cid = $(this);
			storage(cid);
		})
		
		//点击减少按钮
		$('.right').on('click','.reduce',function(){
			var num=$(this).siblings('.num').text();
			num--;
			if(num<=0){
				$(this).hide();
				$(this).siblings('.num').hide();
				num = 0;
			}
			$(this).siblings('.num').html(num);
			var cid = $(this);
			storage(cid);
		})
		
		//数量框中得数量为0时、删除该选项
		$('.slide').on('click','.reduce',function(){
			var num=$(this).siblings('.num').text();
			num--;
			$(this).siblings('.num').html(num);
			if(num < 1){
				$(this).parents('li').remove();
			}
			var did = $(this);
			numstorage(did);
		})
		
		$('.slide').on('click','.add',function(){
			var num=$(this).siblings('.num').text();
			num++;
			$(this).siblings('.num').html(num);
			var did = $(this);
			numstorage(did);
		})
		
		//时间轴效果
		var H = $('header').outerHeight() + $('.detop').outerHeight();
		var $date = $('.right .tit');
		var topArr = [];
		$date.each(function(){
			topArr.push($(this).offset().top);
		})
		$('.right').scroll(function(){
			var srcTop = $(this).scrollTop() + H;
			for(var i=0;i<=topArr.length-1;i++){
				if(i==topArr.length-1){
					if(srcTop > topArr[i]){
						deadd(i);
					}else{
						deremove(i);
					}
				}else{
					if(srcTop > topArr[i] && srcTop<topArr[i+1]){
						deadd(i);
					}else{
						deremove(i);
					}	
				}
			}
		})
		function deadd(i){
			$('.right>div').eq(i).find('.tit').addClass('fixed');
			$('.left li').eq(i).addClass('bg');
		}
		function deremove(i){
			$('.right>div').eq(i).find('.tit').removeClass('fixed');
			$('.left li').eq(i).removeClass('bg');
		}
	})
	
	
	//数量框
	$('.count').click(function(){
		var str='';
		for(var i=0;i<localStorage.length;i++){
			var name=localStorage.key(i),
	    		arr=localStorage[name].split('-');
			var tit = arr[0],
				price = arr[1],
				num = arr[2];
			str+='<li>'+
				'<p class="con">'+
					'<span class="titleck">'+tit+'</span>'+
					'<span class="priceck">￥'+price+'</span>'+
				'</p>'+
				'<p class="choosenum">'+
					'<span class="reduce btn" name="'+name+'" price="'+price+'"  tit="'+tit+'" num="'+num+'">-</span>'+
					'<span class="num">'+num+'</span>'+
					'<span class="add btn" name="'+name+'" price="'+price+'" tit="'+tit+'" num="'+num+'">+</span>'+
				'</p>'+
			'</li>';
		}
		$('.slide').html(str);
		$('.slide').slideDown();
		
	})
	
	//点击任意地方数量框消失
	$(document).on('click',function(e){
		var target = $(e.target);
		if(target.closest('.slide').length == 0){
			if(target.closest('.defoot').length == 0 && target.closest('.reduce').length == 0){
				$('.slide').slideUp();
			}
		}
	})
	
	//存储
	function storage(cid){
		//存储
		var id = cid.parents('dl').index(),
			tit = cid.parents('dl').siblings('.tit').html(),
			name = cid.attr('name'),
			price = cid.attr('price'),
			n = cid.siblings('.num').html();
		var key = tit + '-' + id,
			value = name + '-' + price + '-' + n;
		localStorage.setItem(key,value);
		
		if(n<=0){
			localStorage.removeItem(key,value);
		}
		
		$('.count>span').html(localStorage.length);
		
		//总价
		var all = 0;
		for(var i=0;i<localStorage.length;i++){
			var name=localStorage.key(i),
	    		arr=localStorage[name].split('-');
			var name = arr[0],
				price = arr[1],
				num = arr[2];
			all+=price*num;
			
		}
		$('.total>span').html(all);
	}
	
	$('.count>span').html(localStorage.length);
	
	//数量框存储
	function numstorage(did){
		var tit = did.attr('name'),
			name = did.attr('tit'),
			price = did.attr('price'),
			n = did.attr('num');
		var key = tit,
			value = name + '-' + price + '-' + n;
		localStorage.setItem(key,value);
		
		if(n<=0){
			localStorage.removeItem(key,value);
		}
	}
	$(".selected").on("click",function(){
		location.href='message.html'
	})
})















