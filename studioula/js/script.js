jQuery(document).ready(function() {

if ($('#mycarousel').length) {

/*������ �������� - �������*/
jQuery('#mycarousel').jcarousel({
   	wrap: 'circular', scroll: 1
});
    
/*������ �������� - ���������*/
jQuery('#mycarousel1').jcarousel({
    wrap: 'circular', scroll: 1
});

}

/*��������� ������������*/
$('.zakazFirm1').hover(function() {
    $(this).attr('src', 'images/zakaz-tvt2.png')
}, function() {
    $(this).attr('src', 'images/zakaz-tvt.png')
    }
)

/*���� �� ������*/
$('#qSubmit').click(function() {
        $(this).css({'margin-top':'1px','margin-left':'51px'})
}, function() {
    $(this).css({'margin-top':'0px','margin-left':'50px'})
    }
)

/*������ ��� ��������*/
$('div.circle').click(function () {
    $('div.circle').removeClass('blue')
    $(this).addClass('blue')
})   

/*������ pageButtons*/
$('li.pageButton a').click(function () {
    $('li.pageButton').removeClass('pageActive')
    $(this).parent().addClass('pageActive')
})  
   

});