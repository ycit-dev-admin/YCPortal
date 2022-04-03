var EditCustomerInfoPage = /** @class */ (function () {
    function EditCustomerInfoPage(baseUrl) {
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
    EditCustomerInfoPage.prototype.EditCompanyName_Keyup = function () {
        if (this.EditCompanyName_Dom.value.length > 0) {
            this.ShowEditCompanyName_Dom.innerHTML = "=> \u8B8A\u66F4\u70BA : " + this.EditCompanyName_Dom.value;
            this.ShowEditCompanyName_Dom.style.color = "red";
        }
        else {
            this.ShowEditCompanyName_Dom.innerHTML = "";
        }
    };
    EditCustomerInfoPage.prototype.Test2Func = function () {
        var modalUrl = this.BaseUrl + "/SysConfig/Customer/_GetCarNoInfoModel";
        return $.get(modalUrl, { carGUID: encodeURIComponent("") }).done(function (data) {
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
    EditCustomerInfoPage.prototype.Test3Func = function () {
        var modalUrl = this.BaseUrl + "/SysConfig/Customer/_GetCarNoInfoModel";
        return $.get(modalUrl).done(function (data) {
            $("div[name=model-temp-carnoinfo]").html(data);
            var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
            modalObj.modal('show');
        });
    };
    EditCustomerInfoPage.prototype.CustomerId_Change = function () {
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
    EditCustomerInfoPage.prototype.CarNoId_Change = function () {
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
    EditCustomerInfoPage.prototype.ReSetCarNoItems = function (dataObjLs) {
        var thisPagObj = this;
        thisPagObj.CarNoId_JqSelectDom.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.id, false, false);
            thisPagObj.CarNoId_JqSelectDom.append(newOption);
        });
    };
    return EditCustomerInfoPage;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzY29uZmlnQ3VzdG9tZXJFZGl0Q3VzdG9tZXJJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9TeXNjb25maWdDdXN0b21lckVkaXRDdXN0b21lckluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUE7SUFvQkksOEJBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQWhCaEMsV0FBVztRQUdYLFlBQVk7UUFDTCxZQUFPLEdBQVksUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQXNCLENBQUMsS0FBSyxDQUFDO1FBQ2pGLGlCQUFZLEdBQVksUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUMsS0FBSyxDQUFDO1FBSzNGLFdBQU0sR0FBd0IsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDeEQsWUFBTyxHQUE4QyxJQUFJLEdBQUcsRUFBd0MsQ0FBQztRQUNyRyxZQUFPLEdBQW1DLENBQUMsRUFBRSxDQUFtQyxDQUFDO1FBQ2pGLFlBQU8sR0FBbUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQTRCeEQsWUFBWTtRQUNMLHdCQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDckYsNEJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBb0IsQ0FBQztRQUc5RixxQkFBZ0IsR0FBNkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUscUJBQWdCLEdBQTZCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSwyQkFBc0IsR0FBOEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0Usa0NBQTZCLEdBQStCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSw0QkFBdUIsR0FBMkIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsMkJBQXNCLEdBQThCLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFD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QUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsT0FBTztRQUNqRCxJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCwyQkFBQztBQUFELENBQUMsQUF0TEQsSUFzTEMiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFBlcnNvbiA9IHtcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICByYXRpbmc6IG51bWJlcjtcclxufTtcclxuXHJcblxyXG5jbGFzcyBFZGl0Q3VzdG9tZXJJbmZvUGFnZSB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBGaWVsZHMgICBcclxuICAgIHB1YmxpYyBDYXJHdWlkOiBzdHJpbmcgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhckd1aWQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuICAgIHB1YmxpYyBDdXN0b21lckd1aWQ6IHN0cmluZyA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJHdWlkJykgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyAgXHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQVBJOiBDdXN0b21lckFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBTeXNDb25maWdQYWdlSGVscGVyOiBTeXNDb25maWdQYWdlSGVscGVyO1xyXG4gICAgcHVibGljIHRlc3RRUTogTWFwPHN0cmluZywgUGVyc29uPiA9IG5ldyBNYXA8c3RyaW5nLCBQZXJzb24+KCk7XHJcbiAgICBwdWJsaWMgdGVzdFFRMjogTWFwPHN0cmluZywgeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfT4gPSBuZXcgTWFwPHN0cmluZywgeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfT4oKTtcclxuICAgIHB1YmxpYyB0ZXN0UVEzOiBbeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfV0gPSBbe31dIGFzIFt7IGhhaGE6IHN0cmluZywgY2M6IG51bWJlciB9XTtcclxuICAgIHB1YmxpYyB0ZXN0UVE0OiBbeyBoYWhhOiBzdHJpbmcsIGNjOiBudW1iZXIgfV0gPSBbbnVsbF07XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJBUEkgPSBuZXcgQ3VzdG9tZXJBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuU3lzQ29uZmlnUGFnZUhlbHBlciA9IG5ldyBTeXNDb25maWdQYWdlSGVscGVyKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEuc2V0KFwid293XCIsIHsgZW1haWw6IFwiYWJjZFwiLCByYXRpbmc6IDUwMCB9KTtcclxuICAgICAgICB0aGlzLnRlc3RRUS5zZXQoXCJ3b3cyXCIsIHsgZW1haWw6IFwiYWJjZGVmZ1wiLCByYXRpbmc6IDUwMSB9KTtcclxuICAgICAgICB0aGlzLnRlc3RRUTIuc2V0KFwid293M1wiLCB7IGhhaGE6IFwiNDU2XCIsIGNjOiA5OTkgfSk7XHJcbiAgICAgICAgdGhpcy50ZXN0UVEyLnNldChcIndvdzNcIiwgeyBoYWhhOiBcIjQ1NlwiLCBjYzogOTk5IH0pO1xyXG4gICAgICAgIGxldCBhYmMgPSB7IGhhaGE6IFwiYWJjXCIsIGNjOiA0NTYgfTtcclxuICAgICAgICBsZXQgYWJjMiA9IHsgaGFoYTogXCJhYmM3XCIsIGNjOiA0NTY3IH07XHJcbiAgICAgICAgdGhpcy50ZXN0UVEzLnB1c2goYWJjKTtcclxuICAgICAgICB0aGlzLnRlc3RRUTMucHVzaChhYmMyKTtcclxuICAgICAgICB0aGlzLnRlc3RRUTQucHVzaChhYmMyKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYHdvdyAke3RoaXMudGVzdFFRMy5maWx0ZXIodmFsdWUgPT4gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCAhPT0gMCkubGVuZ3RofWApO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gUGFnZSBGdW5jdGlvbnNcclxuXHJcblxyXG4gICAgcmVhZG9ubHkgSGFzQ2hhbmdlOiBib29sZWFuO1xyXG5cclxuXHJcbiAgICAvLyBQYWdlICBEb21cclxuICAgIHB1YmxpYyBFZGl0Q29tcGFueU5hbWVfRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRDb21wYW55TmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgU2hvd0VkaXRDb21wYW55TmFtZV9Eb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWNvbXBhbnlOYW1lJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcbiAgICBwdWJsaWMgRXZlblNob3dfSnFVbERvbTogSlF1ZXJ5PEhUTUxVTGlzdEVsZW1lbnQ+ID0gJCgnI2V2ZW5Qcm9kdWN0THMnKTtcclxuICAgIHB1YmxpYyBPZGRMU2hvd19KcVVsRG9tOiBKUXVlcnk8SFRNTFVMaXN0RWxlbWVudD4gPSAkKCcjb2RkUHJvZHVjdExzJyk7XHJcbiAgICBwdWJsaWMgVXNQcm9kSXRlbV9KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoJyN1c2VyLXNlbGVjdC1wcm9kaXRlbScpO1xyXG4gICAgcHVibGljIFRvdGFsUHJvZEl0ZW1JbmZvX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTEhlYWRpbmdFbGVtZW50PiA9ICQoJyN0b3RhbCcpO1xyXG4gICAgcHVibGljIGluZ3JlZGllbnRQb3N0X0pxRGl2RG9tOiBKUXVlcnk8SFRNTERpdkVsZW1lbnQ+ID0gJCgnI2luZ3JlZGllbnRQb3N0Jyk7XHJcbiAgICBwdWJsaWMgQ3VzdG9tZXJJZF9KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ3VzdG9tZXJJZCcpO1xyXG4gICAgcHVibGljIEN1c3RvbWVyTmFtZV9KcUlucHV0RG9tOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVyTmFtZScpO1xyXG4gICAgcHVibGljIENhck5vSWRfSnFTZWxlY3REb206IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vSWQnKTtcclxuICAgIHB1YmxpYyBDYXJOYW1lX0pxSW5wdXREb206IEpRdWVyeTxIVE1MSW5wdXRFbGVtZW50PiA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ2FyTm8nKTtcclxuICAgIHB1YmxpYyBGdWxsV2VpZ2h0X0RvbSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfRnVsbFdlaWdodCcpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERlZmVjdGl2ZVdlaWdodF9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0RlZmVjdGl2ZVdlaWdodCcpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIFVuaXRQcmljZV9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1VuaXRQcmljZScpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIFRyYWZpY1VuaXRQcmljZV9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1RyYWZpY1VuaXRQcmljZScpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIFRoaXJkV2VpZ2h0RmVlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfVGhpcmRXZWlnaHRGZWUnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBIYXNUYXhMaXN0ID0gJChcIi5pc2hhc190YXhcIikuZ2V0KCkgYXMgSFRNTElucHV0RWxlbWVudFtdO1xyXG4gICAgcHVibGljIERpc3BsYXlGaW5hbFByaWNlX0RPTSA9ICQoJyNzaG93X2ZpbmFsX3ByaWNlJykuZ2V0KDApIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEaXNwbGF5V2VpZ2h0UHJpY2VfRE9NID0gJCgnI3Nob3dfd2VpZ2h0X3ByaWNlJykuZ2V0KDApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERpc3BhbHlUcmFmaWNQcmljZV9ET00gPSAkKCcjc2hvd190cmFmaWNfcHJpY2UnKS5nZXQoMCkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgQWN0dWFsUHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9BY3R1YWxQcmljZScpLmdldCgwKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKiBBY3Rpb24gKi9cclxuICAgIHB1YmxpYyBFZGl0Q29tcGFueU5hbWVfS2V5dXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRWRpdENvbXBhbnlOYW1lX0RvbS52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0VkaXRDb21wYW55TmFtZV9Eb20uaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7dGhpcy5FZGl0Q29tcGFueU5hbWVfRG9tLnZhbHVlfWA7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0VkaXRDb21wYW55TmFtZV9Eb20uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2hvd0VkaXRDb21wYW55TmFtZV9Eb20uaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVGVzdDJGdW5jKCkge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9TeXNDb25maWcvQ3VzdG9tZXIvX0dldENhck5vSW5mb01vZGVsYDtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KG1vZGFsVXJsLCB7IGNhckdVSUQ6IGVuY29kZVVSSUNvbXBvbmVudChcIlwiKSB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICAgICAgdmFyIG1vZGFsT2JqID0gJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5maW5kKCcjbXlNb2RhbCcpO1xyXG4gICAgICAgICAgICBtb2RhbE9iai5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kYWwtdGVtcC1wcm9kdWN0SWRdXCIpLmZpbmQoJyNtb2RhbC1wcm9kdWN0SWQtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgLy92YXIgalRhYmxlT2JqID0gbW9kYWxPYmouZmluZChcIiNwcm9kdWN0SWQtdGFibGVcIikuRGF0YVRhYmxlKHtcclxuICAgICAgICAgICAgLy8gICAgZG9tOiAnQmxmcnRpcCcsXHJcbiAgICAgICAgICAgIC8vICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0ZXh0OiAn6YG45pOH5a6M55WiJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSwgZHQsIG5vZGUsIGNvbmZpZykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkLmVhY2goalRhYmxlT2JqLnJvd3MoJy5zZWxlY3RlZCcpLmRhdGEoKSwgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGl0ZW1bMF0sIHRoaXNPYmouUHJvZHVjdExpc3QpID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNPYmouUHJvZHVjdExpc3QucHVzaChpdGVtWzBdKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBtb2RhbE9iai5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgLy8gICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBzdHlsZTogJ211bHRpJ1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUZXN0M0Z1bmMoKSB7XHJcbiAgICAgICAgY29uc3QgbW9kYWxVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L1N5c0NvbmZpZy9DdXN0b21lci9fR2V0Q2FyTm9JbmZvTW9kZWxgO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5nZXQobW9kYWxVcmwpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5odG1sKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1jYXJub2luZm9dXCIpLmZpbmQoJyNteU1vZGFsJyk7XHJcbiAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIEN1c3RvbWVySWRfQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLkN1c3RvbWVyTmFtZV9KcUlucHV0RG9tLnZhbChcIlwiKTtcclxuICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS52YWwoXCJcIik7IC8vIOi7iueJjOWQjeeosea4heepulxyXG5cclxuICAgICAgICBpZiAodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tICYmXHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJJZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS52YWwoKSA9PT0gXCIwXCIpIHsgIC8vIOaWsOWuouaItlxyXG4gICAgICAgICAgICB0aGlzLkN1c3RvbWVyTmFtZV9KcUlucHV0RG9tLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpc09iai5SZVNldENhck5vSXRlbXMoW10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20uYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ3VzdG9tZXJJZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5DdXN0b21lckFQSS5HZXRDYXJOb0l0ZW1zQnkodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLlJlU2V0Q2FyTm9JdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDYXJOb0lkX0NoYW5nZSgpIHtcclxuICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbSAmJlxyXG4gICAgICAgICAgICB0aGlzLkNhck5vSWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpcy5DYXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG5cclxuXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCB0aGlzUGFnT2JqID0gdGhpcztcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=