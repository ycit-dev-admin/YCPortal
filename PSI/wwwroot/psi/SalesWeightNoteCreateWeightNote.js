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
                $(api.column(6).footer()).html(sumAvg.toLocaleString('zh-TW', { maximumFractionDigits: 2 }) + " \u5143/kg");
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
            nameProperty.name = "DTOPSWreteOffRecords[" + index + "].PRODUCT_NAME";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "DTOPSWreteOffRecords[" + index + "].PRODUCT_UNID";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "DTOPSWreteOffRecords[" + index + "].PERCENT";
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
            var nowAllPercent = this._prodItemList.Data.map(function (item) { return item.percent; })
                .reduce(function (sum, num) { return sum + num; });
            if (nowAllPercent + 10 > 100) {
                Swal.fire({
                    icon: 'info',
                    //title: 'Oops...',
                    text: '加總比例已超過100%!!',
                    returnFocus: false
                    //focusConfirm: false
                });
                return;
            }
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
                thisRowData[4] = data4[0].toLocaleString('zh-TW') + " \u5143/kg";
                thisRowData[5] = data5[0].toLocaleString('zh-TW') + " \u5143/kg";
                thisRowData[6] = data3[0].toLocaleString('zh-TW', { maximumFractionDigits: 2 }) + " \u5143/kg";
                thisRow.invalidate();
                thisObj.DataTableObj.order([2, 'desc']).draw();
            });
            //let funcRs = thisObj.CostAPIClass.GetCostUnitPrce(nominatorVal, thisObj.DomOfLeaveWeight.value);
            //thisObj.DataTableObj.draw();
        });
    };
    return SalesWeightNoteCreateWeightNote;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQW1CSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBaEJ6QixrQkFBYSxHQUF5QixJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDL0QsMEJBQXFCLEdBQVcsZUFBZSxDQUFBO1FBQy9DLHlCQUFvQixHQUFXLGNBQWMsQ0FBQTtRQXVCdEQsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDRSxxQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBcUIsQ0FBQztRQUM5RSx5QkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFxQixDQUFDO1FBQ3RGLG1CQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7UUFDMUUseUJBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztRQUN0Riw0QkFBdUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFxQixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBdUIsQ0FBQztRQUM5RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUF1QixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQXVCLENBQUM7UUFDMUYsc0JBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7UUFDakYsbUJBQWMsR0FBRyxRQUFR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IFNhbGVzV2VpZ2h0Tm90ZUNyZWF0ZVdlaWdodE5vdGUge1xyXG4gICAgLy8gQmFzZSBQb3JwZXJpdGVzXHJcbiAgICByZWFkb25seSBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgX3Byb2RJdGVtTGlzdDogUHVyY2hhc2VQcm9kSXRlbUxpc3QgPSBuZXcgUHVyY2hhc2VQcm9kSXRlbUxpc3QoKTtcclxuICAgIHJlYWRvbmx5IE1pbnVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJtaW51cy1wZXJjZW50XCJcclxuICAgIHJlYWRvbmx5IFBsdXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcInBsdXMtcGVyY2VudFwiXHJcblxyXG4gICAgLy8gRm9yIFBvc3RcclxuXHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyAgXHJcbiAgICBwcml2YXRlIFNhbGVzUHJpY2VBUEk6IFNhbGVzUHJpY2VBUElDbGFzcztcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJDb250cmFjdEFQSTogQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBXZWlnaHRBUElDbGFzczogV2VpZ2h0QVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIEludmVudG9yeUFQSUNsYXNzOiBJbnZlbnRvcnlBUElDbGFzcztcclxuICAgIHByaXZhdGUgQ29zdEFQSUNsYXNzOiBDb3N0QVBJQ2xhc3M7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLlNhbGVzUHJpY2VBUEkgPSBuZXcgU2FsZXNQcmljZUFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5DdXN0b21lckNvbnRyYWN0QVBJID0gbmV3IEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuV2VpZ2h0QVBJQ2xhc3MgPSBuZXcgV2VpZ2h0QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkludmVudG9yeUFQSUNsYXNzID0gbmV3IEludmVudG9yeUFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5Db3N0QVBJQ2xhc3MgPSBuZXcgQ29zdEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRmllbGQgRG9tcyAqL1xyXG4gICAgLy9uZXdcclxuICAgIHB1YmxpYyBEb21PZkxlYXZlV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1NhbGVzV2VpZ2h0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkRlZmVjdGl2ZVdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdEZWZlY3RpdmVXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVW5pdFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1VuaXRQcmljZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUcmFmaWNVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVHJhZmljVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkludm9pY2VQcmljZUhhc1RheCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdJbnZvaWNlUHJpY2VIYXNUYXgnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVHJhZmljRmVlSGFzVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1RyYWZpY0ZlZUhhc1RheCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93UmVjZWl2ZWRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X3JlY2VpdmVkX3ByaWNlJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0ludm9pY2VQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X2ludm9pY2VfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93VHJhZmljUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvd190cmFmaWNfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDdXN0b21lclVOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ3VzdG9tZXJVTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDYXJOb1VOSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQ2FyTm9VTklEJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZSZWNlaXZlZFR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUmVjZWl2ZWRUeXBlJykgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZDcmVhdGVGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1mb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRm9ybUNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtX2NyZWF0ZScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHVibGljIERhdGFUYWJsZU9iaiA9ICQoJyNleGFtcGxlMScpLkRhdGFUYWJsZSh7XHJcbiAgICAgICAgZG9tOiAnJyxcclxuICAgICAgICBvcmRlcjogW1syLCBcImRlc2NcIl1dLFxyXG4gICAgICAgIGRyYXdDYWxsYmFjazogZnVuY3Rpb24gKG9TZXR0aW5ncykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhY2x1dGVScyA9IG9TZXR0aW5ncy5hb0RhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaXRlbS5fYURhdGFbMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9ICsodGVtcERpdi5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS50ZXh0Q29udGVudC5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgdW5pdFByaWNlID0gKygoaXRlbS5fYURhdGFbNF0gYXMgc3RyaW5nKS5yZXBsYWNlKFwi5YWDL2tnXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50ICogdW5pdFByaWNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1bUF2ZyA9IGNhY2x1dGVScy5sZW5ndGggPiAwID8gY2FjbHV0ZVJzLnJlZHVjZSgoc3VtLCBkYXRhKSA9PiBzdW0gKyBkYXRhKSA6IDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXBpID0gdGhpcy5hcGkoKTtcclxuICAgICAgICAgICAgLy9sZXQgcnNTdHIgPSBzdW1BdmcudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJyk7XHJcbiAgICAgICAgICAgIC8vbGV0IHJzU3RyID0gc3VtQXZnLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICQoYXBpLmNvbHVtbig2KS5mb290ZXIoKSkuaHRtbChgJHtzdW1BdmcudG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywgeyBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSl9IOWFgy9rZ2ApO1xyXG5cclxuICAgICAgICAgICAgLy9vU2V0dGluZ3MuYW9EYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIC8vICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaXRlbS5fYURhdGFbMV07XHJcbiAgICAgICAgICAgIC8vICAgIHZhciBwZXJjZW50ID0gKyh0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50LnJlcGxhY2UoXCIlXCIsIFwiXCIpKSAvIDEwMDtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHVuaXRQcmljZSA9ICsoKGl0ZW0uX2FEYXRhWzRdIGFzIHN0cmluZykucmVwbGFjZShcIuWFgy9rZ1wiLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIC8vICAgIHN1bUF2ZyA9IHN1bUF2ZyArIChwZXJjZW50ICogdW5pdFByaWNlKTtcclxuICAgICAgICAgICAgLy8gICAgLy9jb25zb2xlLmxvZyhgJHtpdGVtLl9hRGF0YVsxXX1fJHtpdGVtLl9hRGF0YVs0XX1gKTtcclxuICAgICAgICAgICAgLy8gICAgLy9zdW1BdmcgPSBzdW1BdmcgKyBpdGVtLl9hRGF0YVs0XTtcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9vdGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIChyb3csIGRhdGEsIHN0YXJ0LCBlbmQsIGRpc3BsYXkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcGkgPSB0aGlzLmFwaSgpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgaW50VmFsID0gZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHR5cGVvZiBpID09PSAnc3RyaW5nJyA/ICsoaS5yZXBsYWNlKFwi5YWDL2tnXCIsIFwiXCIpKSAqIDEgOiB0eXBlb2YgaSA9PT0gJ251bWJlcicgPyBpIDogMDtcclxuICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdG90YWwgPSBhcGlcclxuICAgICAgICAgICAgLy8gICAgLmNvbHVtbig0LCB7IHBhZ2U6IFwiY3VycmVudFwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5kYXRhKClcclxuICAgICAgICAgICAgLy8gICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coYGE9JHthfWApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coYGI9JHtifWApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9jb25zb2xlLmxvZyhgYVI9JHthLnJlcGxhY2UoXCLlhYMva2dcIiwgXCJcIil9YCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2NvbnNvbGUubG9nKGBiUj0ke2IucmVwbGFjZShcIuWFgy9rZ1wiLCBcIlwiKX1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3AucmVwbGFjZSgnZG9nJywgJ21vbmtleScpXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgbm9taW5hdG9yVmFsID0gKyh0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50LnNwbGl0KFwiJVwiKVswXSkgLyAxMDA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBpbnRWYWwoYSkgKyAobm9taW5hdG9yVmFsICogaW50VmFsKGIpKTtcclxuICAgICAgICAgICAgLy8gICAgfSwgMCk7XHJcblxyXG4gICAgICAgICAgICAvLy8vIFVwZGF0ZSBmb290ZXJcclxuICAgICAgICAgICAgLy8kKGFwaS5jb2x1bW4oNCkuZm9vdGVyKCkpLmh0bWwoYCR7dG90YWx9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29sdW1uczogW1xyXG4gICAgICAgIC8vICAgIG51bGwsXHJcbiAgICAgICAgLy8gICAgeyBvcmRlckRhdGFUeXBlOiAnZG9tLXRleHQnIH0sXHJcbiAgICAgICAgLy8gICAgbnVsbCxcclxuICAgICAgICAvLyAgICBudWxsLFxyXG4gICAgICAgIC8vICAgIG51bGxcclxuICAgICAgICAvLyAgICAvLyxcclxuICAgICAgICAvLyAgICAvL3sgb3JkZXJEYXRhVHlwZTogJ2RvbS10ZXh0JywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAvLyAgICAvL3sgb3JkZXJEYXRhVHlwZTogJ2RvbS1zZWxlY3QnIH0sXHJcbiAgICAgICAgLy9dXHJcbiAgICB9KTtcclxuICAgIC8vcHVibGljIGp1c3RGb3JtT2JqID0gbmV3IEp1c3RWYWxpZGF0ZSgnI2NyZWF0ZS1mb3JtJyxcclxuICAgIC8vICAgIHtcclxuICAgIC8vICAgICAgICBlcnJvckZpZWxkQ3NzQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICAgIC8vICAgICAgICBlcnJvckxhYmVsU3R5bGU6IHtcclxuICAgIC8vICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcclxuICAgIC8vICAgICAgICAgICAgY29sb3I6ICcjZGMzNTQ1JyxcclxuICAgIC8vICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgIGZvY3VzSW52YWxpZEZpZWxkOiB0cnVlLFxyXG4gICAgLy8gICAgICAgIGxvY2tGb3JtOiB0cnVlLFxyXG4gICAgLy8gICAgfSk7XHJcbiAgICAvL3B1YmxpYyBEYXRhVGFibGVPYmoyID0gJCgnI2V4YW1wbGUyJykuRGF0YVRhYmxlKHtcclxuICAgIC8vICAgIGRvbTogJycsXHJcbiAgICAvLyAgICBvcmRlcmluZzogZmFsc2VcclxuICAgIC8vfSk7XHJcblxyXG4gICAgLy8gb2xkXHJcbiAgICBwdWJsaWMgRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1zZWxlY3QtcHJvZGl0ZW0nKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkV2ZW5TaG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW5Qcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mT2RkTFNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2RkUHJvZHVjdExzJykgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRvdGFsUHJvZEl0ZW1JbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mSW5ncmVkaWVudFBvc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5ncmVkaWVudFBvc3QnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNvbnRyYWN0VU5JRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDb250cmFjdFVOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RXZWlnaHQnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0NvbnRyYWN0VW5pdFByaWNlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mTm93Q29udHJhY3RXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RXZWlnaHQnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ05vd0NvbnRyYWN0QWN0dWFsUHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIFBhZ2VQbHVnaW5Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcbiAgICAgICAgLyogUGFnZSBJbml0aWFsaXplICovXHJcbiAgICAgICAgLy8gU2VsZWN0MiBFbGVtZW50c1xyXG4gICAgICAgICQoJy5zZWxlY3QyYnM0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuiri+mBuOaTh1wiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWUsXHJcbiAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIuiri+mBuOaTh1wiXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vIGpxdWVyeSBkaWFsb2dcclxuICAgICAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvT3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgICAgIFwi6YCB5Ye6XCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjY3JlYXRlLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwi5Y+W5raIXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vIGpxdWVyeSBkYXRhdGFibGVcclxuICAgICAgICAvL3ZhciB0ID0gJCgnI2V4YW1wbGUnKS5EYXRhVGFibGUoKTtcclxuICAgICAgICAvL3ZhciBjb3VudGVyID0gMTtcclxuXHJcbiAgICAgICAgLy8kKCcjYWRkUm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgIHQucm93LmFkZChbY291bnRlciArICcuMScsIGNvdW50ZXIgKyAnLjInLCBjb3VudGVyICsgJy4zJywgY291bnRlciArICcuNCcsIGNvdW50ZXIgKyAnLjUnXSkuZHJhdyhmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vICAgIGNvdW50ZXIrKztcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGFkZCBhIGZpcnN0IHJvdyBvZiBkYXRhXHJcbiAgICAgICAgLy8gJCgnI2FkZFJvdycpLmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VFdmVudEluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICAvKiBQYWdlIEV2ZW50cyAqL1xyXG4gICAgICAgIC8vIOihqOWWruW7uueri1xyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mRm9ybUNyZWF0ZSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKFwib3BlblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWxlcnRpZnkuY29uZmlybSgnQ29uZmlybSBUaXRsZScsICdDb25maXJtIE1lc3NhZ2UnLCBmdW5jdGlvbiAoKSB7IGFsZXJ0aWZ5LnN1Y2Nlc3MoJ09rJykgfVxyXG4gICAgICAgICAgICAvLyAgICAsIGZ1bmN0aW9uICgpIHsgYWxlcnRpZnkuZXJyb3IoJ0NhbmNlbCcpIH0pO1xyXG4gICAgICAgICAgICAvL2xldCBjYXQgPSBuZXcgSnVzdFZhbGlkYXRlKCcjY3JlYXRlLWZvcm0nKTtcclxuXHJcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+eiuuWumuW7uueri+WHuuiyqOWWruWXjj8nLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICflu7rnq4snLFxyXG4gICAgICAgICAgICAgICAgc2hvd0RlbnlCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkZW55QnV0dG9uVGV4dDogYOWPlua2iGAsXHJcbiAgICAgICAgICAgICAgICByZXR1cm5Gb2N1czogZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vZm9jdXNDb25maXJtOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLyogUmVhZCBtb3JlIGFib3V0IGlzQ29uZmlybWVkLCBpc0RlbmllZCBiZWxvdyAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGUtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VyT2JqLmp1c3RGb3JtT2JqLnJldmFsaWRhdGUoKS50aGVuKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtZm9ybVwiKSBhcyBIVE1MRm9ybUVsZW1lbnQpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vY3VyT2JqLmp1c3RGb3JtT2JqLnNob3dFcnJvcnMoeyAnI0N1c3RvbWVyVU5JRCc6ICdUaGUgZW1haWwgaXMgaW52YWxpZCcgfSlcclxuICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQuaXNEZW5pZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1N3YWwuZmlyZSgnQ2hhbmdlcyBhcmUgbm90IHNhdmVkJywgJycsICdpbmZvJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy9Td2FsLmZpcmUoXCJoYWhhXCIpXHJcbiAgICAgICAgICAgIC8vU3dhbC5maXJlKFxyXG4gICAgICAgICAgICAvLyAgICAnR29vZCBqb2IhJyxcclxuICAgICAgICAgICAgLy8gICAgJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyxcclxuICAgICAgICAgICAgLy8gICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgIC8vKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDlh7rosqjlsI3osaFcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELm9wdGlvbnNbY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklELnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldFNhbGVzQ29udHJhY3RzQnlDdXN0b21lclVOSUQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5SZVNldENvbnRyYWN0SXRlbXMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOmHjeaWsOaVtOeQhueahOaEj+aAnVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vJChjdXJPYmouRG9tT2ZDYXJOb1VOSUQpLnRyaWdnZXIoXCJjaGFuZ2VcIik7ICAvLyDliqDpgJnlgIvlrqLmiLbou4rniYzmiY3mnIPliKTmlrcg5piv5ZCm6YG45YiwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlrqLmiLbou4rniYxcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNhck5vVU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g6YCy6LKo5ZOB6aCFXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB1c1Byb2RJdGVtRG9tcyA9ICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTE9wdGlvbkVsZW1lbnRbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZXLmiYDpgbhcclxuICAgICAgICAgICAgdXNQcm9kSXRlbURvbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5fcHJvZEl0ZW1MaXN0LkFwcGVuZChpdGVtLnZhbHVlLCBpdGVtLnRleHQpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8g6KaB5Yiq6Zmk55qEXHJcbiAgICAgICAgICAgIGN1ck9iai5fcHJvZEl0ZW1MaXN0LkRhdGEuZmlsdGVyKHNob3dJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhKHVzUHJvZEl0ZW1Eb21zLm1hcCh1c0l0ZW0gPT4gdXNJdGVtLnZhbHVlKS5pbmNsdWRlcyhzaG93SXRlbS5wcm9kSWQpKTtcclxuICAgICAgICAgICAgfSkuZm9yRWFjaChzaG93SXRlbSA9PiBjdXJPYmouX3Byb2RJdGVtTGlzdC5SZW1vdmVCeVByb2RJZChzaG93SXRlbS5wcm9kSWQpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBhZ2VNYWluLlByb2RMaXN0LlJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICAgICAgY3VyT2JqLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgICAgICBjdXJPYmouQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlop7liqAt6YCy6LKo5ZOB6aCF55m+5YiG5q+UXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS5vbignY2xpY2snLCBgLiR7Y3VyT2JqLlBsdXNQZXJjZW50Q2xhc3NOYW1lfWAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLlBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2syKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5rib5bCRLemAsuiyqOWTgemgheeZvuWIhuavlFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3JlYXRlRm9ybSkub24oJ2NsaWNrJywgYC4ke2N1ck9iai5NaW51c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2syKCQodGhpcykuZ2V0KDApKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mTGVhdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlV2VpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkludm9pY2VQcmljZUhhc1RheCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVHJhZmljRmVlSGFzVGF4KS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZEZWZlY3RpdmVXZWlnaHQpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZlRyYWZpY1VuaXRQcmljZSkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNvbnRyYWN0VU5JRCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ1VOSUQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVU5JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNScyA9IGN1ck9iai5DdXN0b21lckNvbnRyYWN0QVBJLkdldENvbnRyYWN0SXRlbXNCeShhcmdVTklELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxVbml0UHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS50cmlnZ2VyKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJnVU5JRCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChhcmdVTklEKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVmFsaWRhdGVJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcbiAgICAgICAgLy8gRm9ybSBWYWxpZGF0aW9uXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgLy9hbGVydChcIumggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9Td2FsLmZpcmUoXCLpoIHpnaLos4foqIrloavlr6vkuI3lrozmlbTvvIzoq4vmqqLmn6XpoIHpnaLoqIrmga8hIVwiLCBcIlwiLCBcImluZm9cIilcclxuXHJcbiAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdpbmZvJyxcclxuICAgICAgICAgICAgICAgICAgICAvL3RpdGxlOiAnT29wcy4uLicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+mggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhJyxcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5Gb2N1czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvL2ZvY3VzQ29uZmlybTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpZ25vcmU6IFwiXCIsIC8vIOimgeaqouafpUhpZGRlbuashOS9jeimgeWKoOmAmeWAi1xyXG4gICAgICAgICAgICBydWxlczoge1xyXG4gICAgICAgICAgICAgICAgQ3VzdG9tZXJVTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBDYXJOb1VOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIEV4Y2F2YXRvck9wZXJVTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodFRpbWU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8vUHJvZHVjdEl0ZW1VTklEOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICBVU1Byb2RMaXN0OiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvL1JlY2VpdmVkVGltZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLy9SZWNlaXZlZFR5cGU6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8qICAgICBTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zOiBcInJlcXVpcmVkXCIsKi9cclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8sIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvMHxeXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC9eKFsxLTldWzAtOV0qKFxcLlswLTldezEsMn0pP3wwXFwuKD8hMCskKVswLTldezEsMn0pJC8gIC8vIOagvOW8j+S4jeespu+8jOmcgOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbghIVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9UcmFmaWNVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogL14oWzAtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8562J5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcblxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9SZW1hcms6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUub3B0aW9uc1tjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUuc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS52YWx1ZSAmJiBzZWxlY3RlZFZhbHVlICE9PSBcIjFcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgLy9cIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZS5BY3R1YWxQcmljZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC9eXFwrP1sxLTldWzAtOV0qJC8gIC8vIOWkp+aWvDDnmoTmraPmlbTmlbhcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8sIERlZmVjdGl2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrzmiJbnrYnmlrww55qE5q2j5pW05pW4XCJcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vVW5pdFByaWNlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvDDmlbTmlbgg5LiUIOacgOWkmjLkvY3lsI/mlbhcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9UcmFmaWNVbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1RoaXJkV2VpZ2h0RmVlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9SZW1hcms6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiBcIuS7mOePvuS7peWklueahOS7mOasvuaWueW8j+iri+WLmeW/heWhq+Wvq+WCmeiou1wiXHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXHJcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoZXJyb3IsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yLmFkZENsYXNzKCdpbnZhbGlkLWZlZWRiYWNrJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYXBwZW5kKGVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1bmhpZ2hsaWdodDogZnVuY3Rpb24gKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVmFsaWRhdGVJbml0VjIoKSB7XHJcblxyXG5cclxuICAgICAgICAvL3RoaXMuanVzdEZvcm1PYmouYWRkRmllbGQoJyNDdXN0b21lclVOSUQnLCBbXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBydWxlOiAncmVxdWlyZWQnLFxyXG4gICAgICAgIC8vICAgICAgICBlcnJvck1lc3NhZ2U6ICdsdWxhbGEnXHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vXSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQ2xhc3MgVmFyaWFibGUgKi9cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCBKcURvbU9mQ2FyTm9VTklEID0gJCh0aGlzLkRvbU9mQ2FyTm9VTklEKTtcclxuXHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEpxRG9tT2ZDYXJOb1VOSUQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmNhck5vVU5JRCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlU2V0Q29udHJhY3RJdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCBKcURvbU9mQ29udHJhY3RVTklEID0gJCh0aGlzLkRvbU9mQ29udHJhY3RVTklEKTtcclxuXHJcbiAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5odG1sKCcnKTsgIC8vIOmBuOmghea4heepulxyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIlwiLCBcIlwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jb250cmFjdE5hbWUsIGl0ZW0uY29udHJhY3RHVUlELCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1VTUHJvZEl0ZW1zKCkge1xyXG4gICAgICAgIC8vbGV0IGV2ZW5TaG93VWxEb20gPSB0aGlzLkRvbU9mRXZlblNob3c7XHJcbiAgICAgICAgLy9sZXQgb2RkU2hvd1VsRG9tID0gdGhpcy5Eb21PZk9kZExTaG93O1xyXG4gICAgICAgIC8vZXZlblNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIC8vb2RkU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIHRoaXMuRGF0YVRhYmxlT2JqLmNsZWFyKCkuZHJhdygpO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuTWludXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgIC8vY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgICAgICAgICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuUGx1c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgICAgICAgICAgLy9jb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICAvL2xpVGFnLmRhdGFzZXQudGV4dCA9IGl0ZW0ucHJvZFRleHQ7XHJcbiAgICAgICAgICAgIC8vbGlUYWcudGV4dENvbnRlbnQgPSBgJHtpdGVtLnByb2RUZXh0fSBcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIC8vbGlUYWcuZGF0YXNldC52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICAvLy8vIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IHRoaXMuX3Byb2RJdGVtTGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICAgICAgICAgIC8vc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0ucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICAvL2xpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICAgICAgICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICAgICAgICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG5cclxuICAgICAgICAgICAgLy9pbmRleCAlIDIgPT09IDAgPyBldmVuU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKSA6XHJcbiAgICAgICAgICAgIC8vICAgIG9kZFNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZyk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gdmVyMlxyXG4gICAgICAgICAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgICAgICAgICBzcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGA7XHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3QgaU1pbnVzVGFnMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcyLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZzIuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzXCIpO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZzIuY2xhc3NMaXN0LmFkZCh0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBidG5NaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGJ0bk1pbnVzVGFnLmFwcGVuZChpTWludXNUYWcyKTtcclxuICAgICAgICAgICAgYnRuTWludXNUYWcudHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgICAgICAgIGJ0bk1pbnVzVGFnLnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGJ0bk1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tY2lyY2xlXCIsIFwiYnRuLXByaW1hcnlcIiwgdGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpOyAgLy8g5Ye66JmVIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMTE1OTk4L2lzLXRoZXJlLWEtd2F5LXRvLWFkZC1yZW1vdmUtc2V2ZXJhbC1jbGFzc2VzLWluLW9uZS1zaW5nbGUtaW5zdHJ1Y3Rpb24td2l0aC1jbGFzXHJcbiAgICAgICAgICAgIGNvbnN0IGlQbHVzVGFnMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZzIuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcyLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzXCIpO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnMi5jbGFzc0xpc3QuYWRkKHRoaXMuUGx1c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBsZXQgYnRuUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGJ0blBsdXNUYWcudHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgICAgICAgICAgIGJ0blBsdXNUYWcuYXBwZW5kKGlQbHVzVGFnMik7XHJcbiAgICAgICAgICAgIGJ0blBsdXNUYWcudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgYnRuUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiYnRuXCIsIFwiYnRuLWNpcmNsZVwiLCBcImJ0bi1kYW5nZXJcIiwgdGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7ICAvLyDlh7romZUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExMTU5OTgvaXMtdGhlcmUtYS13YXktdG8tYWRkLXJlbW92ZS1zZXZlcmFsLWNsYXNzZXMtaW4tb25lLXNpbmdsZS1pbnN0cnVjdGlvbi13aXRoLWNsYXNcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5EYXRhVGFibGVPYmoucm93LmFkZChbaXRlbS5wcm9kVGV4dCxcclxuICAgICAgICAgICAgYCR7YnRuTWludXNUYWcub3V0ZXJIVE1MfSR7c3BhblRhZy5vdXRlckhUTUx9JHtidG5QbHVzVGFnLm91dGVySFRNTH1gLFxyXG4gICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICcnLFxyXG4gICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAnJ10pLmRyYXcoZmFsc2UpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLlNob3dQcm9kSXRlbVN1bW1hcnkoKTtcclxuICAgICAgICB0aGlzLkNhY3VsYXRlV2VpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93UHJvZEl0ZW1TdW1tYXJ5KCkge1xyXG4gICAgICAgIGxldCBhbGxQZXJjZW50ID0gMDtcclxuICAgICAgICBsZXQgbWF4SXRlbTogUHVyY2hhc2VQcm9kSXRlbTtcclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0ucGVyY2VudCArIGFsbFBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0ucGVyY2VudCA+ICtpdGVtLnBlcmNlbnQgPyBtYXhJdGVtIDogaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHt0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5sZW5ndGh96aCFYDtcclxuICAgICAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICAgICAgaWYgKGFsbFBlcmNlbnQgPiAxMDApXHJcbiAgICAgICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICByZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MID0gYOiqjeWIl+mgheebriA6ICR7bWF4SXRlbT8ucHJvZFRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc3VtbWFyeUluZm8gPSBgJHtyZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MfSR7aXRlbVNwYW4uaW5uZXJIVE1MfSR7cGVyY2VudFNwYW4uaW5uZXJIVE1MfWA7XHJcblxyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChyZWNvZ25pdGlvblNwYW4pO1xyXG4gICAgICAgIHRoaXMuRG9tT2ZUb3RhbFByb2RJdGVtSW5mby5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHBlcmNlbnRTcGFuKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIEJpbmRJbmdyZWRpZW50VG9Eb20oKSB7XHJcbiAgICAgICAgbGV0IHBvc3REaXYgPSB0aGlzLkRvbU9mSW5ncmVkaWVudFBvc3Q7XHJcblxyXG4gICAgICAgIHBvc3REaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGhpZGRlbiBpbnB1dCBlbGVtZW50LCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaTpcclxuICAgICAgICAgICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBEVE9QU1dyZXRlT2ZmUmVjb3Jkc1ske2luZGV4fV0uUFJPRFVDVF9OQU1FYDtcclxuICAgICAgICAgICAgbmFtZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kVGV4dFxyXG4gICAgICAgICAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYERUT1BTV3JldGVPZmZSZWNvcmRzWyR7aW5kZXh9XS5QUk9EVUNUX1VOSURgO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgRFRPUFNXcmV0ZU9mZlJlY29yZHNbJHtpbmRleH1dLlBFUkNFTlRgO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudmFsdWUgPSBpdGVtLnBlcmNlbnQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHZhbHVlUHJvcGVydHkpO1xyXG4gICAgICAgICAgICBwb3N0RGl2LmFwcGVuZChwZXJjZW50UHJvcGVydHkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTAgPiAxMDAgPyAxMDAgOiBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljazIoY3VyQnRuRG9tOiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IGN1ckJ0bkRvbS52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBub3dBbGxQZXJjZW50ID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEubWFwKGl0ZW0gPT4gaXRlbS5wZXJjZW50KVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoc3VtLCBudW0pID0+IHN1bSArIG51bSk7XHJcbiAgICAgICAgICAgIGlmIChub3dBbGxQZXJjZW50ICsgMTAgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2luZm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGl0bGU6ICdPb3BzLi4uJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Yqg57i95q+U5L6L5bey6LaF6YGOMTAwJSEhJyxcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5Gb2N1czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvL2ZvY3VzQ29uZmlybTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMCA+IDEwMCA/IDEwMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYWN1bGF0ZVdlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwIDwgMCA/IDAgOiBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrMihjdXJCdG5Eb206IEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBjdXJCdG5Eb20udmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwIDwgMCA/IDAgOiBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FjdWxhdGVXZWlnaHQoKTtcclxuICAgICAgICB0aGlzLlNob3dVU1Byb2RJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuQmluZEluZ3JlZGllbnRUb0RvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZ1bmNScyA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXRJbnZvaWNlUHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mRGVmZWN0aXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlVuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZkludm9pY2VQcmljZUhhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXMuU2FsZXNQcmljZUFQSS5HZXREZWxpdmVyeVByaWNlKFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZkxlYXZlV2VpZ2h0LnZhbHVlLFxyXG4gICAgICAgICAgICArdGhpcy5Eb21PZlRyYWZpY1VuaXRQcmljZS52YWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5Eb21PZlRyYWZpY0ZlZUhhc1RheC5jaGVja2VkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIpIHtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dJbnZvaWNlUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dUcmFmaWNQcmljZS50ZXh0Q29udGVudCA9IGRhdGEyWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1RXRCcsIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczMgPSB0aGlzT2JqLlNhbGVzUHJpY2VBUEkuR2V0UmVjZWl2ZWRQcmljZShcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgICBkYXRhMlswXVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNSczMpLnRoZW4oZnVuY3Rpb24gKGRhdGE6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5Eb21PZlNob3dSZWNlaXZlZFByaWNlLnRleHRDb250ZW50ID0gZGF0YS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXNPYmouQWN0dWFsUHJpY2VfRE9NLnZhbHVlID0gZGF0YTsg5oeJ6Kmy5oqK5LiK6L+w5YC8IOmDveW4tuWbnuW+jOerr+mHjeaWsOioiOeul1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBDYWN1bGF0ZVdlaWdodCgpIHtcclxuICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXMuRGF0YVRhYmxlT2JqLnJvd3MoKS5ldmVyeShmdW5jdGlvbiAocm93SWR4LCB0YWJsZUxvb3AsIHJvd0xvb3ApIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGlzUm93ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHRoaXNSb3dEYXRhID0gdGhpc1Jvdy5kYXRhKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgYWFiYiA9ICQobGFsYVsxXSkuZmluZCgnc3BhbicpO1xyXG4gICAgICAgICAgICAvL3ZhciBsYWxhdyA9IGFhYmIudGV4dC50b1N0cmluZygpLnNwbGl0KFwiJVwiKVswXTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gdGhpc1Jvd0RhdGFbMV07XHJcbiAgICAgICAgICAgIHZhciBub21pbmF0b3JWYWwgPSB0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50LnNwbGl0KFwiJVwiKVswXTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2xldCB1c1Byb2RJdGVtRG9tcyA9ICQoY3VyT2JqLkRvbU9mVXNlclNlbGVjdFByb2RpdGVtKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTE9wdGlvbkVsZW1lbnRbXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzT2JqLkRhdGFUYWJsZU9iai5yb3dzKCkuZGF0YSgpLnRvQXJyYXkoKS5mb3JFYWNoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGZ1bmNScyA9IHRoaXNPYmouV2VpZ2h0QVBJQ2xhc3MuR2V0UHJvcG9ydGlvbldlaWdodChub21pbmF0b3JWYWwsIHRoaXNPYmouRG9tT2ZMZWF2ZVdlaWdodC52YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93RGF0YVsyXSA9IGAke2RhdGF9IGtnYDtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvdy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNPYmouRGF0YVRhYmxlT2JqLm9yZGVyKFsxLCAnZGVzYyddKS5kcmF3KCk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vdGhpc09iai5EYXRhVGFibGVPYmouc29ydChbWzEzLCAnYXNjJ10sIFsxLCAnYXNjJ11dKVxyXG4gICAgICAgICAgICAvLyAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLnNvcnQoKVxyXG4gICAgICAgICAgICAvLyAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLm9yZGVyKFsyLCAnZGVzYyddKS5kcmF3KCk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vU3dhbC5maXJlKCdBbnkgZm9vbCBjYW4gdXNlIGEgY29tcHV0ZXInKVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb2R1Y3RVTklEID0gdGVtcERpdi5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzMiA9IHRoaXNPYmouSW52ZW50b3J5QVBJQ2xhc3MuR2V0SW52ZW50b3J5V2VpZ2h0KHByb2R1Y3RVTklEKTtcclxuICAgICAgICAgICAgLy8kLndoZW4oZnVuY1JzMikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93RGF0YVszXSA9IGAke2RhdGF9IGtnYDtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvdy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNPYmouRGF0YVRhYmxlT2JqLm9yZGVyKFsxLCAnZGVzYyddKS5kcmF3KCk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMzID0gdGhpc09iai5JbnZlbnRvcnlBUElDbGFzcy5HZXRJbnZlbnRvcnlVbml0UHJpY2UocHJvZHVjdFVOSUQpO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzNCA9IHRoaXNPYmouSW52ZW50b3J5QVBJQ2xhc3MuR2V0SW52ZW50b3J5TWluVW5pdFByaWNlKHByb2R1Y3RVTklEKTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczUgPSB0aGlzT2JqLkludmVudG9yeUFQSUNsYXNzLkdldEludmVudG9yeU1heFVuaXRQcmljZShwcm9kdWN0VU5JRCk7XHJcbiAgICAgICAgICAgIC8vJC53aGVuKGZ1bmNSczMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvd0RhdGFbNF0gPSBgJHtkYXRhfSDlhYMva2dgO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzUm93LmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgLy8gICAgdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzEsICdkZXNjJ10pLmRyYXcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC8vbGV0IHJzVmFsID0gMDtcclxuICAgICAgICAgICAgLy8gICAgLy90aGlzT2JqLkRhdGFUYWJsZU9iai5yb3dzKCkuZXZlcnkoZnVuY3Rpb24gKHJvd0lkeCwgdGFibGVMb29wLCByb3dMb29wKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIGxldCBmdW5jUnM0ID0gdGhpc09iai5Db3N0QVBJQ2xhc3MuR2V0Q29zdFVuaXRQcmNlKE51bWJlcihub21pbmF0b3JWYWwpLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgJC53aGVuKGZ1bmNSczQpLnRoZW4oZnVuY3Rpb24gKGRhdGEyKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICByc1ZhbCA9IHJzVmFsICsgZGF0YTJcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIHRoaXNPYmouRGF0YVRhYmxlT2JqLmNvbHVtbig0KS5mb290ZXIoKS5pbm5lckhUTUwgPSByc1ZhbC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAvL3RoaXNPYmouQ29zdEFQSUNsYXNzLkdldENvc3RVbml0UHJjZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAvLyQoYXBpLmNvbHVtbig0KS5mb290ZXIoKSkuaHRtbFxyXG4gICAgICAgICAgICAvLyAgICAvL30pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNScywgZnVuY1JzMiwgZnVuY1JzMywgZnVuY1JzNCwgZnVuY1JzNSkudGhlbihmdW5jdGlvbiAoZGF0YSwgZGF0YTIsIGRhdGEzLCBkYXRhNCwgZGF0YTUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRhdGFcclxuICAgICAgICAgICAgICAgIHRoaXNSb3dEYXRhWzJdID0gZGF0YVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkYXRhMlxyXG4gICAgICAgICAgICAgICAgdGhpc1Jvd0RhdGFbM10gPSBkYXRhMlswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkYXRhM1xyXG4gICAgICAgICAgICAgICAgdGhpc1Jvd0RhdGFbNF0gPSBgJHtkYXRhNFswXS50b0xvY2FsZVN0cmluZygnemgtVFcnKX0g5YWDL2tnYDtcclxuICAgICAgICAgICAgICAgIHRoaXNSb3dEYXRhWzVdID0gYCR7ZGF0YTVbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJyl9IOWFgy9rZ2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzUm93RGF0YVs2XSA9IGAke2RhdGEzWzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHsgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pfSDlhYMva2dgO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNSb3cuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5EYXRhVGFibGVPYmoub3JkZXIoWzIsICdkZXNjJ10pLmRyYXcoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9sZXQgZnVuY1JzID0gdGhpc09iai5Db3N0QVBJQ2xhc3MuR2V0Q29zdFVuaXRQcmNlKG5vbWluYXRvclZhbCwgdGhpc09iai5Eb21PZkxlYXZlV2VpZ2h0LnZhbHVlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLmRyYXcoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=