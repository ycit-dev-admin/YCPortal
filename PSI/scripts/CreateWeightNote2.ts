class CreateWeightNotePage_Main {
    // Porperites
    public ProdList: CreateWeightNotePage_ProdList;




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.ProdList = new CreateWeightNotePage_ProdList("evenProductLs", "oddProductLs");
    }


    public IniPageEvent() {
        // Page Field
        let fullWeight = $('#VE_PurchaseWeightNote_FullWeightTime').get(0);
        let defectiveWeight = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0);
        let unitPrice = $('#VE_PurchaseWeightNote_UnitPrice').get(0);
        let traficUnitPrice = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0);
        let weightFee = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0);
        let ishasTaxList = $(".ishas_tax").get();

        // Logic        
        //fullWeight.addEventListener('keyup', this.CaculateAllFee);
        //defectiveWeight.addEventListener('keyup', this.CaculateAllFee);
        //unitPrice.addEventListener('keyup', this.CaculateAllFee);
        //traficUnitPrice.addEventListener('keyup', this.CaculateAllFee);
        //weightFee.addEventListener('keyup', this.CaculateAllFee);
        //ishasTaxList.forEach((item) => item.addEventListener('change', this.CaculateAllFee));
    };


};

class CreateWeightNotePage_Main2 {
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





    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    /* Action */
    public USProdItem_Change() {
        let usProdItemDoms = this.UsProdItem_JqSelectDom.find(':selected').toArray() as HTMLOptionElement[];

        // User所選
        usProdItemDoms.forEach(item => {
            this._prodItemList.AppendToProdItemList(item.value, item.text);
        })

        // 要刪除的
        this._prodItemList.Data.filter(showItem => {
            return !(usProdItemDoms.map(usItem => usItem.value).includes(showItem.prodId));
        }).forEach(showItem => this._prodItemList.RemoveOfProdItemList(showItem.prodId));

        // pageMain.ProdList.RefreshProdItemPercent();
        this.ShowUSProdItems();

    }

    public PlusProdItemPercent_Click(iTagDom: HTMLElement) {
        let nowITag = iTagDom;
        let nowLiTag = nowITag.parentElement as HTMLLIElement;

        let nowProdItem = this._prodItemList.Data.find(item => item.prodId === nowLiTag.dataset.value);
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
    }

    public MinusProdItemPercent_Click(iTagDom: HTMLElement) {
        let nowITag = iTagDom;
        let nowLiTag = nowITag.parentElement as HTMLLIElement;

        let nowProdItem = this._prodItemList.Data.find(item => item.prodId === nowLiTag.dataset.value);
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
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
}



class CreateWeightNotePage_ProdList {
    public EvenListHtmlObj: HTMLUListElement;
    public EvenListJQueryObj: JQuery<HTMLUListElement>;
    public OddListHtmlObj: HTMLUListElement;
    public OddListJQueryObj: JQuery<HTMLUListElement>;
    private AllProdItemLs: HTMLLIElement[];
    readonly CalPercentClassName: string = "testHaha";


    constructor(evenListId: string, oddListId: string) {
        this.EvenListJQueryObj = $(`#${evenListId}`)
        this.EvenListHtmlObj = this.EvenListJQueryObj.get(0);
        this.OddListJQueryObj = $(`#${oddListId}`)
        this.OddListHtmlObj = this.OddListJQueryObj.get(0);
        this.AllProdItemLs = this.EvenListJQueryObj.find('li').toArray().concat(
            this.OddListJQueryObj.find('li').toArray())
    }

    public Show() {
        this.EvenListHtmlObj.innerHTML = "";
        this.OddListHtmlObj.innerHTML = "";
        this.AllProdItemLs.forEach((item, index) => {
            index % 2 === 0 ? this.EvenListHtmlObj.appendChild(item) :
                this.OddListHtmlObj.appendChild(item)
        })
    }


    public Append(prodItemVal: string, prodItemText: string) {
        let thisObj = this;
        //alert(this.EvenListHtmlObj.id);
        //alert(this.OddListHtmlObj.id);

        //let evenLiTags = this.EvenListJQueryObj.find('li').toArray();
        //let oddLiTags = this.OddListJQueryObj.find('li').toArray();

        ////// $("#oddProductLs li").toArray()
        //const allShowLiTags = evenLiTags.concat(oddLiTags);

        //if (allShowLiTags)
        //    alert(allShowLiTags.map(item => { return item.dataset.value }))

        const isItemExist = this.AllProdItemLs.filter(item => item.dataset.value === prodItemVal).length > 0;
        if (!isItemExist) {
            const iMinusTag = document.createElement("i");
            iMinusTag.classList.add("fas");
            iMinusTag.classList.add("fa-minus-circle");
            iMinusTag.classList.add(this.CalPercentClassName);
            iMinusTag.style.cursor = "pointer";
            iMinusTag.style.color = "blue";
            const iPlusTag = document.createElement("i");
            iPlusTag.classList.add("fas");
            iPlusTag.classList.add("fa-plus-circle");
            iPlusTag.classList.add(this.CalPercentClassName);
            iPlusTag.style.cursor = "pointer";
            iPlusTag.style.color = "red";

            const spanTag = document.createElement("span") as HTMLSpanElement;
            const liTag = document.createElement("li") as HTMLLIElement;
            liTag.dataset.text = prodItemText;
            liTag.textContent = `${prodItemText} \u00A0\u00A0`;
            liTag.dataset.value = prodItemVal;
            liTag.dataset.percent = this.AllProdItemLs.length === 0 ? "90" : "10";
            spanTag.innerHTML = thisObj.GetPercentResult(liTag.dataset.percent)  // new
            liTag.appendChild(iMinusTag);
            liTag.appendChild(spanTag);
            liTag.appendChild(iPlusTag);




            //Event  下面的事件要拉到主頁去做  2個事件

            iMinusTag.addEventListener('click', function () {
                let nowLITag = this.parentElement as HTMLLIElement;
                let newPercent: number = +nowLITag.dataset.percent - 10;
                nowLITag.dataset.percent = newPercent < 0 ? "0" : newPercent.toString();
                let spanTag = nowLITag.querySelector("span");
                spanTag.innerHTML = thisObj.GetPercentResult(nowLITag.dataset.percent);
                //thisObj.RefreshProdItemPercent();
                //thisObj.ShowTotalInfo();
                //thisObj.SetBindingValue();        在完成這個         
            });

            iPlusTag.addEventListener('click', function () {
                let nowLITag = this.parentElement as HTMLLIElement;
                let newPercent: number = +nowLITag.dataset.percent + 10;
                nowLITag.dataset.percent = newPercent > 100 ? "100" : newPercent.toString();
                let spanTag = nowLITag.querySelector("span");
                spanTag.innerHTML = thisObj.GetPercentResult(nowLITag.dataset.percent);
                //thisObj.RefreshProdItemPercent();
                //thisObj.ShowTotalInfo();  // 變成取得字串資訊的方法
                //thisObj.SetBindingValue();  // 變成回傳input tag集合 然後再上層自行決定加在哪個Tag
            });

            // Action    
            this.AllProdItemLs.push(liTag);
        }



    }

    public GetPercentResult(percentStr: string): string {
        return `\u00A0\u00A0${percentStr}%\u00A0\u00A0`
    }

    public Remove(prodItemVal: string) {
        let wRemoveItem = this.AllProdItemLs.find(item => item.dataset.value === prodItemVal);
        this.AllProdItemLs.splice(this.AllProdItemLs.indexOf(wRemoveItem), 1);
    }


    public RefreshProdItemPercent() {
        this.AllProdItemLs.forEach(function (item) {
            let spanTag = item.querySelector("span");
            spanTag.innerHTML = `\u00A0\u00A0${item.dataset.percent}%\u00A0\u00A0`
        });
    }

    public GetTotalInfoMsg(): string {

        let allPercent = 0;
        let maxItem: HTMLLIElement;
        this.AllProdItemLs.forEach(function (item) {
            allPercent = + item.dataset.percent + allPercent;
            if (!maxItem) {
                maxItem = item;
            } else {
                maxItem = +maxItem.dataset.percent > +item.dataset.percent ? maxItem : item;
            }
        });



        const itemSpan = document.createElement("span");
        itemSpan.innerHTML = `，已選${this.AllProdItemLs.length}項`;
        const percentSpan = document.createElement("span");
        percentSpan.innerHTML = `，比例加總:${allPercent}%`
        if (allPercent > 100)
            percentSpan.style.color = "red";
        const recognitionSpan = document.createElement("span");

        recognitionSpan.innerHTML = `認列項目 : ${maxItem?.dataset.text ?? "無"}`



        return `${recognitionSpan.innerHTML}${itemSpan.innerHTML}${percentSpan.innerHTML}`


        //if (this.AllProdItemLs.length > 0)
        //    $('#IsPassPurchase').val("true");
        //else
        //    $('#IsPassPurchase').val("false");
    }
}









