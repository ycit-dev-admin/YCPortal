/* Page Initialize */
// Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4',
    placeholder: "請選擇"
});
//$('.select2bs5').select2({
//    theme: 'bootstrap4',
//    placeholder: "請選擇"
//})
//$('.select2bs6').select2({
//    theme: 'bootstrap4',
//    placeholder: "請選擇"
//})
// jquery dialog
$("#dialog-confirm").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    autoOpen: false,
    buttons: {
        "送出": function () {
            $('#creaet-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
});
var PurchaseWeightNoteCreateWeightNote = /** @class */ (function () {
    function PurchaseWeightNoteCreateWeightNote(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        /* Field Doms */
        this.DomOfCustomerId = document.getElementById('CustomerUNID');
        this.DomOfCustomerName = document.getElementById('CustomerName');
        this.DomOfCarNo = document.getElementById('CarNo');
        this.DomOfCanNoUNID = document.getElementById('CanNoUNID');
        this.DomOfCreateForm = document.getElementById('creaet-form');
        this.DomOfFormCreate = document.getElementById('form_create');
        this.DomOfUserSelectProditem = document.getElementById('user-select-proditem');
        this.DomOfEvenShow = document.getElementById('evenProductLs');
        this.DomOfOddLShow = document.getElementById('oddProductLs');
        this.DomOfTotalProdItemInfo = document.getElementById('total');
        this.DomOfIngredientPost = document.getElementById('ingredientPost');
        this.DomOfFullWeight = document.getElementById('FullWeight');
        this.DomOfDefectiveWeight = document.getElementById('DefectiveWeight');
        this.DomOfUnitPrice = document.getElementById('UnitPrice');
        this.DomOfHasTaxList = document.getElementsByClassName('ishas_tax');
        this.DomOfTraficUnitPrice = document.getElementById('TraficUnitPrice');
        this.DomOfThirdWeightFee = document.getElementById('ThirdWeightFee');
        this.DomOfDisplayFinalPrice = document.getElementById('show_final_price');
        this.DomOfDisplayWeightPrice = document.getElementById('show_weight_price');
        this.DomOfDispalyTraficPrice = document.getElementById('show_trafic_price');
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.PurchasePriceAPI = new PurchasePriceAPIClass(this.BaseUrl);
    }
    //-----old
    // public DomOfShowEditCompanyName = document.getElementById('show-edit-companyName') as HTMLSpanElement;
    /* Class Variable */
    /* Page Function */
    PurchaseWeightNoteCreateWeightNote.prototype.ReSetCarNoItems = function (dataObjLs) {
        var JqDomOfCarNoUNID = $(this.DomOfCanNoUNID);
        JqDomOfCarNoUNID.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.id, false, false);
            JqDomOfCarNoUNID.append(newOption);
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.ShowUSProdItems = function () {
        var _this = this;
        var evenShowUlDom = this.DomOfEvenShow;
        var oddShowUlDom = this.DomOfOddLShow;
        evenShowUlDom.innerHTML = "";
        oddShowUlDom.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            var iMinusTag = document.createElement("i");
            iMinusTag.classList.add("fas");
            iMinusTag.classList.add("fa-minus-circle");
            iMinusTag.classList.add(_this.MinusPercentClassName);
            iMinusTag.style.cursor = "pointer";
            iMinusTag.style.color = "blue";
            var iPlusTag = document.createElement("i");
            iPlusTag.classList.add("fas");
            iPlusTag.classList.add("fa-plus-circle");
            iPlusTag.classList.add(_this.PlusPercentClassName);
            iPlusTag.style.cursor = "pointer";
            iPlusTag.style.color = "red";
            var spanTag = document.createElement("span");
            var liTag = document.createElement("li");
            liTag.dataset.text = item.prodText;
            liTag.textContent = item.prodText + " \u00A0\u00A0";
            liTag.dataset.value = item.prodId;
            // liTag.dataset.percent = this._prodItemList.length === 0 ? "90" : "10";
            spanTag.innerHTML = "\u00A0\u00A0" + item.percent + "%\u00A0\u00A0";
            liTag.appendChild(iMinusTag);
            liTag.appendChild(spanTag);
            liTag.appendChild(iPlusTag);
            index % 2 === 0 ? evenShowUlDom.appendChild(liTag) :
                oddShowUlDom.appendChild(liTag);
        });
        this.ShowProdItemSummary();
    };
    PurchaseWeightNoteCreateWeightNote.prototype.ShowProdItemSummary = function () {
        var _a;
        var allPercent = 0;
        var maxItem;
        this._prodItemList.Data.forEach(function (item) {
            allPercent = +item.percent + allPercent;
            if (!maxItem) {
                maxItem = item;
            }
            else {
                maxItem = +maxItem.percent > +item.percent ? maxItem : item;
            }
        });
        var itemSpan = document.createElement("span");
        itemSpan.innerHTML = "\uFF0C\u5DF2\u9078" + this._prodItemList.Data.length + "\u9805";
        var percentSpan = document.createElement("span");
        percentSpan.innerHTML = "\uFF0C\u6BD4\u4F8B\u52A0\u7E3D:" + allPercent + "%";
        if (allPercent > 100)
            percentSpan.style.color = "red";
        var recognitionSpan = document.createElement("span");
        recognitionSpan.innerHTML = "\u8A8D\u5217\u9805\u76EE : " + ((_a = maxItem === null || maxItem === void 0 ? void 0 : maxItem.prodText) !== null && _a !== void 0 ? _a : "無");
        //let summaryInfo = `${recognitionSpan.innerHTML}${itemSpan.innerHTML}${percentSpan.innerHTML}`;
        this.DomOfTotalProdItemInfo.innerHTML = "";
        this.DomOfTotalProdItemInfo.appendChild(recognitionSpan);
        this.DomOfTotalProdItemInfo.appendChild(itemSpan);
        this.DomOfTotalProdItemInfo.appendChild(percentSpan);
    };
    ;
    PurchaseWeightNoteCreateWeightNote.prototype.BindIngredientToDom = function () {
        var postDiv = this.DomOfIngredientPost;
        postDiv.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            // Create a hidden input element, and append it to the li:
            var nameProperty = document.createElement("input");
            nameProperty.type = "hidden";
            nameProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemName";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "VE_PurchaseIngredientLs[" + index + "].ProductId";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemPercent";
            percentProperty.value = item.percent.toString();
            postDiv.append(nameProperty);
            postDiv.append(valueProperty);
            postDiv.append(percentProperty);
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.PlusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    PurchaseWeightNoteCreateWeightNote.prototype.MinusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    PurchaseWeightNoteCreateWeightNote.prototype.CaculateAllFee = function () {
        var thisObj = this;
        var funcRs = this.PurchasePriceAPI.GetWeightNotePrice(+this.DomOfFullWeight.value, +this.DomOfDefectiveWeight.value, +this.DomOfUnitPrice.value, Array.from(this.DomOfHasTaxList).find(function (item) { return item.checked === true; }).value === "True");
        var funcRs2 = this.PurchasePriceAPI.GetDeliveryPrice(+this.DomOfFullWeight.value, +this.DomOfTraficUnitPrice.value);
        $.when(funcRs, funcRs2).then(function (data, data2) {
            thisObj.DomOfDisplayWeightPrice.textContent = data[0];
            thisObj.DomOfDispalyTraficPrice.textContent = data2[0];
            var funcRs3 = thisObj.PurchasePriceAPI.GetActualPayPrice(+thisObj.DomOfThirdWeightFee.value, data[0], data2[0]);
            $.when(funcRs3).then(function (data) {
                thisObj.DomOfDisplayFinalPrice.textContent = data;
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            $("#dialog-confirm").dialog("open");
        });
        // 進貨對象
        $(curObj.DomOfCustomerId).on('change', function () {
            var selectedText = curObj.DomOfCustomerId.options[curObj.DomOfCustomerId.selectedIndex].text;
            var selectedValue = curObj.DomOfCustomerId.options[curObj.DomOfCustomerId.selectedIndex].value;
            curObj.DomOfCustomerName.value = "";
            curObj.DomOfCarNo.value = ""; // 車牌名稱清空
            if (curObj.DomOfCustomerId &&
                selectedValue === "0") { // 新客戶
                curObj.DomOfCustomerName.readOnly = false;
                curObj.ReSetCarNoItems([]);
            }
            else {
                curObj.DomOfCustomerName.readOnly = true;
                curObj.DomOfCustomerName.value = selectedText;
                var funcRs = curObj.CustomerAPI.GetCarNoItemsBy(selectedValue);
                $.when(funcRs).then(function (data) {
                    curObj.ReSetCarNoItems(data);
                });
            }
        });
        // 客戶車牌
        $(curObj.DomOfCanNoUNID).on('change', function () {
            var selectedText = curObj.DomOfCanNoUNID.options[curObj.DomOfCanNoUNID.selectedIndex].text;
            var selectedValue = curObj.DomOfCanNoUNID.options[curObj.DomOfCanNoUNID.selectedIndex].value;
            curObj.DomOfCarNo.value = "";
            if (curObj.DomOfCanNoUNID &&
                selectedValue === "0") {
                curObj.DomOfCarNo.readOnly = false;
            }
            else {
                curObj.DomOfCarNo.readOnly = true;
                curObj.DomOfCarNo.value = selectedText;
            }
        });
        // 進貨品項
        $(curObj.DomOfUserSelectProditem).on('change', function () {
            var usProdItemDoms = $(curObj.DomOfUserSelectProditem).find(':selected').toArray();
            // User所選
            usProdItemDoms.forEach(function (item) {
                curObj._prodItemList.Append(item.value, item.text);
            });
            // 要刪除的
            curObj._prodItemList.Data.filter(function (showItem) {
                return !(usProdItemDoms.map(function (usItem) { return usItem.value; }).includes(showItem.prodId));
            }).forEach(function (showItem) { return curObj._prodItemList.RemoveByProdId(showItem.prodId); });
            // pageMain.ProdList.RefreshProdItemPercent();
            curObj.ShowUSProdItems();
            curObj.BindIngredientToDom();
        });
        // 增加-進貨品項百分比
        $(curObj.DomOfCreateForm).on('click', "." + curObj.PlusPercentClassName, function () {
            curObj.PlusProdItemPercent_Click($(this).get(0));
        });
        // 減少-進貨品項百分比
        $(curObj.DomOfCreateForm).on('click', "." + curObj.MinusPercentClassName, function () {
            curObj.MinusProdItemPercent_Click($(this).get(0));
        });
        $(curObj.DomOfFullWeight).on('keyup', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfDefectiveWeight).on('keyup', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfUnitPrice).on('keyup', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfHasTaxList).on('change', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfTraficUnitPrice).on('keyup', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfThirdWeightFee).on('keyup', function () {
            curObj.CaculateAllFee();
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.PageValidateInit = function () {
        var curObj = this;
        // Form Validation
        $(curObj.DomOfCreateForm).validate({
            submitHandler: function (form) {
                form.submit();
            },
            ignore: "",
            rules: {
                FullWeightTime: "required",
                CustomerUNID: "required",
                /*     SelectPurchaseDetailInfos: "required",*/
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
                    pattern: /^\+?[1-9][0-9]*$/ // 大於0的正整數
                },
                "VE_PurchaseWeightNote.DefectiveWeight": {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/ // 大於或等於0的正整數
                },
                "VE_PurchaseWeightNote.UnitPrice": {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/ // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                "VE_PurchaseWeightNote.TraficUnitPrice": {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/ // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                "VE_PurchaseWeightNote.ThirdWeightFee": {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/ // 大於或等於0的正整數
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    required: true,
                //    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                //}
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
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    pattern: "實付金額必須為大於0"
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
    };
    return PurchaseWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBcUI7QUFDckIsbUJBQW1CO0FBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsV0FBVyxFQUFFLEtBQUs7Q0FDckIsQ0FBQyxDQUFBO0FBQ0YsNEJBQTRCO0FBQzVCLDBCQUEwQjtBQUMxQix3QkFBd0I7QUFDeEIsSUFBSTtBQUNKLDRCQUE0QjtBQUM1QiwwQkFBMEI7QUFDMUIsd0JBQXdCO0FBQ3hCLElBQUk7QUFHSixnQkFBZ0I7QUFDaEIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3hCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLEdBQUc7SUFDVixLQUFLLEVBQUUsSUFBSTtJQUNYLFFBQVEsRUFBRSxLQUFLO0lBQ2YsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0YsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELElBQUksRUFBRTtZQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUNKO0NBQ0osQ0FBQyxDQUFBO0FBRUY7SUFnQkksNENBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQWJ6QixrQkFBYSxHQUF5QixJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDL0QsMEJBQXFCLEdBQVcsZUFBZSxDQUFB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bnQiOlsiLyogUGFnZSBJbml0aWFsaXplICovXHJcbi8vIFNlbGVjdDIgRWxlbWVudHNcclxuJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG59KVxyXG4vLyQoJy5zZWxlY3QyYnM1Jykuc2VsZWN0Mih7XHJcbi8vICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbi8vICAgIHBsYWNlaG9sZGVyOiBcIuiri+mBuOaTh1wiXHJcbi8vfSlcclxuLy8kKCcuc2VsZWN0MmJzNicpLnNlbGVjdDIoe1xyXG4vLyAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4vLyAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4vL30pXHJcblxyXG5cclxuLy8ganF1ZXJ5IGRpYWxvZ1xyXG4kKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBtb2RhbDogdHJ1ZSxcclxuICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICBcIumAgeWHulwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNjcmVhZXQtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCLlj5bmtohcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmNsYXNzIFB1cmNoYXNlV2VpZ2h0Tm90ZUNyZWF0ZVdlaWdodE5vdGUge1xyXG4gICAgLy8gQmFzZSBQb3JwZXJpdGVzXHJcbiAgICByZWFkb25seSBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgX3Byb2RJdGVtTGlzdDogUHVyY2hhc2VQcm9kSXRlbUxpc3QgPSBuZXcgUHVyY2hhc2VQcm9kSXRlbUxpc3QoKTtcclxuICAgIHJlYWRvbmx5IE1pbnVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJtaW51cy1wZXJjZW50XCJcclxuICAgIHJlYWRvbmx5IFBsdXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcInBsdXMtcGVyY2VudFwiXHJcblxyXG4gICAgLy8gRm9yIFBvc3RcclxuXHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyAgXHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQVBJOiBDdXN0b21lckFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBQdXJjaGFzZVByaWNlQVBJOiBQdXJjaGFzZVByaWNlQVBJQ2xhc3M7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQVBJID0gbmV3IEN1c3RvbWVyQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLlB1cmNoYXNlUHJpY2VBUEkgPSBuZXcgUHVyY2hhc2VQcmljZUFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRmllbGQgRG9tcyAqL1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDdXN0b21lclVOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkN1c3RvbWVyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDdXN0b21lck5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ2FyTm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyTm8nKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ2FuTm9VTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhbk5vVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3JlYXRlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhZXQtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkZvcm1DcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9jcmVhdGUnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlVzZXJTZWxlY3RQcm9kaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNlbGVjdC1wcm9kaXRlbScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRXZlblNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlblByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZPZGRMU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZGRQcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVG90YWxQcm9kSXRlbUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbmdyZWRpZW50UG9zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmdyZWRpZW50UG9zdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRnVsbFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGdWxsV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkRlZmVjdGl2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdEZWZlY3RpdmVXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1VuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZIYXNUYXhMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXNoYXNfdGF4JykgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICAgIHB1YmxpYyBEb21PZlRyYWZpY1VuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUcmFmaWNVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVGhpcmRXZWlnaHRGZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVGhpcmRXZWlnaHRGZWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRGlzcGxheUZpbmFsUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd19maW5hbF9wcmljZScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkRpc3BsYXlXZWlnaHRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X3dlaWdodF9wcmljZScpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRGlzcGFseVRyYWZpY1ByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfdHJhZmljX3ByaWNlJykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cclxuICAgIC8vLS0tLS1vbGRcclxuICAgIC8vIHB1YmxpYyBEb21PZlNob3dFZGl0Q29tcGFueU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1lZGl0LWNvbXBhbnlOYW1lJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcbiAgICAvKiBDbGFzcyBWYXJpYWJsZSAqL1xyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuICAgIHByaXZhdGUgUmVTZXRDYXJOb0l0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDYXJOb1VOSUQgPSAkKHRoaXMuRG9tT2ZDYW5Ob1VOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93VVNQcm9kSXRlbXMoKSB7XHJcbiAgICAgICAgbGV0IGV2ZW5TaG93VWxEb20gPSB0aGlzLkRvbU9mRXZlblNob3c7XHJcbiAgICAgICAgbGV0IG9kZFNob3dVbERvbSA9IHRoaXMuRG9tT2ZPZGRMU2hvdztcclxuICAgICAgICBldmVuU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgb2RkU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnRleHQgPSBpdGVtLnByb2RUZXh0O1xyXG4gICAgICAgICAgICBsaVRhZy50ZXh0Q29udGVudCA9IGAke2l0ZW0ucHJvZFRleHR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICAvLyBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSB0aGlzLl9wcm9kSXRlbUxpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgICAgICAgICBzcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgICAgICAgICBpbmRleCAlIDIgPT09IDAgPyBldmVuU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKSA6XHJcbiAgICAgICAgICAgICAgICBvZGRTaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLlNob3dQcm9kSXRlbVN1bW1hcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQcm9kSXRlbVN1bW1hcnkoKSB7XHJcbiAgICAgICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhJdGVtOiBQdXJjaGFzZVByb2RJdGVtO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5wZXJjZW50ID4gK2l0ZW0ucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke3RoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmxlbmd0aH3poIVgO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgICAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5wcm9kVGV4dCA/PyBcIueEoVwifWBcclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBzdW1tYXJ5SW5mbyA9IGAke3JlY29nbml0aW9uU3Bhbi5pbm5lckhUTUx9JHtpdGVtU3Bhbi5pbm5lckhUTUx9JHtwZXJjZW50U3Bhbi5pbm5lckhUTUx9YDtcclxuXHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgQmluZEluZ3JlZGllbnRUb0RvbSgpIHtcclxuICAgICAgICBsZXQgcG9zdERpdiA9IHRoaXMuRG9tT2ZJbmdyZWRpZW50UG9zdDtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtTmFtZWA7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZFRleHRcclxuICAgICAgICAgICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBWRV9QdXJjaGFzZUluZ3JlZGllbnRMc1ske2luZGV4fV0uUHJvZHVjdElkYDtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtUGVyY2VudGA7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucGVyY2VudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQobmFtZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMCA+IDEwMCA/IDEwMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhY3VsYXRlQWxsRmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzOyAgICAgIFxyXG5cclxuICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5QdXJjaGFzZVByaWNlQVBJLkdldFdlaWdodE5vdGVQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZGdWxsV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkRlZmVjdGl2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZVbml0UHJpY2UudmFsdWUsXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5Eb21PZkhhc1RheExpc3QpLmZpbmQoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUpLnZhbHVlID09PSBcIlRydWVcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IGZ1bmNSczIgPSB0aGlzLlB1cmNoYXNlUHJpY2VBUEkuR2V0RGVsaXZlcnlQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZGdWxsV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlRyYWZpY1VuaXRQcmljZS52YWx1ZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgICQud2hlbihmdW5jUnMsIGZ1bmNSczIpLnRoZW4oZnVuY3Rpb24gKGRhdGEsIGRhdGEyKSB7XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZEaXNwbGF5V2VpZ2h0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mRGlzcGFseVRyYWZpY1ByaWNlLnRleHRDb250ZW50ID0gZGF0YTJbMF07XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMzID0gdGhpc09iai5QdXJjaGFzZVByaWNlQVBJLkdldEFjdHVhbFBheVByaWNlKFxyXG4gICAgICAgICAgICAgICAgK3RoaXNPYmouRG9tT2ZUaGlyZFdlaWdodEZlZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgICBkYXRhMlswXVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNSczMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZEaXNwbGF5RmluYWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzT2JqLkFjdHVhbFByaWNlX0RPTS52YWx1ZSA9IGRhdGE7IOaHieipsuaKiuS4iui/sOWAvCDpg73luLblm57lvoznq6/ph43mlrDoqIjnrpdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZGb3JtQ3JlYXRlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlsI3osaFcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkN1c3RvbWVySWQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkN1c3RvbWVySWQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lcklkLnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZDdXN0b21lcklkLm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJJZC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGN1ck9iai5Eb21PZkN1c3RvbWVyTmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGN1ck9iai5Eb21PZkNhck5vLnZhbHVlID0gXCJcIjsgLy8g6LuK54mM5ZCN56ix5riF56m6XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VyT2JqLkRvbU9mQ3VzdG9tZXJJZCAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9PT0gXCIwXCIpIHsgIC8vIOaWsOWuouaItlxyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ3VzdG9tZXJOYW1lLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouUmVTZXRDYXJOb0l0ZW1zKFtdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkN1c3RvbWVyTmFtZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDdXN0b21lck5hbWUudmFsdWUgPSBzZWxlY3RlZFRleHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQVBJLkdldENhck5vSXRlbXNCeShzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJPYmouUmVTZXRDYXJOb0l0ZW1zKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5a6i5oi26LuK54mMXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDYW5Ob1VOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkNhbk5vVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkNhbk5vVU5JRC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mQ2FuTm9VTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ2FuTm9VTklELnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8udmFsdWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1ck9iai5Eb21PZkNhbk5vVU5JRCAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkNhck5vLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDYXJOby5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDYXJOby52YWx1ZSA9IHNlbGVjdGVkVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOmAsuiyqOWTgemghVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNQcm9kSXRlbURvbXMgPSAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxPcHRpb25FbGVtZW50W107XHJcblxyXG4gICAgICAgICAgICAvLyBVc2Vy5omA6YG4XHJcbiAgICAgICAgICAgIHVzUHJvZEl0ZW1Eb21zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5BcHBlbmQoaXRlbS52YWx1ZSwgaXRlbS50ZXh0KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIOimgeWIqumZpOeahFxyXG4gICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5EYXRhLmZpbHRlcihzaG93SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISh1c1Byb2RJdGVtRG9tcy5tYXAodXNJdGVtID0+IHVzSXRlbS52YWx1ZSkuaW5jbHVkZXMoc2hvd0l0ZW0ucHJvZElkKSk7XHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goc2hvd0l0ZW0gPT4gY3VyT2JqLl9wcm9kSXRlbUxpc3QuUmVtb3ZlQnlQcm9kSWQoc2hvd0l0ZW0ucHJvZElkKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwYWdlTWFpbi5Qcm9kTGlzdC5SZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICAgICAgY3VyT2JqLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5aKe5YqgLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5QbHVzUGVyY2VudENsYXNzTmFtZX1gLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5QbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5rib5bCRLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5NaW51c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soJCh0aGlzKS5nZXQoMCkpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZGdWxsV2VpZ2h0KS5vbigna2V5dXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZEZWZlY3RpdmVXZWlnaHQpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mSGFzVGF4TGlzdCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRyYWZpY1VuaXRQcmljZSkub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVGhpcmRXZWlnaHRGZWUpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZVZhbGlkYXRlSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8vIEZvcm0gVmFsaWRhdGlvblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkudmFsaWRhdGUoe1xyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWdub3JlOiBcIlwiLCAvLyDopoHmqqLmn6VIaWRkZW7mrITkvY3opoHliqDpgJnlgItcclxuICAgICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgICAgIEZ1bGxXZWlnaHRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8qICAgICBTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zOiBcInJlcXVpcmVkXCIsKi9cclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLlNjYWxlTm9cIjogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuSGFzVGF4XCI6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkNhck5vSWRcIjogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQ3VzdG9tZXJOYW1lXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCIjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVySWRcIikudmFsKCkgPT09IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5DYXJOb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFwiI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJOb0lkXCIpLnZhbCgpID09PSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuRnVsbFdlaWdodFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkRlZmVjdGl2ZVdlaWdodFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzB8XlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuVW5pdFByaWNlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXihbMS05XVswLTldKihcXC5bMC05XXsxLDJ9KT98MFxcLig/ITArJClbMC05XXsxLDJ9KSQvICAvLyDmoLzlvI/kuI3nrKbvvIzpnIDngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4ISFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5UcmFmaWNVbml0UHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLlRoaXJkV2VpZ2h0RmVlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvMHxeXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQWN0dWFsUHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkZ1bGxXZWlnaHRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuRGVmZWN0aXZlV2VpZ2h0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlLlVuaXRQcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5UcmFmaWNVbml0UHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuVGhpcmRXZWlnaHRGZWVcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1wiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkFjdHVhbFByaWNlXCI6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IFwi5a+m5LuY6YeR6aGN5b+F6aCI54K65aSn5pa8MFwiXHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXHJcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCdpbnZhbGlkLWZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYXBwZW5kKGVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==