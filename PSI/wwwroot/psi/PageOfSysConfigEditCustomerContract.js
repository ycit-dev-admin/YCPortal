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
            $('#edit-contract-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
});
var PageOfSysConfigEditCustomerContract = /** @class */ (function () {
    function PageOfSysConfigEditCustomerContract(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        /* Field Doms */
        this.DomOfIsChanged = document.getElementById("IsChanged");
        this.DomOfCarGuid = document.getElementById('CarGuid');
        this.DomOfCustomerGuid = document.getElementById('CustomerGuid');
        this.DomOfEditStratTime = document.getElementById('EditStratTime');
        this.DomOfShowEditStratTime = document.getElementById('show-edit-editstrattime');
        this.DomOfEditEndTime = document.getElementById('EditEndTime');
        this.DomOfShowEditEndTime = document.getElementById('show-edit-editendtime');
        this.DomOfEditContractStatus = document.getElementById('EditContractStatus');
        this.DomOfShowEditContractStatus = document.getElementById('show-edit-contractstatus');
        this.DomOfEditCustomerGUID = document.getElementById('EditCustomerGUID');
        this.DomOfShowEditCustomerGUID = document.getElementById('show-edit-editcustomerGUID');
        this.DomOfEditContractName = document.getElementById('EditContractName');
        this.DomOfShowEditContractName = document.getElementById('show-edit-editcontractname');
        this.DomOfEditContractType = document.getElementById('EditContractType');
        this.DomOfShowEditContractType = document.getElementById('show-edit-editcontractType');
        this.DomOfEditProductGUID = document.getElementById('EditProductGUID');
        this.DomOfShowEditProductGUID = document.getElementById('show-edit-EditProductGUID');
        this.DomOfEditDealWeight = document.getElementById('EditDealWeight');
        this.DomOfShowEditDealWeight = document.getElementById('show-edit-EditDealWeight');
        this.DomOfEditDealUnitPrice = document.getElementById('EditDealUnitPrice');
        this.DomOfShowEditDealUnitPrice = document.getElementById('show-edit-EditDealUnitPrice');
        this.DomOfEditRemark = document.getElementById('EditRemark');
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }
    /* Class Variable */
    /* Page Function */
    PageOfSysConfigEditCustomerContract.prototype.SetChageStatus = function (result) {
        this.DomOfIsChanged.value = result.toString();
    };
    PageOfSysConfigEditCustomerContract.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $('#form_create').on('click', function () {
            $("#dialog-confirm").dialog("open");
        });
        $(curObj.DomOfEditStratTime).on('input', function () {
            if (curObj.DomOfEditStratTime.value.length > 0) {
                curObj.DomOfShowEditStratTime.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditStratTime.value;
                curObj.DomOfShowEditStratTime.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditStratTime.innerHTML = "";
            }
        });
        $(curObj.DomOfEditEndTime).on('input', function () {
            if (curObj.DomOfEditEndTime.value.length > 0) {
                curObj.DomOfShowEditEndTime.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditEndTime.value;
                curObj.DomOfShowEditEndTime.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditEndTime.innerHTML = "";
            }
        });
        $(curObj.DomOfEditContractStatus).on('change', function () {
            var selectedText = curObj.DomOfEditContractStatus.options[curObj.DomOfEditContractStatus.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditContractStatus.innerHTML = "=> \u8B8A\u66F4\u70BA : " + selectedText;
                curObj.DomOfShowEditContractStatus.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditContractStatus.innerHTML = "";
            }
        });
        $(curObj.DomOfEditCustomerGUID).on('change', function () {
            var selectedText = curObj.DomOfEditCustomerGUID.options[curObj.DomOfEditCustomerGUID.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditCustomerGUID.innerHTML = "=> \u8B8A\u66F4\u70BA : " + selectedText;
                curObj.DomOfShowEditCustomerGUID.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditCustomerGUID.innerHTML = "";
            }
        });
        $(curObj.DomOfEditContractName).on('input', function () {
            if (curObj.DomOfEditContractName.value.length > 0) {
                curObj.DomOfShowEditContractName.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditContractName.value;
                curObj.DomOfShowEditContractName.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditContractName.innerHTML = "";
            }
        });
        $(curObj.DomOfEditContractType).on('change', function () {
            var selectedText = curObj.DomOfEditContractType.options[curObj.DomOfEditContractType.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditContractType.innerHTML = "=> \u8B8A\u66F4\u70BA : " + selectedText;
                curObj.DomOfShowEditContractType.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditContractType.innerHTML = "";
            }
        });
        $(curObj.DomOfEditProductGUID).on('change', function () {
            var selectedText = curObj.DomOfEditProductGUID.options[curObj.DomOfEditProductGUID.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditProductGUID.innerHTML = "=> \u8B8A\u66F4\u70BA : " + selectedText;
                curObj.DomOfShowEditProductGUID.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditProductGUID.innerHTML = "";
            }
        });
        $(curObj.DomOfEditDealWeight).on('input', function () {
            if (curObj.DomOfEditDealWeight.value.length > 0) {
                curObj.DomOfShowEditDealWeight.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditDealWeight.value;
                curObj.DomOfShowEditDealWeight.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditDealWeight.innerHTML = "";
            }
        });
        $(curObj.DomOfEditDealUnitPrice).on('input', function () {
            if (curObj.DomOfEditDealUnitPrice.value.length > 0) {
                curObj.DomOfShowEditDealUnitPrice.innerHTML = "=> \u8B8A\u66F4\u70BA : " + curObj.DomOfEditDealUnitPrice.value;
                curObj.DomOfShowEditDealUnitPrice.style.color = "red";
                curObj.SetChageStatus(true);
            }
            else {
                curObj.DomOfShowEditDealUnitPrice.innerHTML = "";
            }
        });
        $(curObj.DomOfEditRemark).on('input', function () {
            if (curObj.DomOfEditRemark.value.length > 0) {
                curObj.SetChageStatus(true);
            }
        });
        // 車牌編輯
        //$('#has-carno').on('click', `button`, function () {
        //    let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
        //    $.when(pageRs).then(function (data) {
        //        $("div[name=model-temp-carnoinfo]").html(data);
        //        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        //        modalObj.modal('show');
        //    });
        //})
    };
    return PageOfSysConfigEditCustomerContract;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVyQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL1BhZ2VPZlN5c0NvbmZpZ0VkaXRDdXN0b21lckNvbnRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQjtBQUNyQixtQkFBbUI7QUFDbkIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQixLQUFLLEVBQUUsWUFBWTtJQUNuQixXQUFXLEVBQUUsT0FBTztDQUN2QixDQUFDLENBQUE7QUFFRixnQkFBZ0I7QUFDaEIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3hCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsSUFBSTtJQUNYLFFBQVEsRUFBRSxLQUFLO0lBQ2YsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0YsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQ0o7Q0FDSixDQUFDLENBQUE7QUFFRjtJQVlJLDZDQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFNaEMsZ0JBQWdCO1FBQ1IsbUJBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztRQUMzRSxpQkFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFxQixDQUFDO1FBQ3RFLHNCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxD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Q0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFLRixPQUFPO1FBQ1AscURBQXFEO1FBQ3JELGdHQUFnRztRQUNoRywyQ0FBMkM7UUFDM0MseURBQXlEO1FBQ3pELDhFQUE4RTtRQUM5RSxpQ0FBaUM7UUFDakMsU0FBUztRQUNULElBQUk7SUFHUixDQUFDO0lBRUwsMENBQUM7QUFBRCxDQUFDLEFBMUtELElBMEtDIiwic291cmNlc0NvbnRlbnQiOlsiLyogUGFnZSBJbml0aWFsaXplICovXHJcbi8vIFNlbGVjdDIgRWxlbWVudHNcclxuJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4fpoIXnm65cIlxyXG59KVxyXG5cclxuLy8ganF1ZXJ5IGRpYWxvZ1xyXG4kKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBtb2RhbDogdHJ1ZSxcclxuICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICBcIuWEsuWtmFwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNlZGl0LWNvbnRyYWN0LWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwi5Y+W5raIXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG5jbGFzcyBQYWdlT2ZTeXNDb25maWdFZGl0Q3VzdG9tZXJDb250cmFjdCB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJBUEk6IEN1c3RvbWVyQVBJQ2xhc3M7XHJcbiAgICBwdWJsaWMgU3lzQ29uZmlnUGFnZUhlbHBlcjogU3lzQ29uZmlnUGFnZUhlbHBlcjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgdGhpcy5DdXN0b21lckFQSSA9IG5ldyBDdXN0b21lckFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5TeXNDb25maWdQYWdlSGVscGVyID0gbmV3IFN5c0NvbmZpZ1BhZ2VIZWxwZXIodGhpcy5CYXNlVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBGaWVsZCBEb21zICovXHJcbiAgICBwcml2YXRlIERvbU9mSXNDaGFuZ2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJJc0NoYW5nZWRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNhckd1aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyR3VpZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lckd1aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJHdWlkJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXRTdHJhdFRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdFN0cmF0VGltZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93RWRpdFN0cmF0VGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtZWRpdHN0cmF0dGltZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXRFbmRUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRFbmRUaW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dFZGl0RW5kVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtZWRpdGVuZHRpbWUnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0Q29udHJhY3RTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdENvbnRyYWN0U3RhdHVzJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93RWRpdENvbnRyYWN0U3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC1jb250cmFjdHN0YXR1cycpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXRDdXN0b21lckdVSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdEN1c3RvbWVyR1VJRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0VkaXRDdXN0b21lckdVSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWVkaXRjdXN0b21lckdVSUQnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0Q29udHJhY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRDb250cmFjdE5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0VkaXRDb250cmFjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWVkaXRjb250cmFjdG5hbWUnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0Q29udHJhY3RUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRDb250cmFjdFR5cGUnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dFZGl0Q29udHJhY3RUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC1lZGl0Y29udHJhY3RUeXBlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRWRpdFByb2R1Y3RHVUlEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRQcm9kdWN0R1VJRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0VkaXRQcm9kdWN0R1VJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtRWRpdFByb2R1Y3RHVUlEJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRWRpdERlYWxXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRWRpdERlYWxXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0VkaXREZWFsV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC1FZGl0RGVhbFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkVkaXREZWFsVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXREZWFsVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dFZGl0RGVhbFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LWVkaXQtRWRpdERlYWxVbml0UHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFZGl0UmVtYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0VkaXRSZW1hcmsnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHJcbiAgICAvKiBDbGFzcyBWYXJpYWJsZSAqL1xyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuICAgIHB1YmxpYyBTZXRDaGFnZVN0YXR1cyhyZXN1bHQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkRvbU9mSXNDaGFuZ2VkLnZhbHVlID0gcmVzdWx0LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgJCgnI2Zvcm1fY3JlYXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZFZGl0U3RyYXRUaW1lKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZFZGl0U3RyYXRUaW1lLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0U3RyYXRUaW1lLmlubmVySFRNTCA9IGA9PiDorormm7TngrogOiAke2N1ck9iai5Eb21PZkVkaXRTdHJhdFRpbWUudmFsdWV9YDtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0U3RyYXRUaW1lLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0U3RyYXRUaW1lLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZFZGl0RW5kVGltZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3VyT2JqLkRvbU9mRWRpdEVuZFRpbWUudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRFbmRUaW1lLmlubmVySFRNTCA9IGA9PiDorormm7TngrogOiAke2N1ck9iai5Eb21PZkVkaXRFbmRUaW1lLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdEVuZFRpbWUuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlNldENoYWdlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRFbmRUaW1lLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZFZGl0Q29udHJhY3RTdGF0dXMpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkVkaXRDb250cmFjdFN0YXR1cy5vcHRpb25zW2N1ck9iai5Eb21PZkVkaXRDb250cmFjdFN0YXR1cy5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29udHJhY3RTdGF0dXMuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7c2VsZWN0ZWRUZXh0fWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbnRyYWN0U3RhdHVzLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29udHJhY3RTdGF0dXMuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkVkaXRDdXN0b21lckdVSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkVkaXRDdXN0b21lckdVSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZFZGl0Q3VzdG9tZXJHVUlELnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFRleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0VkaXRDdXN0b21lckdVSUQuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7c2VsZWN0ZWRUZXh0fWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdEN1c3RvbWVyR1VJRC5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouU2V0Q2hhZ2VTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdEN1c3RvbWVyR1VJRC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRWRpdENvbnRyYWN0TmFtZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY3VyT2JqLkRvbU9mRWRpdENvbnRyYWN0TmFtZS52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbnRyYWN0TmFtZS5pbm5lckhUTUwgPSBgPT4g6K6K5pu054K6IDogJHtjdXJPYmouRG9tT2ZFZGl0Q29udHJhY3ROYW1lLnZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbnRyYWN0TmFtZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouU2V0Q2hhZ2VTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbnRyYWN0TmFtZS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRWRpdENvbnRyYWN0VHlwZSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gY3VyT2JqLkRvbU9mRWRpdENvbnRyYWN0VHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZkVkaXRDb250cmFjdFR5cGUuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGV4dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdENvbnRyYWN0VHlwZS5pbm5lckhUTUwgPSBgPT4g6K6K5pu054K6IDogJHtzZWxlY3RlZFRleHR9YDtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29udHJhY3RUeXBlLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0Q29udHJhY3RUeXBlLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZFZGl0UHJvZHVjdEdVSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkVkaXRQcm9kdWN0R1VJRC5vcHRpb25zW2N1ck9iai5Eb21PZkVkaXRQcm9kdWN0R1VJRC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0UHJvZHVjdEdVSUQuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7c2VsZWN0ZWRUZXh0fWA7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdFByb2R1Y3RHVUlELnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5TZXRDaGFnZVN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0UHJvZHVjdEdVSUQuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkVkaXREZWFsV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZFZGl0RGVhbFdlaWdodC52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdERlYWxXZWlnaHQuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7Y3VyT2JqLkRvbU9mRWRpdERlYWxXZWlnaHQudmFsdWV9YDtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0RGVhbFdlaWdodC5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouU2V0Q2hhZ2VTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdERlYWxXZWlnaHQuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkVkaXREZWFsVW5pdFByaWNlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZFZGl0RGVhbFVuaXRQcmljZS52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdERlYWxVbml0UHJpY2UuaW5uZXJIVE1MID0gYD0+IOiuiuabtOeCuiA6ICR7Y3VyT2JqLkRvbU9mRWRpdERlYWxVbml0UHJpY2UudmFsdWV9YDtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dFZGl0RGVhbFVuaXRQcmljZS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouU2V0Q2hhZ2VTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93RWRpdERlYWxVbml0UHJpY2UuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkVkaXRSZW1hcmspLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGN1ck9iai5Eb21PZkVkaXRSZW1hcmsudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlNldENoYWdlU3RhdHVzKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8g6LuK54mM57eo6LyvXHJcbiAgICAgICAgLy8kKCcjaGFzLWNhcm5vJykub24oJ2NsaWNrJywgYGJ1dHRvbmAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICBsZXQgcGFnZVJzID0gY3VyT2JqLlN5c0NvbmZpZ1BhZ2VIZWxwZXIuR2V0Q2FyTm9JbmZvTW9kZWwoJCh0aGlzKS52YWwoKS50b1N0cmluZygpLCB0cnVlKTtcclxuICAgICAgICAvLyAgICAkLndoZW4ocGFnZVJzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgdmFyIG1vZGFsT2JqID0gJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5maW5kKCcjbXlNb2RhbCcpO1xyXG4gICAgICAgIC8vICAgICAgICBtb2RhbE9iai5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfSlcclxuXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==