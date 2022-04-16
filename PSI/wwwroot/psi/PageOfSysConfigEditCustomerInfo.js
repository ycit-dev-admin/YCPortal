var PageOfSysConfigEditCustomerInfo = /** @class */ (function () {
    function PageOfSysConfigEditCustomerInfo(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        // For Post
        // Fields   
        this.CarGuid = document.getElementById('CarGuid').value;
        this.CustomerGuid = document.getElementById('CustomerGuid').value;
        this.testQQ = new Map();
        this.testQQ2 = new Map();
        this.testQQ3 = [{}];
        this.testQQ4 = [null];
        // Page  Dom
        this.EditCompanyName_Dom = document.getElementById('EditCompanyName');
        this.ShowEditCompanyName_Dom = document.getElementById('show-edit-companyName');
        this.EvenShow_JqUlDom = $('#evenProductLs');
        this.OddLShow_JqUlDom = $('#oddProductLs');
        this.UsProdItem_JqSelectDom = $('#user-select-proditem');
        this.TotalProdItemInfo_JqSelectDom = $('#total');
        this.ingredientPost_JqDivDom = $('#ingredientPost');
        this.CustomerId_JqSelectDom = $('#VE_PurchaseWeightNote_CustomerId');
        this.CustomerName_JqInputDom = $('#VE_PurchaseWeightNote_CustomerName');
        this.CarNoId_JqSelectDom = $('#VE_PurchaseWeightNote_CarNoId');
        this.CarName_JqInputDom = $('#VE_PurchaseWeightNote_CarNo');
        this.FullWeight_Dom = $('#VE_PurchaseWeightNote_FullWeight').get(0);
        this.DefectiveWeight_DOM = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0);
        this.UnitPrice_DOM = $('#VE_PurchaseWeightNote_UnitPrice').get(0);
        this.TraficUnitPrice_DOM = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0);
        this.ThirdWeightFee_DOM = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0);
        this.HasTaxList = $(".ishas_tax").get();
        this.DisplayFinalPrice_DOM = $('#show_final_price').get(0);
        this.DisplayWeightPrice_DOM = $('#show_weight_price').get(0);
        this.DispalyTraficPrice_DOM = $('#show_trafic_price').get(0);
        this.ActualPrice_DOM = $('#VE_PurchaseWeightNote_ActualPrice').get(0);
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
    /* Action */
    PageOfSysConfigEditCustomerInfo.prototype.EditCompanyName_Keyup = function () {
        if (this.EditCompanyName_Dom.value.length > 0) {
            this.ShowEditCompanyName_Dom.innerHTML = "=> \u8B8A\u66F4\u70BA : " + this.EditCompanyName_Dom.value;
            this.ShowEditCompanyName_Dom.style.color = "red";
        }
        else {
            this.ShowEditCompanyName_Dom.innerHTML = "";
        }
    };
    PageOfSysConfigEditCustomerInfo.prototype.Test2Func = function () {
        var modalUrl = this.BaseUrl + "/SysConfig/CarNo/_GetCarNoInfoModel";
        return $.get(modalUrl, { carGUID: encodeURIComponent(""), isOnlyQuery: encodeURIComponent(true) }).done(function (data) {
            $("div[name=model-temp-carnoinfo]").html(data);
            var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
            modalObj.modal('show');
            //var modalObj = $("div[name=modal-temp-productId]").find('#modal-productId-selected');
            //var jTableObj = modalObj.find("#productId-table").DataTable({
            //    dom: 'Blfrtip',
            //    buttons: [
            //        {
            //            text: '選擇完畢',
            //            className: "btn btn-primary",
            //            action: function (e, dt, node, config) {
            //                $.each(jTableObj.rows('.selected').data(), function (index, item) {
            //                    if ($.inArray(item[0], thisObj.ProductList) === -1) {
            //                        thisObj.ProductList.push(item[0]);
            //                    };
            //                });
            //                modalObj.modal('hide');
            //            }
            //        }
            //    ],
            //    select: {
            //        style: 'multi'
            //    }
            //});
        });
    };
    PageOfSysConfigEditCustomerInfo.prototype.Test3Func = function () {
        var modalUrl = this.BaseUrl + "/SysConfig/Customer/_GetCarNoInfoModel";
        return $.get(modalUrl).done(function (data) {
            $("div[name=model-temp-carnoinfo]").html(data);
            var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
            modalObj.modal('show');
        });
    };
    PageOfSysConfigEditCustomerInfo.prototype.CustomerId_Change = function () {
        var thisObj = this;
        this.CustomerName_JqInputDom.val("");
        this.CarName_JqInputDom.val(""); // 車牌名稱清空
        if (this.CustomerId_JqSelectDom &&
            this.CustomerId_JqSelectDom.find(':selected').val() === "0") { // 新客戶
            this.CustomerName_JqInputDom.removeAttr("readonly");
            thisObj.ReSetCarNoItems([]);
        }
        else {
            this.CustomerName_JqInputDom.attr("readonly", "readonly");
            this.CustomerName_JqInputDom.val(this.CustomerId_JqSelectDom.find(':selected').text());
            var funcRs = this.CustomerAPI.GetCarNoItemsBy(this.CustomerId_JqSelectDom.find(':selected').val().toString());
            $.when(funcRs).then(function (data) {
                thisObj.ReSetCarNoItems(data);
            });
        }
    };
    PageOfSysConfigEditCustomerInfo.prototype.CarNoId_Change = function () {
        this.CarName_JqInputDom.val("");
        if (this.CarNoId_JqSelectDom &&
            this.CarNoId_JqSelectDom.find(':selected').val() === "0") {
            this.CarName_JqInputDom.removeAttr("readonly");
        }
        else {
            this.CarName_JqInputDom.attr("readonly", "readonly");
            this.CarName_JqInputDom.val(this.CarNoId_JqSelectDom.find(':selected').text());
        }
    };
    /* Page Function */
    PageOfSysConfigEditCustomerInfo.prototype.ReSetCarNoItems = function (dataObjLs) {
        var thisPagObj = this;
        thisPagObj.CarNoId_JqSelectDom.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.id, false, false);
            thisPagObj.CarNoId_JqSelectDom.append(newOption);
        });
    };
    return PageOfSysConfigEditCustomerInfo;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtJQW9CSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBaEJoQyxXQUFXO1FBR1gsWUFBWTtRQUNMLFlBQU8sR0FBWSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBc0IsQ0FBQyxLQUFLLENBQUM7UUFDakYsaUJBQVksR0FBWSxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQyxLQUFLLENBQUM7UUFLM0YsV0FBTSxHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUN4RCxZQUFPLEdBQThDLElBQUksR0FBRyxFQUF3QyxDQUFDO1FBQ3JHLFlBQU8sR0FBbUMsQ0FBQyxFQUFFLENBQW1DLENBQUM7UUFDakYsWUFBTyxHQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBNEJ4RCxZQUFZO1FBQ0wsd0JBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztRQUNyRiw0QkFBdUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFvQixDQUFDO1FBRzlGLHFCQUFnQixHQUE2QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxxQkFBZ0IsR0FBNkIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLDJCQUFzQixHQUE4QixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMvRSxrQ0FBNkIsR0FBK0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLDRCQUF1QixHQUEyQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2RSwyQkFBc0IsR0FBOEIsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFD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QUN4QixVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsT0FBTztRQUNqRCxJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxzQ0FBQztBQUFELENBQUMsQUFyTEQsSUFxTEMiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFBlcnNvbiA9IHtcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICByYXRpbmc6IG51bWJlcjtcclxufTtcclxuXHJcblxyXG5jbGFzcyBQYWdlT2ZTeXNDb25maWdFZGl0Q3VzdG9tZXJJbmZvIHtcclxuICAgIC8vIEJhc2UgUG9ycGVyaXRlc1xyXG4gICAgcmVhZG9ubHkgQmFzZVVybDogc3RyaW5nO1xyXG5cclxuICAgIC8vIEZvciBQb3N0XHJcblxyXG5cclxuICAgIC8vIEZpZWxkcyAgIFxyXG4gICAgcHVibGljIENhckd1aWQ6IHN0cmluZyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyR3VpZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgcHVibGljIEN1c3RvbWVyR3VpZDogc3RyaW5nID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDdXN0b21lckd1aWQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJBUEk6IEN1c3RvbWVyQVBJQ2xhc3M7XHJcbiAgICBwdWJsaWMgU3lzQ29uZmlnUGFnZUhlbHBlcjogU3lzQ29uZmlnUGFnZUhlbHBlcjtcclxuICAgIHB1YmxpYyB0ZXN0UVE6IE1hcDxzdHJpbmcsIFBlcnNvbj4gPSBuZXcgTWFwPHN0cmluZywgUGVyc29uPigpO1xyXG4gICAgcHVibGljIHRlc3RRUTI6IE1hcDxzdHJpbmcsIHsgaGFoYTogc3RyaW5nLCBjYzogbnVtYmVyIH0+ID0gbmV3IE1hcDxzdHJpbmcsIHsgaGFoYTogc3RyaW5nLCBjYzogbnVtYmVyIH0+KCk7XHJcbiAgICBwdWJsaWMgdGVzdFFRMzogW3sgaGFoYTogc3RyaW5nLCBjYzogbnVtYmVyIH1dID0gW3t9XSBhcyBbeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfV07XHJcbiAgICBwdWJsaWMgdGVzdFFRNDogW3sgaGFoYTogc3RyaW5nLCBjYzogbnVtYmVyIH1dID0gW251bGxdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQVBJID0gbmV3IEN1c3RvbWVyQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLlN5c0NvbmZpZ1BhZ2VIZWxwZXIgPSBuZXcgU3lzQ29uZmlnUGFnZUhlbHBlcih0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMudGVzdFFRLnNldChcIndvd1wiLCB7IGVtYWlsOiBcImFiY2RcIiwgcmF0aW5nOiA1MDAgfSk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEuc2V0KFwid293MlwiLCB7IGVtYWlsOiBcImFiY2RlZmdcIiwgcmF0aW5nOiA1MDEgfSk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEyLnNldChcIndvdzNcIiwgeyBoYWhhOiBcIjQ1NlwiLCBjYzogOTk5IH0pO1xyXG4gICAgICAgIHRoaXMudGVzdFFRMi5zZXQoXCJ3b3czXCIsIHsgaGFoYTogXCI0NTZcIiwgY2M6IDk5OSB9KTtcclxuICAgICAgICBsZXQgYWJjID0geyBoYWhhOiBcImFiY1wiLCBjYzogNDU2IH07XHJcbiAgICAgICAgbGV0IGFiYzIgPSB7IGhhaGE6IFwiYWJjN1wiLCBjYzogNDU2NyB9O1xyXG4gICAgICAgIHRoaXMudGVzdFFRMy5wdXNoKGFiYyk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEzLnB1c2goYWJjMik7XHJcbiAgICAgICAgdGhpcy50ZXN0UVE0LnB1c2goYWJjMik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGB3b3cgJHt0aGlzLnRlc3RRUTMuZmlsdGVyKHZhbHVlID0+IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggIT09IDApLmxlbmd0aH1gKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFBhZ2UgRnVuY3Rpb25zXHJcblxyXG5cclxuICAgIHJlYWRvbmx5IEhhc0NoYW5nZTogYm9vbGVhbjtcclxuXHJcblxyXG4gICAgLy8gUGFnZSAgRG9tXHJcbiAgICBwdWJsaWMgRWRpdENvbXBhbnlOYW1lX0RvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFZGl0Q29tcGFueU5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIFNob3dFZGl0Q29tcGFueU5hbWVfRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC1jb21wYW55TmFtZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG4gICAgcHVibGljIEV2ZW5TaG93X0pxVWxEb206IEpRdWVyeTxIVE1MVUxpc3RFbGVtZW50PiA9ICQoJyNldmVuUHJvZHVjdExzJyk7XHJcbiAgICBwdWJsaWMgT2RkTFNob3dfSnFVbERvbTogSlF1ZXJ5PEhUTUxVTGlzdEVsZW1lbnQ+ID0gJCgnI29kZFByb2R1Y3RMcycpO1xyXG4gICAgcHVibGljIFVzUHJvZEl0ZW1fSnFTZWxlY3REb206IEpRdWVyeTxIVE1MU2VsZWN0RWxlbWVudD4gPSAkKCcjdXNlci1zZWxlY3QtcHJvZGl0ZW0nKTtcclxuICAgIHB1YmxpYyBUb3RhbFByb2RJdGVtSW5mb19KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxIZWFkaW5nRWxlbWVudD4gPSAkKCcjdG90YWwnKTtcclxuICAgIHB1YmxpYyBpbmdyZWRpZW50UG9zdF9KcURpdkRvbTogSlF1ZXJ5PEhUTUxEaXZFbGVtZW50PiA9ICQoJyNpbmdyZWRpZW50UG9zdCcpO1xyXG4gICAgcHVibGljIEN1c3RvbWVySWRfSnFTZWxlY3REb206IEpRdWVyeTxIVE1MU2VsZWN0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVySWQnKTtcclxuICAgIHB1YmxpYyBDdXN0b21lck5hbWVfSnFJbnB1dERvbTogSlF1ZXJ5PEhUTUxJbnB1dEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lck5hbWUnKTtcclxuICAgIHB1YmxpYyBDYXJOb0lkX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJOb0lkJyk7XHJcbiAgICBwdWJsaWMgQ2FyTmFtZV9KcUlucHV0RG9tOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vJyk7XHJcbiAgICBwdWJsaWMgRnVsbFdlaWdodF9Eb20gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Z1bGxXZWlnaHQnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEZWZlY3RpdmVXZWlnaHRfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9EZWZlY3RpdmVXZWlnaHQnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBVbml0UHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9Vbml0UHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBUcmFmaWNVbml0UHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBUaGlyZFdlaWdodEZlZV9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1RoaXJkV2VpZ2h0RmVlJykuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgSGFzVGF4TGlzdCA9ICQoXCIuaXNoYXNfdGF4XCIpLmdldCgpIGFzIEhUTUxJbnB1dEVsZW1lbnRbXTtcclxuICAgIHB1YmxpYyBEaXNwbGF5RmluYWxQcmljZV9ET00gPSAkKCcjc2hvd19maW5hbF9wcmljZScpLmdldCgwKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRGlzcGxheVdlaWdodFByaWNlX0RPTSA9ICQoJyNzaG93X3dlaWdodF9wcmljZScpLmdldCgwKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEaXNwYWx5VHJhZmljUHJpY2VfRE9NID0gJCgnI3Nob3dfdHJhZmljX3ByaWNlJykuZ2V0KDApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIEFjdHVhbFByaWNlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQWN0dWFsUHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyogQWN0aW9uICovXHJcbiAgICBwdWJsaWMgRWRpdENvbXBhbnlOYW1lX0tleXVwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLkVkaXRDb21wYW55TmFtZV9Eb20udmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dFZGl0Q29tcGFueU5hbWVfRG9tLmlubmVySFRNTCA9IGA9PiDorormm7TngrogOiAke3RoaXMuRWRpdENvbXBhbnlOYW1lX0RvbS52YWx1ZX1gO1xyXG4gICAgICAgICAgICB0aGlzLlNob3dFZGl0Q29tcGFueU5hbWVfRG9tLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlNob3dFZGl0Q29tcGFueU5hbWVfRG9tLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRlc3QyRnVuYygpIHtcclxuICAgICAgICBjb25zdCBtb2RhbFVybCA9IGAke3RoaXMuQmFzZVVybH0vU3lzQ29uZmlnL0Nhck5vL19HZXRDYXJOb0luZm9Nb2RlbGA7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KG1vZGFsVXJsLCB7IGNhckdVSUQ6IGVuY29kZVVSSUNvbXBvbmVudChcIlwiKSwgaXNPbmx5UXVlcnk6IGVuY29kZVVSSUNvbXBvbmVudCh0cnVlKSB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICAgICAgdmFyIG1vZGFsT2JqID0gJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5maW5kKCcjbXlNb2RhbCcpO1xyXG4gICAgICAgICAgICBtb2RhbE9iai5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kYWwtdGVtcC1wcm9kdWN0SWRdXCIpLmZpbmQoJyNtb2RhbC1wcm9kdWN0SWQtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgLy92YXIgalRhYmxlT2JqID0gbW9kYWxPYmouZmluZChcIiNwcm9kdWN0SWQtdGFibGVcIikuRGF0YVRhYmxlKHtcclxuICAgICAgICAgICAgLy8gICAgZG9tOiAnQmxmcnRpcCcsXHJcbiAgICAgICAgICAgIC8vICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0ZXh0OiAn6YG45pOH5a6M55WiJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSwgZHQsIG5vZGUsIGNvbmZpZykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkLmVhY2goalRhYmxlT2JqLnJvd3MoJy5zZWxlY3RlZCcpLmRhdGEoKSwgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGl0ZW1bMF0sIHRoaXNPYmouUHJvZHVjdExpc3QpID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNPYmouUHJvZHVjdExpc3QucHVzaChpdGVtWzBdKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBtb2RhbE9iai5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgLy8gICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBzdHlsZTogJ211bHRpJ1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUZXN0M0Z1bmMoKSB7XHJcbiAgICAgICAgY29uc3QgbW9kYWxVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L1N5c0NvbmZpZy9DdXN0b21lci9fR2V0Q2FyTm9JbmZvTW9kZWxgO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5nZXQobW9kYWxVcmwpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5odG1sKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1jYXJub2luZm9dXCIpLmZpbmQoJyNteU1vZGFsJyk7XHJcbiAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIEN1c3RvbWVySWRfQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLkN1c3RvbWVyTmFtZV9KcUlucHV0RG9tLnZhbChcIlwiKTtcclxuICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS52YWwoXCJcIik7IC8vIOi7iueJjOWQjeeosea4heepulxyXG5cclxuICAgICAgICBpZiAodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tICYmXHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJJZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS52YWwoKSA9PT0gXCIwXCIpIHsgIC8vIOaWsOWuouaItlxyXG4gICAgICAgICAgICB0aGlzLkN1c3RvbWVyTmFtZV9KcUlucHV0RG9tLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpc09iai5SZVNldENhck5vSXRlbXMoW10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20uYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ3VzdG9tZXJJZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5DdXN0b21lckFQSS5HZXRDYXJOb0l0ZW1zQnkodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLlJlU2V0Q2FyTm9JdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDYXJOb0lkX0NoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbSAmJlxyXG4gICAgICAgICAgICB0aGlzLkNhck5vSWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpcy5DYXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG5cclxuXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCB0aGlzUGFnT2JqID0gdGhpcztcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=