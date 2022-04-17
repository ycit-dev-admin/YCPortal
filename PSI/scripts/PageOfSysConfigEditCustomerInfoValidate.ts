// Form Validation
$('#edit-customer-form').validate({
    submitHandler: function (form) {
        let isChanged = (document.getElementById("IsChanged") as HTMLInputElement).value;
        if (isChanged) {
            form.submit();
        } else {
            alert("並未有內容變更，故不進行資料變更!!")
        }
    },
    rules: {
        CompanyName: {
            required: true
        },
        CustomerName: {
            required: true
        }
    },
    messages: {
        CompanyName: {
            required: "該欄位為必填!!"
        },
        CustomerName: {
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