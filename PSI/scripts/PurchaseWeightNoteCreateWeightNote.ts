class PurchaseWeightNoteCreateWeightNote {
    // Base Porperites
    readonly BaseUrl: string;
    public _prodItemList: PurchaseProdItemList = new PurchaseProdItemList();
    readonly MinusPercentClassName: string = "minus-percent"
    readonly PlusPercentClassName: string = "plus-percent"

    // For Post


    // References  
    private CustomerAPI: CustomerAPIClass;
    private PurchasePriceAPI: PurchasePriceAPIClass;
    private CustomerContractAPI: CustomerContractAPIClass;



    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.PurchasePriceAPI = new PurchasePriceAPIClass(this.BaseUrl);
        this.CustomerContractAPI = new CustomerContractAPIClass(this.BaseUrl);
    }

    /* Field Doms */
    public DomOfCustomerUNID = document.getElementById('CustomerUNID') as HTMLSelectElement;
    public DomOfCustomerName = document.getElementById('CustomerName') as HTMLInputElement;
    public DomOfCarNo = document.getElementById('CarNo') as HTMLInputElement;
    public DomOfCarNoUNID = document.getElementById('CarNoUNID') as HTMLSelectElement;
    public DomOfCreateForm = document.getElementById('creaet-form') as HTMLFormElement;
    public DomOfFormCreate = document.getElementById('form_create') as HTMLButtonElement;
    public DomOfUserSelectProditem = document.getElementById('user-select-proditem') as HTMLSelectElement;
    public DomOfEvenShow = document.getElementById('evenProductLs') as HTMLUListElement;
    public DomOfOddLShow = document.getElementById('oddProductLs') as HTMLUListElement;
    public DomOfTotalProdItemInfo = document.getElementById('total') as HTMLHeadingElement;
    public DomOfIngredientPost = document.getElementById('ingredientPost') as HTMLDivElement;
    public DomOfFullWeight = document.getElementById('FullWeight') as HTMLInputElement;
    public DomOfDefectiveWeight = document.getElementById('DefectiveWeight') as HTMLInputElement;
    public DomOfUnitPrice = document.getElementById('UnitPrice') as HTMLInputElement;
    public DomOfHasTaxList = document.getElementsByClassName('ishas_tax') as HTMLCollectionOf<HTMLInputElement>;
    public DomOfTraficUnitPrice = document.getElementById('TraficUnitPrice') as HTMLInputElement;
    public DomOfThirdWeightFee = document.getElementById('ThirdWeightFee') as HTMLInputElement;
    public DomOfDisplayFinalPrice = document.getElementById('show_final_price') as HTMLHeadingElement;
    public DomOfDisplayWeightPrice = document.getElementById('show_weight_price') as HTMLDivElement;
    public DomOfDispalyTraficPrice = document.getElementById('show_trafic_price') as HTMLDivElement;
    public DomOfContractUNID = document.getElementById('ContractUNID') as HTMLSelectElement;
    public DomOfShowContractWeight = document.getElementById('ShowContractWeight') as HTMLSpanElement;
    public DomOfShowContractUnitPrice = document.getElementById('ShowContractUnitPrice') as HTMLSpanElement;
    public DomOfNowContractWeight = document.getElementById('NowContractWeight') as HTMLSpanElement;
    public DomOfNowContractActualPrice = document.getElementById('NowContractActualPrice') as HTMLSpanElement;
    public DomOfPayType = document.getElementById('PayType') as HTMLSelectElement;



    public PagePluginInit() {
        const curObj = this;
        /* Page Initialize */
        // Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4',
            placeholder: "請選擇"
        })
        $(curObj.DomOfContractUNID).select2({
            allowClear: true,
            theme: 'bootstrap4',
            placeholder: "請選擇"
        })


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
        })
    }

    public PageEventInit() {
        const curObj = this;



        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            $("#dialog-confirm").dialog("open");
        })

        // 進貨對象
        $(curObj.DomOfCustomerUNID).on('change', function () {
            const selectedText = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].text;
            const selectedValue = curObj.DomOfCustomerUNID.options[curObj.DomOfCustomerUNID.selectedIndex].value;

            curObj.DomOfCustomerName.value = "";
            curObj.DomOfCarNo.value = ""; // 車牌名稱清空

            if (curObj.DomOfCustomerUNID &&
                selectedValue === "0") {  // 新客戶
                curObj.DomOfCustomerName.readOnly = false;
                curObj.ReSetCarNoItems([]);
                curObj.ReSetContractItems([]);
            } else {
                curObj.DomOfCustomerName.readOnly = true;
                curObj.DomOfCustomerName.value = selectedText;
                let funcRs = curObj.CustomerAPI.GetCarNoItemsBy(selectedValue);
                $.when(funcRs).then(function (data) {
                    curObj.ReSetCarNoItems(data);
                });

                let funcRs2 = curObj.CustomerContractAPI.GetContractsByCustomerUNID(selectedValue);
                $.when(funcRs2).then(function (data) {
                    curObj.ReSetContractItems(data);
                    $(curObj.DomOfContractUNID).trigger("change");
                });
            }
            $(curObj.DomOfCarNoUNID).trigger("change");  // 加這個客戶車牌才會判斷 是否選到0
        });

        // 客戶車牌
        $(curObj.DomOfCarNoUNID).on('change', function () {
            const selectedText = curObj.DomOfCarNoUNID.options[curObj.DomOfCarNoUNID.selectedIndex].text;
            const selectedValue = curObj.DomOfCarNoUNID.options[curObj.DomOfCarNoUNID.selectedIndex].value;

            curObj.DomOfCarNo.value = "";

            if (curObj.DomOfCarNoUNID &&
                selectedValue === "0") {
                curObj.DomOfCarNo.readOnly = false;
            } else {
                curObj.DomOfCarNo.readOnly = true;
                curObj.DomOfCarNo.value = selectedText;
            }
        })

        // 進貨品項
        $(curObj.DomOfUserSelectProditem).on('change', function () {
            let usProdItemDoms = $(curObj.DomOfUserSelectProditem).find(':selected').toArray() as HTMLOptionElement[];

            // User所選
            usProdItemDoms.forEach(item => {
                curObj._prodItemList.Append(item.value, item.text);
            })

            // 要刪除的
            curObj._prodItemList.Data.filter(showItem => {
                return !(usProdItemDoms.map(usItem => usItem.value).includes(showItem.prodId));
            }).forEach(showItem => curObj._prodItemList.RemoveByProdId(showItem.prodId));

            // pageMain.ProdList.RefreshProdItemPercent();
            curObj.ShowUSProdItems();
            curObj.BindIngredientToDom();
        });

        // 增加-進貨品項百分比
        $(curObj.DomOfCreateForm).on('click', `.${curObj.PlusPercentClassName}`, function () {
            curObj.PlusProdItemPercent_Click($(this).get(0))
        })
        // 減少-進貨品項百分比
        $(curObj.DomOfCreateForm).on('click', `.${curObj.MinusPercentClassName}`, function () {
            curObj.MinusProdItemPercent_Click($(this).get(0))
        })

        $(curObj.DomOfFullWeight).on('input', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfDefectiveWeight).on('input', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfHasTaxList).on('change', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfTraficUnitPrice).on('input', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfThirdWeightFee).on('input', function () {
            curObj.CaculateAllFee();
        })
        $(curObj.DomOfContractUNID).on('change', function () {
            var argUNID = $(this).val();
            if (argUNID) {
                let funcRs = curObj.CustomerContractAPI.GetContractItemsBy(argUNID.toString());
                $.when(funcRs).then(function (data) {
                    if (data.success) {
                        curObj.DomOfShowContractWeight.textContent = data.resultValue.dealWeight;
                        curObj.DomOfShowContractUnitPrice.textContent = data.resultValue.dealUnitPrice;
                        curObj.DomOfNowContractWeight.textContent = data.resultValue.nowActualWeight;
                        curObj.DomOfNowContractActualPrice.textContent = data.resultValue.nowActualPrice;
                        curObj.DomOfUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfUnitPrice.readOnly = true;
                        $(curObj.DomOfUnitPrice).trigger("input");
                    } else {
                        alert(data.errorMessage);
                    }
                });
            } else {
                curObj.DomOfShowContractWeight.textContent = "";
                curObj.DomOfShowContractUnitPrice.textContent = "";
                curObj.DomOfNowContractWeight.textContent = "";
                curObj.DomOfNowContractActualPrice.textContent = "";
                curObj.DomOfUnitPrice.value = "";
                curObj.DomOfUnitPrice.readOnly = false;
                $(curObj.DomOfUnitPrice).trigger("input");
            }
        })
        $(curObj.DomOfPayType).on('change', function () {
            var argUNID = $(this).val();
            if (argUNID) {
                let funcRs = curObj.CustomerContractAPI.GetContractItemsBy(argUNID.toString());
                $.when(funcRs).then(function (data) {
                    if (data.success) {
                        curObj.DomOfShowContractWeight.textContent = data.resultValue.dealWeight;
                        curObj.DomOfShowContractUnitPrice.textContent = data.resultValue.dealUnitPrice;
                        curObj.DomOfNowContractWeight.textContent = data.resultValue.nowActualWeight;
                        curObj.DomOfNowContractActualPrice.textContent = data.resultValue.nowActualPrice;
                        curObj.DomOfUnitPrice.value = data.resultValue.dealUnitPrice;
                        curObj.DomOfUnitPrice.readOnly = true;
                        $(curObj.DomOfUnitPrice).trigger("input");
                    } else {
                        alert(data.errorMessage);
                    }
                });
            } else {
                curObj.DomOfShowContractWeight.textContent = "";
                curObj.DomOfShowContractUnitPrice.textContent = "";
                curObj.DomOfNowContractWeight.textContent = "";
                curObj.DomOfNowContractActualPrice.textContent = "";
                curObj.DomOfUnitPrice.value = "";
                curObj.DomOfUnitPrice.readOnly = false;
                $(curObj.DomOfUnitPrice).trigger("input");
            }
        })

    }

    public PageValidateInit() {
        const curObj = this;
        // Form Validation
        $(curObj.DomOfCreateForm).validate({
            invalidHandler: function (form) {
                alert("頁面資訊填寫不完整，請檢查頁面訊息!!");
            },
            submitHandler: function (form) {
                form.submit();
            },
            ignore: "", // 要檢查Hidden欄位要加這個
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
                    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                },
                DefectiveWeight: {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
                },
                UnitPrice: {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                TraficUnitPrice: {
                    required: true,
                    pattern: /^([0-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於等於0整數 且 最多2位小數!!

                },
                ThirdWeightFee: {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
                },
                PayTime: {
                    required: function (element) {
                        const selectedValue = curObj.DomOfPayType.options[curObj.DomOfPayType.selectedIndex].value;
                        return selectedValue !== "2";
                    }
                },
                Remark: {
                    required: function (element) {
                        const selectedValue = curObj.DomOfPayType.options[curObj.DomOfPayType.selectedIndex].value;
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
    }


    /* Class Variable */

    /* Page Function */
    private ReSetCarNoItems(dataObjLs) {
        const JqDomOfCarNoUNID = $(this.DomOfCarNoUNID);

        JqDomOfCarNoUNID.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.carNoUNID, false, false);
            JqDomOfCarNoUNID.append(newOption);
        });
    }

    private ReSetContractItems(dataObjLs) {
        const JqDomOfContractUNID = $(this.DomOfContractUNID);

        JqDomOfContractUNID.html('');  // 選項清空
        let defaultOption = new Option("", "", false, false);
        JqDomOfContractUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.contractName, item.contractGUID, false, false);
            JqDomOfContractUNID.append(newOption);
        });
    }

    private ShowUSProdItems() {
        let evenShowUlDom = this.DomOfEvenShow;
        let oddShowUlDom = this.DomOfOddLShow;
        evenShowUlDom.innerHTML = "";
        oddShowUlDom.innerHTML = "";


        this._prodItemList.Data.forEach((item, index) => {

            const iMinusTag = document.createElement("i");
            iMinusTag.classList.add("fas");
            iMinusTag.classList.add("fa-minus-circle");
            iMinusTag.classList.add(this.MinusPercentClassName);
            iMinusTag.style.cursor = "pointer";
            iMinusTag.style.color = "blue";
            const iPlusTag = document.createElement("i");
            iPlusTag.classList.add("fas");
            iPlusTag.classList.add("fa-plus-circle");
            iPlusTag.classList.add(this.PlusPercentClassName);
            iPlusTag.style.cursor = "pointer";
            iPlusTag.style.color = "red";

            const spanTag = document.createElement("span") as HTMLSpanElement;
            const liTag = document.createElement("li") as HTMLLIElement;
            liTag.dataset.text = item.prodText;
            liTag.textContent = `${item.prodText} \u00A0\u00A0`;
            liTag.dataset.value = item.prodId;
            // liTag.dataset.percent = this._prodItemList.length === 0 ? "90" : "10";
            spanTag.innerHTML = `\u00A0\u00A0${item.percent}%\u00A0\u00A0`;
            liTag.appendChild(iMinusTag);
            liTag.appendChild(spanTag);
            liTag.appendChild(iPlusTag);

            index % 2 === 0 ? evenShowUlDom.appendChild(liTag) :
                oddShowUlDom.appendChild(liTag)
        })
        this.ShowProdItemSummary();
    }

    private ShowProdItemSummary() {
        let allPercent = 0;
        let maxItem: PurchaseProdItem;
        this._prodItemList.Data.forEach(function (item) {
            allPercent = + item.percent + allPercent;
            if (!maxItem) {
                maxItem = item;
            } else {
                maxItem = +maxItem.percent > +item.percent ? maxItem : item;
            }
        });


        const itemSpan = document.createElement("span");
        itemSpan.innerHTML = `，已選${this._prodItemList.Data.length}項`;
        const percentSpan = document.createElement("span");
        percentSpan.innerHTML = `，比例加總:${allPercent}%`
        if (allPercent > 100)
            percentSpan.style.color = "red";
        const recognitionSpan = document.createElement("span");
        recognitionSpan.innerHTML = `認列項目 : ${maxItem?.prodText ?? "無"}`



        //let summaryInfo = `${recognitionSpan.innerHTML}${itemSpan.innerHTML}${percentSpan.innerHTML}`;

        this.DomOfTotalProdItemInfo.innerHTML = "";
        this.DomOfTotalProdItemInfo.appendChild(recognitionSpan);
        this.DomOfTotalProdItemInfo.appendChild(itemSpan);
        this.DomOfTotalProdItemInfo.appendChild(percentSpan);
    };
    private BindIngredientToDom() {
        let postDiv = this.DomOfIngredientPost;

        postDiv.innerHTML = "";


        this._prodItemList.Data.forEach((item, index) => {
            // Create a hidden input element, and append it to the li:
            let nameProperty = document.createElement("input");
            nameProperty.type = "hidden";
            nameProperty.name = `VE_PurchaseIngredientLs[${index}].ItemName`;
            nameProperty.value = item.prodText
            let valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = `VE_PurchaseIngredientLs[${index}].ProductId`;
            valueProperty.value = item.prodId;
            let percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = `VE_PurchaseIngredientLs[${index}].ItemPercent`;
            percentProperty.value = item.percent.toString();

            postDiv.append(nameProperty);
            postDiv.append(valueProperty);
            postDiv.append(percentProperty);
        })
    }

    public PlusProdItemPercent_Click(iTagDom: HTMLElement) {
        let nowITag = iTagDom;
        let nowLiTag = nowITag.parentElement as HTMLLIElement;

        let nowProdItem = this._prodItemList.Data.find(item => item.prodId === nowLiTag.dataset.value);
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    }

    public MinusProdItemPercent_Click(iTagDom: HTMLElement) {
        let nowITag = iTagDom;
        let nowLiTag = nowITag.parentElement as HTMLLIElement;

        let nowProdItem = this._prodItemList.Data.find(item => item.prodId === nowLiTag.dataset.value);
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    }

    private CaculateAllFee() {
        const thisObj = this;

        let funcRs = this.PurchasePriceAPI.GetWeightNotePrice(
            +this.DomOfFullWeight.value,
            +this.DomOfDefectiveWeight.value,
            +this.DomOfUnitPrice.value,
            Array.from(this.DomOfHasTaxList).find(item => item.checked === true).value === "True"
        );
        let funcRs2 = this.PurchasePriceAPI.GetDeliveryPrice(
            +this.DomOfFullWeight.value,
            +this.DomOfTraficUnitPrice.value
        );

        $.when(funcRs, funcRs2).then(function (data, data2) {
            thisObj.DomOfDisplayWeightPrice.textContent = data[0];
            thisObj.DomOfDispalyTraficPrice.textContent = data2[0];
            let funcRs3 = thisObj.PurchasePriceAPI.GetActualPayPrice(
                +thisObj.DomOfThirdWeightFee.value,
                data[0],
                data2[0]
            );

            $.when(funcRs3).then(function (data: number) {
                thisObj.DomOfDisplayFinalPrice.textContent = data.toLocaleString('zh-TW', {
                    style: 'currency', currency: 'TWD', minimumFractionDigits: 0
                });
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    }



}





