var PurchaseWeightNoteCreateWeightNote = /** @class */ (function () {
    function PurchaseWeightNoteCreateWeightNote(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        /* Field Doms */
        this.DomOfCustomerUNID = document.getElementById('CustomerUNID');
        this.DomOfCustomerName = document.getElementById('CustomerName');
        this.DomOfCarNo = document.getElementById('CarNo');
        this.DomOfCarNoUNID = document.getElementById('CarNoUNID');
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
        this.DomOfContractUNID = document.getElementById('ContractUNID');
        this.DomOfShowContractWeight = document.getElementById('ShowContractWeight');
        this.DomOfShowContractUnitPrice = document.getElementById('ShowContractUnitPrice');
        this.DomOfNowContractWeight = document.getElementById('NowContractWeight');
        this.DomOfNowContractActualPrice = document.getElementById('NowContractActualPrice');
        this.DomOfPayType = document.getElementById('PayType');
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.PurchasePriceAPI = new PurchasePriceAPIClass(this.BaseUrl);
        this.CustomerContractAPI = new CustomerContractAPIClass(this.BaseUrl);
    }
    PurchaseWeightNoteCreateWeightNote.prototype.PagePluginInit = function () {
        var curObj = this;
        /* Page Initialize */
        // Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4',
            placeholder: "請選擇"
        });
        $(curObj.DomOfContractUNID).select2({
            allowClear: true,
            theme: 'bootstrap4',
            placeholder: "請選擇"
        });
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
    };
    PurchaseWeightNoteCreateWeightNote.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            $("#dialog-confirm").dialog("open");
        });
        // 進貨對象
        $(curObj.DomOfCustomerUNID).on('change', function () {
            var selectedText = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].text;
            var selectedValue = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].value;
            curObj.DomOfCustomerName.value = "";
            curObj.DomOfCarNo.value = ""; // 車牌名稱清空
            if (curObj.DomOfCustomerUNID &&
                selectedValue === "0") { // 新客戶
                curObj.DomOfCustomerName.readOnly = false;
                curObj.ReSetCarNoItems([]);
                curObj.ReSetContractItems([]);
            }
            else {
                curObj.DomOfCustomerName.readOnly = true;
                curObj.DomOfCustomerName.value = selectedText;
                var funcRs = curObj.CustomerAPI.GetCarNoItemsBy(selectedValue);
                $.when(funcRs).then(function (data) {
                    curObj.ReSetCarNoItems(data);
                });
                var funcRs2 = curObj.CustomerContractAPI.GetPurchaseContractsByCustomerUNID(selectedValue);
                $.when(funcRs2).then(function (data) {
                    curObj.ReSetContractItems(data);
                    $(curObj.DomOfContractUNID).trigger("change");
                });
            }
            $(curObj.DomOfCarNoUNID).trigger("change"); // 加這個客戶車牌才會判斷 是否選到0
        });
        // 客戶車牌
        $(curObj.DomOfCarNoUNID).on('change', function () {
            var selectedText = curObj.DomOfCarNoUNID.options[curObj.DomOfCarNoUNID.selectedIndex].text;
            var selectedValue = curObj.DomOfCarNoUNID.options[curObj.DomOfCarNoUNID.selectedIndex].value;
            curObj.DomOfCarNo.value = "";
            if (curObj.DomOfCarNoUNID &&
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
        $(curObj.DomOfFullWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfDefectiveWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfHasTaxList).on('change', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfTraficUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfThirdWeightFee).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfContractUNID).on('change', function () {
            var argUNID = $(this).val();
            if (argUNID) {
                var funcRs = curObj.CustomerContractAPI.GetContractItemsBy(argUNID.toString());
                $.when(funcRs).then(function (data) {
                    if (data.success) {
                        curObj.DomOfShowContractWeight.textContent = data.resultValue.dealWeight;
                        curObj.DomOfShowContractUnitPrice.textContent = data.resultValue.dealUnitPrice;
                        curObj.DomOfNowContractWeight.textContent = data.resultValue.nowActualWeight;
                        curObj.DomOfNowContractActualPrice.textContent = data.resultValue.nowActualPrice;
                        curObj.DomOfUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfUnitPrice.readOnly = true;
                        $(curObj.DomOfUnitPrice).trigger("input");
                    }
                    else {
                        alert(data.errorMessage);
                    }
                });
            }
            else {
                curObj.DomOfShowContractWeight.textContent = "";
                curObj.DomOfShowContractUnitPrice.textContent = "";
                curObj.DomOfNowContractWeight.textContent = "";
                curObj.DomOfNowContractActualPrice.textContent = "";
                curObj.DomOfUnitPrice.value = "";
                curObj.DomOfUnitPrice.readOnly = false;
                $(curObj.DomOfUnitPrice).trigger("input");
            }
        });
        $(curObj.DomOfPayType).on('change', function () {
            var argUNID = $(this).val();
            if (argUNID) {
                var funcRs = curObj.CustomerContractAPI.GetContractItemsBy(argUNID.toString());
                $.when(funcRs).then(function (data) {
                    if (data.success) {
                        curObj.DomOfShowContractWeight.textContent = data.resultValue.dealWeight;
                        curObj.DomOfShowContractUnitPrice.textContent = data.resultValue.dealUnitPrice;
                        curObj.DomOfNowContractWeight.textContent = data.resultValue.nowActualWeight;
                        curObj.DomOfNowContractActualPrice.textContent = data.resultValue.nowActualPrice;
                        curObj.DomOfUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfUnitPrice.readOnly = true;
                        $(curObj.DomOfUnitPrice).trigger("input");
                    }
                    else {
                        alert(data.errorMessage);
                    }
                });
            }
            else {
                curObj.DomOfShowContractWeight.textContent = "";
                curObj.DomOfShowContractUnitPrice.textContent = "";
                curObj.DomOfNowContractWeight.textContent = "";
                curObj.DomOfNowContractActualPrice.textContent = "";
                curObj.DomOfUnitPrice.value = "";
                curObj.DomOfUnitPrice.readOnly = false;
                $(curObj.DomOfUnitPrice).trigger("input");
            }
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.PageValidateInit = function () {
        var curObj = this;
        // Form Validation
        $(curObj.DomOfCreateForm).validate({
            invalidHandler: function (form) {
                alert("頁面資訊填寫不完整，請檢查頁面訊息!!");
            },
            submitHandler: function (form) {
                form.submit();
            },
            ignore: "",
            rules: {
                FullWeightTime: "required",
                CustomerUNID: "required",
                ScaleNo: "required",
                HasTax: "required",
                CanNoUNID: "required",
                PayType: "required",
                USProdList: "required",
                /*     SelectPurchaseDetailInfos: "required",*/
                CustomerName: {
                    required: function (element) {
                        return curObj.DomOfCustomerUNID.value === "0";
                    }
                },
                CarNo: {
                    required: function (element) {
                        return curObj.DomOfCarNoUNID.value === "0";
                    }
                },
                FullWeight: {
                    required: true,
                    pattern: /^\+?[1-9][0-9]*$/ // 大於0的正整數
                },
                DefectiveWeight: {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/ // 大於或等於0的正整數
                },
                UnitPrice: {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/ // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                TraficUnitPrice: {
                    required: true,
                    pattern: /^([0-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/ // 格式不符，需為大於等於0整數 且 最多2位小數!!
                },
                ThirdWeightFee: {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/ // 大於或等於0的正整數
                },
                PayTime: {
                    required: function (element) {
                        var selectedValue = curObj.DomOfPayType.options[curObj.DomOfPayType.selectedIndex].value;
                        return selectedValue !== "2";
                    }
                },
                Remark: {
                    required: function (element) {
                        var selectedValue = curObj.DomOfPayType.options[curObj.DomOfPayType.selectedIndex].value;
                        return curObj.DomOfPayType.value && selectedValue !== "1";
                    }
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    required: true,
                //    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                //}
            },
            messages: {
                FullWeight: {
                    pattern: "必須為大於0的正整數"
                },
                DefectiveWeight: {
                    pattern: "必須為大於或等於0的正整數"
                },
                UnitPrice: {
                    pattern: "必須為大於0整數 且 最多2位小數"
                },
                TraficUnitPrice: {
                    pattern: "必須為大於0整數 且 最多2位小數"
                },
                ThirdWeightFee: {
                    pattern: "必須為大於或等於0的正整數"
                },
                Remark: {
                    required: "付現以外的付款方式請務必填寫備註"
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
    };
    /* Class Variable */
    /* Page Function */
    PurchaseWeightNoteCreateWeightNote.prototype.ReSetCarNoItems = function (dataObjLs) {
        var JqDomOfCarNoUNID = $(this.DomOfCarNoUNID);
        JqDomOfCarNoUNID.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.carNoUNID, false, false);
            JqDomOfCarNoUNID.append(newOption);
        });
    };
    PurchaseWeightNoteCreateWeightNote.prototype.ReSetContractItems = function (dataObjLs) {
        var JqDomOfContractUNID = $(this.DomOfContractUNID);
        JqDomOfContractUNID.html(''); // 選項清空
        var defaultOption = new Option("", "", false, false);
        JqDomOfContractUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.contractName, item.contractGUID, false, false);
            JqDomOfContractUNID.append(newOption);
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
                thisObj.DomOfDisplayFinalPrice.textContent = data.toLocaleString('zh-TW', {
                    style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                });
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    };
    return PurchaseWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWlCSSw0Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBZHpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBbUJ0RCxnQkFBZ0I7UUFDVCxzQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztRQUNqRixzQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBcUIsQ0FBQztRQUNoRixlQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXFCLENBQUM7UUFDbEUsbUJBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztRQUMzRSxvQkFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO1FBQzVFLG9CQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7UUFDOUUsNEJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBc0IsQ0FBQztRQUMvRixrQkFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO1FBQzdFLGtCQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXFCLENBQUM7UUFDNUUsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLENBQUM7UUFDaEYsd0JBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0Is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TUFBTSxDQUN4RixDQUFDO1FBQ0YsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUNoRCxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUMzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQ25DLENBQUM7UUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsS0FBSztZQUM5QyxPQUFPLENBQUMsdUJBQXVCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsdUJBQXVCLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQ3BELENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDWCxDQUFDO1lBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFZO2dCQUN2QyxPQUFPLENBQUMsc0JBQXNCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO29CQUN0RSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztpQkFDL0QsQ0FBQyxDQUFDO2dCQUNILHlEQUF5RDtZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlMLHlDQUFDO0FBQUQsQ0FBQyxBQXJoQkQsSUFxaEJDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZSB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBfcHJvZEl0ZW1MaXN0OiBQdXJjaGFzZVByb2RJdGVtTGlzdCA9IG5ldyBQdXJjaGFzZVByb2RJdGVtTGlzdCgpO1xyXG4gICAgcmVhZG9ubHkgTWludXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcIm1pbnVzLXBlcmNlbnRcIlxyXG4gICAgcmVhZG9ubHkgUGx1c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwicGx1cy1wZXJjZW50XCJcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJBUEk6IEN1c3RvbWVyQVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIFB1cmNoYXNlUHJpY2VBUEk6IFB1cmNoYXNlUHJpY2VBUElDbGFzcztcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJDb250cmFjdEFQSTogQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgdGhpcy5DdXN0b21lckFQSSA9IG5ldyBDdXN0b21lckFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5QdXJjaGFzZVByaWNlQVBJID0gbmV3IFB1cmNoYXNlUHJpY2VBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJDb250cmFjdEFQSSA9IG5ldyBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBGaWVsZCBEb21zICovXHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lclVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lck5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJOYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNhck5vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhck5vJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNhck5vVU5JRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDYXJOb1VOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNyZWF0ZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYWV0LWZvcm0nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZGb3JtQ3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fY3JlYXRlJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zZWxlY3QtcHJvZGl0ZW0nKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkV2ZW5TaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW5Qcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mT2RkTFNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2RkUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRvdGFsUHJvZEl0ZW1JbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mSW5ncmVkaWVudFBvc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ncmVkaWVudFBvc3QnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkZ1bGxXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnVsbFdlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEZWZlY3RpdmVXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRGVmZWN0aXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mSGFzVGF4TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2lzaGFzX3RheCcpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTElucHV0RWxlbWVudD47XHJcbiAgICBwdWJsaWMgRG9tT2ZUcmFmaWNVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVHJhZmljVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRoaXJkV2VpZ2h0RmVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RoaXJkV2VpZ2h0RmVlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkRpc3BsYXlGaW5hbFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfZmluYWxfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEaXNwbGF5V2VpZ2h0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd193ZWlnaHRfcHJpY2UnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkRpc3BhbHlUcmFmaWNQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X3RyYWZpY19wcmljZScpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ29udHJhY3RVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NvbnRyYWN0VU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RVbml0UHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RBY3R1YWxQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlBheVR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUGF5VHlwZScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIFBhZ2VQbHVnaW5Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcbiAgICAgICAgLyogUGFnZSBJbml0aWFsaXplICovXHJcbiAgICAgICAgLy8gU2VsZWN0MiBFbGVtZW50c1xyXG4gICAgICAgICQoJy5zZWxlY3QyYnM0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuiri+mBuOaTh1wiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWUsXHJcbiAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuiri+mBuOaTh1wiXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vIGpxdWVyeSBkaWFsb2dcclxuICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgICAgIFwi6YCB5Ye6XCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY3JlYWV0LWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwi5Y+W5raIXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZGb3JtQ3JlYXRlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlsI3osaFcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjdXJPYmouRG9tT2ZDdXN0b21lck5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBjdXJPYmouRG9tT2ZDYXJOby52YWx1ZSA9IFwiXCI7IC8vIOi7iueJjOWQjeeosea4heepulxyXG5cclxuICAgICAgICAgICAgaWYgKGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRCAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZSA9PT0gXCIwXCIpIHsgIC8vIOaWsOWuouaItlxyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ3VzdG9tZXJOYW1lLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouUmVTZXRDYXJOb0l0ZW1zKFtdKTtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5SZVNldENvbnRyYWN0SXRlbXMoW10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ3VzdG9tZXJOYW1lLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkN1c3RvbWVyTmFtZS52YWx1ZSA9IHNlbGVjdGVkVGV4dDtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJBUEkuR2V0Q2FyTm9JdGVtc0J5KHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ck9iai5SZVNldENhck5vSXRlbXMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzMiA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldFB1cmNoYXNlQ29udHJhY3RzQnlDdXN0b21lclVOSUQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ck9iai5SZVNldENvbnRyYWN0SXRlbXMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKGN1ck9iai5Eb21PZkNhck5vVU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOWKoOmAmeWAi+WuouaItui7iueJjOaJjeacg+WIpOaWtyDmmK/lkKbpgbjliLAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWuouaItui7iueJjFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZDYXJOb1VOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDYXJOb1VOSUQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZkNhck5vVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkNhck5vVU5JRC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGN1ck9iai5Eb21PZkNhck5vLnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZDYXJOb1VOSUQgJiZcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDYXJOby5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8ucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8udmFsdWUgPSBzZWxlY3RlZFRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlk4HpoIVcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlcuaJgOmBuFxyXG4gICAgICAgICAgICB1c1Byb2RJdGVtRG9tcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuQXBwZW5kKGl0ZW0udmFsdWUsIGl0ZW0udGV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDopoHliKrpmaTnmoRcclxuICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuRGF0YS5maWx0ZXIoc2hvd0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEodXNQcm9kSXRlbURvbXMubWFwKHVzSXRlbSA9PiB1c0l0ZW0udmFsdWUpLmluY2x1ZGVzKHNob3dJdGVtLnByb2RJZCkpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IGN1ck9iai5fcHJvZEl0ZW1MaXN0LlJlbW92ZUJ5UHJvZElkKHNob3dJdGVtLnByb2RJZCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgICAgICBjdXJPYmouU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWinuWKoC3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouUGx1c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljaygkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOa4m+WwkS3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouTWludXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLk1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRnVsbFdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRGVmZWN0aXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkhhc1RheExpc3QpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZUcmFmaWNVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRoaXJkV2VpZ2h0RmVlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlBheVR5cGUpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLnZhbGlkYXRlKHtcclxuICAgICAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIumggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWdub3JlOiBcIlwiLCAvLyDopoHmqqLmn6VIaWRkZW7mrITkvY3opoHliqDpgJnlgItcclxuICAgICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgICAgIEZ1bGxXZWlnaHRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFNjYWxlTm86IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIEhhc1RheDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgQ2FuTm9VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBQYXlUeXBlOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBVU1Byb2RMaXN0OiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvKiAgICAgU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvczogXCJyZXF1aXJlZFwiLCovXHJcbiAgICAgICAgICAgICAgICBDdXN0b21lck5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC52YWx1ZSA9PT0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIENhck5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJPYmouRG9tT2ZDYXJOb1VOSUQudmFsdWUgPT09IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBGdWxsV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8wfF5cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFVuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFswLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvOetieaWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUaGlyZFdlaWdodEZlZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8wfF5cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFBheVRpbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZlBheVR5cGUub3B0aW9uc1tjdXJPYmouRG9tT2ZQYXlUeXBlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRWYWx1ZSAhPT0gXCIyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mUGF5VHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZlBheVR5cGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJPYmouRG9tT2ZQYXlUeXBlLnZhbHVlICYmIHNlbGVjdGVkVmFsdWUgIT09IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQWN0dWFsUHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIEZ1bGxXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUcmFmaWNVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRoaXJkV2VpZ2h0RmVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBSZW1hcms6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCLku5jnj77ku6XlpJbnmoTku5jmrL7mlrnlvI/oq4vli5nlv4Xloavlr6vlgpnoqLtcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uIChlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoJ2ludmFsaWQtZmVlZGJhY2snKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5hcHBlbmQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIENsYXNzIFZhcmlhYmxlICovXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG4gICAgcHJpdmF0ZSBSZVNldENhck5vSXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNhck5vVU5JRCA9ICQodGhpcy5Eb21PZkNhck5vVU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5jYXJOb1VOSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZVNldENvbnRyYWN0SXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNvbnRyYWN0VU5JRCA9ICQodGhpcy5Eb21PZkNvbnRyYWN0VU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCJcIiwgXCJcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmNvbnRyYWN0R1VJRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dVU1Byb2RJdGVtcygpIHtcclxuICAgICAgICBsZXQgZXZlblNob3dVbERvbSA9IHRoaXMuRG9tT2ZFdmVuU2hvdztcclxuICAgICAgICBsZXQgb2RkU2hvd1VsRG9tID0gdGhpcy5Eb21PZk9kZExTaG93O1xyXG4gICAgICAgIGV2ZW5TaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBvZGRTaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IGl0ZW0ucHJvZFRleHQ7XHJcbiAgICAgICAgICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7aXRlbS5wcm9kVGV4dH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIC8vIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IHRoaXMuX3Byb2RJdGVtTGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICAgICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcbiAgICAgICAgICAgIGluZGV4ICUgMiA9PT0gMCA/IGV2ZW5TaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpIDpcclxuICAgICAgICAgICAgICAgIG9kZFNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZylcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuU2hvd1Byb2RJdGVtU3VtbWFyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1Byb2RJdGVtU3VtbWFyeSgpIHtcclxuICAgICAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICAgICAgbGV0IG1heEl0ZW06IFB1cmNoYXNlUHJvZEl0ZW07XHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBhbGxQZXJjZW50ID0gKyBpdGVtLnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLnBlcmNlbnQgPiAraXRlbS5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7dGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEubGVuZ3RofemghWA7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBwZXJjZW50U3Bhbi5pbm5lckhUTUwgPSBg77yM5q+U5L6L5Yqg57i9OiR7YWxsUGVyY2VudH0lYFxyXG4gICAgICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgY29uc3QgcmVjb2duaXRpb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LnByb2RUZXh0ID8/IFwi54ShXCJ9YFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHN1bW1hcnlJbmZvID0gYCR7cmVjb2duaXRpb25TcGFuLmlubmVySFRNTH0ke2l0ZW1TcGFuLmlubmVySFRNTH0ke3BlcmNlbnRTcGFuLmlubmVySFRNTH1gO1xyXG5cclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChwZXJjZW50U3Bhbik7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBCaW5kSW5ncmVkaWVudFRvRG9tKCkge1xyXG4gICAgICAgIGxldCBwb3N0RGl2ID0gdGhpcy5Eb21PZkluZ3JlZGllbnRQb3N0O1xyXG5cclxuICAgICAgICBwb3N0RGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBoaWRkZW4gaW5wdXQgZWxlbWVudCwgYW5kIGFwcGVuZCBpdCB0byB0aGUgbGk6XHJcbiAgICAgICAgICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLkl0ZW1OYW1lYDtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kVGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5Qcm9kdWN0SWRgO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLkl0ZW1QZXJjZW50YDtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gaXRlbS5wZXJjZW50LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChuYW1lUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQocGVyY2VudFByb3BlcnR5KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNaW51c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMCA8IDAgPyAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBmdW5jUnMgPSB0aGlzLlB1cmNoYXNlUHJpY2VBUEkuR2V0V2VpZ2h0Tm90ZVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkZ1bGxXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mRGVmZWN0aXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlVuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLkRvbU9mSGFzVGF4TGlzdCkuZmluZChpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSkudmFsdWUgPT09IFwiVHJ1ZVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXMuUHVyY2hhc2VQcmljZUFQSS5HZXREZWxpdmVyeVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkZ1bGxXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVHJhZmljVW5pdFByaWNlLnZhbHVlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIpIHtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkRpc3BsYXlXZWlnaHRQcmljZS50ZXh0Q29udGVudCA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZEaXNwYWx5VHJhZmljUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhMlswXTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLlB1cmNoYXNlUHJpY2VBUEkuR2V0QWN0dWFsUGF5UHJpY2UoXHJcbiAgICAgICAgICAgICAgICArdGhpc09iai5Eb21PZlRoaXJkV2VpZ2h0RmVlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcclxuICAgICAgICAgICAgICAgIGRhdGEyWzBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mRGlzcGxheUZpbmFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpc09iai5BY3R1YWxQcmljZV9ET00udmFsdWUgPSBkYXRhOyDmh4noqbLmiorkuIrov7DlgLwg6YO95bi25Zue5b6M56uv6YeN5paw6KiI566XXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19