var SalesWeightNoteCreateWeightNote = /** @class */ (function () {
    function SalesWeightNoteCreateWeightNote(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        /* Field Doms */
        //new
        this.DomOfLeaveWeight = document.getElementById('SalesWeight');
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
        this.DataTableObj = $('#example1').DataTable({
            dom: '',
            order: [[2, "desc"]],
            drawCallback: function (oSettings) {
                var cacluteRs = oSettings.aoData.map(function (item) {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = item._aData[1];
                    var percent = +(tempDiv.querySelector("span").textContent.replace("%", "")) / 100;
                    var unitPrice = +(item._aData[4].replace("元/kg", ""));
                    return percent * unitPrice;
                });
                var sumAvg = cacluteRs.length > 0 ? cacluteRs.reduce(function (sum, data) { return sum + data; }) : 0;
                var api = this.api();
                //let rsStr = sumAvg.toLocaleString('zh-TW');
                //let rsStr = sumAvg.toString();
                $(api.column(4).footer()).html(sumAvg.toLocaleString('zh-TW') + " \u5143/kg");
                //oSettings.aoData.forEach(item => {
                //    let tempDiv = document.createElement('div');
                //    tempDiv.innerHTML = item._aData[1];
                //    var percent = +(tempDiv.querySelector("span").textContent.replace("%", "")) / 100;
                //    var unitPrice = +((item._aData[4] as string).replace("元/kg", ""));
                //    sumAvg = sumAvg + (percent * unitPrice);
                //    //console.log(`${item._aData[1]}_${item._aData[4]}`);
                //    //sumAvg = sumAvg + item._aData[4];
                //});
            },
            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                //var intVal = function (i) {
                //    return typeof i === 'string' ? +(i.replace("元/kg", "")) * 1 : typeof i === 'number' ? i : 0;
                //};
                //var total = api
                //    .column(4, { page: "current" })
                //    .data()
                //    .reduce(function (a, b) {
                //        console.log(`a=${a}`);
                //        console.log(`b=${b}`);
                //        //console.log(`aR=${a.replace("元/kg", "")}`);
                //        //console.log(`bR=${b.replace("元/kg", "")}`);
                //        //p.replace('dog', 'monkey')
                //        let tempDiv = document.createElement('div');
                //        tempDiv.innerHTML = data[0];
                //        var nominatorVal = +(tempDiv.querySelector("span").textContent.split("%")[0]) / 100;
                //        return intVal(a) + (nominatorVal * intVal(b));
                //    }, 0);
                //// Update footer
                //$(api.column(4).footer()).html(`${total}`);
            }
            //columns: [
            //    null,
            //    { orderDataType: 'dom-text' },
            //    null,
            //    null,
            //    null
            //    //,
            //    //{ orderDataType: 'dom-text', type: 'string' },
            //    //{ orderDataType: 'dom-select' },
            //]
        });
        //public justFormObj = new JustValidate('#create-form',
        //    {
        //        errorFieldCssClass: 'is-invalid',
        //        errorLabelStyle: {
        //            fontSize: '14px',
        //            color: '#dc3545',
        //        },
        //        focusInvalidField: true,
        //        lockForm: true,
        //    });
        //public DataTableObj2 = $('#example2').DataTable({
        //    dom: '',
        //    ordering: false
        //});
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
        this.WeightAPIClass = new WeightAPIClass(this.BaseUrl);
        this.InventoryAPIClass = new InventoryAPIClass(this.BaseUrl);
        this.CostAPIClass = new CostAPIClass(this.BaseUrl);
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
        // jquery datatable
        //var t = $('#example').DataTable();
        //var counter = 1;
        //$('#addRow').on('click', function () {
        //    t.row.add([counter + '.1', counter + '.2', counter + '.3', counter + '.4', counter + '.5']).draw(false);
        //    counter++;
        //});
        // Automatically add a first row of data
        // $('#addRow').click();
    };
    SalesWeightNoteCreateWeightNote.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            //$("#dialog-confirm").dialog("open");
            //alertify.confirm('Confirm Title', 'Confirm Message', function () { alertify.success('Ok') }
            //    , function () { alertify.error('Cancel') });
            //let cat = new JustValidate('#create-form');
            Swal.fire({
                title: '確定建立出貨單嗎?',
                confirmButtonText: '建立',
                showDenyButton: true,
                denyButtonText: "\u53D6\u6D88",
                returnFocus: false
                //showCancelButton: true,
                //focusConfirm: false,
            }).then(function (result) {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    $('#create-form').submit();
                    //curObj.justFormObj.revalidate().then(isValid => {
                    //    if (isValid)
                    //        (document.getElementById("create-form") as HTMLFormElement).submit();
                    //    //curObj.justFormObj.showErrors({ '#CustomerUNID': 'The email is invalid' })
                    //});
                }
                else if (result.isDenied) {
                    //Swal.fire('Changes are not saved', '', 'info')
                }
            });
            //Swal.fire("haha")
            //Swal.fire(
            //    'Good job!',
            //    'You clicked the button!',
            //    'success'
            //);
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
            curObj.PlusProdItemPercent_Click2($(this).get(0));
        });
        // 減少-進貨品項百分比
        $(curObj.DomOfCreateForm).on('click', "." + curObj.MinusPercentClassName, function () {
            curObj.MinusProdItemPercent_Click2($(this).get(0));
        });
        $(curObj.DomOfLeaveWeight).on('input', function () {
            curObj.CaculateWeight();
            //curObj.CaculateAllFee();
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
                //alert("頁面資訊填寫不完整，請檢查頁面訊息!!");
                //Swal.fire("頁面資訊填寫不完整，請檢查頁面訊息!!", "", "info")
                Swal.fire({
                    icon: 'info',
                    //title: 'Oops...',
                    text: '頁面資訊填寫不完整，請檢查頁面訊息!!',
                    returnFocus: false
                    //focusConfirm: false
                });
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
                //ProductItemUNID: "required",
                USProdList: "required",
                //ReceivedTime: "required",
                //ReceivedType: "required",
                /*     SelectPurchaseDetailInfos: "required",*/
                LeaveWeight: {
                    required: true,
                    pattern: /^\+?[1-9][0-9]*$/ // 大於0的正整數
                }
                //, DefectiveWeight: {
                //    required: true,
                //    pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
                //},
                //UnitPrice: {
                //    required: true,
                //    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
                //},
                //TraficUnitPrice: {
                //    required: true,
                //    pattern: /^([0-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於等於0整數 且 最多2位小數!!
                //},
                //Remark: {
                //    required: function (element) {
                //        const selectedValue = curObj.DomOfReceivedType.options[curObj.DomOfReceivedType.selectedIndex].value;
                //        return curObj.DomOfReceivedType.value && selectedValue !== "1";
                //    }
                //}
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    required: true,
                //    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                //}
            },
            messages: {
                LeaveWeight: {
                    pattern: "必須為大於0的正整數"
                }
                //, DefectiveWeight: {
                //    pattern: "必須為大於或等於0的正整數"
                //},
                //UnitPrice: {
                //    pattern: "必須為大於0整數 且 最多2位小數"
                //},
                //TraficUnitPrice: {
                //    pattern: "必須為大於0整數 且 最多2位小數"
                //},
                //ThirdWeightFee: {
                //    pattern: "必須為大於或等於0的正整數"
                //},
                //Remark: {
                //    required: "付現以外的付款方式請務必填寫備註"
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
    SalesWeightNoteCreateWeightNote.prototype.PageValidateInitV2 = function () {
        //this.justFormObj.addField('#CustomerUNID', [
        //    {
        //        rule: 'required',
        //        errorMessage: 'lulala'
        //    }
        //])
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
        //let evenShowUlDom = this.DomOfEvenShow;
        //let oddShowUlDom = this.DomOfOddLShow;
        //evenShowUlDom.innerHTML = "";
        //oddShowUlDom.innerHTML = "";
        var _this = this;
        this.DataTableObj.clear().draw();
        this._prodItemList.Data.forEach(function (item, index) {
            //const iMinusTag = document.createElement("i");
            //iMinusTag.classList.add("fas");
            //iMinusTag.classList.add("fa-minus-circle");
            //iMinusTag.classList.add(this.MinusPercentClassName);
            //iMinusTag.style.cursor = "pointer";
            //iMinusTag.style.color = "blue";
            //const iPlusTag = document.createElement("i");
            //iPlusTag.classList.add("fas");
            //iPlusTag.classList.add("fa-plus-circle");
            //iPlusTag.classList.add(this.PlusPercentClassName);
            //iPlusTag.style.cursor = "pointer";
            //iPlusTag.style.color = "red";
            //const spanTag = document.createElement("span") as HTMLSpanElement;
            //const liTag = document.createElement("li") as HTMLLIElement;
            //liTag.dataset.text = item.prodText;
            //liTag.textContent = `${item.prodText} \u00A0\u00A0`;
            //liTag.dataset.value = item.prodId;
            //// liTag.dataset.percent = this._prodItemList.length === 0 ? "90" : "10";
            //spanTag.innerHTML = `\u00A0\u00A0${item.percent}%\u00A0\u00A0`;
            //liTag.appendChild(iMinusTag);
            //liTag.appendChild(spanTag);
            //liTag.appendChild(iPlusTag);
            //index % 2 === 0 ? evenShowUlDom.appendChild(liTag) :
            //    oddShowUlDom.appendChild(liTag);
            // ver2
            var spanTag = document.createElement("span");
            spanTag.innerHTML = "\u00A0\u00A0" + item.percent + "%\u00A0\u00A0";
            var iMinusTag2 = document.createElement("i");
            iMinusTag2.classList.add("fas");
            iMinusTag2.classList.add("fa-minus");
            //iMinusTag2.classList.add(this.MinusPercentClassName);
            var btnMinusTag = document.createElement("button");
            btnMinusTag.append(iMinusTag2);
            btnMinusTag.type = "button";
            btnMinusTag.value = item.prodId;
            btnMinusTag.classList.add("btn", "btn-circle", "btn-primary", _this.MinusPercentClassName); // 出處 https://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas
            var iPlusTag2 = document.createElement("i");
            iPlusTag2.classList.add("fas");
            iPlusTag2.classList.add("fa-plus");
            //iPlusTag2.classList.add(this.PlusPercentClassName);
            var btnPlusTag = document.createElement("button");
            btnPlusTag.type = "button";
            btnPlusTag.append(iPlusTag2);
            btnPlusTag.value = item.prodId;
            btnPlusTag.classList.add("btn", "btn-circle", "btn-danger", _this.PlusPercentClassName); // 出處 https://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas
            _this.DataTableObj.row.add([item.prodText, "" + btnMinusTag.outerHTML + spanTag.outerHTML + btnPlusTag.outerHTML, '',
                '',
                '',
                '']).draw(false);
        });
        this.ShowProdItemSummary();
        this.CaculateWeight();
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
            nameProperty.name = "DTOSalesIngredients[" + index + "].ITEM_NAME";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "DTOSalesIngredients[" + index + "].PRODUCT_UNID";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "DTOSalesIngredients[" + index + "].ITEM_PERCENT";
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
    SalesWeightNoteCreateWeightNote.prototype.PlusProdItemPercent_Click2 = function (curBtnDom) {
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === curBtnDom.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.CaculateWeight();
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
    SalesWeightNoteCreateWeightNote.prototype.MinusProdItemPercent_Click2 = function (curBtnDom) {
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === curBtnDom.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.CaculateWeight();
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
    SalesWeightNoteCreateWeightNote.prototype.CaculateWeight = function () {
        var thisObj = this;
        this.DataTableObj.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var thisRow = this;
            var thisRowData = thisRow.data();
            //var aabb = $(lala[1]).find('span');
            //var lalaw = aabb.text.toString().split("%")[0];
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = thisRowData[1];
            var nominatorVal = tempDiv.querySelector("span").textContent.split("%")[0];
            //let usProdItemDoms = $(curObj.DomOfUserSelectProditem).find(':selected').toArray() as HTMLOptionElement[];
            //console.log(thisObj.DataTableObj.rows().data().toArray().forEach);
            var funcRs = thisObj.WeightAPIClass.GetProportionWeight(nominatorVal, thisObj.DomOfLeaveWeight.value);
            //$.when(funcRs).then(function (data) {
            //    thisRowData[2] = `${data} kg`;
            //    thisRow.invalidate();
            //    thisObj.DataTableObj.order([1, 'desc']).draw();
            //    //thisObj.DataTableObj.sort([[13, 'asc'], [1, 'asc']])
            //    //thisObj.DataTableObj.sort()
            //    //thisObj.DataTableObj.order([2, 'desc']).draw();
            //    //Swal.fire('Any fool can use a computer')
            //});
            var productUNID = tempDiv.querySelector("button").value;
            var funcRs2 = thisObj.InventoryAPIClass.GetInventoryWeight(productUNID);
            //$.when(funcRs2).then(function (data) {
            //    thisRowData[3] = `${data} kg`;
            //    thisRow.invalidate();
            //    thisObj.DataTableObj.order([1, 'desc']).draw();
            //});
            var funcRs3 = thisObj.InventoryAPIClass.GetInventoryUnitPrice(productUNID);
            var funcRs4 = thisObj.InventoryAPIClass.GetInventoryMinUnitPrice(productUNID);
            var funcRs5 = thisObj.InventoryAPIClass.GetInventoryMaxUnitPrice(productUNID);
            //$.when(funcRs3).then(function (data) {
            //    thisRowData[4] = `${data} 元/kg`;
            //    thisRow.invalidate();
            //    thisObj.DataTableObj.order([1, 'desc']).draw();
            //    //let rsVal = 0;
            //    //thisObj.DataTableObj.rows().every(function (rowIdx, tableLoop, rowLoop) {
            //    //    let funcRs4 = thisObj.CostAPIClass.GetCostUnitPrce(Number(nominatorVal), data);
            //    //    $.when(funcRs4).then(function (data2) {
            //    //        rsVal = rsVal + data2
            //    //        thisObj.DataTableObj.column(4).footer().innerHTML = rsVal.toString();
            //    //    })
            //    //    //thisObj.CostAPIClass.GetCostUnitPrce();
            //    //    //$(api.column(4).footer()).html
            //    //});
            //});
            $.when(funcRs, funcRs2, funcRs3, funcRs4, funcRs5).then(function (data, data2, data3, data4, data5) {
                // data
                thisRowData[2] = data[0];
                // data2
                thisRowData[3] = data2[0];
                // data3
                thisRowData[4] = "(" + data4[0].toLocaleString('zh-TW') + "~" + data5[0].toLocaleString('zh-TW') + "), \u5E73\u5747" + data3[0].toLocaleString('zh-TW') + " \u5143/kg";
                thisRow.invalidate();
                thisObj.DataTableObj.order([2, 'desc']).draw();
            });
            //let funcRs = thisObj.CostAPIClass.GetCostUnitPrce(nominatorVal, thisObj.DomOfLeaveWeight.value);
            //thisObj.DataTableObj.draw();
        });
    };
    return SalesWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQW1CSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBaEJ6QixrQkFBYSxHQUF5QixJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDL0QsMEJBQXFCLEdBQVcsZUFBZSxDQUFBO1FBQy9DLHlCQUFvQixHQUFXLGNBQWMsQ0FBQTtRQXVCdEQsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDRSxxQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBcUIsQ0FBQztRQUM5RSx5QkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFxQixDQUFDO1FBQ3RGLG1CQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7UUFDMUUseUJBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztRQUN0Riw0QkFBdUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFxQixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBdUIsQ0FBQztRQUM5RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUF1QixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQXVCLENBQUM7UUFDMUYsc0JBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7UUFDakYsbUJBQWMsR0FBRyxRQUFR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LENBQUMsU0FBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyx1QkFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUM7Z0JBRXpJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztZQUdILGtHQUFrRztZQUdsRyw4QkFBOEI7UUFFbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsc0NBQUM7QUFBRCxDQUFDLEFBL3hCRCxJQSt4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTYWxlc1dlaWdodE5vdGVDcmVhdGVXZWlnaHROb3RlIHtcclxuICAgIC8vIEJhc2UgUG9ycGVyaXRlc1xyXG4gICAgcmVhZG9ubHkgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIF9wcm9kSXRlbUxpc3Q6IFB1cmNoYXNlUHJvZEl0ZW1MaXN0ID0gbmV3IFB1cmNoYXNlUHJvZEl0ZW1MaXN0KCk7XHJcbiAgICByZWFkb25seSBNaW51c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwibWludXMtcGVyY2VudFwiXHJcbiAgICByZWFkb25seSBQbHVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJwbHVzLXBlcmNlbnRcIlxyXG5cclxuICAgIC8vIEZvciBQb3N0XHJcblxyXG5cclxuICAgIC8vIFJlZmVyZW5jZXMgIFxyXG4gICAgcHJpdmF0ZSBTYWxlc1ByaWNlQVBJOiBTYWxlc1ByaWNlQVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIEN1c3RvbWVyQ29udHJhY3RBUEk6IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcztcclxuICAgIHByaXZhdGUgV2VpZ2h0QVBJQ2xhc3M6IFdlaWdodEFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBJbnZlbnRvcnlBUElDbGFzczogSW52ZW50b3J5QVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIENvc3RBUElDbGFzczogQ29zdEFQSUNsYXNzO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgdGhpcy5TYWxlc1ByaWNlQVBJID0gbmV3IFNhbGVzUHJpY2VBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJDb250cmFjdEFQSSA9IG5ldyBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLldlaWdodEFQSUNsYXNzID0gbmV3IFdlaWdodEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5JbnZlbnRvcnlBUElDbGFzcyA9IG5ldyBJbnZlbnRvcnlBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuQ29zdEFQSUNsYXNzID0gbmV3IENvc3RBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEZpZWxkIERvbXMgKi9cclxuICAgIC8vbmV3XHJcbiAgICBwdWJsaWMgRG9tT2ZMZWF2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTYWxlc1dlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZEZWZlY3RpdmVXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRGVmZWN0aXZlV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVHJhZmljVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RyYWZpY1VuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbnZvaWNlUHJpY2VIYXNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnSW52b2ljZVByaWNlSGFzVGF4JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRyYWZpY0ZlZUhhc1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUcmFmaWNGZWVIYXNUYXgnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd1JlY2VpdmVkUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd19yZWNlaXZlZF9wcmljZScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dJbnZvaWNlUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd19pbnZvaWNlX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd1RyYWZpY1ByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfdHJhZmljX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3VzdG9tZXJVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0N1c3RvbWVyVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ2FyTm9VTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0Nhck5vVU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mUmVjZWl2ZWRUeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1JlY2VpdmVkVHlwZScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ3JlYXRlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkZvcm1DcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybV9jcmVhdGUnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHB1YmxpYyBEYXRhVGFibGVPYmogPSAkKCcjZXhhbXBsZTEnKS5EYXRhVGFibGUoe1xyXG4gICAgICAgIGRvbTogJycsXHJcbiAgICAgICAgb3JkZXI6IFtbMiwgXCJkZXNjXCJdXSxcclxuICAgICAgICBkcmF3Q2FsbGJhY2s6IGZ1bmN0aW9uIChvU2V0dGluZ3MpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYWNsdXRlUnMgPSBvU2V0dGluZ3MuYW9EYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IGl0ZW0uX2FEYXRhWzFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSArKHRlbXBEaXYucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQucmVwbGFjZShcIiVcIiwgXCJcIikpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVuaXRQcmljZSA9ICsoKGl0ZW0uX2FEYXRhWzRdIGFzIHN0cmluZykucmVwbGFjZShcIuWFgy9rZ1wiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyY2VudCAqIHVuaXRQcmljZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdW1BdmcgPSBjYWNsdXRlUnMubGVuZ3RoID4gMCA/IGNhY2x1dGVScy5yZWR1Y2UoKHN1bSwgZGF0YSkgPT4gc3VtICsgZGF0YSkgOiAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFwaSA9IHRoaXMuYXBpKCk7XHJcbiAgICAgICAgICAgIC8vbGV0IHJzU3RyID0gc3VtQXZnLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycpO1xyXG4gICAgICAgICAgICAvL2xldCByc1N0ciA9IHN1bUF2Zy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAkKGFwaS5jb2x1bW4oNCkuZm9vdGVyKCkpLmh0bWwoYCR7c3VtQXZnLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycpfSDlhYMva2dgKTtcclxuXHJcbiAgICAgICAgICAgIC8vb1NldHRpbmdzLmFvRGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBsZXQgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAvLyAgICB0ZW1wRGl2LmlubmVySFRNTCA9IGl0ZW0uX2FEYXRhWzFdO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgcGVyY2VudCA9ICsodGVtcERpdi5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS50ZXh0Q29udGVudC5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDA7XHJcbiAgICAgICAgICAgIC8vICAgIHZhciB1bml0UHJpY2UgPSArKChpdGVtLl9hRGF0YVs0XSBhcyBzdHJpbmcpLnJlcGxhY2UoXCLlhYMva2dcIiwgXCJcIikpO1xyXG4gICAgICAgICAgICAvLyAgICBzdW1BdmcgPSBzdW1BdmcgKyAocGVyY2VudCAqIHVuaXRQcmljZSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vY29uc29sZS5sb2coYCR7aXRlbS5fYURhdGFbMV19XyR7aXRlbS5fYURhdGFbNF19YCk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vc3VtQXZnID0gc3VtQXZnICsgaXRlbS5fYURhdGFbNF07XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvb3RlckNhbGxiYWNrOiBmdW5jdGlvbiAocm93LCBkYXRhLCBzdGFydCwgZW5kLCBkaXNwbGF5KSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXBpID0gdGhpcy5hcGkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGludFZhbCA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyArKGkucmVwbGFjZShcIuWFgy9rZ1wiLCBcIlwiKSkgKiAxIDogdHlwZW9mIGkgPT09ICdudW1iZXInID8gaSA6IDA7XHJcbiAgICAgICAgICAgIC8vfTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHRvdGFsID0gYXBpXHJcbiAgICAgICAgICAgIC8vICAgIC5jb2x1bW4oNCwgeyBwYWdlOiBcImN1cnJlbnRcIiB9KVxyXG4gICAgICAgICAgICAvLyAgICAuZGF0YSgpXHJcbiAgICAgICAgICAgIC8vICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGBhPSR7YX1gKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKGBiPSR7Yn1gKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vY29uc29sZS5sb2coYGFSPSR7YS5yZXBsYWNlKFwi5YWDL2tnXCIsIFwiXCIpfWApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9jb25zb2xlLmxvZyhgYlI9JHtiLnJlcGxhY2UoXCLlhYMva2dcIiwgXCJcIil9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9wLnJlcGxhY2UoJ2RvZycsICdtb25rZXknKVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBsZXQgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIG5vbWluYXRvclZhbCA9ICsodGVtcERpdi5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS50ZXh0Q29udGVudC5zcGxpdChcIiVcIilbMF0pIC8gMTAwO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gaW50VmFsKGEpICsgKG5vbWluYXRvclZhbCAqIGludFZhbChiKSk7XHJcbiAgICAgICAgICAgIC8vICAgIH0sIDApO1xyXG5cclxuICAgICAgICAgICAgLy8vLyBVcGRhdGUgZm9vdGVyXHJcbiAgICAgICAgICAgIC8vJChhcGkuY29sdW1uKDQpLmZvb3RlcigpKS5odG1sKGAke3RvdGFsfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NvbHVtbnM6IFtcclxuICAgICAgICAvLyAgICBudWxsLFxyXG4gICAgICAgIC8vICAgIHsgb3JkZXJEYXRhVHlwZTogJ2RvbS10ZXh0JyB9LFxyXG4gICAgICAgIC8vICAgIG51bGwsXHJcbiAgICAgICAgLy8gICAgbnVsbCxcclxuICAgICAgICAvLyAgICBudWxsXHJcbiAgICAgICAgLy8gICAgLy8sXHJcbiAgICAgICAgLy8gICAgLy97IG9yZGVyRGF0YVR5cGU6ICdkb20tdGV4dCcsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgLy8gICAgLy97IG9yZGVyRGF0YVR5cGU6ICdkb20tc2VsZWN0JyB9LFxyXG4gICAgICAgIC8vXVxyXG4gICAgfSk7XHJcbiAgICAvL3B1YmxpYyBqdXN0Rm9ybU9iaiA9IG5ldyBKdXN0VmFsaWRhdGUoJyNjcmVhdGUtZm9ybScsXHJcbiAgICAvLyAgICB7XHJcbiAgICAvLyAgICAgICAgZXJyb3JGaWVsZENzc0NsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgICAvLyAgICAgICAgZXJyb3JMYWJlbFN0eWxlOiB7XHJcbiAgICAvLyAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXHJcbiAgICAvLyAgICAgICAgICAgIGNvbG9yOiAnI2RjMzU0NScsXHJcbiAgICAvLyAgICAgICAgfSxcclxuICAgIC8vICAgICAgICBmb2N1c0ludmFsaWRGaWVsZDogdHJ1ZSxcclxuICAgIC8vICAgICAgICBsb2NrRm9ybTogdHJ1ZSxcclxuICAgIC8vICAgIH0pO1xyXG4gICAgLy9wdWJsaWMgRGF0YVRhYmxlT2JqMiA9ICQoJyNleGFtcGxlMicpLkRhdGFUYWJsZSh7XHJcbiAgICAvLyAgICBkb206ICcnLFxyXG4gICAgLy8gICAgb3JkZXJpbmc6IGZhbHNlXHJcbiAgICAvL30pO1xyXG5cclxuICAgIC8vIG9sZFxyXG4gICAgcHVibGljIERvbU9mVXNlclNlbGVjdFByb2RpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItc2VsZWN0LXByb2RpdGVtJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZFdmVuU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVuUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk9kZExTaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29kZFByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUb3RhbFByb2RJdGVtSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbCcpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkluZ3JlZGllbnRQb3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZ3JlZGllbnRQb3N0JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDb250cmFjdFVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ29udHJhY3RVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFVuaXRQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05vd0NvbnRyYWN0V2VpZ2h0JykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdEFjdHVhbFByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBQYWdlUGx1Z2luSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8qIFBhZ2UgSW5pdGlhbGl6ZSAqL1xyXG4gICAgICAgIC8vIFNlbGVjdDIgRWxlbWVudHNcclxuICAgICAgICAkKCcuc2VsZWN0MmJzNCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlLFxyXG4gICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcDQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLoq4vpgbjmk4dcIlxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyBqcXVlcnkgZGlhbG9nXHJcbiAgICAgICAgJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgICAgICBcIumAgeWHulwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NyZWF0ZS1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIuWPlua2iFwiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAvLyBqcXVlcnkgZGF0YXRhYmxlXHJcbiAgICAgICAgLy92YXIgdCA9ICQoJyNleGFtcGxlJykuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgLy92YXIgY291bnRlciA9IDE7XHJcblxyXG4gICAgICAgIC8vJCgnI2FkZFJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICB0LnJvdy5hZGQoW2NvdW50ZXIgKyAnLjEnLCBjb3VudGVyICsgJy4yJywgY291bnRlciArICcuMycsIGNvdW50ZXIgKyAnLjQnLCBjb3VudGVyICsgJy41J10pLmRyYXcoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyAgICBjb3VudGVyKys7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8gQXV0b21hdGljYWxseSBhZGQgYSBmaXJzdCByb3cgb2YgZGF0YVxyXG4gICAgICAgIC8vICQoJyNhZGRSb3cnKS5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlRXZlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogUGFnZSBFdmVudHMgKi9cclxuICAgICAgICAvLyDooajllq7lu7rnq4tcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkZvcm1DcmVhdGUpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8kKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcblxyXG4gICAgICAgICAgICAvL2FsZXJ0aWZ5LmNvbmZpcm0oJ0NvbmZpcm0gVGl0bGUnLCAnQ29uZmlybSBNZXNzYWdlJywgZnVuY3Rpb24gKCkgeyBhbGVydGlmeS5zdWNjZXNzKCdPaycpIH1cclxuICAgICAgICAgICAgLy8gICAgLCBmdW5jdGlvbiAoKSB7IGFsZXJ0aWZ5LmVycm9yKCdDYW5jZWwnKSB9KTtcclxuICAgICAgICAgICAgLy9sZXQgY2F0ID0gbmV3IEp1c3RWYWxpZGF0ZSgnI2NyZWF0ZS1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnorrlrprlu7rnq4vlh7rosqjllq7ll44/JyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn5bu656uLJyxcclxuICAgICAgICAgICAgICAgIHNob3dEZW55QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGVueUJ1dHRvblRleHQ6IGDlj5bmtohgLFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuRm9jdXM6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAvL3Nob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL2ZvY3VzQ29uZmlybTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8qIFJlYWQgbW9yZSBhYm91dCBpc0NvbmZpcm1lZCwgaXNEZW5pZWQgYmVsb3cgKi9cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY3JlYXRlLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2N1ck9iai5qdXN0Rm9ybU9iai5yZXZhbGlkYXRlKCkudGhlbihpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXNWYWxpZClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLWZvcm1cIikgYXMgSFRNTEZvcm1FbGVtZW50KS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2N1ck9iai5qdXN0Rm9ybU9iai5zaG93RXJyb3JzKHsgJyNDdXN0b21lclVOSUQnOiAnVGhlIGVtYWlsIGlzIGludmFsaWQnIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmlzRGVuaWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Td2FsLmZpcmUoJ0NoYW5nZXMgYXJlIG5vdCBzYXZlZCcsICcnLCAnaW5mbycpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vU3dhbC5maXJlKFwiaGFoYVwiKVxyXG4gICAgICAgICAgICAvL1N3YWwuZmlyZShcclxuICAgICAgICAgICAgLy8gICAgJ0dvb2Qgam9iIScsXHJcbiAgICAgICAgICAgIC8vICAgICdZb3UgY2xpY2tlZCB0aGUgYnV0dG9uIScsXHJcbiAgICAgICAgICAgIC8vICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAvLyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5Ye66LKo5bCN6LGhXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS50ZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRTYWxlc0NvbnRyYWN0c0J5Q3VzdG9tZXJVTklEKHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouUmVTZXRDb250cmFjdEl0ZW1zKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLnRyaWdnZXIoXCJjaGFuZ2VcIik7ICAvLyDph43mlrDmlbTnkIbnmoTmhI/mgJ1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS50cmlnZ2VyKFwiY2hhbmdlXCIpOyAgLy8g5Yqg6YCZ5YCL5a6i5oi26LuK54mM5omN5pyD5Yik5pa3IOaYr+WQpumBuOWIsDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5a6i5oi26LuK54mMXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDYXJOb1VOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOmAsuiyqOWTgemghVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNQcm9kSXRlbURvbXMgPSAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxPcHRpb25FbGVtZW50W107XHJcblxyXG4gICAgICAgICAgICAvLyBVc2Vy5omA6YG4XHJcbiAgICAgICAgICAgIHVzUHJvZEl0ZW1Eb21zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5BcHBlbmQoaXRlbS52YWx1ZSwgaXRlbS50ZXh0KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIOimgeWIqumZpOeahFxyXG4gICAgICAgICAgICBjdXJPYmouX3Byb2RJdGVtTGlzdC5EYXRhLmZpbHRlcihzaG93SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISh1c1Byb2RJdGVtRG9tcy5tYXAodXNJdGVtID0+IHVzSXRlbS52YWx1ZSkuaW5jbHVkZXMoc2hvd0l0ZW0ucHJvZElkKSk7XHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goc2hvd0l0ZW0gPT4gY3VyT2JqLl9wcm9kSXRlbUxpc3QuUmVtb3ZlQnlQcm9kSWQoc2hvd0l0ZW0ucHJvZElkKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwYWdlTWFpbi5Qcm9kTGlzdC5SZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICAgICAgY3VyT2JqLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5aKe5YqgLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5QbHVzUGVyY2VudENsYXNzTmFtZX1gLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5QbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrMigkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOa4m+WwkS3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouTWludXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLk1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrMigkKHRoaXMpLmdldCgwKSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkxlYXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZVdlaWdodCgpO1xyXG4gICAgICAgICAgICAvL2N1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZJbnZvaWNlUHJpY2VIYXNUYXgpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRyYWZpY0ZlZUhhc1RheCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRGVmZWN0aXZlV2VpZ2h0KS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZUcmFmaWNVbml0UHJpY2UpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDb250cmFjdFVOSUQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ1VOSUQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVU5JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldENvbnRyYWN0SXRlbXNCeShhcmdVTklELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZVZhbGlkYXRlSW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG4gICAgICAgIC8vIEZvcm0gVmFsaWRhdGlvblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkudmFsaWRhdGUoe1xyXG4gICAgICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLpoIHpnaLos4foqIrloavlr6vkuI3lrozmlbTvvIzoq4vmqqLmn6XpoIHpnaLoqIrmga8hIVwiKTtcclxuICAgICAgICAgICAgICAgIC8vU3dhbC5maXJlKFwi6aCB6Z2i6LOH6KiK5aGr5a+r5LiN5a6M5pW077yM6KuL5qqi5p+l6aCB6Z2i6KiK5oGvISFcIiwgXCJcIiwgXCJpbmZvXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogJ09vcHMuLi4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfpoIHpnaLos4foqIrloavlr6vkuI3lrozmlbTvvIzoq4vmqqLmn6XpoIHpnaLoqIrmga8hIScsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuRm9jdXM6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb2N1c0NvbmZpcm06IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWdub3JlOiBcIlwiLCAvLyDopoHmqqLmn6VIaWRkZW7mrITkvY3opoHliqDpgJnlgItcclxuICAgICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgICAgIEN1c3RvbWVyVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgQ2FyTm9VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBFeGNhdmF0b3JPcGVyVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvL1Byb2R1Y3RJdGVtVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgVVNQcm9kTGlzdDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLy9SZWNlaXZlZFRpbWU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8vUmVjZWl2ZWRUeXBlOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvKiAgICAgU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvczogXCJyZXF1aXJlZFwiLCovXHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vLCBEZWZlY3RpdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogLzB8XlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXihbMS05XVswLTldKihcXC5bMC05XXsxLDJ9KT98MFxcLig/ITArJClbMC05XXsxLDJ9KSQvICAvLyDmoLzlvI/kuI3nrKbvvIzpnIDngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4ISFcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC9eKFswLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvOetieaWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG5cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLm9wdGlvbnNbY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUudmFsdWUgJiYgc2VsZWN0ZWRWYWx1ZSAhPT0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIC8vXCJWRV9QdXJjaGFzZVdlaWdodE5vdGUuQWN0dWFsUHJpY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vLCBEZWZlY3RpdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vVHJhZmljVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9UaGlyZFdlaWdodEZlZToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vUmVtYXJrOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogXCLku5jnj77ku6XlpJbnmoTku5jmrL7mlrnlvI/oq4vli5nlv4Xloavlr6vlgpnoqLtcIlxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudDogJ3NwYW4nLFxyXG4gICAgICAgICAgICBlcnJvclBsYWNlbWVudDogZnVuY3Rpb24gKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5hZGRDbGFzcygnaW52YWxpZC1mZWVkYmFjaycpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFwcGVuZChlcnJvcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZVZhbGlkYXRlSW5pdFYyKCkge1xyXG5cclxuXHJcbiAgICAgICAgLy90aGlzLmp1c3RGb3JtT2JqLmFkZEZpZWxkKCcjQ3VzdG9tZXJVTklEJywgW1xyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgcnVsZTogJ3JlcXVpcmVkJyxcclxuICAgICAgICAvLyAgICAgICAgZXJyb3JNZXNzYWdlOiAnbHVsYWxhJ1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL10pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIENsYXNzIFZhcmlhYmxlICovXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG4gICAgcHJpdmF0ZSBSZVNldENhck5vSXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNhck5vVU5JRCA9ICQodGhpcy5Eb21PZkNhck5vVU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5jYXJOb1VOSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZVNldENvbnRyYWN0SXRlbXMoZGF0YU9iakxzKSB7XHJcbiAgICAgICAgY29uc3QgSnFEb21PZkNvbnRyYWN0VU5JRCA9ICQodGhpcy5Eb21PZkNvbnRyYWN0VU5JRCk7XHJcblxyXG4gICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCJcIiwgXCJcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICBkYXRhT2JqTHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAgLy8g5riF5Zau6aCF55uuXHJcbiAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmNvbnRyYWN0R1VJRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dVU1Byb2RJdGVtcygpIHtcclxuICAgICAgICAvL2xldCBldmVuU2hvd1VsRG9tID0gdGhpcy5Eb21PZkV2ZW5TaG93O1xyXG4gICAgICAgIC8vbGV0IG9kZFNob3dVbERvbSA9IHRoaXMuRG9tT2ZPZGRMU2hvdztcclxuICAgICAgICAvL2V2ZW5TaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAvL29kZFNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLkRhdGFUYWJsZU9iai5jbGVhcigpLmRyYXcoKTtcclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy9jb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgLy9saVRhZy5kYXRhc2V0LnRleHQgPSBpdGVtLnByb2RUZXh0O1xyXG4gICAgICAgICAgICAvL2xpVGFnLnRleHRDb250ZW50ID0gYCR7aXRlbS5wcm9kVGV4dH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICAvL2xpVGFnLmRhdGFzZXQudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgLy8vLyBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSB0aGlzLl9wcm9kSXRlbUxpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgICAgICAgICAvL3NwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgLy9saVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgICAgICAgICAvL2xpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgICAgICAgICAvL2xpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcbiAgICAgICAgICAgIC8vaW5kZXggJSAyID09PSAwID8gZXZlblNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZykgOlxyXG4gICAgICAgICAgICAvLyAgICBvZGRTaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHZlcjJcclxuICAgICAgICAgICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgICAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0ucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlNaW51c1RhZzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnMi5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcyLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51c1wiKTtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcyLmNsYXNzTGlzdC5hZGQodGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBsZXQgYnRuTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidG5NaW51c1RhZy5hcHBlbmQoaU1pbnVzVGFnMik7XHJcbiAgICAgICAgICAgIGJ0bk1pbnVzVGFnLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICBidG5NaW51c1RhZy52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBidG5NaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWNpcmNsZVwiLCBcImJ0bi1wcmltYXJ5XCIsIHRoaXMuTWludXNQZXJjZW50Q2xhc3NOYW1lKTsgIC8vIOWHuuiZlSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTExNTk5OC9pcy10aGVyZS1hLXdheS10by1hZGQtcmVtb3ZlLXNldmVyYWwtY2xhc3Nlcy1pbi1vbmUtc2luZ2xlLWluc3RydWN0aW9uLXdpdGgtY2xhc1xyXG4gICAgICAgICAgICBjb25zdCBpUGx1c1RhZzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcyLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnMi5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1c1wiKTtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZzIuY2xhc3NMaXN0LmFkZCh0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgbGV0IGJ0blBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidG5QbHVzVGFnLnR5cGUgPSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICBidG5QbHVzVGFnLmFwcGVuZChpUGx1c1RhZzIpO1xyXG4gICAgICAgICAgICBidG5QbHVzVGFnLnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGJ0blBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1jaXJjbGVcIiwgXCJidG4tZGFuZ2VyXCIsIHRoaXMuUGx1c1BlcmNlbnRDbGFzc05hbWUpOyAgLy8g5Ye66JmVIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMTE1OTk4L2lzLXRoZXJlLWEtd2F5LXRvLWFkZC1yZW1vdmUtc2V2ZXJhbC1jbGFzc2VzLWluLW9uZS1zaW5nbGUtaW5zdHJ1Y3Rpb24td2l0aC1jbGFzXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuRGF0YVRhYmxlT2JqLnJvdy5hZGQoW2l0ZW0ucHJvZFRleHQsXHJcbiAgICAgICAgICAgIGAke2J0bk1pbnVzVGFnLm91dGVySFRNTH0ke3NwYW5UYWcub3V0ZXJIVE1MfSR7YnRuUGx1c1RhZy5vdXRlckhUTUx9YCxcclxuICAgICAgICAgICAgICAgICcnLFxyXG4gICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICcnXSkuZHJhdyhmYWxzZSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuU2hvd1Byb2RJdGVtU3VtbWFyeSgpO1xyXG4gICAgICAgIHRoaXMuQ2FjdWxhdGVXZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQcm9kSXRlbVN1bW1hcnkoKSB7XHJcbiAgICAgICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhJdGVtOiBQdXJjaGFzZVByb2RJdGVtO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5wZXJjZW50ID4gK2l0ZW0ucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke3RoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmxlbmd0aH3poIVgO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgICAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5wcm9kVGV4dCA/PyBcIueEoVwifWBcclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBzdW1tYXJ5SW5mbyA9IGAke3JlY29nbml0aW9uU3Bhbi5pbm5lckhUTUx9JHtpdGVtU3Bhbi5pbm5lckhUTUx9JHtwZXJjZW50U3Bhbi5pbm5lckhUTUx9YDtcclxuXHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgQmluZEluZ3JlZGllbnRUb0RvbSgpIHtcclxuICAgICAgICBsZXQgcG9zdERpdiA9IHRoaXMuRG9tT2ZJbmdyZWRpZW50UG9zdDtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYERUT1NhbGVzSW5ncmVkaWVudHNbJHtpbmRleH1dLklURU1fTkFNRWA7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZFRleHRcclxuICAgICAgICAgICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBEVE9TYWxlc0luZ3JlZGllbnRzWyR7aW5kZXh9XS5QUk9EVUNUX1VOSURgO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgRFRPU2FsZXNJbmdyZWRpZW50c1ske2luZGV4fV0uSVRFTV9QRVJDRU5UYDtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gaXRlbS5wZXJjZW50LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChuYW1lUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQocGVyY2VudFByb3BlcnR5KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2syKGN1ckJ0bkRvbTogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBjdXJCdG5Eb20udmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhY3VsYXRlV2VpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2syKGN1ckJ0bkRvbTogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IGN1ckJ0bkRvbS52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYWN1bGF0ZVdlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldEludm9pY2VQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZMZWF2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZEZWZlY3RpdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mSW52b2ljZVByaWNlSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBmdW5jUnMyID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldERlbGl2ZXJ5UHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVHJhZmljVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mVHJhZmljRmVlSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAkLndoZW4oZnVuY1JzLCBmdW5jUnMyKS50aGVuKGZ1bmN0aW9uIChkYXRhLCBkYXRhMikge1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd0ludm9pY2VQcmljZS50ZXh0Q29udGVudCA9IGRhdGFbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd1RyYWZpY1ByaWNlLnRleHRDb250ZW50ID0gZGF0YTJbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzMyA9IHRoaXNPYmouU2FsZXNQcmljZUFQSS5HZXRSZWNlaXZlZFByaWNlKFxyXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcclxuICAgICAgICAgICAgICAgIGRhdGEyWzBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd1JlY2VpdmVkUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpc09iai5BY3R1YWxQcmljZV9ET00udmFsdWUgPSBkYXRhOyDmh4noqbLmiorkuIrov7DlgLwg6YO95bi25Zue5b6M56uv6YeN5paw6KiI566XXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIENhY3VsYXRlV2VpZ2h0KCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5EYXRhVGFibGVPYmoucm93cygpLmV2ZXJ5KGZ1bmN0aW9uIChyb3dJZHgsIHRhYmxlTG9vcCwgcm93TG9vcCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoaXNSb3cgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdGhpc1Jvd0RhdGEgPSB0aGlzUm93LmRhdGEoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBhYWJiID0gJChsYWxhWzFdKS5maW5kKCdzcGFuJyk7XHJcbiAgICAgICAgICAgIC8vdmFyIGxhbGF3ID0gYWFiYi50ZXh0LnRvU3RyaW5nKCkuc3BsaXQoXCIlXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSB0aGlzUm93RGF0YVsxXTtcclxuICAgICAgICAgICAgdmFyIG5vbWluYXRvclZhbCA9IHRlbXBEaXYucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQuc3BsaXQoXCIlXCIpWzBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNPYmouRGF0YVRhYmxlT2JqLnJvd3MoKS5kYXRhKCkudG9BcnJheSgpLmZvckVhY2gpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gdGhpc09iai5XZWlnaHRBUElDbGFzcy5HZXRQcm9wb3J0aW9uV2VpZ2h0KG5vbWluYXRvclZhbCwgdGhpc09iai5Eb21PZkxlYXZlV2VpZ2h0LnZhbHVlKTtcclxuICAgICAgICAgICAgLy8kLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3dEYXRhWzJdID0gYCR7ZGF0YX0ga2dgO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93LmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgLy8gICAgdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzEsICdkZXNjJ10pLmRyYXcoKTtcclxuICAgICAgICAgICAgLy8gICAgLy90aGlzT2JqLkRhdGFUYWJsZU9iai5zb3J0KFtbMTMsICdhc2MnXSwgWzEsICdhc2MnXV0pXHJcbiAgICAgICAgICAgIC8vICAgIC8vdGhpc09iai5EYXRhVGFibGVPYmouc29ydCgpXHJcbiAgICAgICAgICAgIC8vICAgIC8vdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzIsICdkZXNjJ10pLmRyYXcoKTtcclxuICAgICAgICAgICAgLy8gICAgLy9Td2FsLmZpcmUoJ0FueSBmb29sIGNhbiB1c2UgYSBjb21wdXRlcicpXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvZHVjdFVOSUQgPSB0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMyID0gdGhpc09iai5JbnZlbnRvcnlBUElDbGFzcy5HZXRJbnZlbnRvcnlXZWlnaHQocHJvZHVjdFVOSUQpO1xyXG4gICAgICAgICAgICAvLyQud2hlbihmdW5jUnMyKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3dEYXRhWzNdID0gYCR7ZGF0YX0ga2dgO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93LmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgLy8gICAgdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzEsICdkZXNjJ10pLmRyYXcoKTtcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLkludmVudG9yeUFQSUNsYXNzLkdldEludmVudG9yeVVuaXRQcmljZShwcm9kdWN0VU5JRCk7XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnM0ID0gdGhpc09iai5JbnZlbnRvcnlBUElDbGFzcy5HZXRJbnZlbnRvcnlNaW5Vbml0UHJpY2UocHJvZHVjdFVOSUQpO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzNSA9IHRoaXNPYmouSW52ZW50b3J5QVBJQ2xhc3MuR2V0SW52ZW50b3J5TWF4VW5pdFByaWNlKHByb2R1Y3RVTklEKTtcclxuICAgICAgICAgICAgLy8kLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93RGF0YVs0XSA9IGAke2RhdGF9IOWFgy9rZ2A7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3cuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzT2JqLkRhdGFUYWJsZU9iai5vcmRlcihbMSwgJ2Rlc2MnXSkuZHJhdygpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgLy9sZXQgcnNWYWwgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLnJvd3MoKS5ldmVyeShmdW5jdGlvbiAocm93SWR4LCB0YWJsZUxvb3AsIHJvd0xvb3ApIHtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgbGV0IGZ1bmNSczQgPSB0aGlzT2JqLkNvc3RBUElDbGFzcy5HZXRDb3N0VW5pdFByY2UoTnVtYmVyKG5vbWluYXRvclZhbCksIGRhdGEpO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAkLndoZW4oZnVuY1JzNCkudGhlbihmdW5jdGlvbiAoZGF0YTIpIHtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIHJzVmFsID0gcnNWYWwgKyBkYXRhMlxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgdGhpc09iai5EYXRhVGFibGVPYmouY29sdW1uKDQpLmZvb3RlcigpLmlubmVySFRNTCA9IHJzVmFsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIC8vdGhpc09iai5Db3N0QVBJQ2xhc3MuR2V0Q29zdFVuaXRQcmNlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIC8vJChhcGkuY29sdW1uKDQpLmZvb3RlcigpKS5odG1sXHJcbiAgICAgICAgICAgIC8vICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzLCBmdW5jUnMyLCBmdW5jUnMzLCBmdW5jUnM0LCBmdW5jUnM1KS50aGVuKGZ1bmN0aW9uIChkYXRhLCBkYXRhMiwgZGF0YTMsIGRhdGE0LCBkYXRhNSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpc1Jvd0RhdGFbMl0gPSBkYXRhWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRhdGEyXHJcbiAgICAgICAgICAgICAgICB0aGlzUm93RGF0YVszXSA9IGRhdGEyWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRhdGEzXHJcbiAgICAgICAgICAgICAgICB0aGlzUm93RGF0YVs0XSA9IGAoJHtkYXRhNFswXS50b0xvY2FsZVN0cmluZygnemgtVFcnKX1+JHtkYXRhNVswXS50b0xvY2FsZVN0cmluZygnemgtVFcnKX0pLCDlubPlnYcke2RhdGEzWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycpfSDlhYMva2dgO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNSb3cuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzIsICdkZXNjJ10pLmRyYXcoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9sZXQgZnVuY1JzID0gdGhpc09iai5Db3N0QVBJQ2xhc3MuR2V0Q29zdFVuaXRQcmNlKG5vbWluYXRvclZhbCwgdGhpc09iai5Eb21PZkxlYXZlV2VpZ2h0LnZhbHVlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLmRyYXcoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=