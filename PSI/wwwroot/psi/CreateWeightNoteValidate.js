// Form Validation
$("#creaet-form").validate({
    submitHandler: function (form) {
        alert("123");
        form.submit();
    },
    ignore: [], // 要檢查Hidden欄位要加這個
    rules: {
        "VE_PurchaseWeightNote.FullWeightTime": "required",
        "VE_PurchaseWeightNote.CustomerId": "required",
        SelectPurchaseDetailInfos: "required",
        "VE_PurchaseWeightNote.ScaleNo": "required",
        "VE_PurchaseWeightNote.HasTax": "required",
        "VE_PurchaseWeightNote.CarNoId": "required",
        "VE_PurchaseWeightNote.CustomerName": {
            required: function (element) {
                return $("#VE_PurchaseWeightNote_CustomerId").val() === "0";
            }
        },
        "VE_PurchaseWeightNote.CarNo": {
            required: function (element) {
                return $("#VE_PurchaseWeightNote_CarNoId").val() === "0";
            }
        },
        "VE_PurchaseWeightNote.FullWeight": {
            required: true,
            pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
        },
        "VE_PurchaseWeightNote.DefectiveWeight": {
            required: true,
            pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
        },
        "VE_PurchaseWeightNote.UnitPrice": {
            required: true,
            pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
        },
        "VE_PurchaseWeightNote.TraficUnitPrice": {
            required: true,
            pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
        },
        "VE_PurchaseWeightNote.ThirdWeightFee": {
            required: true,
            pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
        },
        "VE_PurchaseWeightNote.ActualPrice": {
            required: true,
            pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
        }
    },
    messages: {
        "VE_PurchaseWeightNote.FullWeight": {
            pattern: "必須為大於0的正整數"
        },
        "VE_PurchaseWeightNote.DefectiveWeight": {
            pattern: "必須為大於或等於0的正整數"
        },
        "VE_PurchaseWeightNote.UnitPrice": {
            pattern: "必須為大於0整數 且 最多2位小數"
        },
        "VE_PurchaseWeightNote.TraficUnitPrice": {
            pattern: "必須為大於0整數 且 最多2位小數"
        },
        "VE_PurchaseWeightNote.ThirdWeightFee": {
            pattern: "必須為大於或等於0的正整數"
        },
        "VE_PurchaseWeightNote.ActualPrice": {
            pattern: "實付金額必須為大於0"
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