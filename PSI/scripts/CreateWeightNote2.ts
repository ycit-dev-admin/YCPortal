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
    // Page  Dom
    public EvenULDom: HTMLUListElement = $('#evenProductLs').get(0) as HTMLUListElement;
    public OddLULDom: HTMLUListElement = $('#oddProductLs').get(0) as HTMLUListElement;


    // Porperites
    private _prodItemList: PurchaseProdItem[] = [];





    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }

    public ShowUSProdItems() {
        this.EvenULDom.innerHTML = "";
        this.OddLULDom.innerHTML = "";
        this._prodItemList.forEach((item, index) => {

            const iMinusTag = document.createElement("i");
            iMinusTag.classList.add("fas");
            iMinusTag.classList.add("fa-minus-circle");
            iMinusTag.style.cursor = "pointer";
            iMinusTag.style.color = "blue";
            const iPlusTag = document.createElement("i");
            iPlusTag.classList.add("fas");
            iPlusTag.classList.add("fa-plus-circle");
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

            index % 2 === 0 ? this.EvenULDom.appendChild(liTag) :
                this.OddLULDom.appendChild(liTag)
        })
    }

    public Append(prodId: string, prodText: string) {
        const isItemExist = this._prodItemList.filter(item => item.prodId === prodId).length > 0;
        if (!isItemExist) {
            let prodItem = new PurchaseProdItem(prodId, prodText, this._prodItemList.length === 0 ? 90 : 10);
            this._prodItemList.push(prodItem);
        }
    }


};

class PurchaseProdItem {
    readonly prodId: string;
    readonly prodText: string;
    readonly percent: number;

    constructor(prodId: string, prodText: string, percent: number) {
        this.prodId = prodId;
        this.prodText = prodText;
        this.percent = percent;
    }


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









