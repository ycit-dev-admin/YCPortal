

$('.select2bs4').on('change', function () {
    /*$('li[name="abc"]').remove();*/
    $('#testLs li').remove();
    $.each($('.select2bs4').find(':selected'), function (key, value) {
        $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
        /*var val = $.parseJSON(value);*/
    })
    //console.log($('.select2bs4:checked'));
    //alert($(".select2bs4:checked").val());
});