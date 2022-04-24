// Form Validation
$('#creaet-contract-form').validate({
    submitHandler: function (form) {

        form.submit();

    },
    rules: {
        StratTime: "required",
        EndTime: "required",
        ContractName: "required",
        PsiType: "required",
        CustomerGUID: "required",
        ProductGUID: "required",
        DealWeight: "required",
        DealUnitPrice: {
            required: true,
            pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
        }
    },
    messages: {
        DealUnitPrice: {
            pattern: "必須為大於0整數 且 最多2位小數"
        }
        //CustomerName: {
        //    required: "該欄位為必填!!"
        //}
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