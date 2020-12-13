jQuery(document).ready(function() {

if ($('#mycarousel').length) {

/*первая карусель - проекты*/
jQuery('#mycarousel').jcarousel({
   	wrap: 'circular', scroll: 1
});
    
/*вторая карусель - заказчики*/
jQuery('#mycarousel1').jcarousel({
    wrap: 'circular', scroll: 1
});

}

/*подсветка табаквинторг*/
$('.zakazFirm1').hover(function() {
    $(this).attr('src', 'images/zakaz-tvt2.png')
}, function() {
    $(this).attr('src', 'images/zakaz-tvt.png')
    }
)

/*клик по кнопке*/
$('#qSubmit').click(function() {
        $(this).css({'margin-top':'1px','margin-left':'51px'})
}, function() {
    $(this).css({'margin-top':'0px','margin-left':'50px'})
    }
)

/*кружки для слайдшоу*/
$('div.circle').click(function () {
    $('div.circle').removeClass('blue')
    $(this).addClass('blue')
})   

/*кнопки pageButtons*/
$('li.pageButton a').click(function () {
    $('li.pageButton').removeClass('pageActive')
    $(this).parent().addClass('pageActive')
})  
   

});