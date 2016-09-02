define(['jquery','lib/arttemplate'],function($,tpl){
    if(location.href.indexOf('restaurant.html')== -1) return;
    $.ajax({
        url:'../data/diningHall.json',
        success:function(e){
            var html=tpl('list',e);
            $('.ordering-content').html(html).trigger('render');
        }
    })
    var listArr=[];
    $('.ordering-content').on('render',function(){
        /*配送费*/
        var allDl=$('.ordering-content').find('dl');
        function info(){
            allDl.each(function(i,v){
                var listObj={};
                listObj['dom']=v;
                listObj['start']=$(v).attr('start');
                listObj['time']=$(v).attr('time');
                listObj['tip']=$(v).attr('tip');
                listArr.push(listObj);
            })
            return listArr;
        };
        listArr=  info();
        $('.loading-ul').on('click','li',function(){
            var str='';
            $(this).find('span').addClass('change').parent().siblings().find('span').removeClass('change');

            if($(this).hasClass('startTip')){
               var arr=listArr.sort(function(a,b){
                    return Number(a.start)>Number(b.start);
                });
                var res=arr;
                $.each(res,function(i,v){
                    var time=res[i].time;
                    var start=res[i].start;
                    var tip=res[i].tip;
                    str+='<dl start='+start+' time='+time+' tip='+tip+'>'+ v.dom.innerHTML+'</dl>'
                })
                $('.ordering-content').html(str)
            }else if($(this).hasClass('time')){
                var arr=listArr.sort(function(a,b){
                    return Number(a.time)>Number(b.time);
                });
                var res=arr;
                $.each(res,function(i,v){
                    var time=res[i].time;
                    var start=res[i].start;
                    var tip=res[i].tip;
                    str+='<dl start='+start+' time='+time+' tip='+tip+'>'+ v.dom.innerHTML+'</dl>'
                })
                $('.ordering-content').html(str)
            }else if($(this).hasClass('tip')){
                var arr=listArr.sort(function(a,b){
                    return Number(a.tip)>Number(b.tip);
                });
                var res=arr;
                $.each(res,function(i,v){
                    var time=res[i].time;
                    var start=res[i].start;
                    var tip=res[i].tip;
                    str+='<dl start='+start+' time='+time+' tip='+tip+'>'+ v.dom.innerHTML+'</dl>'
                })
                $('.ordering-content').html(str)
            }
        })
        $(".zhi").on("click",function(){
            location.href='fifty.html'
        })
        $(".taocan").on("click",function(){
            location.href='combo.html'
        })
        $(".ordering-content").on("click",'dl',function(){
            var name=$(this).attr("name"),
                img=$(this).attr("img"),
                startTip=$(this).attr("start"),
                time=$(this).attr("time"),
                sales=$(this).attr("sales"),
                tip=$(this).attr("tip");
            location.href='detail.html?name='+name+'&img='+img+'&startTip='+startTip+'&time='+time+'&tip='+tip+'&sales='+sales;

        })
    })
})