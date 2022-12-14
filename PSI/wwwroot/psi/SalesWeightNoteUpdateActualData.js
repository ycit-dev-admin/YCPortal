var SalesWeightNoteUpdateActualData = /** @class */ (function () {
    function SalesWeightNoteUpdateActualData(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        /* Field Doms */
        // this
        this.DomOfActualInvoiceprice = document.getElementById('ActualInvoiceprice');
        this.DomOfActualLeaveWeight = document.getElementById('ActualLeaveWeight');
        this.DomOfActualDefectiveWeight = document.getElementById('ActualDefectiveWeight');
        this.DomOfActualUnitPrice = document.getElementById('ActualUnitPrice');
        this.DomOfActualInvoicePriceHasTax = document.getElementById('ActualInvoicePriceHasTax');
        this.DomOfActualTraficUnitPrice = document.getElementById('ActualTraficUnitPrice');
        this.DomOfActualTraficHasTax = document.getElementById('ActualTraficHasTax');
        this.DomOfActualTraficprice = document.getElementById('ActualTraficprice');
        this.DomOfActualInvoiceTax = document.getElementById('ActualInvoiceTax');
        this.DomOfActualTraficTax = document.getElementById('ActualTraficTax');
        this.DomOfActualReceivedprice = document.getElementById('ActualReceivedprice');
        //new
        this.DomOfShowReceivedPrice = document.getElementById('show_received_price');
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
    SalesWeightNoteUpdateActualData.prototype.PagePluginInit = function () {
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
        var table = new Tabulator("#example1", {
        //data: tabledata, //assign data to table
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
    SalesWeightNoteUpdateActualData.prototype.PageEventInit = function () {
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
        $(curObj.DomOfActualLeaveWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfActualInvoicePriceHasTax).on('click', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfActualTraficHasTax).on('click', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfActualDefectiveWeight).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfActualUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        });
        $(curObj.DomOfActualTraficUnitPrice).on('input', function () {
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
                        curObj.DomOfActualUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfActualUnitPrice.readOnly = true;
                        $(curObj.DomOfActualUnitPrice).trigger("input");
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
                curObj.DomOfActualUnitPrice.value = "";
                curObj.DomOfActualUnitPrice.readOnly = false;
                $(curObj.DomOfActualUnitPrice).trigger("input");
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
                        curObj.DomOfActualUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfActualUnitPrice.readOnly = true;
                        $(curObj.DomOfActualUnitPrice).trigger("input");
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
                curObj.DomOfActualUnitPrice.value = "";
                curObj.DomOfActualUnitPrice.readOnly = false;
                $(curObj.DomOfActualUnitPrice).trigger("input");
            }
        });
    };
    SalesWeightNoteUpdateActualData.prototype.PageValidateInit = function () {
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
    SalesWeightNoteUpdateActualData.prototype.ReSetCarNoItems = function (dataObjLs) {
        var JqDomOfCarNoUNID = $(this.DomOfCarNoUNID);
        JqDomOfCarNoUNID.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.carNoUNID, false, false);
            JqDomOfCarNoUNID.append(newOption);
        });
    };
    SalesWeightNoteUpdateActualData.prototype.ReSetContractItems = function (dataObjLs) {
        var JqDomOfContractUNID = $(this.DomOfContractUNID);
        JqDomOfContractUNID.html(''); // 選項清空
        var defaultOption = new Option("", "", false, false);
        JqDomOfContractUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.contractName, item.contractGUID, false, false);
            JqDomOfContractUNID.append(newOption);
        });
    };
    SalesWeightNoteUpdateActualData.prototype.ShowUSProdItems = function () {
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
    SalesWeightNoteUpdateActualData.prototype.ShowProdItemSummary = function () {
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
    SalesWeightNoteUpdateActualData.prototype.BindIngredientToDom = function () {
        var postDiv = this.DomOfIngredientPost;
        postDiv.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            // Create a hidden input element, and append it to the li:
            var nameProperty = document.createElement("input");
            nameProperty.type = "hidden";
            nameProperty.name = "DTOSalesIngredients[" + index + "].ItemName";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "DTOSalesIngredients[" + index + "].ProductUNID";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "DTOSalesIngredients[" + index + "].ItemPercent";
            percentProperty.value = item.percent.toString();
            postDiv.append(nameProperty);
            postDiv.append(valueProperty);
            postDiv.append(percentProperty);
        });
    };
    SalesWeightNoteUpdateActualData.prototype.PlusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    SalesWeightNoteUpdateActualData.prototype.MinusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    SalesWeightNoteUpdateActualData.prototype.CaculateAllFee = function () {
        var thisObj = this;
        var funcRs = this.SalesPriceAPI.GetInvoicePrice(+this.DomOfActualLeaveWeight.value, +this.DomOfActualDefectiveWeight.value, +this.DomOfActualUnitPrice.value, this.DomOfActualInvoicePriceHasTax.checked);
        var funcRs2 = this.SalesPriceAPI.GetDeliveryPrice(+this.DomOfActualLeaveWeight.value, +this.DomOfActualTraficUnitPrice.value, this.DomOfActualTraficHasTax.checked);
        $.when(funcRs, funcRs2).then(function (data, data2) {
            thisObj.DomOfActualInvoiceprice.textContent = data[0].toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            thisObj.DomOfActualTraficprice.textContent = data2[0].toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            var defaultVal = 0;
            thisObj.DomOfActualInvoiceTax.textContent = defaultVal.toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            if (thisObj.DomOfActualInvoicePriceHasTax.checked) // 有勾才有稅金問題
             {
                var funcRs3 = thisObj.SalesPriceAPI.GetTaxPrice(+data[0]);
                $.when(funcRs3).then(function (data) {
                    thisObj.DomOfActualInvoiceTax.textContent = data.toLocaleString('zh-TW', {
                        style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                    });
                });
            }
            var defaultVal2 = 0;
            thisObj.DomOfActualTraficTax.textContent = defaultVal2.toLocaleString('zh-TW', {
                style: 'currency', currency: 'TWD', minimumFractionDigits: 0
            });
            if (thisObj.DomOfActualTraficHasTax.checked) // 有勾才有稅金問題
             {
                var funcRs4 = thisObj.SalesPriceAPI.GetTaxPrice(+data2[0]);
                $.when(funcRs4).then(function (data) {
                    thisObj.DomOfActualTraficTax.textContent = data.toLocaleString('zh-TW', {
                        style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                    });
                });
            }
            var funcRs9 = thisObj.SalesPriceAPI.GetReceivedPrice(data[0], data2[0]);
            $.when(funcRs9).then(function (data) {
                thisObj.DomOfActualReceivedprice.textContent = data.toLocaleString('zh-TW', {
                    style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                });
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    };
    return SalesWeightNoteUpdateActualData;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWdCSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBYnpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBaUJ0RCxnQkFBZ0I7UUFDaEIsT0FBTztRQUNBLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQW9CLENBQUM7UUFDM0YsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBcUIsQ0FBQztRQUMxRiwrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsa0NBQTZCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBcUIsQ0FBQztRQUN4RywrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXFCLENBQUM7UUFDNUYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBb0IsQ0FBQztRQUN6RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFvQixDQUFDO1FBQ3ZGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQW9CLENBQUM7UUFDckYsNkJBQXdCLEdB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QUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO3dCQUNwRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztxQkFDL0QsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFJRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUM7WUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQVk7Z0JBQ3ZDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxDQUFDO2lCQUMvRCxDQUFDLENBQUM7Z0JBQ0gseURBQXlEO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUwsc0NBQUM7QUFBRCxDQUFDLEFBM2hCRCxJQTJoQkMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTYWxlc1dlaWdodE5vdGVVcGRhdGVBY3R1YWxEYXRhIHtcclxuICAgIC8vIEJhc2UgUG9ycGVyaXRlc1xyXG4gICAgcmVhZG9ubHkgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIF9wcm9kSXRlbUxpc3Q6IFB1cmNoYXNlUHJvZEl0ZW1MaXN0ID0gbmV3IFB1cmNoYXNlUHJvZEl0ZW1MaXN0KCk7XHJcbiAgICByZWFkb25seSBNaW51c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwibWludXMtcGVyY2VudFwiXHJcbiAgICByZWFkb25seSBQbHVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJwbHVzLXBlcmNlbnRcIlxyXG5cclxuICAgIC8vIEZvciBQb3N0XHJcblxyXG5cclxuICAgIC8vIFJlZmVyZW5jZXMgIFxyXG4gICAgcHJpdmF0ZSBTYWxlc1ByaWNlQVBJOiBTYWxlc1ByaWNlQVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQ29udHJhY3RBUEk6IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuU2FsZXNQcmljZUFQSSA9IG5ldyBTYWxlc1ByaWNlQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQ29udHJhY3RBUEkgPSBuZXcgQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRmllbGQgRG9tcyAqL1xyXG4gICAgLy8gdGhpc1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsSW52b2ljZXByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbEludm9pY2VwcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbExlYXZlV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbExlYXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbERlZmVjdGl2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxEZWZlY3RpdmVXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFVuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxJbnZvaWNlUHJpY2VIYXNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFRyYWZpY1VuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsVHJhZmljSGFzVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFRyYWZpY0hhc1RheCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxUcmFmaWNwcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNwcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbEludm9pY2VUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsSW52b2ljZVRheCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFRyYWZpY1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNUYXgnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxSZWNlaXZlZHByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFJlY2VpdmVkcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG4gICAgLy9uZXdcclxuICAgIHB1YmxpYyBEb21PZlNob3dSZWNlaXZlZFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfcmVjZWl2ZWRfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lclVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJOb1VOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyTm9VTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZSZWNlaXZlZFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUmVjZWl2ZWRUeXBlJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDcmVhdGVGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRm9ybUNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX2NyZWF0ZScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIC8vIG9sZFxyXG4gICAgcHVibGljIERvbU9mVXNlclNlbGVjdFByb2RpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2VsZWN0LXByb2RpdGVtJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFdmVuU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVuUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk9kZExTaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29kZFByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUb3RhbFByb2RJdGVtSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbCcpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkluZ3JlZGllbnRQb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZ3JlZGllbnRQb3N0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDb250cmFjdFVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ29udHJhY3RVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFVuaXRQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05vd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdEFjdHVhbFByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBQYWdlUGx1Z2luSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8qIFBhZ2UgSW5pdGlhbGl6ZSAqL1xyXG4gICAgICAgIC8vIFNlbGVjdDIgRWxlbWVudHNcclxuICAgICAgICAkKCcuc2VsZWN0MmJzNCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlLFxyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB2YXIgdGFibGUgPSBuZXcgVGFidWxhdG9yKFwiI2V4YW1wbGUxXCIsIHtcclxuICAgICAgICAgICAgLy9kYXRhOiB0YWJsZWRhdGEsIC8vYXNzaWduIGRhdGEgdG8gdGFibGVcclxuICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBqcXVlcnkgZGlhbG9nXHJcbiAgICAgICAgJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgICAgICBcIumAgeWHulwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NyZWF0ZS1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIuWPlua2iFwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VFdmVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICAvKiBQYWdlIEV2ZW50cyAqL1xyXG4gICAgICAgIC8vIOihqOWWruW7uueri1xyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRm9ybUNyZWF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5Ye66LKo5bCN6LGhXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRTYWxlc0NvbnRyYWN0c0J5Q3VzdG9tZXJVTklEKHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouUmVTZXRDb250cmFjdEl0ZW1zKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnRyaWdnZXIoXCJjaGFuZ2VcIik7ICAvLyDph43mlrDmlbTnkIbnmoTmhI/mgJ1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS50cmlnZ2VyKFwiY2hhbmdlXCIpOyAgLy8g5Yqg6YCZ5YCL5a6i5oi26LuK54mM5omN5pyD5Yik5pa3IOaYr+WQpumBuOWIsDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5a6i5oi26LuK54mMXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDYXJOb1VOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOmAsuiyqOWTgemghVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNQcm9kSXRlbURvbXMgPSAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxPcHRpb25FbGVtZW50W107XHJcblxyXG4gICAgICAgICAgICAvLyBVc2Vy5omA6YG4XHJcbiAgICAgICAgICAgIHVzUHJvZEl0ZW1Eb21zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5BcHBlbmQoaXRlbS52YWx1ZSwgaXRlbS50ZXh0KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIOimgeWIqumZpOeahFxyXG4gICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5EYXRhLmZpbHRlcihzaG93SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISh1c1Byb2RJdGVtRG9tcy5tYXAodXNJdGVtID0+IHVzSXRlbS52YWx1ZSkuaW5jbHVkZXMoc2hvd0l0ZW0ucHJvZElkKSk7XHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goc2hvd0l0ZW0gPT4gY3VyT2JqLl9wcm9kSXRlbUxpc3QuUmVtb3ZlQnlQcm9kSWQoc2hvd0l0ZW0ucHJvZElkKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwYWdlTWFpbi5Qcm9kTGlzdC5SZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICAgICAgY3VyT2JqLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5aKe5YqgLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5QbHVzUGVyY2VudENsYXNzTmFtZX1gLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5QbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5rib5bCRLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5NaW51c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soJCh0aGlzKS5nZXQoMCkpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxMZWF2ZVdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4KS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxUcmFmaWNIYXNUYXgpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbERlZmVjdGl2ZVdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVHJhZmljVW5pdFByaWNlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJnVU5JRCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChhcmdVTklEKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS52YWx1ZSA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLnZhbGlkYXRlKHtcclxuICAgICAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIumggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWdub3JlOiBcIlwiLCAvLyDopoHmqqLmn6VIaWRkZW7mrITkvY3opoHliqDpgJnlgItcclxuICAgICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgICAgIEN1c3RvbWVyVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgQ2FyTm9VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBFeGNhdmF0b3JPcGVyVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBQcm9kdWN0SXRlbVVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFVTUHJvZExpc3Q6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFJlY2VpdmVkVGltZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgUmVjZWl2ZWRUeXBlOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvKiAgICAgU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvczogXCJyZXF1aXJlZFwiLCovXHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBEZWZlY3RpdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvMHxeXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXihbMS05XVswLTldKihcXC5bMC05XXsxLDJ9KT98MFxcLig/ITArJClbMC05XXsxLDJ9KSQvICAvLyDmoLzlvI/kuI3nrKbvvIzpnIDngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4ISFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUcmFmaWNVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXihbMC05XVswLTldKihcXC5bMC05XXsxLDJ9KT98MFxcLig/ITArJClbMC05XXsxLDJ9KSQvICAvLyDmoLzlvI/kuI3nrKbvvIzpnIDngrrlpKfmlrznrYnmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4ISFcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUub3B0aW9uc1tjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUudmFsdWUgJiYgc2VsZWN0ZWRWYWx1ZSAhPT0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5BY3R1YWxQcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC9eXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUcmFmaWNVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRoaXJkV2VpZ2h0RmVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBSZW1hcms6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCLku5jnj77ku6XlpJbnmoTku5jmrL7mlrnlvI/oq4vli5nlv4Xloavlr6vlgpnoqLtcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uIChlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoJ2ludmFsaWQtZmVlZGJhY2snKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5hcHBlbmQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIENsYXNzIFZhcmlhYmxlICovXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG4gICAgcHJpdmF0ZSBSZVNldENhck5vSXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNhck5vVU5JRCA9ICQodGhpcy5Eb21PZkNhck5vVU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5jYXJOb1VOSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZVNldENvbnRyYWN0SXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNvbnRyYWN0VU5JRCA9ICQodGhpcy5Eb21PZkNvbnRyYWN0VU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCJcIiwgXCJcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmNvbnRyYWN0R1VJRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dVU1Byb2RJdGVtcygpIHtcclxuICAgICAgICBsZXQgZXZlblNob3dVbERvbSA9IHRoaXMuRG9tT2ZFdmVuU2hvdztcclxuICAgICAgICBsZXQgb2RkU2hvd1VsRG9tID0gdGhpcy5Eb21PZk9kZExTaG93O1xyXG4gICAgICAgIGV2ZW5TaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBvZGRTaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IGl0ZW0ucHJvZFRleHQ7XHJcbiAgICAgICAgICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7aXRlbS5wcm9kVGV4dH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIC8vIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IHRoaXMuX3Byb2RJdGVtTGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICAgICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcbiAgICAgICAgICAgIGluZGV4ICUgMiA9PT0gMCA/IGV2ZW5TaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpIDpcclxuICAgICAgICAgICAgICAgIG9kZFNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZylcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuU2hvd1Byb2RJdGVtU3VtbWFyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1Byb2RJdGVtU3VtbWFyeSgpIHtcclxuICAgICAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICAgICAgbGV0IG1heEl0ZW06IFB1cmNoYXNlUHJvZEl0ZW07XHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBhbGxQZXJjZW50ID0gKyBpdGVtLnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLnBlcmNlbnQgPiAraXRlbS5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7dGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEubGVuZ3RofemghWA7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBwZXJjZW50U3Bhbi5pbm5lckhUTUwgPSBg77yM5q+U5L6L5Yqg57i9OiR7YWxsUGVyY2VudH0lYFxyXG4gICAgICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgY29uc3QgcmVjb2duaXRpb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LnByb2RUZXh0ID8/IFwi54ShXCJ9YFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vbGV0IHN1bW1hcnlJbmZvID0gYCR7cmVjb2duaXRpb25TcGFuLmlubmVySFRNTH0ke2l0ZW1TcGFuLmlubmVySFRNTH0ke3BlcmNlbnRTcGFuLmlubmVySFRNTH1gO1xyXG5cclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChwZXJjZW50U3Bhbik7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBCaW5kSW5ncmVkaWVudFRvRG9tKCkge1xyXG4gICAgICAgIGxldCBwb3N0RGl2ID0gdGhpcy5Eb21PZkluZ3JlZGllbnRQb3N0O1xyXG5cclxuICAgICAgICBwb3N0RGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBoaWRkZW4gaW5wdXQgZWxlbWVudCwgYW5kIGFwcGVuZCBpdCB0byB0aGUgbGk6XHJcbiAgICAgICAgICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgRFRPU2FsZXNJbmdyZWRpZW50c1ske2luZGV4fV0uSXRlbU5hbWVgO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudmFsdWUgPSBpdGVtLnByb2RUZXh0XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5Lm5hbWUgPSBgRFRPU2FsZXNJbmdyZWRpZW50c1ske2luZGV4fV0uUHJvZHVjdFVOSURgO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgRFRPU2FsZXNJbmdyZWRpZW50c1ske2luZGV4fV0uSXRlbVBlcmNlbnRgO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudmFsdWUgPSBpdGVtLnBlcmNlbnQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHZhbHVlUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChwZXJjZW50UHJvcGVydHkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTAgPiAxMDAgPyAxMDAgOiBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwIDwgMCA/IDAgOiBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldEludm9pY2VQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZBY3R1YWxMZWF2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZBY3R1YWxEZWZlY3RpdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mQWN0dWFsVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBmdW5jUnMyID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldERlbGl2ZXJ5UHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mQWN0dWFsTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mQWN0dWFsVHJhZmljVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mQWN0dWFsVHJhZmljSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIpIHtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbEludm9pY2VwcmljZS50ZXh0Q29udGVudCA9IGRhdGFbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsVHJhZmljcHJpY2UudGV4dENvbnRlbnQgPSBkYXRhMlswXS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFZhbCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxJbnZvaWNlVGF4LnRleHRDb250ZW50ID0gZGVmYXVsdFZhbC50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzT2JqLkRvbU9mQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4LmNoZWNrZWQpIC8vIOacieWLvuaJjeacieeohemHkeWVj+mhjFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzMyA9IHRoaXNPYmouU2FsZXNQcmljZUFQSS5HZXRUYXhQcmljZSgrZGF0YVswXSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbEludm9pY2VUYXgudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFZhbDIgPSAwO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsVHJhZmljVGF4LnRleHRDb250ZW50ID0gZGVmYXVsdFZhbDIudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpc09iai5Eb21PZkFjdHVhbFRyYWZpY0hhc1RheC5jaGVja2VkKSAvLyDmnInli77miY3mnInnqIXph5HllY/poYxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNSczQgPSB0aGlzT2JqLlNhbGVzUHJpY2VBUEkuR2V0VGF4UHJpY2UoK2RhdGEyWzBdKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnM0KS50aGVuKGZ1bmN0aW9uIChkYXRhOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsVHJhZmljVGF4LnRleHRDb250ZW50ID0gZGF0YS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bmNSczkgPSB0aGlzT2JqLlNhbGVzUHJpY2VBUEkuR2V0UmVjZWl2ZWRQcmljZShcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgICBkYXRhMlswXVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNSczkpLnRoZW4oZnVuY3Rpb24gKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbFJlY2VpdmVkcHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpc09iai5BY3R1YWxQcmljZV9ET00udmFsdWUgPSBkYXRhOyDmh4noqbLmiorkuIrov7DlgLwg6YO95bi25Zue5b6M56uv6YeN5paw6KiI566XXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19