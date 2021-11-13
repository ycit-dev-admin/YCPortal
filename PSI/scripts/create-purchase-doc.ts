﻿class PageClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public IniPageEvent() {
        // Page Field
        let fullWeight = $("#FullWeight").get(0);
        let defectiveWeight = $("#DefectiveWeight").get(0);
        let unitPrice = $("#UnitPrice").get(0);
        let traficUnitPrice = $("#TraficUnitPrice").get(0);
        let weightFee = $("#ThirdWeightFee").get(0);
        let ishasTaxList = $(".ishas_tax").get();

        // Logic        
        fullWeight.addEventListener('keyup', this.CaculateAllFee);
        defectiveWeight.addEventListener('keyup', this.CaculateAllFee);
        unitPrice.addEventListener('keyup', this.CaculateAllFee);
        traficUnitPrice.addEventListener('keyup', this.CaculateAllFee);
        weightFee.addEventListener('keyup', this.CaculateAllFee);
        ishasTaxList.forEach((item) => item.addEventListener('change', this.CaculateAllFee));
    };

    public ShowCustomerName() {
        // Page Field
        let customerId = $("#CustomerId");
        let customerName = $("#CustomerName");

        // Vars
        let optionObj = customerId.find(':selected');

        // Logic
        customerName.val("");
        if (optionObj.val() === "0") {
            customerName.removeAttr("readonly");
        } else {
            customerName.attr("readonly", "readonly");
            customerName.val(optionObj.text());
        }
    }

    public SetCarNoItems(): JQuery.jqXHR {
        // Page Field
        let customerId = $("#CustomerId");
        let carNoId = $("#CarNoId");

        // Vars               
        const optionObj = customerId.find(':selected');
        const getUrl2 = `${this.BaseUrl}/api/CustomerCars`;
        //const getUrl = `${this.BaseUrl}/api/CustomerCars?customerId=${encodeURIComponent(optionObj.val().toString())}`;

        // Logic

        return $.get(getUrl2, { customerId: encodeURIComponent(optionObj.val().toString()) }).done(function (data) {
            // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
            // contractFromList.remove();
            console.log("wow_2")
            carNoId.html('');
            let defaultOption = new Option("0.新車牌", "0", false, false);
            carNoId.append(defaultOption);
            data.forEach(function (item) {
                let newOption = new Option(item.carName, item.id, false, false);
                carNoId.append(newOption);
                //.trigger('change');
                //let test = document.createElement("option") as HTMLOptionElement;
                //test.value = user.id;
                //test.text = user.contractName;
                //console.log(test);
                //contractFromList.append(test);
            });
        });


        // 取得車牌內容 透過API 
        //fetch(getUrl)
        //    .then((response) => {
        //        console.log(response)
        //        return response.json()
        //        //return response.text()
        //    }).then((myJson) => {
        //        // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
        //        // contractFromList.remove();
        //        carNoId.html('');
        //        let defaultOption = new Option("0.新車牌", "0", false, false);
        //        carNoId.append(defaultOption);
        //        myJson.forEach(function (item) {
        //            let newOption = new Option(item.carName, item.id, false, false);
        //            carNoId.append(newOption);
        //            //.trigger('change');
        //            //let test = document.createElement("option") as HTMLOptionElement;
        //            //test.value = user.id;
        //            //test.text = user.contractName;
        //            //console.log(test);
        //            //contractFromList.append(test);
        //        });

        //        carNoId.val(null)
        //    })



    }

    public ShowCarNoName() {
        // Page Field
        let carNoId = $("#CarNoId");
        let carName = $("#CarNo");

        // Logic 
        let carNoIdObj = carNoId.find(':selected');
        carName.val("");
        if (carNoIdObj.val() === "0") {
            carName.removeAttr("readonly");
        } else {
            carName.attr("readonly", "readonly");
            carName.val(carNoIdObj.text());
        }
    }

    public CaculateAllFee() {
        //let haha = new FormData();
        let fullWeight = (document.getElementById("FullWeight") as HTMLInputElement).value // 進場重量
        let defectiveWeight = (document.getElementById("DefectiveWeight") as HTMLInputElement).value // 扣重
        let unitPrice = (document.getElementById("UnitPrice") as HTMLInputElement).value // 單價
        let isHasTax = $('.ishas_tax:checked').val() === "True" ? 1.05 : 1;  // 是否含稅 (radio button 沒有 name attribute 所以用)
        let traficUnitPrice = (document.getElementById("TraficUnitPrice") as HTMLInputElement).value // 運費單價
        let weightFee = (document.getElementById("ThirdWeightFee") as HTMLInputElement).value

        // 計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        //let weightFee = (+fullWeight - (+defectiveWeight));
        let weightPrice = (+fullWeight - (+defectiveWeight)) * (+unitPrice) * isHasTax;
        (document.getElementById("show_weight_price") as HTMLDivElement).textContent = !weightPrice || weightPrice < 0 ? "0" : weightPrice.toFixed(2).toString();

        // 運費 = 進廠重量 * 運費單價
        let traficPrice = (+fullWeight) * (+traficUnitPrice);
        (document.getElementById("show_trafic_price") as HTMLDivElement).textContent = !traficPrice || traficPrice < 0 ? "0" : traficPrice.toString();

        // 總金額 = (磅費 + 計價金額 + 運費)
        let finalPrice = (+weightFee) + weightPrice + traficPrice;
        (document.getElementById("show_final_price") as HTMLDivElement).textContent = !finalPrice || finalPrice < 0 ? "0" : Math.round(finalPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        $("#ActualPrice").val(Math.round(finalPrice));

    }
};



class PurchaseDetailInfo {
    Value: string;
    Name: string;
    Percent: number;

    constructor() {
    }
}

$('#CustomerId').on('change', function () {

    // 變更簽約單的Select內容 透過API
    fetch(`${window.location.origin}/api/CustomerContracts`)
        .then((response) => {
            console.log(response)
            return response.json()
            //return response.text()
        }).then((myJson) => {
            // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
            // contractFromList.remove();
            $("#ContractFrom").html('');
            myJson.forEach(function (item) {
                let newOption = new Option(item.contractName, item.id, false, false);
                $('#ContractFrom').append(newOption);
                //.trigger('change');
                //let test = document.createElement("option") as HTMLOptionElement;
                //test.value = user.id;
                //test.text = user.contractName;
                //console.log(test);
                //contractFromList.append(test);
            });

            $('#ContractFrom').val(null)
        })


});




function AppendToShowList(prodItem: HTMLSelectElement) {
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

    // Action    
    const showList = allShowList.length % 2 === 0 ?
        document.getElementById("evenProductLs") :
        document.getElementById("oddProductLs");
    showList?.appendChild(liTag);
    //AddHidden(liTag, index);

    //Event
    iMinusTag.addEventListener('click', function () {
        let nowLITag = this.parentElement as HTMLLIElement;
        CaculatePercent(nowLITag, false);
        RefreshProdItemPercent();
        ShowTotalInfo();
        SetBindingValue();
    });
    iPlusTag.addEventListener('click', function () {
        let nowLITag = this.parentElement as HTMLLIElement
        CaculatePercent(nowLITag, true);
        RefreshProdItemPercent();
        ShowTotalInfo();
        SetBindingValue();
    });


    //ShowTotalInfo();
    // Assign show ul list


    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    /*var val = $.parseJSON(value);*/

    // return number * number;
};
function ShowList() {
    //let userSelect = ($('.select2bs4').find(':selected').get() as HTMLSelectElement[]);
    // User畫面所選
    let userSelect = $('.select2bs4').find(':selected').toArray() as HTMLSelectElement[];

    // 準備要Show
    let showList = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray()) as HTMLLIElement[];



    // 要新增的就新增
    userSelect.filter(item => {
        return showList.map(litag => litag.dataset.value).indexOf(item.value) === -1;
    }).forEach((item) => AppendToShowList(item));
    // 要刪除的就刪除    
    showList.filter(litag => {
        return userSelect.map(item => item.value).indexOf(litag.dataset.value) === -1;
    }).forEach(item => item.remove());


    // 要新增的就新增V2
    //$.each(newAddItems, function (index, element) {
    //    AppendToShowList(element);

    //    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    //    /*var val = $.parseJSON(value);*/
    //})




    //$.each(delItems, function (index, element) {
    //    element.remove();
    //})


    //let thisObj = $(this);
    //// 不再保留項目的就刪除
    //if (wantSave.indexOf($(this).val().toString()) === -1) {
    //    $.each($('#evenProductLs li'), function (index, element) {
    //        let isRemove = element.dataset.value === thisObj.val().toString();
    //        if (isRemove)
    //            element.remove();
    //    }
    //    );
    //}


    //const iMinusTag = document.createElement("i");
    //iMinusTag.classList.add("fas");
    //iMinusTag.classList.add("fa-minus-circle");
    //const iPlusTag = document.createElement("i");
    //iPlusTag.classList.add("fas");
    //iPlusTag.classList.add("fa-plus-circle");
    //const spanTag = document.createElement("span") as HTMLSpanElement;
    //spanTag.innerHTML = "50%";

    //console.log(prodItem.val().toString());
    //const liTag = document.createElement("li") as HTMLLIElement;
    //liTag.textContent = `${prodItem.val()}_${prodItem.text()}`;
    //liTag.dataset.vv = prodItem.val().toString();
    //liTag.appendChild(iMinusTag);
    //liTag.appendChild(iPlusTag);
    //liTag.appendChild(spanTag);

    //const showList = document.getElementById("evenProductLs");
    //showList?.appendChild(liTag);

    // Assign show ul list


    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    /*var val = $.parseJSON(value);*/

    // return number * number;
}
function CaculatePercent(curProdItem: HTMLLIElement, isPlus: boolean) {
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
function RefreshProdItemPercent() {
    let allProdItems = $('#evenProductLs li').toArray().concat(
        $('#oddProductLs li').toArray()) as HTMLLIElement[];

    allProdItems.forEach(function (item) {
        let spanTag = item.querySelector("span");
        spanTag.innerHTML = `\u00A0\u00A0${item.dataset.percent}%\u00A0\u00A0`
    });
}
function ShowTotalInfo() {
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
function AddHidden(theLi: HTMLLIElement, index: number) {
    // Create a hidden input element, and append it to the li:
    let nameProperty = document.createElement("input");
    nameProperty.className = "modelbind"
    nameProperty.type = "hidden";
    nameProperty.name = `PurchaseDetailInfo[${index}].Name`;
    nameProperty.value = theLi.dataset.text
    let valueProperty = document.createElement("input");
    nameProperty.className = "modelbind"
    valueProperty.type = "hidden";
    valueProperty.name = `PurchaseDetailInfo[${index}].Value`;
    valueProperty.value = theLi.dataset.value
    let percentProperty = document.createElement("input");
    nameProperty.className = "modelbind"
    percentProperty.type = "hidden";
    percentProperty.name = `PurchaseDetailInfo[${index}].Percent`;
    percentProperty.value = theLi.dataset.percent

    theLi.appendChild(nameProperty);
    theLi.appendChild(valueProperty);
    theLi.appendChild(percentProperty);
}

function SetBindingValue() {

    let allProdItems = $('#evenProductLs li').toArray().concat(
        $('#oddProductLs li').toArray()) as HTMLLIElement[];

    let purchaseDetailInfos: PurchaseDetailInfo[] = [];
    allProdItems.forEach(function (item) {
        let purchaseDetailInfo = new PurchaseDetailInfo();
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






