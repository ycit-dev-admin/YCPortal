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
        //var table = new Tabulator("#example1", {
        //    //data: tabledata, //assign data to table
        //});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWdCSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBYnpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBaUJ0RCxnQkFBZ0I7UUFDaEIsT0FBTztRQUNBLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQW9CLENBQUM7UUFDM0YsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBcUIsQ0FBQztRQUMxRiwrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsa0NBQTZCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBcUIsQ0FBQztRQUN4RywrQkFBMEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO1FBQ2xHLDRCQUF1QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXFCLENBQUM7UUFDNUYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBb0IsQ0FBQztRQUN6RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFvQixDQUFDO1FBQ3ZGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQW9CLENBQUM7UUFDckYsNkJBQXdCLEdB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cEUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLENBQUM7cUJBQy9ELENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBSUQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDWCxDQUFDO1lBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFZO2dCQUN2QyxPQUFPLENBQUMsd0JBQXdCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO29CQUN4RSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztpQkFDL0QsQ0FBQyxDQUFDO2dCQUNILHlEQUF5RDtZQUM3RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlMLHNDQUFDO0FBQUQsQ0FBQyxBQTNoQkQsSUEyaEJDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YSB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBfcHJvZEl0ZW1MaXN0OiBQdXJjaGFzZVByb2RJdGVtTGlzdCA9IG5ldyBQdXJjaGFzZVByb2RJdGVtTGlzdCgpO1xyXG4gICAgcmVhZG9ubHkgTWludXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcIm1pbnVzLXBlcmNlbnRcIlxyXG4gICAgcmVhZG9ubHkgUGx1c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwicGx1cy1wZXJjZW50XCJcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgU2FsZXNQcmljZUFQSTogU2FsZXNQcmljZUFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBDdXN0b21lckNvbnRyYWN0QVBJOiBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3M7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLlNhbGVzUHJpY2VBUEkgPSBuZXcgU2FsZXNQcmljZUFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5DdXN0b21lckNvbnRyYWN0QVBJID0gbmV3IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEZpZWxkIERvbXMgKi9cclxuICAgIC8vIHRoaXNcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbEludm9pY2VwcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxJbnZvaWNlcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxMZWF2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxMZWF2ZVdlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxEZWZlY3RpdmVXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsRGVmZWN0aXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsSW52b2ljZVByaWNlSGFzVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbEludm9pY2VQcmljZUhhc1RheCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxUcmFmaWNVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsVHJhZmljVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkFjdHVhbFRyYWZpY0hhc1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxUcmFmaWNIYXNUYXgnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsVHJhZmljcHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsVHJhZmljcHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxJbnZvaWNlVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0FjdHVhbEludm9pY2VUYXgnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZBY3R1YWxUcmFmaWNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWN0dWFsVHJhZmljVGF4JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQWN0dWFsUmVjZWl2ZWRwcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBY3R1YWxSZWNlaXZlZHByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuICAgIC8vbmV3XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93UmVjZWl2ZWRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X3JlY2VpdmVkX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ2FyTm9VTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhck5vVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mUmVjZWl2ZWRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1JlY2VpdmVkVHlwZScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3JlYXRlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkZvcm1DcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9jcmVhdGUnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICAvLyBvbGRcclxuICAgIHB1YmxpYyBEb21PZlVzZXJTZWxlY3RQcm9kaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNlbGVjdC1wcm9kaXRlbScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRXZlblNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlblByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZPZGRMU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZGRQcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVG90YWxQcm9kSXRlbUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbmdyZWRpZW50UG9zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmdyZWRpZW50UG9zdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ29udHJhY3RVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NvbnRyYWN0VU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RVbml0UHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RBY3R1YWxQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZVBsdWdpbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvKiBQYWdlIEluaXRpYWxpemUgKi9cclxuICAgICAgICAvLyBTZWxlY3QyIEVsZW1lbnRzXHJcbiAgICAgICAgJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy92YXIgdGFibGUgPSBuZXcgVGFidWxhdG9yKFwiI2V4YW1wbGUxXCIsIHtcclxuICAgICAgICAvLyAgICAvL2RhdGE6IHRhYmxlZGF0YSwgLy9hc3NpZ24gZGF0YSB0byB0YWJsZVxyXG5cclxuICAgICAgICAvL30pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vIGpxdWVyeSBkaWFsb2dcclxuICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgICAgIFwi6YCB5Ye6XCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY3JlYXRlLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwi5Y+W5raIXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZGb3JtQ3JlYXRlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDlh7rosqjlsI3osaFcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldFNhbGVzQ29udHJhY3RzQnlDdXN0b21lclVOSUQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5SZVNldENvbnRyYWN0SXRlbXMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOmHjeaWsOaVtOeQhueahOaEj+aAnVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vJChjdXJPYmouRG9tT2ZDYXJOb1VOSUQpLnRyaWdnZXIoXCJjaGFuZ2VcIik7ICAvLyDliqDpgJnlgIvlrqLmiLbou4rniYzmiY3mnIPliKTmlrcg5piv5ZCm6YG45YiwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlrqLmiLbou4rniYxcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNhck5vVU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g6YCy6LKo5ZOB6aCFXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB1c1Byb2RJdGVtRG9tcyA9ICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTE9wdGlvbkVsZW1lbnRbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZXLmiYDpgbhcclxuICAgICAgICAgICAgdXNQcm9kSXRlbURvbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5fcHJvZEl0ZW1MaXN0LkFwcGVuZChpdGVtLnZhbHVlLCBpdGVtLnRleHQpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8g6KaB5Yiq6Zmk55qEXHJcbiAgICAgICAgICAgIGN1ck9iai5fcHJvZEl0ZW1MaXN0LkRhdGEuZmlsdGVyKHNob3dJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhKHVzUHJvZEl0ZW1Eb21zLm1hcCh1c0l0ZW0gPT4gdXNJdGVtLnZhbHVlKS5pbmNsdWRlcyhzaG93SXRlbS5wcm9kSWQpKTtcclxuICAgICAgICAgICAgfSkuZm9yRWFjaChzaG93SXRlbSA9PiBjdXJPYmouX3Byb2RJdGVtTGlzdC5SZW1vdmVCeVByb2RJZChzaG93SXRlbS5wcm9kSWQpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBhZ2VNYWluLlByb2RMaXN0LlJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICAgICAgY3VyT2JqLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgICAgICBjdXJPYmouQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlop7liqAt6YCy6LKo5ZOB6aCF55m+5YiG5q+UXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS5vbignY2xpY2snLCBgLiR7Y3VyT2JqLlBsdXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLlBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soJCh0aGlzKS5nZXQoMCkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDmuJvlsJEt6YCy6LKo5ZOB6aCF55m+5YiG5q+UXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS5vbignY2xpY2snLCBgLiR7Y3VyT2JqLk1pbnVzUGVyY2VudENsYXNzTmFtZX1gLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5NaW51c1Byb2RJdGVtUGVyY2VudF9DbGljaygkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbExlYXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxJbnZvaWNlUHJpY2VIYXNUYXgpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFRyYWZpY0hhc1RheCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsRGVmZWN0aXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBY3R1YWxUcmFmaWNVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ1VOSUQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVU5JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldENvbnRyYWN0SXRlbXNCeShhcmdVTklELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UudmFsdWUgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZkFjdHVhbFVuaXRQcmljZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZBY3R1YWxVbml0UHJpY2UucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQWN0dWFsVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZVZhbGlkYXRlSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8vIEZvcm0gVmFsaWRhdGlvblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkudmFsaWRhdGUoe1xyXG4gICAgICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi6aCB6Z2i6LOH6KiK5aGr5a+r5LiN5a6M5pW077yM6KuL5qqi5p+l6aCB6Z2i6KiK5oGvISFcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpZ25vcmU6IFwiXCIsIC8vIOimgeaqouafpUhpZGRlbuashOS9jeimgeWKoOmAmeWAi1xyXG4gICAgICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgICAgICAgQ3VzdG9tZXJVTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBDYXJOb1VOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIEV4Y2F2YXRvck9wZXJVTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodFRpbWU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RJdGVtVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgVVNQcm9kTGlzdDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgUmVjZWl2ZWRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBSZWNlaXZlZFR5cGU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8qICAgICBTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zOiBcInJlcXVpcmVkXCIsKi9cclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8wfF5cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFVuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eKFswLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvOetieaWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBSZW1hcms6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS52YWx1ZSAmJiBzZWxlY3RlZFZhbHVlICE9PSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1wiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkFjdHVhbFByaWNlXCI6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFRyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVGhpcmRXZWlnaHRGZWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIuS7mOePvuS7peWklueahOS7mOasvuaWueW8j+iri+WLmeW/heWhq+Wvq+WCmeiou1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogJ3NwYW4nLFxyXG4gICAgICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24gKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5hZGRDbGFzcygnaW52YWxpZC1mZWVkYmFjaycpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFwcGVuZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQ2xhc3MgVmFyaWFibGUgKi9cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCBKcURvbU9mQ2FyTm9VTklEID0gJCh0aGlzLkRvbU9mQ2FyTm9VTklEKTtcclxuXHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmNhck5vVU5JRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlU2V0Q29udHJhY3RJdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCBKcURvbU9mQ29udHJhY3RVTklEID0gJCh0aGlzLkRvbU9mQ29udHJhY3RVTklEKTtcclxuXHJcbiAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIlwiLCBcIlwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jb250cmFjdE5hbWUsIGl0ZW0uY29udHJhY3RHVUlELCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1VTUHJvZEl0ZW1zKCkge1xyXG4gICAgICAgIGxldCBldmVuU2hvd1VsRG9tID0gdGhpcy5Eb21PZkV2ZW5TaG93O1xyXG4gICAgICAgIGxldCBvZGRTaG93VWxEb20gPSB0aGlzLkRvbU9mT2RkTFNob3c7XHJcbiAgICAgICAgZXZlblNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIG9kZFNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuTWludXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgICAgICAgICAgY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuUGx1c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgbGlUYWcuZGF0YXNldC50ZXh0ID0gaXRlbS5wcm9kVGV4dDtcclxuICAgICAgICAgICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHtpdGVtLnByb2RUZXh0fSBcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIGxpVGFnLmRhdGFzZXQudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgLy8gbGlUYWcuZGF0YXNldC5wZXJjZW50ID0gdGhpcy5fcHJvZEl0ZW1MaXN0Lmxlbmd0aCA9PT0gMCA/IFwiOTBcIiA6IFwiMTBcIjtcclxuICAgICAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0ucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG5cclxuICAgICAgICAgICAgaW5kZXggJSAyID09PSAwID8gZXZlblNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZykgOlxyXG4gICAgICAgICAgICAgICAgb2RkU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5TaG93UHJvZEl0ZW1TdW1tYXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93UHJvZEl0ZW1TdW1tYXJ5KCkge1xyXG4gICAgICAgIGxldCBhbGxQZXJjZW50ID0gMDtcclxuICAgICAgICBsZXQgbWF4SXRlbTogUHVyY2hhc2VQcm9kSXRlbTtcclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0ucGVyY2VudCArIGFsbFBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0ucGVyY2VudCA+ICtpdGVtLnBlcmNlbnQgPyBtYXhJdGVtIDogaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHt0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5sZW5ndGh96aCFYDtcclxuICAgICAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICAgICAgaWYgKGFsbFBlcmNlbnQgPiAxMDApXHJcbiAgICAgICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICByZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MID0gYOiqjeWIl+mgheebriA6ICR7bWF4SXRlbT8ucHJvZFRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc3VtbWFyeUluZm8gPSBgJHtyZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MfSR7aXRlbVNwYW4uaW5uZXJIVE1MfSR7cGVyY2VudFNwYW4uaW5uZXJIVE1MfWA7XHJcblxyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChyZWNvZ25pdGlvblNwYW4pO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHBlcmNlbnRTcGFuKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIEJpbmRJbmdyZWRpZW50VG9Eb20oKSB7XHJcbiAgICAgICAgbGV0IHBvc3REaXYgPSB0aGlzLkRvbU9mSW5ncmVkaWVudFBvc3Q7XHJcblxyXG4gICAgICAgIHBvc3REaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGhpZGRlbiBpbnB1dCBlbGVtZW50LCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaTpcclxuICAgICAgICAgICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBEVE9TYWxlc0luZ3JlZGllbnRzWyR7aW5kZXh9XS5JdGVtTmFtZWA7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZFRleHRcclxuICAgICAgICAgICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBEVE9TYWxlc0luZ3JlZGllbnRzWyR7aW5kZXh9XS5Qcm9kdWN0VU5JRGA7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkubmFtZSA9IGBEVE9TYWxlc0luZ3JlZGllbnRzWyR7aW5kZXh9XS5JdGVtUGVyY2VudGA7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucGVyY2VudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQobmFtZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMCA+IDEwMCA/IDEwMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENhY3VsYXRlQWxsRmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCBmdW5jUnMgPSB0aGlzLlNhbGVzUHJpY2VBUEkuR2V0SW52b2ljZVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkFjdHVhbExlYXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkFjdHVhbERlZmVjdGl2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZBY3R1YWxVbml0UHJpY2UudmFsdWUsXHJcbiAgICAgICAgICAgIHRoaXMuRG9tT2ZBY3R1YWxJbnZvaWNlUHJpY2VIYXNUYXguY2hlY2tlZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IGZ1bmNSczIgPSB0aGlzLlNhbGVzUHJpY2VBUEkuR2V0RGVsaXZlcnlQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZBY3R1YWxMZWF2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZBY3R1YWxUcmFmaWNVbml0UHJpY2UudmFsdWUsXHJcbiAgICAgICAgICAgIHRoaXMuRG9tT2ZBY3R1YWxUcmFmaWNIYXNUYXguY2hlY2tlZFxyXG4gICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAkLndoZW4oZnVuY1JzLCBmdW5jUnMyKS50aGVuKGZ1bmN0aW9uIChkYXRhLCBkYXRhMikge1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsSW52b2ljZXByaWNlLnRleHRDb250ZW50ID0gZGF0YVswXS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxUcmFmaWNwcmljZS50ZXh0Q29udGVudCA9IGRhdGEyWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0VmFsID0gMDtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZkFjdHVhbEludm9pY2VUYXgudGV4dENvbnRlbnQgPSBkZWZhdWx0VmFsLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXNPYmouRG9tT2ZBY3R1YWxJbnZvaWNlUHJpY2VIYXNUYXguY2hlY2tlZCkgLy8g5pyJ5Yu+5omN5pyJ56iF6YeR5ZWP6aGMXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMzID0gdGhpc09iai5TYWxlc1ByaWNlQVBJLkdldFRheFByaWNlKCtkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMzKS50aGVuKGZ1bmN0aW9uIChkYXRhOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsSW52b2ljZVRheC50ZXh0Q29udGVudCA9IGRhdGEudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0VmFsMiA9IDA7XHJcbiAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxUcmFmaWNUYXgudGV4dENvbnRlbnQgPSBkZWZhdWx0VmFsMi50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzT2JqLkRvbU9mQWN0dWFsVHJhZmljSGFzVGF4LmNoZWNrZWQpIC8vIOacieWLvuaJjeacieeohemHkeWVj+mhjFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzNCA9IHRoaXNPYmouU2FsZXNQcmljZUFQSS5HZXRUYXhQcmljZSgrZGF0YTJbMF0pO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNSczQpLnRoZW4oZnVuY3Rpb24gKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNPYmouRG9tT2ZBY3R1YWxUcmFmaWNUYXgudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzOSA9IHRoaXNPYmouU2FsZXNQcmljZUFQSS5HZXRSZWNlaXZlZFByaWNlKFxyXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcclxuICAgICAgICAgICAgICAgIGRhdGEyWzBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzOSkudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mQWN0dWFsUmVjZWl2ZWRwcmljZS50ZXh0Q29udGVudCA9IGRhdGEudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzT2JqLkFjdHVhbFByaWNlX0RPTS52YWx1ZSA9IGRhdGE7IOaHieipsuaKiuS4iui/sOWAvCDpg73luLblm57lvoznq6/ph43mlrDoqIjnrpdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=