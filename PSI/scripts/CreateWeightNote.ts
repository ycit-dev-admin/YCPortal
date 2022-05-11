class CreateWeightNotePage_Main {
    // Porperites
    readonly BaseUrl: string;
    public _prodItemList: PurchaseProdItemList = new PurchaseProdItemList();
    readonly MinusPercentClassName: string = "minus-percent"
    readonly PlusPercentClassName: string = "plus-percent"

    // Page  Dom
    public EvenShow_JqUlDom: JQuery<HTMLUListElement> = $('#evenProductLs');
    public OddLShow_JqUlDom: JQuery<HTMLUListElement> = $('#oddProductLs');
    public UsProdItem_JqSelectDom: JQuery<HTMLSelectElement> = $('#user-select-proditem');
    public TotalProdItemInfo_JqSelectDom: JQuery<HTMLHeadingElement> = $('#total');
    public ingredientPost_JqDivDom: JQuery<HTMLDivElement> = $('#ingredientPost');
    public CustomerId_JqSelectDom: JQuery<HTMLSelectElement> = $('#VE_PurchaseWeightNote_CustomerId');
    public CustomerName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CustomerName');
    public CarNoId_JqSelectDom: JQuery<HTMLElement> = $('#VE_PurchaseWeightNote_CarNoId');
    public CarName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CarNo');
    public FullWeight_Dom = $('#VE_PurchaseWeightNote_FullWeight').get(0) as HTMLInputElement;
    public DefectiveWeight_DOM = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0) as HTMLInputElement;
    public UnitPrice_DOM = $('#VE_PurchaseWeightNote_UnitPrice').get(0) as HTMLInputElement;
    public TraficUnitPrice_DOM = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0) as HTMLInputElement;
    public ThirdWeightFee_DOM = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0) as HTMLInputElement;
    public HasTaxList = $(".ishas_tax").get() as HTMLInputElement[];
    public DisplayFinalPrice_DOM = $('#show_final_price').get(0) as HTMLHeadingElement;
    public DisplayWeightPrice_DOM = $('#show_weight_price').get(0) as HTMLDivElement;
    public DispalyTraficPrice_DOM = $('#show_trafic_price').get(0) as HTMLDivElement;
    public ActualPrice_DOM = $('#VE_PurchaseWeightNote_ActualPrice').get(0) as HTMLInputElement;

    // WebAPI
    private CustomerAPI: CustomerAPIClass;
    private PurchasePriceAPI: PurchasePriceAPIClass;



    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.PurchasePriceAPI = new PurchasePriceAPIClass(this.BaseUrl);
    }


    /* Action */
    public USProdItem_Change() {
        let usProdItemDoms = this.UsProdItem_JqSelectDom.find(':selected').toArray() as HTMLOptionElement[];

        // User所選
        usProdItemDoms.forEach(item => {
            this._prodItemList.Append(item.value, item.text);
        })

        // 要刪除的
        this._prodItemList.Data.filter(showItem => {
            return !(usProdItemDoms.map(usItem => usItem.value).includes(showItem.prodId));
        }).forEach(showItem => this._prodItemList.RemoveByProdId(showItem.prodId));

        // pageMain.ProdList.RefreshProdItemPercent();
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    }
    public CustomerId_Change() {
        const thisObj = this;

        this.CustomerName_JqInputDom.val("");
        this.CarName_JqInputDom.val(""); // 車牌名稱清空

        if (this.CustomerId_JqSelectDom &&
            this.CustomerId_JqSelectDom.find(':selected').val() === "0") {  // 新客戶
            this.CustomerName_JqInputDom.removeAttr("readonly");
            thisObj.ReSetCarNoItems([]);
        } else {
            this.CustomerName_JqInputDom.attr("readonly", "readonly");
            this.CustomerName_JqInputDom.val(this.CustomerId_JqSelectDom.find(':selected').text());
            let funcRs = this.CustomerAPI.GetCarNoItemsBy(this.CustomerId_JqSelectDom.find(':selected').val().toString());
            $.when(funcRs).then(function (data) {
                thisObj.ReSetCarNoItems(data);
            });
        }
    }

    public CarNoId_Change() {

        this.CarName_JqInputDom.val("");
        if (this.CarNoId_JqSelectDom &&
            this.CarNoId_JqSelectDom.find(':selected').val() === "0") {
            this.CarName_JqInputDom.removeAttr("readonly");
        } else {
            this.CarName_JqInputDom.attr("readonly", "readonly");
            this.CarName_JqInputDom.val(this.CarNoId_JqSelectDom.find(':selected').text());
        }
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

    public FullWeight_Keyup() {
        this.CaculateAllFee();
    }
    public DefectiveWeight_Keyup() {
        this.CaculateAllFee();
    }
    public UnitPrice_Keyup() {
        this.CaculateAllFee();
    }
    public HasTax_Change() {
        this.CaculateAllFee();
    }
    public TraficUnitPrice_Keyup() {
        this.CaculateAllFee();
    }
    public ThirdWeightFee_Keyup() {
        this.CaculateAllFee();
    }

    /* Page Function */

    private ShowUSProdItems() {
        let evenShowUlDom = this.EvenShow_JqUlDom.get(0);
        let oddShowUlDom = this.OddLShow_JqUlDom.get(0);
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

        this.TotalProdItemInfo_JqSelectDom.get(0).innerHTML = "";
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(recognitionSpan);
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(itemSpan);
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(percentSpan);
    };

    private BindIngredientToDom() {
        let postDiv = this.ingredientPost_JqDivDom.get(0);

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

    private ReSetCarNoItems(dataObjLs) {
        const thisPagObj = this;
        thisPagObj.CarNoId_JqSelectDom.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.id, false, false);
            thisPagObj.CarNoId_JqSelectDom.append(newOption);
        });
    }

    private CaculateAllFee() {
        const thisObj = this;

        let funcRs = this.PurchasePriceAPI.GetWeightNotePrice(
            +this.FullWeight_Dom.value,
            +this.DefectiveWeight_DOM.value,
            +this.UnitPrice_DOM.value,
            this.HasTaxList.find(item => item.checked === true).value === "True"
        );
        let funcRs2 = this.PurchasePriceAPI.GetDeliveryPrice(
            +this.FullWeight_Dom.value,
            +this.TraficUnitPrice_DOM.value
        );

        $.when(funcRs, funcRs2).then(function (data, data2) {
            thisObj.DisplayWeightPrice_DOM.textContent = data[0];
            thisObj.DispalyTraficPrice_DOM.textContent = data2[0];
            let funcRs3 = thisObj.PurchasePriceAPI.GetActualPayPrice(
                +thisObj.ThirdWeightFee_DOM.value,
                data[0],
                data2[0]
            );

            $.when(funcRs3).then(function (data) {
                thisObj.DisplayFinalPrice_DOM.textContent = data;
                // thisObj.ActualPrice_DOM.value = data; 應該把上述值 都帶回後端重新計算
            });
        });
    }
}

