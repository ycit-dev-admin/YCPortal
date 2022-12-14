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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWdCSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBYnpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBaUJ0RCxnQkFBZ0I7UUFDaEIsT0FBTztRQUNBLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQW9CLENBQUM7UUFDM0YsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBcUIsQ0FBQztRQUMxRiwrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsa0NBQTZCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBcUIsQ0FBQztRQUN4RywrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXFCLENBQUM7UUFDNUYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBb0IsQ0FBQztRQUN6RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFvQixDQUFDO1FBQ3ZGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQW9CLENBQUM7UUFDckYsNkJBQXdCLEdB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QUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO3dCQUNwRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztxQkFDL0QsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFJRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUM7WUFFRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQVk7Z0JBQ3ZDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxDQUFDO2lCQUMvRCxDQUFDLENBQUM7Z0JBQ0gseURBQXlEO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUwsc0NBQUM7QUFBRCxDQUFDLEFBM2hCRCxJQTJoQkMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTYWxlc1dlaWdodE5vdGVVcGRhdGVBY3R1YWxEYXRhIHtcclxuICAgIC8vIEJhc2UgUG9ycGVyaXRlc1xyXG4gICAgcmVhZG9ubHkgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIF9wcm9kSXRlbUxpc3Q6IFB1cmNoYXNlUHJvZEl0ZW1MaXN0ID0gbmV3IFB1cmNoYXNlUHJvZEl0ZW1MaXN0KCk7XHJcbiAgICByZWFkb25seSBNaW51c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwibWludXMtcGVyY2VudFwiXHJcbiAgICByZWFkb25seSBQbHVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJwbHVzLXBlcmNlbnRcIlxyXG5cclxuICAgIC8vIEZvciBQb3N0XHJcblxyXG5cclxuICAgIC8vIFJlZmVyZW5jZXMgIFxyXG4gICAgcHJpdmF0ZSBTYWxlc1ByaWNlQVBJOiBTYWxlc1ByaWNlQVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQ29udHJhY3RBUEk6IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuU2FsZXNQcmljZUFQSSA9IG5ldyBTYWxlc1ByaWNlQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQ29udHJhY3RBUEkgPSBuZXcgQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRmllbGQgRG9tcyAqL1xyXG4gICAgLy8gdGhpc1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsSW52b2ljZXByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbEludm9pY2VwcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbExlYXZlV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbExlYXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbERlZmVjdGl2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxEZWZlY3RpdmVXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFVuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxJbnZvaWNlUHJpY2VIYXNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFRyYWZpY1VuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsVHJhZmljSGFzVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFRyYWZpY0hhc1RheCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxUcmFmaWNwcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNwcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbEludm9pY2VUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsSW52b2ljZVRheCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFRyYWZpY1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNUYXgnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxSZWNlaXZlZHByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbFJlY2VpdmVkcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG4gICAgLy9uZXdcclxuICAgIHB1YmxpYyBEb21PZlNob3dSZWNlaXZlZFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfcmVjZWl2ZWRfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lclVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJOb1VOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyTm9VTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZSZWNlaXZlZFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUmVjZWl2ZWRUeXBlJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDcmVhdGVGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRm9ybUNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX2NyZWF0ZScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIC8vIG9sZFxyXG4gICAgcHVibGljIERvbU9mVXNlclNlbGVjdFByb2RpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2VsZWN0LXByb2RpdGVtJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFdmVuU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVuUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk9kZExTaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29kZFByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUb3RhbFByb2RJdGVtSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbCcpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkluZ3JlZGllbnRQb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZ3JlZGllbnRQb3N0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDb250cmFjdFVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ29udHJhY3RVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFVuaXRQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05vd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdEFjdHVhbFByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBQYWdlUGx1Z2luSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8qIFBhZ2UgSW5pdGlhbGl6ZSAqL1xyXG4gICAgICAgIC8vIFNlbGVjdDIgRWxlbWVudHNcclxuICAgICAgICAkKCcuc2VsZWN0MmJzNCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlLFxyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB2YXIgdGFibGUgPSBuZXcgVGFidWxhdG9yKFwiI2V4YW1wbGUxXCIsIHtcclxuICAgICAgICAgICAgLy9kYXRhOiB0YWJsZWRhdGEsIC8vYXNzaWduIGRhdGEgdG8gdGFibGVcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8ganF1ZXJ5IGRpYWxvZ1xyXG4gICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgd2lkdGg6IDQwMCxcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgXCLpgIHlh7pcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGUtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCLlj5bmtohcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlRXZlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogUGFnZSBFdmVudHMgKi9cclxuICAgICAgICAvLyDooajllq7lu7rnq4tcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkZvcm1DcmVhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOWHuuiyqOWwjeixoVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0U2FsZXNDb250cmFjdHNCeUN1c3RvbWVyVU5JRChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlJlU2V0Q29udHJhY3RJdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS50cmlnZ2VyKFwiY2hhbmdlXCIpOyAgLy8g6YeN5paw5pW055CG55qE5oSP5oCdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8kKGN1ck9iai5Eb21PZkNhck5vVU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOWKoOmAmeWAi+WuouaItui7iueJjOaJjeacg+WIpOaWtyDmmK/lkKbpgbjliLAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWuouaItui7iueJjFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlk4HpoIVcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlcuaJgOmBuFxyXG4gICAgICAgICAgICB1c1Byb2RJdGVtRG9tcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuQXBwZW5kKGl0ZW0udmFsdWUsIGl0ZW0udGV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDopoHliKrpmaTnmoRcclxuICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuRGF0YS5maWx0ZXIoc2hvd0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEodXNQcm9kSXRlbURvbXMubWFwKHVzSXRlbSA9PiB1c0l0ZW0udmFsdWUpLmluY2x1ZGVzKHNob3dJdGVtLnByb2RJZCkpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IGN1ck9iai5fcHJvZEl0ZW1MaXN0LlJlbW92ZUJ5UHJvZElkKHNob3dJdGVtLnByb2RJZCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgICAgICBjdXJPYmouU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWinuWKoC3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouUGx1c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljaygkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOa4m+WwkS3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouTWludXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLk1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsTGVhdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbEludm9pY2VQcmljZUhhc1RheCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVHJhZmljSGFzVGF4KS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxEZWZlY3RpdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFRyYWZpY1VuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ1VOSUQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVU5JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldENvbnRyYWN0SXRlbXNCeShhcmdVTklELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UudmFsdWUgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJnVU5JRCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChhcmdVTklEKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS52YWx1ZSA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVmFsaWRhdGVJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcbiAgICAgICAgLy8gRm9ybSBWYWxpZGF0aW9uXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLpoIHpnaLos4foqIrloavlr6vkuI3lrozmlbTvvIzoq4vmqqLmn6XpoIHpnaLoqIrmga8hIVwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlnbm9yZTogXCJcIiwgLy8g6KaB5qqi5p+lSGlkZGVu5qyE5L2N6KaB5Yqg6YCZ5YCLXHJcbiAgICAgICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIENhck5vVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhjYXZhdG9yT3BlclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0VGltZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgUHJvZHVjdEl0ZW1VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBVU1Byb2RMaXN0OiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBSZWNlaXZlZFRpbWU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFJlY2VpdmVkVHlwZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLyogICAgIFNlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3M6IFwicmVxdWlyZWRcIiwqL1xyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzB8XlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL14oWzEtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL14oWzAtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8562J5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLm9wdGlvbnNbY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnZhbHVlICYmIHNlbGVjdGVkVmFsdWUgIT09IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQWN0dWFsUHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBEZWZlY3RpdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFVuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUaGlyZFdlaWdodEZlZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwi5LuY54++5Lul5aSW55qE5LuY5qy+5pa55byP6KuL5YuZ5b+F5aGr5a+r5YKZ6Ki7XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXHJcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCdpbnZhbGlkLWZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYXBwZW5kKGVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBDbGFzcyBWYXJpYWJsZSAqL1xyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuICAgIHByaXZhdGUgUmVTZXRDYXJOb0l0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDYXJOb1VOSUQgPSAkKHRoaXMuRG9tT2ZDYXJOb1VOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uY2FyTm9VTklELCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVTZXRDb250cmFjdEl0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDb250cmFjdFVOSUQgPSAkKHRoaXMuRG9tT2ZDb250cmFjdFVOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiXCIsIFwiXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNvbnRyYWN0TmFtZSwgaXRlbS5jb250cmFjdEdVSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93VVNQcm9kSXRlbXMoKSB7XHJcbiAgICAgICAgbGV0IGV2ZW5TaG93VWxEb20gPSB0aGlzLkRvbU9mRXZlblNob3c7XHJcbiAgICAgICAgbGV0IG9kZFNob3dVbERvbSA9IHRoaXMuRG9tT2ZPZGRMU2hvdztcclxuICAgICAgICBldmVuU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgb2RkU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICBsaVRhZy5kYXRhc2V0LnRleHQgPSBpdGVtLnByb2RUZXh0O1xyXG4gICAgICAgICAgICBsaVRhZy50ZXh0Q29udGVudCA9IGAke2l0ZW0ucHJvZFRleHR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICAvLyBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSB0aGlzLl9wcm9kSXRlbUxpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgICAgICAgICBzcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgICAgICAgICBpbmRleCAlIDIgPT09IDAgPyBldmVuU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKSA6XHJcbiAgICAgICAgICAgICAgICBvZGRTaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLlNob3dQcm9kSXRlbVN1bW1hcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQcm9kSXRlbVN1bW1hcnkoKSB7XHJcbiAgICAgICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhJdGVtOiBQdXJjaGFzZVByb2RJdGVtO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5wZXJjZW50ID4gK2l0ZW0ucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke3RoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmxlbmd0aH3poIVgO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgICAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5wcm9kVGV4dCA/PyBcIueEoVwifWBcclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBzdW1tYXJ5SW5mbyA9IGAke3JlY29nbml0aW9uU3Bhbi5pbm5lckhUTUx9JHtpdGVtU3Bhbi5pbm5lckhUTUx9JHtwZXJjZW50U3Bhbi5pbm5lckhUTUx9YDtcclxuXHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgQmluZEluZ3JlZGllbnRUb0RvbSgpIHtcclxuICAgICAgICBsZXQgcG9zdERpdiA9IHRoaXMuRG9tT2ZJbmdyZWRpZW50UG9zdDtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYERUT1NhbGVzSW5ncmVkaWVudHNbJHtpbmRleH1dLkl0ZW1OYW1lYDtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kVGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYERUT1NhbGVzSW5ncmVkaWVudHNbJHtpbmRleH1dLlByb2R1Y3RVTklEYDtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYERUT1NhbGVzSW5ncmVkaWVudHNbJHtpbmRleH1dLkl0ZW1QZXJjZW50YDtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gaXRlbS5wZXJjZW50LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChuYW1lUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQocGVyY2VudFByb3BlcnR5KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNaW51c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMCA8IDAgPyAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZ1bmNScyA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXRJbnZvaWNlUHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mQWN0dWFsTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mQWN0dWFsRGVmZWN0aXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkFjdHVhbFVuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZkFjdHVhbEludm9pY2VQcmljZUhhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXREZWxpdmVyeVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkFjdHVhbExlYXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkFjdHVhbFRyYWZpY1VuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZkFjdHVhbFRyYWZpY0hhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICQud2hlbihmdW5jUnMsIGZ1bmNSczIpLnRoZW4oZnVuY3Rpb24gKGRhdGEsIGRhdGEyKSB7XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxJbnZvaWNlcHJpY2UudGV4dENvbnRlbnQgPSBkYXRhWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbFRyYWZpY3ByaWNlLnRleHRDb250ZW50ID0gZGF0YTJbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRWYWwgPSAwO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsSW52b2ljZVRheC50ZXh0Q29udGVudCA9IGRlZmF1bHRWYWwudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpc09iai5Eb21PZkFjdHVhbEludm9pY2VQcmljZUhhc1RheC5jaGVja2VkKSAvLyDmnInli77miY3mnInnqIXph5HllY/poYxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLlNhbGVzUHJpY2VBUEkuR2V0VGF4UHJpY2UoK2RhdGFbMF0pO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNSczMpLnRoZW4oZnVuY3Rpb24gKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxJbnZvaWNlVGF4LnRleHRDb250ZW50ID0gZGF0YS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRWYWwyID0gMDtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbFRyYWZpY1RheC50ZXh0Q29udGVudCA9IGRlZmF1bHRWYWwyLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXNPYmouRG9tT2ZBY3R1YWxUcmFmaWNIYXNUYXguY2hlY2tlZCkgLy8g5pyJ5Yu+5omN5pyJ56iF6YeR5ZWP6aGMXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnM0ID0gdGhpc09iai5TYWxlc1ByaWNlQVBJLkdldFRheFByaWNlKCtkYXRhMlswXSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzNCkudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbFRyYWZpY1RheC50ZXh0Q29udGVudCA9IGRhdGEudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBmdW5jUnM5ID0gdGhpc09iai5TYWxlc1ByaWNlQVBJLkdldFJlY2VpdmVkUHJpY2UoXHJcbiAgICAgICAgICAgICAgICBkYXRhWzBdLFxyXG4gICAgICAgICAgICAgICAgZGF0YTJbMF1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICQud2hlbihmdW5jUnM5KS50aGVuKGZ1bmN0aW9uIChkYXRhOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxSZWNlaXZlZHByaWNlLnRleHRDb250ZW50ID0gZGF0YS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXNPYmouQWN0dWFsUHJpY2VfRE9NLnZhbHVlID0gZGF0YTsg5oeJ6Kmy5oqK5LiK6L+w5YC8IOmDveW4tuWbnuW+jOerr+mHjeaWsOioiOeul1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==