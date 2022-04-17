/* Page Initialize */
// Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4',
    placeholder: "請選擇項目"
});
// jquery dialog
$("#dialog-confirm").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    autoOpen: false,
    buttons: {
        "儲存": function () {
            $('#edit-customer-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
});
var PageOfSysConfigEditCustomerInfo = /** @class */ (function () {
    function PageOfSysConfigEditCustomerInfo(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.testQQ = new Map();
        this.testQQ2 = new Map();
        this.testQQ3 = [{}];
        this.testQQ4 = [null];
        /* Field Doms */
        this.DomOfCarGuid = document.getElementById('CarGuid');
        this.DomOfCustomerGuid = document.getElementById('CustomerGuid');
        this.DomOfEditCompanyName = document.getElementById('EditCompanyName');
        this.DomOfShowEditCompanyName = document.getElementById('show-edit-companyName');
        this.DomOfEditTaxId = document.getElementById('EditTaxId');
        this.DomOfShowEditTaxId = document.getElementById('show-edit-taxId');
        this.DomOfEditCustomerName = document.getElementById('EditCustomerName');
        this.DomOfShowEditCustomerName = document.getElementById('show-edit-customerName');
        this.DomOfEditPsiType = document.getElementById('EditPsiType');
        this.DomOfShowEditPsiType = document.getElementById('show-edit-psiType');
        this.DomOfEditContentInfo = document.getElementById('EditContentInfo');
        this.DomOfShowEditContentInfo = document.getElementById('show-edit-contentInfo');
        this.DomOfEditAddress = document.getElementById('EditAddress');
        this.DomOfShowEditAddress = document.getElementById('show-edit-address');
        this.DomOfIsChanged = document.getElementById("IsChanged");
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
        this.testQQ.set("wow", { email: "abcd", rating: 500 });
        this.testQQ.set("wow2", { email: "abcdefg", rating: 501 });
        this.testQQ2.set("wow3", { haha: "456", cc: 999 });
        this.testQQ2.set("wow3", { haha: "456", cc: 999 });
        var abc = { haha: "abc", cc: 456 };
        var abc2 = { haha: "abc7", cc: 4567 };
        this.testQQ3.push(abc);
        this.testQQ3.push(abc2);
        this.testQQ4.push(abc2);
        console.log("wow " + this.testQQ3.filter(function (value) { return Object.keys(value).length !== 0; }).length);
    }
    /* Class Variable */
    /* Page Function */
    PageOfSysConfigEditCustomerInfo.prototype.SetChageStatus = function (result) {
        this.DomOfIsChanged.value = result.toString();
    };
    //public EvenShow_JqUlDom: JQuery<HTMLUListElement> = $('#evenProductLs');
    //public OddLShow_JqUlDom: JQuery<HTMLUListElement> = $('#oddProductLs');
    //public UsProdItem_JqSelectDom: JQuery<HTMLSelectElement> = $('#user-select-proditem');
    //public TotalProdItemInfo_JqSelectDom: JQuery<HTMLHeadingElement> = $('#total');
    //public ingredientPost_JqDivDom: JQuery<HTMLDivElement> = $('#ingredientPost');
    //public CustomerId_JqSelectDom: JQuery<HTMLSelectElement> = $('#VE_PurchaseWeightNote_CustomerId');
    //public CustomerName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CustomerName');
    //public CarNoId_JqSelectDom: JQuery<HTMLElement> = $('#VE_PurchaseWeightNote_CarNoId');
    //public CarName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CarNo');
    //public FullWeight_Dom = $('#VE_PurchaseWeightNote_FullWeight').get(0) as HTMLInputElement;
    //public DefectiveWeight_DOM = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0) as HTMLInputElement;
    //public UnitPrice_DOM = $('#VE_PurchaseWeightNote_UnitPrice').get(0) as HTMLInputElement;
    //public TraficUnitPrice_DOM = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0) as HTMLInputElement;
    //public ThirdWeightFee_DOM = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0) as HTMLInputElement;
    //public HasTaxList = $(".ishas_tax").get() as HTMLInputElement[];
    //public DisplayFinalPrice_DOM = $('#show_final_price').get(0) as HTMLHeadingElement;
    //public DisplayWeightPrice_DOM = $('#show_weight_price').get(0) as HTMLDivElement;
    //public DispalyTraficPrice_DOM = $('#show_trafic_price').get(0) as HTMLDivElement;
    //public ActualPrice_DOM = $('#VE_PurchaseWeightNote_ActualPrice').get(0) as HTMLInputElement;
    //public CustomerId_Change() {
    //    const thisObj = this;
    //    this.CustomerName_JqInputDom.val("");
    //    this.CarName_JqInputDom.val(""); // 車牌名稱清空
    //    if (this.CustomerId_JqSelectDom &&
    //        this.CustomerId_JqSelectDom.find(':selected').val() === "0") {  // 新客戶
    //        this.CustomerName_JqInputDom.removeAttr("readonly");
    //        thisObj.ReSetCarNoItems([]);
    //    } else {
    //        this.CustomerName_JqInputDom.attr("readonly", "readonly");
    //        this.CustomerName_JqInputDom.val(this.CustomerId_JqSelectDom.find(':selected').text());
    //        let funcRs = this.CustomerAPI.GetCarNoItemsBy(this.CustomerId_JqSelectDom.find(':selected').val().toString());
    //        $.when(funcRs).then(function (data) {
    //            thisObj.ReSetCarNoItems(data);
    //        });
    //    }
    //}
    //public CarNoId_Change() {
    //    this.CarName_JqInputDom.val("");
    //    if (this.CarNoId_JqSelectDom &&
    //        this.CarNoId_JqSelectDom.find(':selected').val() === "0") {
    //        this.CarName_JqInputDom.removeAttr("readonly");
    //    } else {
    //        this.CarName_JqInputDom.attr("readonly", "readonly");
    //        this.CarName_JqInputDom.val(this.CarNoId_JqSelectDom.find(':selected').text());
    //    }
    //}
    //private ReSetCarNoItems(dataObjLs) {
    //    const thisPagObj = this;
    //    thisPagObj.CarNoId_JqSelectDom.html('');  // 選項清空
    //    let defaultOption = new Option("0.新車牌", "0", false, false);
    //    thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
    //    dataObjLs.forEach(function (item) {  // 清單項目
    //        let newOption = new Option(item.carName, item.id, false, false);
    //        thisPagObj.CarNoId_JqSelectDom.append(newOption);
    //    });
    //}
    PageOfSysConfigEditCustomerInfo.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $('#form_create').on('click', function () {
            $("#dialog-confirm").dialog("open");
        });
        $('#EditCompanyName').on('keyup', function () {
            if (curObj.DomOfEditCompanyName.value.length > 0) {
                curObj.DomOfShowEditCompanyName.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditCompanyName.value;
                curObj.DomOfShowEditCompanyName.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditCompanyName.innerHTML = "";
            }
        });
        $('#EditTaxId').on('keyup', function () {
            if (curObj.DomOfEditTaxId.value.length > 0) {
                curObj.DomOfShowEditTaxId.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditTaxId.value;
                curObj.DomOfShowEditTaxId.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditTaxId.innerHTML = "";
            }
        });
        $('#EditCustomerName').on('keyup', function () {
            if (curObj.DomOfEditCustomerName.value.length > 0) {
                curObj.DomOfShowEditCustomerName.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditCustomerName.value;
                curObj.DomOfShowEditCustomerName.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditCustomerName.innerHTML = "";
            }
        });
        $('#EditPsiType').on('change', function () {
            var selectedText = curObj.DomOfEditPsiType.options[curObj.DomOfEditPsiType.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditPsiType.innerHTML = "=> \u8B8A\u66F4\u70BA : " + selectedText;
                curObj.DomOfShowEditPsiType.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditPsiType.innerHTML = "";
            }
        });
        $('#EditContentInfo').on('keyup', function () {
            if (curObj.DomOfEditContentInfo.value.length > 0) {
                curObj.DomOfShowEditContentInfo.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditContentInfo.value;
                curObj.DomOfShowEditContentInfo.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditContentInfo.innerHTML = "";
            }
        });
        $('#EditAddress').on('keyup', function () {
            if (curObj.DomOfEditAddress.value.length > 0) {
                curObj.DomOfShowEditAddress.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditAddress.value;
                curObj.DomOfShowEditAddress.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditAddress.innerHTML = "";
            }
        });
        // 車牌編輯
        $('#has-carno').on('click', "button", function () {
            var pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-carnoinfo]").html(data);
                var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
                modalObj.modal('show');
            });
        });
        // 新增車牌
        //$('#add-carno').on('click', function () {
        //    pageMain.Test3Func();
        //})
        //$('#add-carno').on('click',["Wayne","abc"], function (event,myName) {
        //    alert(`WoW => ${event.data} & ${myName}`);
        //})
        //$("#add-carno").on("click", function (event) {
        //    let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel();
        //    $.when(pageRs).then(function (data) {
        //        $("div[name=model-temp-carnoinfo]").html(data);
        //        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        //        modalObj.modal('show');
        //        // modalObj.find("#testqqc").on('click', '.tr-row',
        //        modalObj.find("#testqqc").on('click',
        //            function () {
        //                modalObj.modal('hide');
        //            });
        //    });
        //});
    };
    return PageOfSysConfigEditCustomerInfo;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxxQkFBcUI7QUFDckIsbUJBQW1CO0FBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsV0FBVyxFQUFFLE9BQU87Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsZ0JBQWdCO0FBQ2hCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN4QixTQUFTLEVBQUUsS0FBSztJQUNoQixNQUFNLEVBQUUsTUFBTTtJQUNkLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLElBQUk7SUFDWCxRQUFRLEVBQUUsS0FBSztJQUNmLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRTtZQUNGLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELElBQUksRUFBRTtZQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUNKO0NBQ0osQ0FBQyxDQUFBO0FBRUY7SUFnQkkseUNBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQU56QixXQUFNLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3hELFlBQU8sR0FBOEMsSUFBSSxHQUFHLEVBQXdDLENBQUM7UUFDckcsWUFBTyxHQUFtQyxDQUFDLEVBQUUsQ0FBbUMsQ0FBQztRQUNqRixZQUFPLEdBQW1DLENBQUMsSUFBSSxDQUFDLENBQUM7UUFxQnhELGdCQUFnQjtRQUNU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SUFBSSxDQUFDLENBQUM7WUFDMUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUM5QixDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTztRQUNQLDJDQUEyQztRQUMzQywyQkFBMkI7UUFDM0IsSUFBSTtRQUNKLHVFQUF1RTtRQUN2RSxnREFBZ0Q7UUFDaEQsSUFBSTtRQUNKLGdEQUFnRDtRQUNoRCxrRUFBa0U7UUFDbEUsMkNBQTJDO1FBQzNDLHlEQUF5RDtRQUN6RCw4RUFBOEU7UUFDOUUsaUNBQWlDO1FBR2pDLDZEQUE2RDtRQUM3RCwrQ0FBK0M7UUFDL0MsMkJBQTJCO1FBQzNCLHlDQUF5QztRQUN6QyxpQkFBaUI7UUFFakIsU0FBUztRQUNULEtBQUs7SUFDVCxDQUFDO0lBRUwsc0NBQUM7QUFBRCxDQUFDLEFBM09ELElBMk9DIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBQZXJzb24gPSB7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgcmF0aW5nOiBudW1iZXI7XHJcbn07XHJcblxyXG5cclxuLyogUGFnZSBJbml0aWFsaXplICovXHJcbi8vIFNlbGVjdDIgRWxlbWVudHNcclxuJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4fpoIXnm65cIlxyXG59KVxyXG5cclxuLy8ganF1ZXJ5IGRpYWxvZ1xyXG4kKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBtb2RhbDogdHJ1ZSxcclxuICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICBcIuWEsuWtmFwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNlZGl0LWN1c3RvbWVyLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwi5Y+W5raIXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG5jbGFzcyBQYWdlT2ZTeXNDb25maWdFZGl0Q3VzdG9tZXJJbmZvIHtcclxuICAgIC8vIEJhc2UgUG9ycGVyaXRlc1xyXG4gICAgcmVhZG9ubHkgQmFzZVVybDogc3RyaW5nO1xyXG5cclxuICAgIC8vIEZvciBQb3N0XHJcblxyXG5cclxuICAgIC8vIFJlZmVyZW5jZXMgIFxyXG4gICAgcHJpdmF0ZSBDdXN0b21lckFQSTogQ3VzdG9tZXJBUElDbGFzcztcclxuICAgIHB1YmxpYyBTeXNDb25maWdQYWdlSGVscGVyOiBTeXNDb25maWdQYWdlSGVscGVyO1xyXG4gICAgcHVibGljIHRlc3RRUTogTWFwPHN0cmluZywgUGVyc29uPiA9IG5ldyBNYXA8c3RyaW5nLCBQZXJzb24+KCk7XHJcbiAgICBwdWJsaWMgdGVzdFFRMjogTWFwPHN0cmluZywgeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfT4gPSBuZXcgTWFwPHN0cmluZywgeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfT4oKTtcclxuICAgIHB1YmxpYyB0ZXN0UVEzOiBbeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfV0gPSBbe31dIGFzIFt7IGhhaGE6IHN0cmluZywgY2M6IG51bWJlciB9XTtcclxuICAgIHB1YmxpYyB0ZXN0UVE0OiBbeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfV0gPSBbbnVsbF07XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJBUEkgPSBuZXcgQ3VzdG9tZXJBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuU3lzQ29uZmlnUGFnZUhlbHBlciA9IG5ldyBTeXNDb25maWdQYWdlSGVscGVyKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEuc2V0KFwid293XCIsIHsgZW1haWw6IFwiYWJjZFwiLCByYXRpbmc6IDUwMCB9KTtcclxuICAgICAgICB0aGlzLnRlc3RRUS5zZXQoXCJ3b3cyXCIsIHsgZW1haWw6IFwiYWJjZGVmZ1wiLCByYXRpbmc6IDUwMSB9KTtcclxuICAgICAgICB0aGlzLnRlc3RRUTIuc2V0KFwid293M1wiLCB7IGhhaGE6IFwiNDU2XCIsIGNjOiA5OTkgfSk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEyLnNldChcIndvdzNcIiwgeyBoYWhhOiBcIjQ1NlwiLCBjYzogOTk5IH0pO1xyXG4gICAgICAgIGxldCBhYmMgPSB7IGhhaGE6IFwiYWJjXCIsIGNjOiA0NTYgfTtcclxuICAgICAgICBsZXQgYWJjMiA9IHsgaGFoYTogXCJhYmM3XCIsIGNjOiA0NTY3IH07XHJcbiAgICAgICAgdGhpcy50ZXN0UVEzLnB1c2goYWJjKTtcclxuICAgICAgICB0aGlzLnRlc3RRUTMucHVzaChhYmMyKTtcclxuICAgICAgICB0aGlzLnRlc3RRUTQucHVzaChhYmMyKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYHdvdyAke3RoaXMudGVzdFFRMy5maWx0ZXIodmFsdWUgPT4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCAhPT0gMCkubGVuZ3RofWApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiBGaWVsZCBEb21zICovXHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJHdWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhckd1aWQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJHdWlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyR3VpZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0Q29tcGFueU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdENvbXBhbnlOYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dFZGl0Q29tcGFueU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWNvbXBhbnlOYW1lJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRWRpdFRheElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRUYXhJZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93RWRpdFRheElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC10YXhJZCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXRDdXN0b21lck5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdEN1c3RvbWVyTmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93RWRpdEN1c3RvbWVyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtY3VzdG9tZXJOYW1lJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRWRpdFBzaVR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdFBzaVR5cGUnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dFZGl0UHNpVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtcHNpVHlwZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXRDb250ZW50SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFZGl0Q29udGVudEluZm8nKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0VkaXRDb250ZW50SW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtY29udGVudEluZm8nKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0QWRkcmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFZGl0QWRkcmVzcycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93RWRpdEFkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWFkZHJlc3MnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIERvbU9mSXNDaGFuZ2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJJc0NoYW5nZWRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcblxyXG4gICAgLyogQ2xhc3MgVmFyaWFibGUgKi9cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBwdWJsaWMgU2V0Q2hhZ2VTdGF0dXMocmVzdWx0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5Eb21PZklzQ2hhbmdlZC52YWx1ZSA9IHJlc3VsdC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vcHVibGljIEV2ZW5TaG93X0pxVWxEb206IEpRdWVyeTxIVE1MVUxpc3RFbGVtZW50PiA9ICQoJyNldmVuUHJvZHVjdExzJyk7XHJcbiAgICAvL3B1YmxpYyBPZGRMU2hvd19KcVVsRG9tOiBKUXVlcnk8SFRNTFVMaXN0RWxlbWVudD4gPSAkKCcjb2RkUHJvZHVjdExzJyk7XHJcbiAgICAvL3B1YmxpYyBVc1Byb2RJdGVtX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTFNlbGVjdEVsZW1lbnQ+ID0gJCgnI3VzZXItc2VsZWN0LXByb2RpdGVtJyk7XHJcbiAgICAvL3B1YmxpYyBUb3RhbFByb2RJdGVtSW5mb19KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxIZWFkaW5nRWxlbWVudD4gPSAkKCcjdG90YWwnKTtcclxuICAgIC8vcHVibGljIGluZ3JlZGllbnRQb3N0X0pxRGl2RG9tOiBKUXVlcnk8SFRNTERpdkVsZW1lbnQ+ID0gJCgnI2luZ3JlZGllbnRQb3N0Jyk7XHJcbiAgICAvL3B1YmxpYyBDdXN0b21lcklkX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTFNlbGVjdEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lcklkJyk7XHJcbiAgICAvL3B1YmxpYyBDdXN0b21lck5hbWVfSnFJbnB1dERvbTogSlF1ZXJ5PEhUTUxJbnB1dEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lck5hbWUnKTtcclxuICAgIC8vcHVibGljIENhck5vSWRfSnFTZWxlY3REb206IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vSWQnKTtcclxuICAgIC8vcHVibGljIENhck5hbWVfSnFJbnB1dERvbTogSlF1ZXJ5PEhUTUxJbnB1dEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJObycpO1xyXG4gICAgLy9wdWJsaWMgRnVsbFdlaWdodF9Eb20gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Z1bGxXZWlnaHQnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIC8vcHVibGljIERlZmVjdGl2ZVdlaWdodF9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0RlZmVjdGl2ZVdlaWdodCcpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgLy9wdWJsaWMgVW5pdFByaWNlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfVW5pdFByaWNlJykuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAvL3B1YmxpYyBUcmFmaWNVbml0UHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIC8vcHVibGljIFRoaXJkV2VpZ2h0RmVlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfVGhpcmRXZWlnaHRGZWUnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIC8vcHVibGljIEhhc1RheExpc3QgPSAkKFwiLmlzaGFzX3RheFwiKS5nZXQoKSBhcyBIVE1MSW5wdXRFbGVtZW50W107XHJcbiAgICAvL3B1YmxpYyBEaXNwbGF5RmluYWxQcmljZV9ET00gPSAkKCcjc2hvd19maW5hbF9wcmljZScpLmdldCgwKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICAvL3B1YmxpYyBEaXNwbGF5V2VpZ2h0UHJpY2VfRE9NID0gJCgnI3Nob3dfd2VpZ2h0X3ByaWNlJykuZ2V0KDApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgLy9wdWJsaWMgRGlzcGFseVRyYWZpY1ByaWNlX0RPTSA9ICQoJyNzaG93X3RyYWZpY19wcmljZScpLmdldCgwKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8vcHVibGljIEFjdHVhbFByaWNlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQWN0dWFsUHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBDdXN0b21lcklkX0NoYW5nZSgpIHtcclxuICAgIC8vICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuICAgIC8vICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20udmFsKFwiXCIpO1xyXG4gICAgLy8gICAgdGhpcy5DYXJOYW1lX0pxSW5wdXREb20udmFsKFwiXCIpOyAvLyDou4rniYzlkI3nqLHmuIXnqbpcclxuXHJcbiAgICAvLyAgICBpZiAodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tICYmXHJcbiAgICAvLyAgICAgICAgdGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnZhbCgpID09PSBcIjBcIikgeyAgLy8g5paw5a6i5oi2XHJcbiAgICAvLyAgICAgICAgdGhpcy5DdXN0b21lck5hbWVfSnFJbnB1dERvbS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAvLyAgICAgICAgdGhpc09iai5SZVNldENhck5vSXRlbXMoW10pO1xyXG4gICAgLy8gICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICB0aGlzLkN1c3RvbWVyTmFtZV9KcUlucHV0RG9tLmF0dHIoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xyXG4gICAgLy8gICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ3VzdG9tZXJJZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgLy8gICAgICAgIGxldCBmdW5jUnMgPSB0aGlzLkN1c3RvbWVyQVBJLkdldENhck5vSXRlbXNCeSh0aGlzLkN1c3RvbWVySWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAvLyAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgLy8gICAgICAgICAgICB0aGlzT2JqLlJlU2V0Q2FyTm9JdGVtcyhkYXRhKTtcclxuICAgIC8vICAgICAgICB9KTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG5cclxuICAgIC8vcHVibGljIENhck5vSWRfQ2hhbmdlKCkge1xyXG4gICAgLy8gICAgdGhpcy5DYXJOYW1lX0pxSW5wdXREb20udmFsKFwiXCIpO1xyXG4gICAgLy8gICAgaWYgKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbSAmJlxyXG4gICAgLy8gICAgICAgIHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgIC8vICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLmF0dHIoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xyXG4gICAgLy8gICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLnZhbCh0aGlzLkNhck5vSWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudGV4dCgpKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG5cclxuICAgIC8vcHJpdmF0ZSBSZVNldENhck5vSXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAvLyAgICBjb25zdCB0aGlzUGFnT2JqID0gdGhpcztcclxuICAgIC8vICAgIHRoaXNQYWdPYmouQ2FyTm9JZF9KcVNlbGVjdERvbS5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgLy8gICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAvLyAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgLy8gICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgLy8gICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5pZCwgZmFsc2UsIGZhbHNlKTtcclxuICAgIC8vICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAvLyAgICB9KTtcclxuICAgIC8vfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBQYWdlRXZlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogUGFnZSBFdmVudHMgKi9cclxuICAgICAgICAvLyDooajllq7lu7rnq4tcclxuICAgICAgICAkKCcjZm9ybV9jcmVhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcjRWRpdENvbXBhbnlOYW1lJykub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3VyT2JqLkRvbU9mRWRpdENvbXBhbnlOYW1lLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29tcGFueU5hbWUuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7Y3VyT2JqLkRvbU9mRWRpdENvbXBhbnlOYW1lLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbXBhbnlOYW1lLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29tcGFueU5hbWUuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCcjRWRpdFRheElkJykub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3VyT2JqLkRvbU9mRWRpdFRheElkLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0VGF4SWQuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7Y3VyT2JqLkRvbU9mRWRpdFRheElkLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdFRheElkLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0VGF4SWQuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCcjRWRpdEN1c3RvbWVyTmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGN1ck9iai5Eb21PZkVkaXRDdXN0b21lck5hbWUudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDdXN0b21lck5hbWUuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7Y3VyT2JqLkRvbU9mRWRpdEN1c3RvbWVyTmFtZS52YWx1ZX1gO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDdXN0b21lck5hbWUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlNldENoYWdlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDdXN0b21lck5hbWUuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCcjRWRpdFBzaVR5cGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZFZGl0UHNpVHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZkVkaXRQc2lUeXBlLnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFRleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRQc2lUeXBlLmlubmVySFRNTCA9IGA9PiDorormm7TngrogOiAke3NlbGVjdGVkVGV4dH1gO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRQc2lUeXBlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0UHNpVHlwZS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJyNFZGl0Q29udGVudEluZm8nKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZFZGl0Q29udGVudEluZm8udmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDb250ZW50SW5mby5pbm5lckhUTUwgPSBgPT4g6K6K5pu054K6IDogJHtjdXJPYmouRG9tT2ZFZGl0Q29udGVudEluZm8udmFsdWV9YDtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29udGVudEluZm8uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlNldENoYWdlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDb250ZW50SW5mby5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJyNFZGl0QWRkcmVzcycpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGN1ck9iai5Eb21PZkVkaXRBZGRyZXNzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0QWRkcmVzcy5pbm5lckhUTUwgPSBgPT4g6K6K5pu054K6IDogJHtjdXJPYmouRG9tT2ZFZGl0QWRkcmVzcy52YWx1ZX1gO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRBZGRyZXNzLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0QWRkcmVzcy5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDou4rniYznt6jovK9cclxuICAgICAgICAkKCcjaGFzLWNhcm5vJykub24oJ2NsaWNrJywgYGJ1dHRvbmAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VScyA9IGN1ck9iai5TeXNDb25maWdQYWdlSGVscGVyLkdldENhck5vSW5mb01vZGVsKCQodGhpcykudmFsKCkudG9TdHJpbmcoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQud2hlbihwYWdlUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RhbE9iaiA9ICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuZmluZCgnI215TW9kYWwnKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOaWsOWinui7iueJjFxyXG4gICAgICAgIC8vJCgnI2FkZC1jYXJubycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICBwYWdlTWFpbi5UZXN0M0Z1bmMoKTtcclxuICAgICAgICAvL30pXHJcbiAgICAgICAgLy8kKCcjYWRkLWNhcm5vJykub24oJ2NsaWNrJyxbXCJXYXluZVwiLFwiYWJjXCJdLCBmdW5jdGlvbiAoZXZlbnQsbXlOYW1lKSB7XHJcbiAgICAgICAgLy8gICAgYWxlcnQoYFdvVyA9PiAke2V2ZW50LmRhdGF9ICYgJHtteU5hbWV9YCk7XHJcbiAgICAgICAgLy99KVxyXG4gICAgICAgIC8vJChcIiNhZGQtY2Fybm9cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvLyAgICBsZXQgcGFnZVJzID0gY3VyT2JqLlN5c0NvbmZpZ1BhZ2VIZWxwZXIuR2V0Q2FyTm9JbmZvTW9kZWwoKTtcclxuICAgICAgICAvLyAgICAkLndoZW4ocGFnZVJzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgdmFyIG1vZGFsT2JqID0gJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5maW5kKCcjbXlNb2RhbCcpO1xyXG4gICAgICAgIC8vICAgICAgICBtb2RhbE9iai5tb2RhbCgnc2hvdycpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgIC8vIG1vZGFsT2JqLmZpbmQoXCIjdGVzdHFxY1wiKS5vbignY2xpY2snLCAnLnRyLXJvdycsXHJcbiAgICAgICAgLy8gICAgICAgIG1vZGFsT2JqLmZpbmQoXCIjdGVzdHFxY1wiKS5vbignY2xpY2snLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=