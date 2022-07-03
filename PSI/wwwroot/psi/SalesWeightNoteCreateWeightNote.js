var SalesWeightNoteCreateWeightNote = /** @class */ (function () {
    function SalesWeightNoteCreateWeightNote(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        /* Field Doms */
        //new
        this.DomOfLeaveWeight = document.getElementById('LeaveWeight');
        this.DomOfDefectiveWeight = document.getElementById('DefectiveWeight');
        this.DomOfUnitPrice = document.getElementById('UnitPrice');
        this.DomOfTraficUnitPrice = document.getElementById('TraficUnitPrice');
        this.DomOfInvoicePriceHasTax = document.getElementById('InvoicePriceHasTax');
        this.DomOfTraficFeeHasTax = document.getElementById('TraficFeeHasTax');
        this.DomOfShowReceivedPrice = document.getElementById('show_received_price');
        this.DomOfShowInvoicePrice = document.getElementById('show_invoice_price');
        this.DomOfShowTraficPrice = document.getElementById('show_trafic_price');
        this.DomOfCustomerUNID = document.getElementById('CustomerUNID');
        this.DomOfCarNoUNID = document.getElementById('CarNoUNID');
        this.DomOfReceivedType = document.getElementById('ReceivedType');
        this.DomOfCreateForm = document.getElementById('create-form');
        this.DomOfFormCreate = document.getElementById('form_create');
        // old
        this.DomOfUserSelectProditem = document.getElementById('user-select-proditem');
        this.DomOfEvenShow = document.getElementById('evenProductLs');
        this.DomOfOddLShow = document.getElementById('oddProductLs');
        this.DomOfTotalProdItemInfo = document.getElementById('total');
        this.DomOfIngredientPost = document.getElementById('ingredientPost');
        this.DomOfContractUNID = document.getElementById('ContractUNID');
        this.DomOfShowContractWeight = document.getElementById('ShowContractWeight');
        this.DomOfShowContractUnitPrice = document.getElementById('ShowContractUnitPrice');
        this.DomOfNowContractWeight = document.getElementById('NowContractWeight');
        this.DomOfNowContractActualPrice = document.getElementById('NowContractActualPrice');
        this.BaseUrl = baseUrl;
        this.SalesPriceAPI = new SalesPriceAPIClass(this.BaseUrl);
        this.CustomerContractAPI = new CustomerContractAPIClass(this.BaseUrl);
    }
    SalesWeightNoteCreateWeightNote.prototype.PagePluginInit = function () {
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
                    $('#create-form').submit();
                    $(this).dialog("close");
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    };
    SalesWeightNoteCreateWeightNote.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            $("#dialog-confirm").dialog("open");
        });
        // 出貨對象
        $(curObj.DomOfCustomerUNID).on('change', function () {
            var selectedText = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].text;
            var selectedValue = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].value;
            var funcRs = curObj.CustomerContractAPI.GetSalesContractsByCustomerUNID(selectedValue);
            $.when(funcRs).then(function (data) {
                curObj.ReSetContractItems(data);
                $(curObj.DomOfContractUNID).trigger("change"); // 重新整理的意思
            });
            //$(curObj.DomOfCarNoUNID).trigger("change");  // 加這個客戶車牌才會判斷 是否選到0
        });
        // 客戶車牌
        $(curObj.DomOfCarNoUNID).on('change', function () {
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
        $(curObj.DomOfLeaveWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfInvoicePriceHasTax).on('click', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfTraficFeeHasTax).on('click', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfDefectiveWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfTraficUnitPrice).on('input', function () {
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
        $(curObj.DomOfReceivedType).on('change', function () {
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
    SalesWeightNoteCreateWeightNote.prototype.PageValidateInit = function () {
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
                CustomerUNID: "required",
                CarNoUNID: "required",
                ExcavatorOperUNID: "required",
                LeaveWeightTime: "required",
                ProductItemUNID: "required",
                USProdList: "required",
                ReceivedTime: "required",
                ReceivedType: "required",
                /*     SelectPurchaseDetailInfos: "required",*/
                LeaveWeight: {
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
                Remark: {
                    required: function (element) {
                        var selectedValue = curObj.DomOfReceivedType.options[curObj.DomOfReceivedType.selectedIndex].value;
                        return curObj.DomOfReceivedType.value && selectedValue !== "1";
                    }
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    required: true,
                //    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                //}
            },
            messages: {
                LeaveWeight: {
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
    SalesWeightNoteCreateWeightNote.prototype.ReSetCarNoItems = function (dataObjLs) {
        var JqDomOfCarNoUNID = $(this.DomOfCarNoUNID);
        JqDomOfCarNoUNID.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.carNoUNID, false, false);
            JqDomOfCarNoUNID.append(newOption);
        });
    };
    SalesWeightNoteCreateWeightNote.prototype.ReSetContractItems = function (dataObjLs) {
        var JqDomOfContractUNID = $(this.DomOfContractUNID);
        JqDomOfContractUNID.html(''); // 選項清空
        var defaultOption = new Option("", "", false, false);
        JqDomOfContractUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.contractName, item.contractGUID, false, false);
            JqDomOfContractUNID.append(newOption);
        });
    };
    SalesWeightNoteCreateWeightNote.prototype.ShowUSProdItems = function () {
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
    SalesWeightNoteCreateWeightNote.prototype.ShowProdItemSummary = function () {
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
    SalesWeightNoteCreateWeightNote.prototype.BindIngredientToDom = function () {
        var postDiv = this.DomOfIngredientPost;
        postDiv.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            // Create a hidden input element, and append it to the li:
            var nameProperty = document.createElement("input");
            nameProperty.type = "hidden";
            nameProperty.name = "PESalesIngredientList[" + index + "].ITEM_NAME";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "PESalesIngredientList[" + index + "].PRODUCT_UNID";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "PESalesIngredientList[" + index + "].ITEM_PERCENT";
            percentProperty.value = item.percent.toString();
            postDiv.append(nameProperty);
            postDiv.append(valueProperty);
            postDiv.append(percentProperty);
        });
    };
    SalesWeightNoteCreateWeightNote.prototype.PlusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    SalesWeightNoteCreateWeightNote.prototype.MinusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    SalesWeightNoteCreateWeightNote.prototype.CaculateAllFee = function () {
        var thisObj = this;
        var funcRs = this.SalesPriceAPI.GetInvoicePrice(+this.DomOfLeaveWeight.value, +this.DomOfDefectiveWeight.value, +this.DomOfUnitPrice.value, this.DomOfInvoicePriceHasTax.checked);
        var funcRs2 = this.SalesPriceAPI.GetDeliveryPrice(+this.DomOfLeaveWeight.value, +this.DomOfTraficUnitPrice.value, this.DomOfTraficFeeHasTax.checked);
        $.when(funcRs, funcRs2).then(function (data, data2) {
            thisObj.DomOfShowInvoicePrice.textContent = data[0].toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            thisObj.DomOfShowTraficPrice.textContent = data2[0].toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            var funcRs3 = thisObj.SalesPriceAPI.GetReceivedPrice(data[0], data2[0]);
            $.when(funcRs3).then(function (data) {
                thisObj.DomOfShowReceivedPrice.textContent = data.toLocaleString('zh-TW', {
                    style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                });
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    };
    return SalesWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWdCSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBYnpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBaUJ0RCxnQkFBZ0I7UUFDaEIsS0FBSztRQUNFLHFCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFxQixDQUFDO1FBQzlFLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsbUJBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztRQUMxRSx5QkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFxQixDQUFDO1FBQ3RGLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXFCLENBQUM7UUFDNUYseUJBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztRQUN0RiwyQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF1QixDQUFDO1FBQzlGLDBCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXVCLENBQUM7UUFDNUYseUJBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBdUIsQ0FBQztRQUMxRixzQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztRQUNqRixtQkFBYyxHQUFHLFFBQVEs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O1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUwsc0NBQUM7QUFBRCxDQUFDLEFBaGZELElBZ2ZDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZSB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBfcHJvZEl0ZW1MaXN0OiBQdXJjaGFzZVByb2RJdGVtTGlzdCA9IG5ldyBQdXJjaGFzZVByb2RJdGVtTGlzdCgpO1xyXG4gICAgcmVhZG9ubHkgTWludXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcIm1pbnVzLXBlcmNlbnRcIlxyXG4gICAgcmVhZG9ubHkgUGx1c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwicGx1cy1wZXJjZW50XCJcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgU2FsZXNQcmljZUFQSTogU2FsZXNQcmljZUFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBDdXN0b21lckNvbnRyYWN0QVBJOiBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3M7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLlNhbGVzUHJpY2VBUEkgPSBuZXcgU2FsZXNQcmljZUFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5DdXN0b21lckNvbnRyYWN0QVBJID0gbmV3IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEZpZWxkIERvbXMgKi9cclxuICAgIC8vbmV3XHJcbiAgICBwdWJsaWMgRG9tT2ZMZWF2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdMZWF2ZVdlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEZWZlY3RpdmVXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRGVmZWN0aXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVHJhZmljVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RyYWZpY1VuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbnZvaWNlUHJpY2VIYXNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnSW52b2ljZVByaWNlSGFzVGF4JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRyYWZpY0ZlZUhhc1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUcmFmaWNGZWVIYXNUYXgnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd1JlY2VpdmVkUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd19yZWNlaXZlZF9wcmljZScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dJbnZvaWNlUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd19pbnZvaWNlX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd1RyYWZpY1ByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfdHJhZmljX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ2FyTm9VTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhck5vVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mUmVjZWl2ZWRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1JlY2VpdmVkVHlwZScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3JlYXRlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkZvcm1DcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9jcmVhdGUnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICAvLyBvbGRcclxuICAgIHB1YmxpYyBEb21PZlVzZXJTZWxlY3RQcm9kaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNlbGVjdC1wcm9kaXRlbScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRXZlblNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlblByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZPZGRMU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZGRQcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVG90YWxQcm9kSXRlbUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbmdyZWRpZW50UG9zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmdyZWRpZW50UG9zdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ29udHJhY3RVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NvbnRyYWN0VU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RVbml0UHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RBY3R1YWxQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZVBsdWdpbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvKiBQYWdlIEluaXRpYWxpemUgKi9cclxuICAgICAgICAvLyBTZWxlY3QyIEVsZW1lbnRzXHJcbiAgICAgICAgJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8ganF1ZXJ5IGRpYWxvZ1xyXG4gICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgd2lkdGg6IDQwMCxcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgXCLpgIHlh7pcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGUtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCLlj5bmtohcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlRXZlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogUGFnZSBFdmVudHMgKi9cclxuICAgICAgICAvLyDooajllq7lu7rnq4tcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkZvcm1DcmVhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOWHuuiyqOWwjeixoVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0U2FsZXNDb250cmFjdHNCeUN1c3RvbWVyVU5JRChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlJlU2V0Q29udHJhY3RJdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS50cmlnZ2VyKFwiY2hhbmdlXCIpOyAgLy8g6YeN5paw5pW055CG55qE5oSP5oCdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8kKGN1ck9iai5Eb21PZkNhck5vVU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOWKoOmAmeWAi+WuouaItui7iueJjOaJjeacg+WIpOaWtyDmmK/lkKbpgbjliLAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWuouaItui7iueJjFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlk4HpoIVcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlcuaJgOmBuFxyXG4gICAgICAgICAgICB1c1Byb2RJdGVtRG9tcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuQXBwZW5kKGl0ZW0udmFsdWUsIGl0ZW0udGV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDopoHliKrpmaTnmoRcclxuICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuRGF0YS5maWx0ZXIoc2hvd0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEodXNQcm9kSXRlbURvbXMubWFwKHVzSXRlbSA9PiB1c0l0ZW0udmFsdWUpLmluY2x1ZGVzKHNob3dJdGVtLnByb2RJZCkpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IGN1ck9iai5fcHJvZEl0ZW1MaXN0LlJlbW92ZUJ5UHJvZElkKHNob3dJdGVtLnByb2RJZCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgICAgICBjdXJPYmouU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWinuWKoC3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouUGx1c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljaygkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOa4m+WwkS3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouTWludXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLk1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mTGVhdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkludm9pY2VQcmljZUhhc1RheCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVHJhZmljRmVlSGFzVGF4KS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZEZWZlY3RpdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRyYWZpY1VuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ1VOSUQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVU5JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldENvbnRyYWN0SXRlbXNCeShhcmdVTklELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJnVU5JRCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChhcmdVTklEKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVmFsaWRhdGVJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcbiAgICAgICAgLy8gRm9ybSBWYWxpZGF0aW9uXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLpoIHpnaLos4foqIrloavlr6vkuI3lrozmlbTvvIzoq4vmqqLmn6XpoIHpnaLoqIrmga8hIVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlnbm9yZTogXCJcIiwgLy8g6KaB5qqi5p+lSGlkZGVu5qyE5L2N6KaB5Yqg6YCZ5YCLXHJcbiAgICAgICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIENhck5vVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhjYXZhdG9yT3BlclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0VGltZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgUHJvZHVjdEl0ZW1VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBVU1Byb2RMaXN0OiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBSZWNlaXZlZFRpbWU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFJlY2VpdmVkVHlwZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLyogICAgIFNlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3M6IFwicmVxdWlyZWRcIiwqL1xyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzB8XlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL14oWzEtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL14oWzAtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8562J5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLm9wdGlvbnNbY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnZhbHVlICYmIHNlbGVjdGVkVmFsdWUgIT09IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQWN0dWFsUHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBEZWZlY3RpdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFVuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUaGlyZFdlaWdodEZlZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwi5LuY54++5Lul5aSW55qE5LuY5qy+5pa55byP6KuL5YuZ5b+F5aGr5a+r5YKZ6Ki7XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXHJcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCdpbnZhbGlkLWZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYXBwZW5kKGVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBDbGFzcyBWYXJpYWJsZSAqL1xyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuICAgIHByaXZhdGUgUmVTZXRDYXJOb0l0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDYXJOb1VOSUQgPSAkKHRoaXMuRG9tT2ZDYXJOb1VOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uY2FyTm9VTklELCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVTZXRDb250cmFjdEl0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDb250cmFjdFVOSUQgPSAkKHRoaXMuRG9tT2ZDb250cmFjdFVOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiXCIsIFwiXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNvbnRyYWN0TmFtZSwgaXRlbS5jb250cmFjdEdVSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93VVNQcm9kSXRlbXMoKSB7XHJcbiAgICAgICAgbGV0IGV2ZW5TaG93VWxEb20gPSB0aGlzLkRvbU9mRXZlblNob3c7XHJcbiAgICAgICAgbGV0IG9kZFNob3dVbERvbSA9IHRoaXMuRG9tT2ZPZGRMU2hvdztcclxuICAgICAgICBldmVuU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgb2RkU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnRleHQgPSBpdGVtLnByb2RUZXh0O1xyXG4gICAgICAgICAgICBsaVRhZy50ZXh0Q29udGVudCA9IGAke2l0ZW0ucHJvZFRleHR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICAvLyBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSB0aGlzLl9wcm9kSXRlbUxpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgICAgICAgICBzcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgICAgICAgICBpbmRleCAlIDIgPT09IDAgPyBldmVuU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKSA6XHJcbiAgICAgICAgICAgICAgICBvZGRTaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLlNob3dQcm9kSXRlbVN1bW1hcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQcm9kSXRlbVN1bW1hcnkoKSB7XHJcbiAgICAgICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhJdGVtOiBQdXJjaGFzZVByb2RJdGVtO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5wZXJjZW50ID4gK2l0ZW0ucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke3RoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmxlbmd0aH3poIVgO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgICAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5wcm9kVGV4dCA/PyBcIueEoVwifWBcclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBzdW1tYXJ5SW5mbyA9IGAke3JlY29nbml0aW9uU3Bhbi5pbm5lckhUTUx9JHtpdGVtU3Bhbi5pbm5lckhUTUx9JHtwZXJjZW50U3Bhbi5pbm5lckhUTUx9YDtcclxuXHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgQmluZEluZ3JlZGllbnRUb0RvbSgpIHtcclxuICAgICAgICBsZXQgcG9zdERpdiA9IHRoaXMuRG9tT2ZJbmdyZWRpZW50UG9zdDtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYFBFU2FsZXNJbmdyZWRpZW50TGlzdFske2luZGV4fV0uSVRFTV9OQU1FYDtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kVGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFBFU2FsZXNJbmdyZWRpZW50TGlzdFske2luZGV4fV0uUFJPRFVDVF9VTklEYDtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFBFU2FsZXNJbmdyZWRpZW50TGlzdFske2luZGV4fV0uSVRFTV9QRVJDRU5UYDtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gaXRlbS5wZXJjZW50LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChuYW1lUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQocGVyY2VudFByb3BlcnR5KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNaW51c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMCA8IDAgPyAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZ1bmNScyA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXRJbnZvaWNlUHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mRGVmZWN0aXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlVuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZkludm9pY2VQcmljZUhhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXREZWxpdmVyeVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkxlYXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlRyYWZpY1VuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZlRyYWZpY0ZlZUhhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIpIHtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dJbnZvaWNlUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dUcmFmaWNQcmljZS50ZXh0Q29udGVudCA9IGRhdGEyWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLlNhbGVzUHJpY2VBUEkuR2V0UmVjZWl2ZWRQcmljZShcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgICBkYXRhMlswXVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNSczMpLnRoZW4oZnVuY3Rpb24gKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dSZWNlaXZlZFByaWNlLnRleHRDb250ZW50ID0gZGF0YS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXNPYmouQWN0dWFsUHJpY2VfRE9NLnZhbHVlID0gZGF0YTsg5oeJ6Kmy5oqK5LiK6L+w5YC8IOmDveW4tuWbnuW+jOerr+mHjeaWsOioiOeul1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==