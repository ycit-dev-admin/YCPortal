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
                    var unitPrice = +(item._aData[6].replace("元/kg", ""));
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
        this._prodItemList.Data.sort(function (x, y) { return y.percent - x.percent; }); // 排序大排前面  https://www.w3schools.com/jsref/jsref_sort.asp
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
            var funcRs = thisObj.WeightAPIClass.GetProportionWeight(+nominatorVal, +thisObj.DomOfLeaveWeight.value);
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
            var funcRs3 = thisObj.InventoryAPIClass.GetInventoryAvgUnitPrice(productUNID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQW1CSSx5Q0FBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBaEJ6QixrQkFBYSxHQUF5QixJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDL0QsMEJBQXFCLEdBQVcsZUFBZSxDQUFBO1FBQy9DLHlCQUFvQixHQUFXLGNBQWMsQ0FBQTtRQXVCdEQsZ0JBQWdCO1FBQ2hCLEtBQUs7UUFDRSxxQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBcUIsQ0FBQztRQUM5RSx5QkFBb0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFxQixDQUFDO1FBQ3RGLG1CQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7UUFDMUUseUJBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztRQUN0Riw0QkFBdUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFxQixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDdEYsMkJBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBdUIsQ0FBQztRQUM5RiwwQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUF1QixDQUFDO1FBQzVGLHlCQUFvQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQXVCLENBQUM7UUFDMUYsc0JBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7UUFDakYsbUJBQWMsR0FBRyxRQUFR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QUMsSUFBSSxFQUFFLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7WUFHSCxrR0FBa0c7WUFHbEcsOEJBQThCO1FBRWxDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHNDQUFDO0FBQUQsQ0FBQyxBQS95QkQsSUEreUJDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2FsZXNXZWlnaHROb3RlQ3JlYXRlV2VpZ2h0Tm90ZSB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBfcHJvZEl0ZW1MaXN0OiBQdXJjaGFzZVByb2RJdGVtTGlzdCA9IG5ldyBQdXJjaGFzZVByb2RJdGVtTGlzdCgpO1xyXG4gICAgcmVhZG9ubHkgTWludXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcIm1pbnVzLXBlcmNlbnRcIlxyXG4gICAgcmVhZG9ubHkgUGx1c1BlcmNlbnRDbGFzc05hbWU6IHN0cmluZyA9IFwicGx1cy1wZXJjZW50XCJcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHByaXZhdGUgU2FsZXNQcmljZUFQSTogU2FsZXNQcmljZUFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBDdXN0b21lckNvbnRyYWN0QVBJOiBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3M7XHJcbiAgICBwcml2YXRlIFdlaWdodEFQSUNsYXNzOiBXZWlnaHRBUElDbGFzcztcclxuICAgIHByaXZhdGUgSW52ZW50b3J5QVBJQ2xhc3M6IEludmVudG9yeUFQSUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBDb3N0QVBJQ2xhc3M6IENvc3RBUElDbGFzcztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuU2FsZXNQcmljZUFQSSA9IG5ldyBTYWxlc1ByaWNlQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQ29udHJhY3RBUEkgPSBuZXcgQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzKHRoaXMuQmFzZVVybCk7XHJcbiAgICAgICAgdGhpcy5XZWlnaHRBUElDbGFzcyA9IG5ldyBXZWlnaHRBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuSW52ZW50b3J5QVBJQ2xhc3MgPSBuZXcgSW52ZW50b3J5QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgICAgICB0aGlzLkNvc3RBUElDbGFzcyA9IG5ldyBDb3N0QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBGaWVsZCBEb21zICovXHJcbiAgICAvL25ld1xyXG4gICAgcHVibGljIERvbU9mTGVhdmVXZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2FsZXNXZWlnaHQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRGVmZWN0aXZlV2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0RlZmVjdGl2ZVdlaWdodCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZVbml0UHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVW5pdFByaWNlJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlRyYWZpY1VuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUcmFmaWNVbml0UHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mSW52b2ljZVByaWNlSGFzVGF4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ludm9pY2VQcmljZUhhc1RheCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZUcmFmaWNGZWVIYXNUYXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVHJhZmljRmVlSGFzVGF4JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dSZWNlaXZlZFByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfcmVjZWl2ZWRfcHJpY2UnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZTaG93SW52b2ljZVByaWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dfaW52b2ljZV9wcmljZScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dUcmFmaWNQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93X3RyYWZpY19wcmljZScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkN1c3RvbWVyVU5JRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDdXN0b21lclVOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNhck5vVU5JRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDYXJOb1VOSUQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlJlY2VpdmVkVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdSZWNlaXZlZFR5cGUnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZkNyZWF0ZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWZvcm0nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZGb3JtQ3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1fY3JlYXRlJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRGF0YVRhYmxlT2JqID0gJCgnI2V4YW1wbGUxJykuRGF0YVRhYmxlKHtcclxuICAgICAgICBkb206ICcnLFxyXG4gICAgICAgIG9yZGVyOiBbWzIsIFwiZGVzY1wiXV0sXHJcbiAgICAgICAgZHJhd0NhbGxiYWNrOiBmdW5jdGlvbiAob1NldHRpbmdzKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FjbHV0ZVJzID0gb1NldHRpbmdzLmFvRGF0YS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBpdGVtLl9hRGF0YVsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gKyh0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLnRleHRDb250ZW50LnJlcGxhY2UoXCIlXCIsIFwiXCIpKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHZhciB1bml0UHJpY2UgPSArKChpdGVtLl9hRGF0YVs2XSBhcyBzdHJpbmcpLnJlcGxhY2UoXCLlhYMva2dcIiwgXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQgKiB1bml0UHJpY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VtQXZnID0gY2FjbHV0ZVJzLmxlbmd0aCA+IDAgPyBjYWNsdXRlUnMucmVkdWNlKChzdW0sIGRhdGEpID0+IHN1bSArIGRhdGEpIDogMDtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcGkgPSB0aGlzLmFwaSgpO1xyXG4gICAgICAgICAgICAvL2xldCByc1N0ciA9IHN1bUF2Zy50b0xvY2FsZVN0cmluZygnemgtVFcnKTtcclxuICAgICAgICAgICAgLy9sZXQgcnNTdHIgPSBzdW1BdmcudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgJChhcGkuY29sdW1uKDYpLmZvb3RlcigpKS5odG1sKGAke3N1bUF2Zy50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KX0g5YWDL2tnYCk7XHJcblxyXG4gICAgICAgICAgICAvL29TZXR0aW5ncy5hb0RhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgLy8gICAgdGVtcERpdi5pbm5lckhUTUwgPSBpdGVtLl9hRGF0YVsxXTtcclxuICAgICAgICAgICAgLy8gICAgdmFyIHBlcmNlbnQgPSArKHRlbXBEaXYucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQucmVwbGFjZShcIiVcIiwgXCJcIikpIC8gMTAwO1xyXG4gICAgICAgICAgICAvLyAgICB2YXIgdW5pdFByaWNlID0gKygoaXRlbS5fYURhdGFbNF0gYXMgc3RyaW5nKS5yZXBsYWNlKFwi5YWDL2tnXCIsIFwiXCIpKTtcclxuICAgICAgICAgICAgLy8gICAgc3VtQXZnID0gc3VtQXZnICsgKHBlcmNlbnQgKiB1bml0UHJpY2UpO1xyXG4gICAgICAgICAgICAvLyAgICAvL2NvbnNvbGUubG9nKGAke2l0ZW0uX2FEYXRhWzFdfV8ke2l0ZW0uX2FEYXRhWzRdfWApO1xyXG4gICAgICAgICAgICAvLyAgICAvL3N1bUF2ZyA9IHN1bUF2ZyArIGl0ZW0uX2FEYXRhWzRdO1xyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb290ZXJDYWxsYmFjazogZnVuY3Rpb24gKHJvdywgZGF0YSwgc3RhcnQsIGVuZCwgZGlzcGxheSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGFwaSA9IHRoaXMuYXBpKCk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBpbnRWYWwgPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdHlwZW9mIGkgPT09ICdzdHJpbmcnID8gKyhpLnJlcGxhY2UoXCLlhYMva2dcIiwgXCJcIikpICogMSA6IHR5cGVvZiBpID09PSAnbnVtYmVyJyA/IGkgOiAwO1xyXG4gICAgICAgICAgICAvL307XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b3RhbCA9IGFwaVxyXG4gICAgICAgICAgICAvLyAgICAuY29sdW1uKDQsIHsgcGFnZTogXCJjdXJyZW50XCIgfSlcclxuICAgICAgICAgICAgLy8gICAgLmRhdGEoKVxyXG4gICAgICAgICAgICAvLyAgICAucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhgYT0ke2F9YCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhgYj0ke2J9YCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2NvbnNvbGUubG9nKGBhUj0ke2EucmVwbGFjZShcIuWFgy9rZ1wiLCBcIlwiKX1gKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vY29uc29sZS5sb2coYGJSPSR7Yi5yZXBsYWNlKFwi5YWDL2tnXCIsIFwiXCIpfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIC8vcC5yZXBsYWNlKCdkb2cnLCAnbW9ua2V5JylcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gZGF0YVswXTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBub21pbmF0b3JWYWwgPSArKHRlbXBEaXYucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQuc3BsaXQoXCIlXCIpWzBdKSAvIDEwMDtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIGludFZhbChhKSArIChub21pbmF0b3JWYWwgKiBpbnRWYWwoYikpO1xyXG4gICAgICAgICAgICAvLyAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gVXBkYXRlIGZvb3RlclxyXG4gICAgICAgICAgICAvLyQoYXBpLmNvbHVtbig0KS5mb290ZXIoKSkuaHRtbChgJHt0b3RhbH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb2x1bW5zOiBbXHJcbiAgICAgICAgLy8gICAgbnVsbCxcclxuICAgICAgICAvLyAgICB7IG9yZGVyRGF0YVR5cGU6ICdkb20tdGV4dCcgfSxcclxuICAgICAgICAvLyAgICBudWxsLFxyXG4gICAgICAgIC8vICAgIG51bGwsXHJcbiAgICAgICAgLy8gICAgbnVsbFxyXG4gICAgICAgIC8vICAgIC8vLFxyXG4gICAgICAgIC8vICAgIC8veyBvcmRlckRhdGFUeXBlOiAnZG9tLXRleHQnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIC8vICAgIC8veyBvcmRlckRhdGFUeXBlOiAnZG9tLXNlbGVjdCcgfSxcclxuICAgICAgICAvL11cclxuICAgIH0pO1xyXG4gICAgLy9wdWJsaWMganVzdEZvcm1PYmogPSBuZXcgSnVzdFZhbGlkYXRlKCcjY3JlYXRlLWZvcm0nLFxyXG4gICAgLy8gICAge1xyXG4gICAgLy8gICAgICAgIGVycm9yRmllbGRDc3NDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gICAgLy8gICAgICAgIGVycm9yTGFiZWxTdHlsZToge1xyXG4gICAgLy8gICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgLy8gICAgICAgICAgICBjb2xvcjogJyNkYzM1NDUnLFxyXG4gICAgLy8gICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgZm9jdXNJbnZhbGlkRmllbGQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgbG9ja0Zvcm06IHRydWUsXHJcbiAgICAvLyAgICB9KTtcclxuICAgIC8vcHVibGljIERhdGFUYWJsZU9iajIgPSAkKCcjZXhhbXBsZTInKS5EYXRhVGFibGUoe1xyXG4gICAgLy8gICAgZG9tOiAnJyxcclxuICAgIC8vICAgIG9yZGVyaW5nOiBmYWxzZVxyXG4gICAgLy99KTtcclxuXHJcbiAgICAvLyBvbGRcclxuICAgIHB1YmxpYyBEb21PZlVzZXJTZWxlY3RQcm9kaXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXNlbGVjdC1wcm9kaXRlbScpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mRXZlblNob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlblByb2R1Y3RMcycpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZPZGRMU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZGRQcm9kdWN0THMnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mVG90YWxQcm9kSXRlbUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG90YWwnKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZJbmdyZWRpZW50UG9zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmdyZWRpZW50UG9zdCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mQ29udHJhY3RVTklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NvbnRyYWN0VU5JRCcpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgcHVibGljIERvbU9mU2hvd0NvbnRyYWN0V2VpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZlNob3dDb250cmFjdFVuaXRQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93Q29udHJhY3RVbml0UHJpY2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRG9tT2ZOb3dDb250cmFjdFdlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOb3dDb250cmFjdFdlaWdodCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHB1YmxpYyBEb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnTm93Q29udHJhY3RBY3R1YWxQcmljZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZVBsdWdpbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvKiBQYWdlIEluaXRpYWxpemUgKi9cclxuICAgICAgICAvLyBTZWxlY3QyIEVsZW1lbnRzXHJcbiAgICAgICAgJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8ganF1ZXJ5IGRpYWxvZ1xyXG4gICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgd2lkdGg6IDQwMCxcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgXCLpgIHlh7pcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGUtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCLlj5bmtohcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8ganF1ZXJ5IGRhdGF0YWJsZVxyXG4gICAgICAgIC8vdmFyIHQgPSAkKCcjZXhhbXBsZScpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIC8vdmFyIGNvdW50ZXIgPSAxO1xyXG5cclxuICAgICAgICAvLyQoJyNhZGRSb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgdC5yb3cuYWRkKFtjb3VudGVyICsgJy4xJywgY291bnRlciArICcuMicsIGNvdW50ZXIgKyAnLjMnLCBjb3VudGVyICsgJy40JywgY291bnRlciArICcuNSddKS5kcmF3KGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gICAgY291bnRlcisrO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgYWRkIGEgZmlyc3Qgcm93IG9mIGRhdGFcclxuICAgICAgICAvLyAkKCcjYWRkUm93JykuY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZGb3JtQ3JlYXRlKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vJChcIiNkaWFsb2ctY29uZmlybVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9hbGVydGlmeS5jb25maXJtKCdDb25maXJtIFRpdGxlJywgJ0NvbmZpcm0gTWVzc2FnZScsIGZ1bmN0aW9uICgpIHsgYWxlcnRpZnkuc3VjY2VzcygnT2snKSB9XHJcbiAgICAgICAgICAgIC8vICAgICwgZnVuY3Rpb24gKCkgeyBhbGVydGlmeS5lcnJvcignQ2FuY2VsJykgfSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGNhdCA9IG5ldyBKdXN0VmFsaWRhdGUoJyNjcmVhdGUtZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn56K65a6a5bu656uL5Ye66LKo5Zau5ZeOPycsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+W7uueriycsXHJcbiAgICAgICAgICAgICAgICBzaG93RGVueUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlbnlCdXR0b25UZXh0OiBg5Y+W5raIYCxcclxuICAgICAgICAgICAgICAgIHJldHVybkZvY3VzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLy9zaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy9mb2N1c0NvbmZpcm06IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvKiBSZWFkIG1vcmUgYWJvdXQgaXNDb25maXJtZWQsIGlzRGVuaWVkIGJlbG93ICovXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlzQ29uZmlybWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NyZWF0ZS1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXJPYmouanVzdEZvcm1PYmoucmV2YWxpZGF0ZSgpLnRoZW4oaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS1mb3JtXCIpIGFzIEhUTUxGb3JtRWxlbWVudCkuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9jdXJPYmouanVzdEZvcm1PYmouc2hvd0Vycm9ycyh7ICcjQ3VzdG9tZXJVTklEJzogJ1RoZSBlbWFpbCBpcyBpbnZhbGlkJyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5pc0RlbmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU3dhbC5maXJlKCdDaGFuZ2VzIGFyZSBub3Qgc2F2ZWQnLCAnJywgJ2luZm8nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL1N3YWwuZmlyZShcImhhaGFcIilcclxuICAgICAgICAgICAgLy9Td2FsLmZpcmUoXHJcbiAgICAgICAgICAgIC8vICAgICdHb29kIGpvYiEnLFxyXG4gICAgICAgICAgICAvLyAgICAnWW91IGNsaWNrZWQgdGhlIGJ1dHRvbiEnLFxyXG4gICAgICAgICAgICAvLyAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgLy8pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOWHuuiyqOWwjeixoVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ3VzdG9tZXJVTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQub3B0aW9uc1tjdXJPYmouRG9tT2ZDdXN0b21lclVOSUQuc2VsZWN0ZWRJbmRleF0udGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5vcHRpb25zW2N1ck9iai5Eb21PZkN1c3RvbWVyVU5JRC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0U2FsZXNDb250cmFjdHNCeUN1c3RvbWVyVU5JRChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgJC53aGVuKGZ1bmNScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLlJlU2V0Q29udHJhY3RJdGVtcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS50cmlnZ2VyKFwiY2hhbmdlXCIpOyAgLy8g6YeN5paw5pW055CG55qE5oSP5oCdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8kKGN1ck9iai5Eb21PZkNhck5vVU5JRCkudHJpZ2dlcihcImNoYW5nZVwiKTsgIC8vIOWKoOmAmeWAi+WuouaItui7iueJjOaJjeacg+WIpOaWtyDmmK/lkKbpgbjliLAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWuouaItui7iueJjFxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ2FyTm9VTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDpgLLosqjlk4HpoIVcclxuICAgICAgICAkKGN1ck9iai5Eb21PZlVzZXJTZWxlY3RQcm9kaXRlbSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlcuaJgOmBuFxyXG4gICAgICAgICAgICB1c1Byb2RJdGVtRG9tcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuQXBwZW5kKGl0ZW0udmFsdWUsIGl0ZW0udGV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyDopoHliKrpmaTnmoRcclxuICAgICAgICAgICAgY3VyT2JqLl9wcm9kSXRlbUxpc3QuRGF0YS5maWx0ZXIoc2hvd0l0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEodXNQcm9kSXRlbURvbXMubWFwKHVzSXRlbSA9PiB1c0l0ZW0udmFsdWUpLmluY2x1ZGVzKHNob3dJdGVtLnByb2RJZCkpO1xyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IGN1ck9iai5fcHJvZEl0ZW1MaXN0LlJlbW92ZUJ5UHJvZElkKHNob3dJdGVtLnByb2RJZCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgICAgICBjdXJPYmouU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGN1ck9iai5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWinuWKoC3pgLLosqjlk4HpoIXnmb7liIbmr5RcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLm9uKCdjbGljaycsIGAuJHtjdXJPYmouUGx1c1BlcmNlbnRDbGFzc05hbWV9YCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljazIoJCh0aGlzKS5nZXQoMCkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDmuJvlsJEt6YCy6LKo5ZOB6aCF55m+5YiG5q+UXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZDcmVhdGVGb3JtKS5vbignY2xpY2snLCBgLiR7Y3VyT2JqLk1pbnVzUGVyY2VudENsYXNzTmFtZX1gLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5NaW51c1Byb2RJdGVtUGVyY2VudF9DbGljazIoJCh0aGlzKS5nZXQoMCkpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZMZWF2ZVdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVXZWlnaHQoKTtcclxuICAgICAgICAgICAgLy9jdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mSW52b2ljZVByaWNlSGFzVGF4KS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZUcmFmaWNGZWVIYXNUYXgpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3VyT2JqLkNhY3VsYXRlQWxsRmVlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKGN1ck9iai5Eb21PZkRlZmVjdGl2ZVdlaWdodCkub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJPYmouQ2FjdWxhdGVBbGxGZWUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVW5pdFByaWNlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mVHJhZmljVW5pdFByaWNlKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1ck9iai5DYWN1bGF0ZUFsbEZlZSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoY3VyT2JqLkRvbU9mQ29udHJhY3RVTklEKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJnVU5JRCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGlmIChhcmdVTklEKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY1JzID0gY3VyT2JqLkN1c3RvbWVyQ29udHJhY3RBUEkuR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAkLndoZW4oZnVuY1JzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLmRlYWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFVuaXRQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBkYXRhLnJlc3VsdFZhbHVlLm5vd0FjdHVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsUHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS52YWx1ZSA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFVuaXRQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0V2VpZ2h0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZk5vd0NvbnRyYWN0QWN0dWFsUHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlVuaXRQcmljZS5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZSZWNlaXZlZFR5cGUpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdVTklEID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKGFyZ1VOSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdW5jUnMgPSBjdXJPYmouQ3VzdG9tZXJDb250cmFjdEFQSS5HZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUuZGVhbFdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mU2hvd0NvbnRyYWN0VW5pdFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IGRhdGEucmVzdWx0VmFsdWUubm93QWN0dWFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZOb3dDb250cmFjdEFjdHVhbFByaWNlLnRleHRDb250ZW50ID0gZGF0YS5yZXN1bHRWYWx1ZS5ub3dBY3R1YWxQcmljZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnZhbHVlID0gZGF0YS5yZXN1bHRWYWx1ZS5kZWFsVW5pdFByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ck9iai5Eb21PZlNob3dDb250cmFjdFdlaWdodC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZTaG93Q29udHJhY3RVbml0UHJpY2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RXZWlnaHQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mTm93Q29udHJhY3RBY3R1YWxQcmljZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjdXJPYmouRG9tT2ZVbml0UHJpY2UudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3VyT2JqLkRvbU9mVW5pdFByaWNlLnJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkKGN1ck9iai5Eb21PZlVuaXRQcmljZSkudHJpZ2dlcihcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvLyBGb3JtIFZhbGlkYXRpb25cclxuICAgICAgICAkKGN1ck9iai5Eb21PZkNyZWF0ZUZvcm0pLnZhbGlkYXRlKHtcclxuICAgICAgICAgICAgaW52YWxpZEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwi6aCB6Z2i6LOH6KiK5aGr5a+r5LiN5a6M5pW077yM6KuL5qqi5p+l6aCB6Z2i6KiK5oGvISFcIik7XHJcbiAgICAgICAgICAgICAgICAvL1N3YWwuZmlyZShcIumggemdouizh+ioiuWhq+Wvq+S4jeWujOaVtO+8jOiri+aqouafpemggemdouioiuaBryEhXCIsIFwiXCIsIFwiaW5mb1wiKVxyXG5cclxuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2luZm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGl0bGU6ICdPb3BzLi4uJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn6aCB6Z2i6LOH6KiK5aGr5a+r5LiN5a6M5pW077yM6KuL5qqi5p+l6aCB6Z2i6KiK5oGvISEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkZvY3VzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9jdXNDb25maXJtOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlnbm9yZTogXCJcIiwgLy8g6KaB5qqi5p+lSGlkZGVu5qyE5L2N6KaB5Yqg6YCZ5YCLXHJcbiAgICAgICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgICAgICBDdXN0b21lclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIENhck5vVU5JRDogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgRXhjYXZhdG9yT3BlclVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIExlYXZlV2VpZ2h0VGltZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLy9Qcm9kdWN0SXRlbVVOSUQ6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIFVTUHJvZExpc3Q6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgIC8vUmVjZWl2ZWRUaW1lOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAvL1JlY2VpdmVkVHlwZTogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgLyogICAgIFNlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3M6IFwicmVxdWlyZWRcIiwqL1xyXG4gICAgICAgICAgICAgICAgTGVhdmVXZWlnaHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXlxcKz9bMS05XVswLTldKiQvICAvLyDlpKfmlrww55qE5q2j5pW05pW4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLywgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IC8wfF5cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9Vbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogL14oWzEtOV1bMC05XSooXFwuWzAtOV17MSwyfSk/fDBcXC4oPyEwKyQpWzAtOV17MSwyfSkkLyAgLy8g5qC85byP5LiN56ym77yM6ZyA54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuCEhXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1RyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiAvXihbMC05XVswLTldKihcXC5bMC05XXsxLDJ9KT98MFxcLig/ITArJClbMC05XXsxLDJ9KSQvICAvLyDmoLzlvI/kuI3nrKbvvIzpnIDngrrlpKfmlrznrYnmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4ISFcclxuXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1JlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGN1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS5vcHRpb25zW2N1ck9iai5Eb21PZlJlY2VpdmVkVHlwZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gY3VyT2JqLkRvbU9mUmVjZWl2ZWRUeXBlLnZhbHVlICYmIHNlbGVjdGVkVmFsdWUgIT09IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL1wiVkVfUHVyY2hhc2VXZWlnaHROb3RlLkFjdHVhbFByaWNlXCI6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogL15cXCs/WzEtOV1bMC05XSokLyAgLy8g5aSn5pa8MOeahOato+aVtOaVuFxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICBMZWF2ZVdlaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLywgRGVmZWN0aXZlV2VpZ2h0OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXR0ZXJuOiBcIuW/hemgiOeCuuWkp+aWvOaIluetieaWvDDnmoTmraPmlbTmlbhcIlxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9Vbml0UHJpY2U6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa8MOaVtOaVuCDkuJQg5pyA5aSaMuS9jeWwj+aVuFwiXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1RyYWZpY1VuaXRQcmljZToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGF0dGVybjogXCLlv4XpoIjngrrlpKfmlrww5pW05pW4IOS4lCDmnIDlpJoy5L2N5bCP5pW4XCJcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vVGhpcmRXZWlnaHRGZWU6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHBhdHRlcm46IFwi5b+F6aCI54K65aSn5pa85oiW562J5pa8MOeahOato+aVtOaVuFwiXHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL1JlbWFyazoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcmVxdWlyZWQ6IFwi5LuY54++5Lul5aSW55qE5LuY5qy+5pa55byP6KuL5YuZ5b+F5aGr5a+r5YKZ6Ki7XCJcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uIChlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuYWRkQ2xhc3MoJ2ludmFsaWQtZmVlZGJhY2snKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5hcHBlbmQoZXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXRWMigpIHtcclxuXHJcblxyXG4gICAgICAgIC8vdGhpcy5qdXN0Rm9ybU9iai5hZGRGaWVsZCgnI0N1c3RvbWVyVU5JRCcsIFtcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIHJ1bGU6ICdyZXF1aXJlZCcsXHJcbiAgICAgICAgLy8gICAgICAgIGVycm9yTWVzc2FnZTogJ2x1bGFsYSdcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy9dKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBDbGFzcyBWYXJpYWJsZSAqL1xyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuICAgIHByaXZhdGUgUmVTZXRDYXJOb0l0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDYXJOb1VOSUQgPSAkKHRoaXMuRG9tT2ZDYXJOb1VOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ2FyTm9VTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNhck5vVU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uY2FyTm9VTklELCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBKcURvbU9mQ2FyTm9VTklELmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVTZXRDb250cmFjdEl0ZW1zKGRhdGFPYmpMcykge1xyXG4gICAgICAgIGNvbnN0IEpxRG9tT2ZDb250cmFjdFVOSUQgPSAkKHRoaXMuRG9tT2ZDb250cmFjdFVOSUQpO1xyXG5cclxuICAgICAgICBKcURvbU9mQ29udHJhY3RVTklELmh0bWwoJycpOyAgLy8g6YG46aCF5riF56m6XHJcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiXCIsIFwiXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgSnFEb21PZkNvbnRyYWN0VU5JRC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgZGF0YU9iakxzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgIC8vIOa4heWWrumgheebrlxyXG4gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNvbnRyYWN0TmFtZSwgaXRlbS5jb250cmFjdEdVSUQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEpxRG9tT2ZDb250cmFjdFVOSUQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93VVNQcm9kSXRlbXMoKSB7XHJcbiAgICAgICAgLy9sZXQgZXZlblNob3dVbERvbSA9IHRoaXMuRG9tT2ZFdmVuU2hvdztcclxuICAgICAgICAvL2xldCBvZGRTaG93VWxEb20gPSB0aGlzLkRvbU9mT2RkTFNob3c7XHJcbiAgICAgICAgLy9ldmVuU2hvd1VsRG9tLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgLy9vZGRTaG93VWxEb20uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5EYXRhVGFibGVPYmouY2xlYXIoKS5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuc29ydCgoeCwgeSkgPT4geS5wZXJjZW50IC0geC5wZXJjZW50KTsgLy8g5o6S5bqP5aSn5o6S5YmN6Z2iICBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL2pzcmVmX3NvcnQuYXNwXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5NaW51c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAvL2lNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgLy9pTWludXNUYWcuc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgICAgICAgICAgLy9jb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgICAgICAgICAvL2NvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vbGlUYWcuZGF0YXNldC50ZXh0ID0gaXRlbS5wcm9kVGV4dDtcclxuICAgICAgICAgICAgLy9saVRhZy50ZXh0Q29udGVudCA9IGAke2l0ZW0ucHJvZFRleHR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgLy9saVRhZy5kYXRhc2V0LnZhbHVlID0gaXRlbS5wcm9kSWQ7XHJcbiAgICAgICAgICAgIC8vLy8gbGlUYWcuZGF0YXNldC5wZXJjZW50ID0gdGhpcy5fcHJvZEl0ZW1MaXN0Lmxlbmd0aCA9PT0gMCA/IFwiOTBcIiA6IFwiMTBcIjtcclxuICAgICAgICAgICAgLy9zcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgICAgICAgICAgLy9saVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuICAgICAgICAgICAgLy9saVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgICAgICAgICAvL2luZGV4ICUgMiA9PT0gMCA/IGV2ZW5TaG93VWxEb20uYXBwZW5kQ2hpbGQobGlUYWcpIDpcclxuICAgICAgICAgICAgLy8gICAgb2RkU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyB2ZXIyXHJcbiAgICAgICAgICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYDtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBpTWludXNUYWcyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZzIuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnMi5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXNcIik7XHJcbiAgICAgICAgICAgIC8vaU1pbnVzVGFnMi5jbGFzc0xpc3QuYWRkKHRoaXMuTWludXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgbGV0IGJ0bk1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgYnRuTWludXNUYWcuYXBwZW5kKGlNaW51c1RhZzIpO1xyXG4gICAgICAgICAgICBidG5NaW51c1RhZy50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICAgICAgYnRuTWludXNUYWcudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgYnRuTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImJ0blwiLCBcImJ0bi1jaXJjbGVcIiwgXCJidG4tcHJpbWFyeVwiLCB0aGlzLk1pbnVzUGVyY2VudENsYXNzTmFtZSk7ICAvLyDlh7romZUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTExMTU5OTgvaXMtdGhlcmUtYS13YXktdG8tYWRkLXJlbW92ZS1zZXZlcmFsLWNsYXNzZXMtaW4tb25lLXNpbmdsZS1pbnN0cnVjdGlvbi13aXRoLWNsYXNcclxuICAgICAgICAgICAgY29uc3QgaVBsdXNUYWcyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAgICAgICAgIGlQbHVzVGFnMi5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZzIuY2xhc3NMaXN0LmFkZChcImZhLXBsdXNcIik7XHJcbiAgICAgICAgICAgIC8vaVBsdXNUYWcyLmNsYXNzTGlzdC5hZGQodGhpcy5QbHVzUGVyY2VudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBidG5QbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgYnRuUGx1c1RhZy50eXBlID0gXCJidXR0b25cIjtcclxuICAgICAgICAgICAgYnRuUGx1c1RhZy5hcHBlbmQoaVBsdXNUYWcyKTtcclxuICAgICAgICAgICAgYnRuUGx1c1RhZy52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBidG5QbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJidG5cIiwgXCJidG4tY2lyY2xlXCIsIFwiYnRuLWRhbmdlclwiLCB0aGlzLlBsdXNQZXJjZW50Q2xhc3NOYW1lKTsgIC8vIOWHuuiZlSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTExNTk5OC9pcy10aGVyZS1hLXdheS10by1hZGQtcmVtb3ZlLXNldmVyYWwtY2xhc3Nlcy1pbi1vbmUtc2luZ2xlLWluc3RydWN0aW9uLXdpdGgtY2xhc1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLkRhdGFUYWJsZU9iai5yb3cuYWRkKFtpdGVtLnByb2RUZXh0LFxyXG4gICAgICAgICAgICBgJHtidG5NaW51c1RhZy5vdXRlckhUTUx9JHtzcGFuVGFnLm91dGVySFRNTH0ke2J0blBsdXNUYWcub3V0ZXJIVE1MfWAsXHJcbiAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICcnLFxyXG4gICAgICAgICAgICAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAnJyxcclxuICAgICAgICAgICAgICAgICcnXSkuZHJhdyhmYWxzZSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuU2hvd1Byb2RJdGVtU3VtbWFyeSgpO1xyXG4gICAgICAgIHRoaXMuQ2FjdWxhdGVXZWlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQcm9kSXRlbVN1bW1hcnkoKSB7XHJcbiAgICAgICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhJdGVtOiBQdXJjaGFzZVByb2RJdGVtO1xyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5wZXJjZW50ID4gK2l0ZW0ucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke3RoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmxlbmd0aH3poIVgO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgICAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5wcm9kVGV4dCA/PyBcIueEoVwifWBcclxuXHJcblxyXG5cclxuICAgICAgICAvL2xldCBzdW1tYXJ5SW5mbyA9IGAke3JlY29nbml0aW9uU3Bhbi5pbm5lckhUTUx9JHtpdGVtU3Bhbi5pbm5lckhUTUx9JHtwZXJjZW50U3Bhbi5pbm5lckhUTUx9YDtcclxuXHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Eb21PZlRvdGFsUHJvZEl0ZW1JbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgICAgICB0aGlzLkRvbU9mVG90YWxQcm9kSXRlbUluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgQmluZEluZ3JlZGllbnRUb0RvbSgpIHtcclxuICAgICAgICBsZXQgcG9zdERpdiA9IHRoaXMuRG9tT2ZJbmdyZWRpZW50UG9zdDtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYERUT1BTV3JldGVPZmZSZWNvcmRzWyR7aW5kZXh9XS5QUk9EVUNUX05BTUVgO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudmFsdWUgPSBpdGVtLnByb2RUZXh0XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICB2YWx1ZVByb3BlcnR5Lm5hbWUgPSBgRFRPUFNXcmV0ZU9mZlJlY29yZHNbJHtpbmRleH1dLlBST0RVQ1RfVU5JRGA7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkubmFtZSA9IGBEVE9QU1dyZXRlT2ZmUmVjb3Jkc1ske2luZGV4fV0uUEVSQ0VOVGA7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucGVyY2VudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQobmFtZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGx1c1Byb2RJdGVtUGVyY2VudF9DbGljayhpVGFnRG9tOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBub3dJVGFnID0gaVRhZ0RvbTtcclxuICAgICAgICBsZXQgbm93TGlUYWcgPSBub3dJVGFnLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG5vd1Byb2RJdGVtID0gdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBub3dMaVRhZy5kYXRhc2V0LnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgbm93UHJvZEl0ZW0ucGVyY2VudCA9IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMCA+IDEwMCA/IDEwMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgKyAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBQbHVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrMihjdXJCdG5Eb206IEhUTUxCdXR0b25FbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gY3VyQnRuRG9tLnZhbHVlKTtcclxuICAgICAgICBpZiAobm93UHJvZEl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIG5vd0FsbFBlcmNlbnQgPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5tYXAoaXRlbSA9PiBpdGVtLnBlcmNlbnQpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIG51bSkgPT4gc3VtICsgbnVtKTtcclxuICAgICAgICAgICAgaWYgKG5vd0FsbFBlcmNlbnQgKyAxMCA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogJ09vcHMuLi4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfliqDnuL3mr5Tkvovlt7LotoXpgY4xMDAlISEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkZvY3VzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9jdXNDb25maXJtOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwID4gMTAwID8gMTAwIDogbm93UHJvZEl0ZW0ucGVyY2VudCArIDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhY3VsYXRlV2VpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TaG93VVNQcm9kSXRlbXMoKTtcclxuICAgICAgICB0aGlzLkJpbmRJbmdyZWRpZW50VG9Eb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWludXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2syKGN1ckJ0bkRvbTogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IGN1ckJ0bkRvbS52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTAgPCAwID8gMCA6IG5vd1Byb2RJdGVtLnBlcmNlbnQgLSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYWN1bGF0ZVdlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuICAgICAgICBjb25zdCB0aGlzT2JqID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgZnVuY1JzID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldEludm9pY2VQcmljZShcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZMZWF2ZVdlaWdodC52YWx1ZSxcclxuICAgICAgICAgICAgK3RoaXMuRG9tT2ZEZWZlY3RpdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mSW52b2ljZVByaWNlSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBmdW5jUnMyID0gdGhpcy5TYWxlc1ByaWNlQVBJLkdldERlbGl2ZXJ5UHJpY2UoXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mTGVhdmVXZWlnaHQudmFsdWUsXHJcbiAgICAgICAgICAgICt0aGlzLkRvbU9mVHJhZmljVW5pdFByaWNlLnZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLkRvbU9mVHJhZmljRmVlSGFzVGF4LmNoZWNrZWRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAkLndoZW4oZnVuY1JzLCBmdW5jUnMyKS50aGVuKGZ1bmN0aW9uIChkYXRhLCBkYXRhMikge1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd0ludm9pY2VQcmljZS50ZXh0Q29udGVudCA9IGRhdGFbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd1RyYWZpY1ByaWNlLnRleHRDb250ZW50ID0gZGF0YTJbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJywge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnVFdEJywgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzMyA9IHRoaXNPYmouU2FsZXNQcmljZUFQSS5HZXRSZWNlaXZlZFByaWNlKFxyXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcclxuICAgICAgICAgICAgICAgIGRhdGEyWzBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLndoZW4oZnVuY1JzMykudGhlbihmdW5jdGlvbiAoZGF0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzT2JqLkRvbU9mU2hvd1JlY2VpdmVkUHJpY2UudGV4dENvbnRlbnQgPSBkYXRhLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdUV0QnLCBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpc09iai5BY3R1YWxQcmljZV9ET00udmFsdWUgPSBkYXRhOyDmh4noqbLmiorkuIrov7DlgLwg6YO95bi25Zue5b6M56uv6YeN5paw6KiI566XXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIENhY3VsYXRlV2VpZ2h0KCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5EYXRhVGFibGVPYmoucm93cygpLmV2ZXJ5KGZ1bmN0aW9uIChyb3dJZHgsIHRhYmxlTG9vcCwgcm93TG9vcCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoaXNSb3cgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdGhpc1Jvd0RhdGEgPSB0aGlzUm93LmRhdGEoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3ZhciBhYWJiID0gJChsYWxhWzFdKS5maW5kKCdzcGFuJyk7XHJcbiAgICAgICAgICAgIC8vdmFyIGxhbGF3ID0gYWFiYi50ZXh0LnRvU3RyaW5nKCkuc3BsaXQoXCIlXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSB0aGlzUm93RGF0YVsxXTtcclxuICAgICAgICAgICAgdmFyIG5vbWluYXRvclZhbCA9IHRlbXBEaXYucXVlcnlTZWxlY3RvcihcInNwYW5cIikudGV4dENvbnRlbnQuc3BsaXQoXCIlXCIpWzBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbGV0IHVzUHJvZEl0ZW1Eb21zID0gJChjdXJPYmouRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0pLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXNPYmouRGF0YVRhYmxlT2JqLnJvd3MoKS5kYXRhKCkudG9BcnJheSgpLmZvckVhY2gpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZnVuY1JzID0gdGhpc09iai5XZWlnaHRBUElDbGFzcy5HZXRQcm9wb3J0aW9uV2VpZ2h0KCtub21pbmF0b3JWYWwsICt0aGlzT2JqLkRvbU9mTGVhdmVXZWlnaHQudmFsdWUpO1xyXG4gICAgICAgICAgICAvLyQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvd0RhdGFbMl0gPSBgJHtkYXRhfSBrZ2A7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3cuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzT2JqLkRhdGFUYWJsZU9iai5vcmRlcihbMSwgJ2Rlc2MnXSkuZHJhdygpO1xyXG4gICAgICAgICAgICAvLyAgICAvL3RoaXNPYmouRGF0YVRhYmxlT2JqLnNvcnQoW1sxMywgJ2FzYyddLCBbMSwgJ2FzYyddXSlcclxuICAgICAgICAgICAgLy8gICAgLy90aGlzT2JqLkRhdGFUYWJsZU9iai5zb3J0KClcclxuICAgICAgICAgICAgLy8gICAgLy90aGlzT2JqLkRhdGFUYWJsZU9iai5vcmRlcihbMiwgJ2Rlc2MnXSkuZHJhdygpO1xyXG4gICAgICAgICAgICAvLyAgICAvL1N3YWwuZmlyZSgnQW55IGZvb2wgY2FuIHVzZSBhIGNvbXB1dGVyJylcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9kdWN0VU5JRCA9IHRlbXBEaXYucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczIgPSB0aGlzT2JqLkludmVudG9yeUFQSUNsYXNzLkdldEludmVudG9yeVdlaWdodChwcm9kdWN0VU5JRCk7XHJcbiAgICAgICAgICAgIC8vJC53aGVuKGZ1bmNSczIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvd0RhdGFbM10gPSBgJHtkYXRhfSBrZ2A7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3cuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzT2JqLkRhdGFUYWJsZU9iai5vcmRlcihbMSwgJ2Rlc2MnXSkuZHJhdygpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICBsZXQgZnVuY1JzMyA9IHRoaXNPYmouSW52ZW50b3J5QVBJQ2xhc3MuR2V0SW52ZW50b3J5QXZnVW5pdFByaWNlKHByb2R1Y3RVTklEKTtcclxuICAgICAgICAgICAgbGV0IGZ1bmNSczQgPSB0aGlzT2JqLkludmVudG9yeUFQSUNsYXNzLkdldEludmVudG9yeU1pblVuaXRQcmljZShwcm9kdWN0VU5JRCk7XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnM1ID0gdGhpc09iai5JbnZlbnRvcnlBUElDbGFzcy5HZXRJbnZlbnRvcnlNYXhVbml0UHJpY2UocHJvZHVjdFVOSUQpO1xyXG4gICAgICAgICAgICAvLyQud2hlbihmdW5jUnMzKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNSb3dEYXRhWzRdID0gYCR7ZGF0YX0g5YWDL2tnYDtcclxuICAgICAgICAgICAgLy8gICAgdGhpc1Jvdy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXNPYmouRGF0YVRhYmxlT2JqLm9yZGVyKFsxLCAnZGVzYyddKS5kcmF3KCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAvL2xldCByc1ZhbCA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgIC8vdGhpc09iai5EYXRhVGFibGVPYmoucm93cygpLmV2ZXJ5KGZ1bmN0aW9uIChyb3dJZHgsIHRhYmxlTG9vcCwgcm93TG9vcCkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICBsZXQgZnVuY1JzNCA9IHRoaXNPYmouQ29zdEFQSUNsYXNzLkdldENvc3RVbml0UHJjZShOdW1iZXIobm9taW5hdG9yVmFsKSwgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICQud2hlbihmdW5jUnM0KS50aGVuKGZ1bmN0aW9uIChkYXRhMikge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgcnNWYWwgPSByc1ZhbCArIGRhdGEyXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB0aGlzT2JqLkRhdGFUYWJsZU9iai5jb2x1bW4oNCkuZm9vdGVyKCkuaW5uZXJIVE1MID0gcnNWYWwudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgLy90aGlzT2JqLkNvc3RBUElDbGFzcy5HZXRDb3N0VW5pdFByY2UoKTtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgLy8kKGFwaS5jb2x1bW4oNCkuZm9vdGVyKCkpLmh0bWxcclxuICAgICAgICAgICAgLy8gICAgLy99KTtcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICQud2hlbihmdW5jUnMsIGZ1bmNSczIsIGZ1bmNSczMsIGZ1bmNSczQsIGZ1bmNSczUpLnRoZW4oZnVuY3Rpb24gKGRhdGEsIGRhdGEyLCBkYXRhMywgZGF0YTQsIGRhdGE1KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzUm93RGF0YVsyXSA9IGRhdGFbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGF0YTJcclxuICAgICAgICAgICAgICAgIHRoaXNSb3dEYXRhWzNdID0gZGF0YTJbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGF0YTNcclxuICAgICAgICAgICAgICAgIHRoaXNSb3dEYXRhWzRdID0gYCR7ZGF0YTRbMF0udG9Mb2NhbGVTdHJpbmcoJ3poLVRXJyl9IOWFgy9rZ2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzUm93RGF0YVs1XSA9IGAke2RhdGE1WzBdLnRvTG9jYWxlU3RyaW5nKCd6aC1UVycpfSDlhYMva2dgO1xyXG4gICAgICAgICAgICAgICAgdGhpc1Jvd0RhdGFbNl0gPSBgJHtkYXRhM1swXS50b0xvY2FsZVN0cmluZygnemgtVFcnLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KX0g5YWDL2tnYDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzUm93LmludmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXNPYmouRGF0YVRhYmxlT2JqLm9yZGVyKFsyLCAnZGVzYyddKS5kcmF3KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGZ1bmNScyA9IHRoaXNPYmouQ29zdEFQSUNsYXNzLkdldENvc3RVbml0UHJjZShub21pbmF0b3JWYWwsIHRoaXNPYmouRG9tT2ZMZWF2ZVdlaWdodC52YWx1ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzT2JqLkRhdGFUYWJsZU9iai5kcmF3KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19