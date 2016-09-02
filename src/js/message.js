define(['jquery','js/city'],function($,city){
$(".choiseCity").on('click',function(){
    city.show($('.adderss'));
})
})