// Form Validation
$("#CreateCarNoInfo").validate({
    submitHandler: function (form) {
        form.submit();
    },
    ignore: [], // 要檢查Hidden欄位要加這個
    rules: {
        CarName234: "required"
    },
    messages: {
        CarName234: {
            required: "GG88"
        }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});