// Form Validation
$('#creaet-customer-form').validate({
    submitHandler: function (form) {
        form.submit();
    },
    rules: {
        CompanyName: {
            required: true
        },
        CustomerName: {
            required: true
        },
        PsiType: {
            required: true
        }
    },
    messages: {
        CompanyName: {
            required: "該欄位為必填!!"
        },
        CustomerName: {
            required: "該欄位為必填!!"
        },
        PsiType: {
            required: "該欄位為必填!!"
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