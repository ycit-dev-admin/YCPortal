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
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/ // 格式不符，需為大於0整數 且 最多2位小數!!
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
    return PurchaseWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUHVyY2hhc2VXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWlCSSw0Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBZHpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBbUJ0RCxnQkFBZ0I7UUFDVCxzQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztRQUNqRixzQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBcUIsQ0FBQztRQUNoRixlQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXFCLENBQUM7UUFDbEUsbUJBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQztRQUMzRSxvQkFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO1FBQzVFLG9CQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7UUFDOUUsNEJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBc0IsQ0FBQztRQUMvRixrQkFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFxQixDQUFDO1FBQzdFLGtCQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXFCLENBQUM7UUFDNUUsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLENBQUM7UUFDaEYsd0JBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0Is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SSxFQUFyQixDQUFxQixDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FDeEYsQ0FBQztRQUNGLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FDaEQsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFDM0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUNuQyxDQUFDO1FBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLEtBQUs7WUFDOUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsT0FBTyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUNwRCxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1gsQ0FBQztZQUVGLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTtnQkFDL0IsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ2xELHlEQUF5RDtZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlMLHlDQUFDO0FBQUQsQ0FBQyxBQTlmRCxJQThmQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFB1cmNoYXNlV2VpZ2h0Tm90ZUNyZWF0ZVdlaWdodE5vdGUge1xyXG4gICAgLy8gQmFzZSBQb3JwZXJpdGVzXHJcbiAgICByZWFkb25seSBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgX3Byb2RJdGVtTGlzdDogUHVyY2hhc2VQcm9kSXRlbUxpc3QgPSBuZXcgUHVyY2hhc2VQcm9kSXRlbUxpc3QoKTtcclxuICAgIHJlYWRvbmx5IE1pbnVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJtaW51cy1wZXJjZW50XCJcclxuICAgIHJlYWRvbmx5IFBsdXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcInBsdXMtcGVyY2VudFwiXHJcblxyXG4gICAgLy8gRm9yIFBvc3RcclxuXHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyAgXHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQVBJOiBDdXN0b21lckFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBQdXJjaGFzZVByaWNlQVBJOiBQdXJjaGFzZVByaWNlQVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQ29udHJhY3RBUEk6IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJBUEkgPSBuZXcgQ3VzdG9tZXJBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuUHVyY2hhc2VQcmljZUFQSSA9IG5ldyBQdXJjaGFzZVByaWNlQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQ29udHJhY3RBUEkgPSBuZXcgQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRmllbGQgRG9tcyAqL1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyTmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJObyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDYXJObycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJOb1VOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyTm9VTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDcmVhdGVGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWFldC1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRm9ybUNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX2NyZWF0ZScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVXNlclNlbGVjdFByb2RpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2VsZWN0LXByb2RpdGVtJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFdmVuU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVuUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk9kZExTaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29kZFByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUb3RhbFByb2RJdGVtSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbCcpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkluZ3JlZGllbnRQb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZ3JlZGllbnRQb3N0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZGdWxsV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Z1bGxXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRGVmZWN0aXZlV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0RlZmVjdGl2ZVdlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkhhc1RheExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpc2hhc190YXgnKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gICAgcHVibGljIERvbU9mVHJhZmljVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RyYWZpY1VuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUaGlyZFdlaWdodEZlZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUaGlyZFdlaWdodEZlZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEaXNwbGF5RmluYWxQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X2ZpbmFsX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRGlzcGxheVdlaWdodFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfd2VpZ2h0X3ByaWNlJykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEaXNwYWx5VHJhZmljUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd190cmFmaWNfcHJpY2UnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNvbnRyYWN0VU5JRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDb250cmFjdFVOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RXZWlnaHQnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0NvbnRyYWN0VW5pdFByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mTm93Q29udHJhY3RXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RXZWlnaHQnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05vd0NvbnRyYWN0QWN0dWFsUHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZQYXlUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1BheVR5cGUnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBQYWdlUGx1Z2luSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8qIFBhZ2UgSW5pdGlhbGl6ZSAqL1xyXG4gICAgICAgIC8vIFNlbGVjdDIgRWxlbWVudHNcclxuICAgICAgICAkKCcuc2VsZWN0MmJzNCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlLFxyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyBqcXVlcnkgZGlhbG9nXHJcbiAgICAgICAgJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgICAgICBcIumAgeWHulwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NyZWFldC1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIuWPlua2iFwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VFdmVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICAvKiBQYWdlIEV2ZW50cyAqL1xyXG4gICAgICAgIC8vIOihqOWWruW7uueri1xyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRm9ybUNyZWF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g6YCy6LKo5bCN6LGhXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ3VzdG9tZXJOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8udmFsdWUgPSBcIlwiOyAvLyDou4rniYzlkI3nqLHmuIXnqbpcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQgJiZcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWUgPT09IFwiMFwiKSB7ICAvLyDmlrDlrqLmiLZcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkN1c3RvbWVyTmFtZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlJlU2V0Q2FyTm9JdGVtcyhbXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDdXN0b21lck5hbWUucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ3VzdG9tZXJOYW1lLnZhbHVlID0gc2VsZWN0ZWRUZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckFQSS5HZXRDYXJOb0l0ZW1zQnkoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyT2JqLlJlU2V0Q2FyTm9JdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWuouaItui7iueJjFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZDYXJOb1VOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDYXJOb1VOSUQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZkNhck5vVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkNhck5vVU5JRC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGN1ck9iai5Eb21PZkNhck5vLnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJPYmouRG9tT2ZDYXJOb1VOSUQgJiZcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZDYXJOby5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8ucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQ2FyTm8udmFsdWUgPSBzZWxlY3RlZFRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlk4HpoIVcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlcuaJgOmBuFxyXG4gICAgICAgICAgICB1c1Byb2RJdGVtRG9tcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuQXBwZW5kKGl0ZW0udmFsdWUsIGl0ZW0udGV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDopoHliKrpmaTnmoRcclxuICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuRGF0YS5maWx0ZXIoc2hvd0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEodXNQcm9kSXRlbURvbXMubWFwKHVzSXRlbSA9PiB1c0l0ZW0udmFsdWUpLmluY2x1ZGVzKHNob3dJdGVtLnByb2RJZCkpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IGN1ck9iai5fcHJvZEl0ZW1MaXN0LlJlbW92ZUJ5UHJvZElkKHNob3dJdGVtLnByb2RJZCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgICAgICBjdXJPYmouU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWinuWKoC3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouUGx1c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljaygkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOa4m+WwkS3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouTWludXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLk1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRnVsbFdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRGVmZWN0aXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkhhc1RheExpc3QpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZUcmFmaWNVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRoaXJkV2VpZ2h0RmVlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlBheVR5cGUpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLnZhbGlkYXRlKHtcclxuICAgICAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIumggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWdub3JlOiBcIlwiLCAvLyDopoHmqqLmn6VIaWRkZW7mrITkvY3opoHliqDpgJnlgItcclxuICAgICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgICAgIEZ1bGxXZWlnaHRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFNjYWxlTm86IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIEhhc1RheDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgQ2FuTm9VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBQYXlUeXBlOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBVU1Byb2RMaXN0OiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvKiAgICAgU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvczogXCJyZXF1aXJlZFwiLCovXHJcbiAgICAgICAgICAgICAgICBDdXN0b21lck5hbWU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC52YWx1ZSA9PT0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIENhck5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJPYmouRG9tT2ZDYXJOb1VOSUQudmFsdWUgPT09IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBGdWxsV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8wfF5cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFVuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRoaXJkV2VpZ2h0RmVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzB8XlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUGF5VGltZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mUGF5VHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZlBheVR5cGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlICE9PSBcIjJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZQYXlUeXBlLm9wdGlvbnNbY3VyT2JqLkRvbU9mUGF5VHlwZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1ck9iai5Eb21PZlBheVR5cGUudmFsdWUgJiYgc2VsZWN0ZWRWYWx1ZSAhPT0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5BY3R1YWxQcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC9eXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICAgICAgRnVsbFdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVGhpcmRXZWlnaHRGZWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIuS7mOePvuS7peWklueahOS7mOasvuaWueW8j+iri+WLmeW/heWhq+Wvq+WCmeiou1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogJ3NwYW4nLFxyXG4gICAgICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24gKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5hZGRDbGFzcygnaW52YWxpZC1mZWVkYmFjaycpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFwcGVuZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQ2xhc3MgVmFyaWFibGUgKi9cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCBKcURvbU9mQ2FyTm9VTklEID0gJCh0aGlzLkRvbU9mQ2FyTm9VTklEKTtcclxuXHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmNhck5vVU5JRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dVU1Byb2RJdGVtcygpIHtcclxuICAgICAgICBsZXQgZXZlblNob3dVbERvbSA9IHRoaXMuRG9tT2ZFdmVuU2hvdztcclxuICAgICAgICBsZXQgb2RkU2hvd1VsRG9tID0gdGhpcy5Eb21PZk9kZExTaG93O1xyXG4gICAgICAgIGV2ZW5TaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBvZGRTaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IGl0ZW0ucHJvZFRleHQ7XHJcbiAgICAgICAgICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7aXRlbS5wcm9kVGV4dH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIC8vIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IHRoaXMuX3Byb2RJdGVtTGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICAgICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcbiAgICAgICAgICAgIGluZGV4ICUgMiA9PT0gMCA/IGV2ZW5TaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpIDpcclxuICAgICAgICAgICAgICAgIG9kZFNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZylcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuU2hvd1Byb2RJdGVtU3VtbWFyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1Byb2RJdGVtU3VtbWFyeSgpIHtcclxuICAgICAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICAgICAgbGV0IG1heEl0ZW06IFB1cmNoYXNlUHJvZEl0ZW07XHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBhbGxQZXJjZW50ID0gKyBpdGVtLnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLnBlcmNlbnQgPiAraXRlbS5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7dGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEubGVuZ3RofemghWA7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBwZXJjZW50U3Bhbi5pbm5lckhUTUwgPSBg77yM5q+U5L6L5Yqg57i9OiR7YWxsUGVyY2VudH0lYFxyXG4gICAgICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgY29uc3QgcmVjb2duaXRpb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LnByb2RUZXh0ID8/IFwi54ShXCJ9YFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHN1bW1hcnlJbmZvID0gYCR7cmVjb2duaXRpb25TcGFuLmlubmVySFRNTH0ke2l0ZW1TcGFuLmlubmVySFRNTH0ke3BlcmNlbnRTcGFuLmlubmVySFRNTH1gO1xyXG5cclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChwZXJjZW50U3Bhbik7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBCaW5kSW5ncmVkaWVudFRvRG9tKCkge1xyXG4gICAgICAgIGxldCBwb3N0RGl2ID0gdGhpcy5Eb21PZkluZ3JlZGllbnRQb3N0O1xyXG5cclxuICAgICAgICBwb3N0RGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBoaWRkZW4gaW5wdXQgZWxlbWVudCwgYW5kIGFwcGVuZCBpdCB0byB0aGUgbGk6XHJcbiAgICAgICAgICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLkl0ZW1OYW1lYDtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kVGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5Qcm9kdWN0SWRgO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLkl0ZW1QZXJjZW50YDtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gaXRlbS5wZXJjZW50LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChuYW1lUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQocGVyY2VudFByb3BlcnR5KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNaW51c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMCA8IDAgPyAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBmdW5jUnMgPSB0aGlzLlB1cmNoYXNlUHJpY2VBUEkuR2V0V2VpZ2h0Tm90ZVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkZ1bGxXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mRGVmZWN0aXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlVuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLkRvbU9mSGFzVGF4TGlzdCkuZmluZChpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSkudmFsdWUgPT09IFwiVHJ1ZVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXMuUHVyY2hhc2VQcmljZUFQSS5HZXREZWxpdmVyeVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkZ1bGxXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVHJhZmljVW5pdFByaWNlLnZhbHVlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIpIHtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkRpc3BsYXlXZWlnaHRQcmljZS50ZXh0Q29udGVudCA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZEaXNwYWx5VHJhZmljUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhMlswXTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLlB1cmNoYXNlUHJpY2VBUEkuR2V0QWN0dWFsUGF5UHJpY2UoXHJcbiAgICAgICAgICAgICAgICArdGhpc09iai5Eb21PZlRoaXJkV2VpZ2h0RmVlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcclxuICAgICAgICAgICAgICAgIGRhdGEyWzBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZkRpc3BsYXlGaW5hbFByaWNlLnRleHRDb250ZW50ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXNPYmouQWN0dWFsUHJpY2VfRE9NLnZhbHVlID0gZGF0YTsg5oeJ6Kmy5oqK5LiK6L+w5YC8IOmDveW4tuWbnuW+jOerr+mHjeaWsOioiOeul1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==