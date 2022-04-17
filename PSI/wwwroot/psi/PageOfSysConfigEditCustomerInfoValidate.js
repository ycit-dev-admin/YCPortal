// Form Validation
$('#edit-customer-form').validate({
    submitHandler: function (form) {
        var isChanged = document.getElementById("IsChanged").value;
        if (isChanged) {
            form.submit();
        }
        else {
            alert("並未有內容變更，故不進行資料變更!!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mb1ZhbGlkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9QYWdlT2ZTeXNDb25maWdFZGl0Q3VzdG9tZXJJbmZvVmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCO0FBQ2xCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUM5QixhQUFhLEVBQUUsVUFBVSxJQUFJO1FBQ3pCLElBQUksU0FBUyxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDLEtBQUssQ0FBQztRQUNqRixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUE7U0FDOUI7SUFDTCxDQUFDO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsV0FBVyxFQUFFO1lBQ1QsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsSUFBSTtTQUNqQjtLQUNKO0lBQ0QsUUFBUSxFQUFFO1FBQ04sV0FBVyxFQUFFO1lBQ1QsUUFBUSxFQUFFLFVBQVU7U0FDdkI7UUFDRCxZQUFZLEVBQUU7WUFDVixRQUFRLEVBQUUsVUFBVTtTQUN2QjtLQUNKO0lBQ0QsWUFBWSxFQUFFLE1BQU07SUFDcEIsY0FBYyxFQUFFLFVBQVUsS0FBSyxFQUFFLE9BQU87UUFDcEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxTQUFTLEVBQUUsVUFBVSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDaEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsV0FBVyxFQUFFLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVO1FBQ2xELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZvcm0gVmFsaWRhdGlvblxyXG4kKCcjZWRpdC1jdXN0b21lci1mb3JtJykudmFsaWRhdGUoe1xyXG4gICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICBsZXQgaXNDaGFuZ2VkID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiSXNDaGFuZ2VkXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgICAgIGlmIChpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIuS4puacquacieWFp+WuueiuiuabtO+8jOaVheS4jemAsuihjOizh+aWmeiuiuabtCEhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgQ29tcGFueU5hbWU6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIEN1c3RvbWVyTmFtZToge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXNzYWdlczoge1xyXG4gICAgICAgIENvbXBhbnlOYW1lOiB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBcIuipsuashOS9jeeCuuW/heWhqyEhXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIEN1c3RvbWVyTmFtZToge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogXCLoqbLmrITkvY3ngrrlv4XloashIVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yRWxlbWVudDogJ3NwYW4nLFxyXG4gICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uIChlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgIGVycm9yLmFkZENsYXNzKCdpbnZhbGlkLWZlZWRiYWNrJyk7XHJcbiAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFwcGVuZChlcnJvcik7XHJcbiAgICB9LFxyXG4gICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgIH0sXHJcbiAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICB9XHJcbn0pOyJdfQ==