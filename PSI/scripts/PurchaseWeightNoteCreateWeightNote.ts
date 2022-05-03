/* Page Initialize */
// Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4',
    placeholder: "請選擇"
})
//$('.select2bs5').select2({
//    theme: 'bootstrap4',
//    placeholder: "請選擇"
//})
//$('.select2bs6').select2({
//    theme: 'bootstrap4',
//    placeholder: "請選擇"
//})


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

class PurchaseWeightNoteCreateWeightNote {
    // Base Porperites
    readonly BaseUrl: string;
    public _prodItemList: PurchaseProdItemList = new PurchaseProdItemList();
    readonly MinusPercentClassName: string = "minus-percent"
    readonly PlusPercentClassName: string = "plus-percent"

    // For Post


    // References  
    private CustomerAPI: CustomerAPIClass;
    //public SysConfigPageHelper: SysConfigPageHelper;



    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
    }

    /* Field Doms */
    public DomOfCustomerId = document.getElementById('CustomerUNID') as HTMLSelectElement;
    public DomOfCustomerName = document.getElementById('CustomerName') as HTMLInputElement;
    public DomOfCarNo = document.getElementById('CarNo') as HTMLInputElement;
    public DomOfCanNoUNID = document.getElementById('CanNoUNID') as HTMLSelectElement;
    public DomOfCreateForm = document.getElementById('creaet-form') as HTMLFormElement;
    public DomOfFormCreate = document.getElementById('form_create') as HTMLButtonElement;
    public DomOfUserSelectProditem = document.getElementById('user-select-proditem') as HTMLSelectElement;
    public DomOfEvenShow = document.getElementById('evenProductLs') as HTMLUListElement;
    public DomOfOddLShow = document.getElementById('oddProductLs') as HTMLUListElement;
    public DomOfTotalProdItemInfo = document.getElementById('total') as HTMLHeadingElement;
    public DomOfIngredientPost = document.getElementById('ingredientPost') as HTMLDivElement;



    //-----old
    public DomOfShowEditCompanyName = document.getElementById('show-edit-companyName') as HTMLSpanElement;


    /* Class Variable */

    /* Page Function */
    private ReSetCarNoItems(dataObjLs) {
        const JqDomOfCarNoUNID = $(this.DomOfCanNoUNID);

        JqDomOfCarNoUNID.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        JqDomOfCarNoUNID.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.id, false, false);
            JqDomOfCarNoUNID.append(newOption);
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



    public PageEventInit() {
        const curObj = this;



        /* Page Events */
        // 表單建立
        $(curObj.DomOfFormCreate).on('click', function () {
            $("#dialog-confirm").dialog("open");
        })

        // 進貨對象
        $(curObj.DomOfCustomerId).on('change', function () {
            const selectedText = curObj.DomOfCustomerId.options[curObj.DomOfCustomerId.selectedIndex].text;
            const selectedValue = curObj.DomOfCustomerId.options[curObj.DomOfCustomerId.selectedIndex].value;

            curObj.DomOfCustomerName.value = "";
            curObj.DomOfCarNo.value = ""; // 車牌名稱清空

            if (curObj.DomOfCustomerId &&
                selectedValue === "0") {  // 新客戶
                curObj.DomOfCustomerName.readOnly = false;
                curObj.ReSetCarNoItems([]);
            } else {
                curObj.DomOfCustomerName.readOnly = true;
                curObj.DomOfCustomerName.value = selectedText;
                let funcRs = curObj.CustomerAPI.GetCarNoItemsBy(selectedValue);
                $.when(funcRs).then(function (data) {
                    curObj.ReSetCarNoItems(data);
                });
            }
        });

        // 客戶車牌
        $(curObj.DomOfCanNoUNID).on('change', function () {
            const selectedText = curObj.DomOfCanNoUNID.options[curObj.DomOfCanNoUNID.selectedIndex].text;
            const selectedValue = curObj.DomOfCanNoUNID.options[curObj.DomOfCanNoUNID.selectedIndex].value;

            curObj.DomOfCarNo.value = "";

            if (curObj.DomOfCanNoUNID &&
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

    }

    public PageValidateInit() {
        const curObj = this;
        // Form Validation
        $(curObj.DomOfCreateForm).validate({
            submitHandler: function (form) {
                form.submit();
            },
            ignore: "", // 要檢查Hidden欄位要加這個
            rules: {
                FullWeightTime: "required",
                CustomerUNID: "required",
                /*     SelectPurchaseDetailInfos: "required",*/
                "VE_PurchaseWeightNote.ScaleNo": "required",
                "VE_PurchaseWeightNote.HasTax": "required",
                "VE_PurchaseWeightNote.CarNoId": "required",
                "VE_PurchaseWeightNote.CustomerName": {
                    required: function (element) {
                        return $("#VE_PurchaseWeightNote_CustomerId").val() === "0";
                    }
                },
                "VE_PurchaseWeightNote.CarNo": {
                    required: function (element) {
                        return $("#VE_PurchaseWeightNote_CarNoId").val() === "0";
                    }
                },
                "VE_PurchaseWeightNote.FullWeight": {
                    required: true,
                    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                },
                "VE_PurchaseWeightNote.DefectiveWeight": {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
                },
                "VE_PurchaseWeightNote.UnitPrice": {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                "VE_PurchaseWeightNote.TraficUnitPrice": {
                    required: true,
                    pattern: /^([1-9][0-9]*(\.[0-9]{1,2})?|0\.(?!0+$)[0-9]{1,2})$/  // 格式不符，需為大於0整數 且 最多2位小數!!
                },
                "VE_PurchaseWeightNote.ThirdWeightFee": {
                    required: true,
                    pattern: /0|^\+?[1-9][0-9]*$/  // 大於或等於0的正整數
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    required: true,
                //    pattern: /^\+?[1-9][0-9]*$/  // 大於0的正整數
                //}
            },
            messages: {
                "VE_PurchaseWeightNote.FullWeight": {
                    pattern: "必須為大於0的正整數"
                },
                "VE_PurchaseWeightNote.DefectiveWeight": {
                    pattern: "必須為大於或等於0的正整數"
                },
                "VE_PurchaseWeightNote.UnitPrice": {
                    pattern: "必須為大於0整數 且 最多2位小數"
                },
                "VE_PurchaseWeightNote.TraficUnitPrice": {
                    pattern: "必須為大於0整數 且 最多2位小數"
                },
                "VE_PurchaseWeightNote.ThirdWeightFee": {
                    pattern: "必須為大於或等於0的正整數"
                }
                //"VE_PurchaseWeightNote.ActualPrice": {
                //    pattern: "實付金額必須為大於0"
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
    }

}





