define(['jquery','combo'],function($,combo){
    if(location.href.indexOf('combo.html')==-1) return;
//菜单点击高亮
    $("section ul").on('click','li',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

//列表渲染
    var listStr='<dl class="clear" numn="1">'+
        '<dt>'+
        '<img src="../{img}" alt="">'+
        '</dt>'+
        '<dd class="rd">'+
        '<h6><span>￥{price}</span><b>{name}</b></h6>'+
        '<p class="names">{address}</p>'+
        '<p class="cons"><span>{recommend}人推荐</span>'+
        '<span>月销{sales}份</span>'+
        '<span>配送费￥{tip}</span></p>'+
        '<p class="types">{content}</p>'+
        '</dd>'+'{bd}'+
        '</dl>';
    var ddstr='<dd class="bd">'+
        '<div class="btndv">'+
        '<span class="less">-</span> '+
        '<label class="nums">1</label>'+
        '<span class="add">+</span>'+
        '</div>'+
        '<button class="cart">加入购物车</button>'+
        '</dd>';
    $.ajax({
        url:"../data/combo.json",
        success:function(data){
            var obj=data.success;
            var listArr=[];
            //渲染
            xh(obj);
            obj.forEach(function(v,i){
                listArr.push(v);
            });

            //销量排序
            $('.nav1-num').on('click',function(){
                listArr.sort(function(a,b){
                    return a.sales-b.sales;
                });
                xh(listArr);
            });
            //评分排序
            $('.nav1-grade').on('click',function(){
                listArr.sort(function(a,b){
                    return a.recommend-b.recommend;
                });
                xh(listArr);
            });
        }
    });
    function xh (obj){
        var listr='';
        obj.forEach(function(v,i){
            listr+=listStr.replace('{img}',v.img)
                .replace('{name}',v.name)
                .replace('{price}',v.price)
                .replace('{address}',v.address)
                .replace('{recommend}',v.recommend)
                .replace('{sales}',v.sales)
                .replace('{tip}',v.tip)
                .replace('{content}',v.content)
                .replace('{bd}',ddstr);
        });
        $('.dining-list').html(listr);
        //listScroll.refresh();
    }
//列表点击

    $('.dining-list').on('click','dl',function(){
        var that=this;
        //点击添加active类名
        $(this).addClass('active').siblings().removeClass('active');
        var num=1;
        var _nums=$(this).find(".nums").html();
        if(_nums!=1){
            num = _nums;
        }else{
            num=1;
        }
        //点击--加减
        $(this).find('.bd').on('click','span',function(event){
            event.stopPropagation();

            if($(this).hasClass('less')){
                num--;
                if(num<=0) num=0;
                $(that).attr("numn",num);
                console.log(num);
            }else if($(this).hasClass('add')){
                num++;
                $(that).attr("numn",num);
                console.log(num);
            }
            $(that).find(".nums").html(num);
        });
        //加入购物车
        $('.dining-list').on('click','.cart',function(){
            var name=$(that).find('b').html(),
                price=$(that).find('h6 span').html().substr(1),
                cont=$(that).find('label').html();

            location.href='../html/message.html?name='+name+'&price='+price+'&cont='+cont;
        });

    });


//restaurant
    $(".restaurant").on('click',function(){
        location.href='../html/restaurant.html';
    });

//back
    $('.back').on('click',function(){
        history.back();
    });

})





















