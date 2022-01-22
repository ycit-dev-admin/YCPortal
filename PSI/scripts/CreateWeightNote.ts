class CreateWeightNotePageClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
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

    public ReSetCarNoItems(carNoIdObj: JQuery<HTMLElement>, dataObjLs) {
        carNoIdObj.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        carNoIdObj.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.id, false, false);
            carNoIdObj.append(newOption);
        });
    }


    public ShowList() {

        // 傳入結果 根據結果檢查是否為新增不為新增的則Pass，不再保留清單的則移除


        //let userSelect = ($('.select2bs4').find(':selected').get() as HTMLSelectElement[]);
        // User畫面所選
        let userSelect = $('.select2bs4').find(':selected').toArray() as HTMLSelectElement[];

        // 準備要Show
        let showList = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray()) as HTMLLIElement[];



        // 要新增的就新增
        userSelect.filter(item => {
            return showList.map(litag => litag.dataset.value).indexOf(item.value) === -1;
        }).forEach((item) => this.AppendToShowList(item));
        // 要刪除的就刪除    
        showList.filter(litag => {
            return userSelect.map(item => item.value).indexOf(litag.dataset.value) === -1;
        }).forEach(item => item.remove());
    }


    public ShowList2(userSelectedVals: string[],
        evenProductLiTagLs: HTMLLIElement[],
        oddProductLiTagLs: HTMLLIElement[]) {

        // 傳入結果 根據結果檢查是否為新增不為新增的則Pass，不再保留清單的則移除


        // User畫面所選
        let userSelect = $('.select2bs4').find(':selected').toArray();
        let userSelect2 = ($('.select2bs4').find(':selected').toArray() as HTMLOptionElement[])
            .map(item => item.value);



        // 差集
        // 要新增的就新增
        //userSelect.filter(item => {
        //    return showList.map(litag => litag.dataset.value).indexOf(item.value) === -1;
        //}).forEach((item) => this.AppendToShowList(item));



        console.log(userSelect2);

    }

    public GetShowProdItemIds(testPostObj: JQuery<HTMLDivElement>): string[] {

        const allShowList = $("#evenProductLs li").toArray().concat(
            $("#oddProductLs li").toArray()) as HTMLLIElement[];

        if (allShowList) {
            //let abc3 = allShowList.filter((item, index) => {
            //    valueProperty.value = theLi.
            //    return item.name.includes("ProductId");
            //}).map(item => item.value);

            let abc3 = allShowList.map(item => { return item.dataset.value })

            return abc3
        }

        //let shoList = testPostObj.find('input').toArray();
        //if (shoList) {

        //    let abc2 = shoList.filter((item, index) => {
        //        return item.name.includes("ProductId");
        //    }).map(item => item.value);


        //    //let abc = shoList.map((item, index) => {
        //    //    return (item.name.querySelector(`input[name="VE_PurchaseIngredientLs[${index}].ProductId"`) as HTMLInputElement).value;
        //    //})

        //    return abc2;
        //}
    }


    public AppendToShowList(prodItem: HTMLSelectElement) {
        const allShowList = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray());


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
        liTag.dataset.text = prodItem.textContent;
        liTag.textContent = `${prodItem.textContent} \u00A0\u00A0`;
        liTag.dataset.value = prodItem.value.toString();
        liTag.dataset.percent = allShowList.length === 0 ? "90" : "10";
        liTag.appendChild(iMinusTag);
        liTag.appendChild(spanTag);
        liTag.appendChild(iPlusTag);


        //AddHidden(liTag, index);

        // Action    
        const showList = allShowList.length % 2 === 0 ?
            document.getElementById("evenProductLs") :
            document.getElementById("oddProductLs");
        showList?.appendChild(liTag);

        let allShowList2 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray())
        allShowList2.forEach((item, index) => {
            Array.from(item.getElementsByTagName('input')).forEach(subItem => {
                subItem.remove();
            });

            // AddHidden(item as HTMLLIElement, index);
        });

        //Event
        let thisObj = this;
        iMinusTag.addEventListener('click', function () {
            let nowLITag = this.parentElement as HTMLLIElement;
            thisObj.CaculatePercent(nowLITag, false);
            thisObj.RefreshProdItemPercent();
            thisObj.ShowTotalInfo();
            thisObj.SetBindingValue();
            let allShowList3 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray())
            allShowList3.forEach((item, index) => {
                Array.from(item.getElementsByTagName('input')).forEach(subItem => {
                    subItem.remove();
                });

                thisObj.AddHidden(item as HTMLLIElement, index);
            });
        });

        iPlusTag.addEventListener('click', function () {
            let nowLITag = this.parentElement as HTMLLIElement
            thisObj.CaculatePercent(nowLITag, true);
            thisObj.RefreshProdItemPercent();
            thisObj.ShowTotalInfo();
            thisObj.SetBindingValue();
            let allShowList4 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray())
            allShowList4.forEach((item, index) => {
                Array.from(item.getElementsByTagName('input')).forEach(subItem => {
                    subItem.remove();
                });

                thisObj.AddHidden(item as HTMLLIElement, index);
            });
        });
    };

    public AppendToShowList2(prodItem: HTMLSelectElement) {
    };

    public RefreshProdItemPercent() {
        let allProdItems = $('#evenProductLs li').toArray().concat(
            $('#oddProductLs li').toArray()) as HTMLLIElement[];

        allProdItems.forEach(function (item) {
            let spanTag = item.querySelector("span");
            spanTag.innerHTML = `\u00A0\u00A0${item.dataset.percent}%\u00A0\u00A0`
        });
    }

    public AddHidden(theLi: HTMLLIElement, index: number) {
        // Create a hidden input element, and append it to the li:
        let nameProperty = document.createElement("input");
        nameProperty.className = "modelbind"
        nameProperty.type = "hidden";
        nameProperty.name = `VE_PurchaseIngredientLs[${index}].ItemName`;
        nameProperty.value = theLi.dataset.text
        let valueProperty = document.createElement("input");
        nameProperty.className = "modelbind"
        valueProperty.type = "hidden";
        valueProperty.name = `VE_PurchaseIngredientLs[${index}].ProductId`;
        valueProperty.value = theLi.dataset.value
        let percentProperty = document.createElement("input");
        nameProperty.className = "modelbind"
        percentProperty.type = "hidden";
        percentProperty.name = `VE_PurchaseIngredientLs[${index}].ItemPercent`;
        percentProperty.value = theLi.dataset.percent

        theLi.appendChild(nameProperty);
        theLi.appendChild(valueProperty);
        theLi.appendChild(percentProperty);
    }

    public ShowTotalInfo() {
        let allProdItems = $('#evenProductLs li').toArray().concat(
            $('#oddProductLs li').toArray()) as HTMLLIElement[];

        let allPercent = 0;
        let maxItem: HTMLLIElement;
        allProdItems.forEach(function (item) {
            allPercent = + item.dataset.percent + allPercent;
            if (!maxItem) {
                maxItem = item;
            } else {
                maxItem = +maxItem.dataset.percent > +item.dataset.percent ? maxItem : item;
            }
        });

        const totalInfo = document.getElementById("total");
        totalInfo.querySelectorAll("span").forEach(item => { item.remove() });

        const itemSpan = document.createElement("span");
        itemSpan.innerHTML = `，已選${allProdItems.length}項`;
        const percentSpan = document.createElement("span");
        percentSpan.innerHTML = `，比例加總:${allPercent}%`
        if (allPercent > 100)
            percentSpan.style.color = "red";
        const recognitionSpan = document.createElement("span");

        //let haha = document.querySelector('.select2bs4 :checked') as HTMLOptionElement;
        //alert(haha.value);

        //let recognitionText = ($('.select2bs4').find(':selected').toArray() as HTMLSelectElement[])
        //    .filter(item => { return item.value === maxItem.dataset.value; })[0]?.textContent ?? "無";
        recognitionSpan.innerHTML = `認列項目 : ${maxItem?.dataset.text ?? "無"}`

        totalInfo.appendChild(recognitionSpan);
        totalInfo.appendChild(itemSpan);
        totalInfo.appendChild(percentSpan);

        if (allProdItems.length > 0)
            $('#IsPassPurchase').val("true");
        else
            $('#IsPassPurchase').val("false");
    }

    public SetBindingValue() {

        let allProdItems = $('#evenProductLs li').toArray().concat(
            $('#oddProductLs li').toArray()) as HTMLLIElement[];

        let purchaseDetailInfos: PurchaseDetailInfo2[] = [];
        allProdItems.forEach(function (item) {
            let purchaseDetailInfo = new PurchaseDetailInfo2();
            purchaseDetailInfo.Value = item.dataset.value;
            purchaseDetailInfo.Name = item.textContent;
            purchaseDetailInfo.Percent = parseInt(item.dataset.percent, 10);
            purchaseDetailInfos.push(purchaseDetailInfo);
        });
        if (purchaseDetailInfos.length === 0)
            $('#SelectPurchaseDetailInfos').val(null);
        else {
            $('#SelectPurchaseDetailInfos').val(JSON.stringify(purchaseDetailInfos));
        }

    }

    public CaculatePercent(curProdItem: HTMLLIElement, isPlus: boolean) {
        const curVal = curProdItem.dataset.percent;
        let newVal: number = isPlus ? +curVal + 10 : +curVal - 10;
        if (newVal > 100)
            newVal = 100;
        if (newVal < 0)
            newVal = 0;
        curProdItem.dataset.percent = newVal.toString();
        //var el = document.getElementById("outside");
        //el.addEventListener("click", modifyText, false);
    }
};

class PurchaseDetailInfo2 {
    Value: string;
    Name: string;
    Percent: number;

    constructor() {
    }
}






