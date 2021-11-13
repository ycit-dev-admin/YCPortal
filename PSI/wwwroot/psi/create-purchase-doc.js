var PageClass = /** @class */ (function () {
    function PageClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    PageClass.prototype.IniPageEvent = function () {
        var _this = this;
        // Page Field
        var fullWeight = $("#FullWeight").get(0);
        var defectiveWeight = $("#DefectiveWeight").get(0);
        var unitPrice = $("#UnitPrice").get(0);
        var traficUnitPrice = $("#TraficUnitPrice").get(0);
        var weightFee = $("#ThirdWeightFee").get(0);
        var ishasTaxList = $(".ishas_tax").get();
        // Logic        
        fullWeight.addEventListener('keyup', this.CaculateAllFee);
        defectiveWeight.addEventListener('keyup', this.CaculateAllFee);
        unitPrice.addEventListener('keyup', this.CaculateAllFee);
        traficUnitPrice.addEventListener('keyup', this.CaculateAllFee);
        weightFee.addEventListener('keyup', this.CaculateAllFee);
        ishasTaxList.forEach(function (item) { return item.addEventListener('change', _this.CaculateAllFee); });
    };
    ;
    PageClass.prototype.ShowCustomerName = function () {
        // Page Field
        var customerId = $("#CustomerId");
        var customerName = $("#CustomerName");
        // Vars
        var optionObj = customerId.find(':selected');
        // Logic
        customerName.val("");
        if (optionObj.val() === "0") {
            customerName.removeAttr("readonly");
        }
        else {
            customerName.attr("readonly", "readonly");
            customerName.val(optionObj.text());
        }
    };
    PageClass.prototype.SetCarNoItems = function () {
        // Page Field
        var customerId = $("#CustomerId");
        var carNoId = $("#CarNoId");
        // Vars               
        var optionObj = customerId.find(':selected');
        var getUrl2 = this.BaseUrl + "/api/CustomerCars";
        //const getUrl = `${this.BaseUrl}/api/CustomerCars?customerId=${encodeURIComponent(optionObj.val().toString())}`;
        // Logic
        return $.get(getUrl2, { customerId: encodeURIComponent(optionObj.val().toString()) }).done(function (data) {
            // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
            // contractFromList.remove();
            console.log("wow_2");
            carNoId.html('');
            var defaultOption = new Option("0.新車牌", "0", false, false);
            carNoId.append(defaultOption);
            data.forEach(function (item) {
                var newOption = new Option(item.carName, item.id, false, false);
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
    };
    PageClass.prototype.ShowCarNoName = function () {
        // Page Field
        var carNoId = $("#CarNoId");
        var carName = $("#CarNo");
        // Logic 
        var carNoIdObj = carNoId.find(':selected');
        carName.val("");
        if (carNoIdObj.val() === "0") {
            carName.removeAttr("readonly");
        }
        else {
            carName.attr("readonly", "readonly");
            carName.val(carNoIdObj.text());
        }
    };
    PageClass.prototype.CaculateAllFee = function () {
        //let haha = new FormData();
        var fullWeight = document.getElementById("FullWeight").value; // 進場重量
        var defectiveWeight = document.getElementById("DefectiveWeight").value; // 扣重
        var unitPrice = document.getElementById("UnitPrice").value; // 單價
        var isHasTax = $('.ishas_tax:checked').val() === "True" ? 1.05 : 1; // 是否含稅 (radio button 沒有 name attribute 所以用)
        var traficUnitPrice = document.getElementById("TraficUnitPrice").value; // 運費單價
        var weightFee = document.getElementById("ThirdWeightFee").value;
        // 計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        //let weightFee = (+fullWeight - (+defectiveWeight));
        var weightPrice = (+fullWeight - (+defectiveWeight)) * (+unitPrice) * isHasTax;
        document.getElementById("show_weight_price").textContent = !weightPrice || weightPrice < 0 ? "0" : weightPrice.toFixed(2).toString();
        // 運費 = 進廠重量 * 運費單價
        var traficPrice = (+fullWeight) * (+traficUnitPrice);
        document.getElementById("show_trafic_price").textContent = !traficPrice || traficPrice < 0 ? "0" : traficPrice.toString();
        // 總金額 = (磅費 + 計價金額 + 運費)
        var finalPrice = (+weightFee) + weightPrice + traficPrice;
        document.getElementById("show_final_price").textContent = !finalPrice || finalPrice < 0 ? "0" : Math.round(finalPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        $("#ActualPrice").val(Math.round(finalPrice));
    };
    return PageClass;
}());
;
var PurchaseDetailInfo = /** @class */ (function () {
    function PurchaseDetailInfo() {
    }
    return PurchaseDetailInfo;
}());
$('#CustomerId').on('change', function () {
    // 變更簽約單的Select內容 透過API
    fetch(window.location.origin + "/api/CustomerContracts")
        .then(function (response) {
        console.log(response);
        return response.json();
        //return response.text()
    }).then(function (myJson) {
        // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
        // contractFromList.remove();
        $("#ContractFrom").html('');
        myJson.forEach(function (item) {
            var newOption = new Option(item.contractName, item.id, false, false);
            $('#ContractFrom').append(newOption);
            //.trigger('change');
            //let test = document.createElement("option") as HTMLOptionElement;
            //test.value = user.id;
            //test.text = user.contractName;
            //console.log(test);
            //contractFromList.append(test);
        });
        $('#ContractFrom').val(null);
    });
});
function AppendToShowList(prodItem) {
    var allShowList = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray());
    var iMinusTag = document.createElement("i");
    iMinusTag.classList.add("fas");
    iMinusTag.classList.add("fa-minus-circle");
    iMinusTag.style.cursor = "pointer";
    iMinusTag.style.color = "blue";
    var iPlusTag = document.createElement("i");
    iPlusTag.classList.add("fas");
    iPlusTag.classList.add("fa-plus-circle");
    iPlusTag.style.cursor = "pointer";
    iPlusTag.style.color = "red";
    var spanTag = document.createElement("span");
    var liTag = document.createElement("li");
    liTag.dataset.text = prodItem.textContent;
    liTag.textContent = prodItem.textContent + " \u00A0\u00A0";
    liTag.dataset.value = prodItem.value.toString();
    liTag.dataset.percent = allShowList.length === 0 ? "90" : "10";
    liTag.appendChild(iMinusTag);
    liTag.appendChild(spanTag);
    liTag.appendChild(iPlusTag);
    // Action    
    var showList = allShowList.length % 2 === 0 ?
        document.getElementById("evenProductLs") :
        document.getElementById("oddProductLs");
    showList === null || showList === void 0 ? void 0 : showList.appendChild(liTag);
    //AddHidden(liTag, index);
    //Event
    iMinusTag.addEventListener('click', function () {
        var nowLITag = this.parentElement;
        CaculatePercent(nowLITag, false);
        RefreshProdItemPercent();
        ShowTotalInfo();
        SetBindingValue();
    });
    iPlusTag.addEventListener('click', function () {
        var nowLITag = this.parentElement;
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
}
;
function ShowList() {
    //let userSelect = ($('.select2bs4').find(':selected').get() as HTMLSelectElement[]);
    // User畫面所選
    var userSelect = $('.select2bs4').find(':selected').toArray();
    // 準備要Show
    var showList = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray());
    // 要新增的就新增
    userSelect.filter(function (item) {
        return showList.map(function (litag) { return litag.dataset.value; }).indexOf(item.value) === -1;
    }).forEach(function (item) { return AppendToShowList(item); });
    // 要刪除的就刪除    
    showList.filter(function (litag) {
        return userSelect.map(function (item) { return item.value; }).indexOf(litag.dataset.value) === -1;
    }).forEach(function (item) { return item.remove(); });
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
function CaculatePercent(curProdItem, isPlus) {
    var curVal = curProdItem.dataset.percent;
    var newVal = isPlus ? +curVal + 10 : +curVal - 10;
    if (newVal > 100)
        newVal = 100;
    if (newVal < 0)
        newVal = 0;
    curProdItem.dataset.percent = newVal.toString();
    //var el = document.getElementById("outside");
    //el.addEventListener("click", modifyText, false);
}
function RefreshProdItemPercent() {
    var allProdItems = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray());
    allProdItems.forEach(function (item) {
        var spanTag = item.querySelector("span");
        spanTag.innerHTML = "\u00A0\u00A0" + item.dataset.percent + "%\u00A0\u00A0";
    });
}
function ShowTotalInfo() {
    var _a;
    var allProdItems = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray());
    var allPercent = 0;
    var maxItem;
    allProdItems.forEach(function (item) {
        allPercent = +item.dataset.percent + allPercent;
        if (!maxItem) {
            maxItem = item;
        }
        else {
            maxItem = +maxItem.dataset.percent > +item.dataset.percent ? maxItem : item;
        }
    });
    var totalInfo = document.getElementById("total");
    totalInfo.querySelectorAll("span").forEach(function (item) { item.remove(); });
    var itemSpan = document.createElement("span");
    itemSpan.innerHTML = "\uFF0C\u5DF2\u9078" + allProdItems.length + "\u9805";
    var percentSpan = document.createElement("span");
    percentSpan.innerHTML = "\uFF0C\u6BD4\u4F8B\u52A0\u7E3D:" + allPercent + "%";
    if (allPercent > 100)
        percentSpan.style.color = "red";
    var recognitionSpan = document.createElement("span");
    //let haha = document.querySelector('.select2bs4 :checked') as HTMLOptionElement;
    //alert(haha.value);
    //let recognitionText = ($('.select2bs4').find(':selected').toArray() as HTMLSelectElement[])
    //    .filter(item => { return item.value === maxItem.dataset.value; })[0]?.textContent ?? "無";
    recognitionSpan.innerHTML = "\u8A8D\u5217\u9805\u76EE : " + ((_a = maxItem === null || maxItem === void 0 ? void 0 : maxItem.dataset.text) !== null && _a !== void 0 ? _a : "無");
    totalInfo.appendChild(recognitionSpan);
    totalInfo.appendChild(itemSpan);
    totalInfo.appendChild(percentSpan);
    if (allProdItems.length > 0)
        $('#IsPassPurchase').val("true");
    else
        $('#IsPassPurchase').val("false");
}
function AddHidden(theLi, index) {
    // Create a hidden input element, and append it to the li:
    var nameProperty = document.createElement("input");
    nameProperty.className = "modelbind";
    nameProperty.type = "hidden";
    nameProperty.name = "PurchaseDetailInfo[" + index + "].Name";
    nameProperty.value = theLi.dataset.text;
    var valueProperty = document.createElement("input");
    nameProperty.className = "modelbind";
    valueProperty.type = "hidden";
    valueProperty.name = "PurchaseDetailInfo[" + index + "].Value";
    valueProperty.value = theLi.dataset.value;
    var percentProperty = document.createElement("input");
    nameProperty.className = "modelbind";
    percentProperty.type = "hidden";
    percentProperty.name = "PurchaseDetailInfo[" + index + "].Percent";
    percentProperty.value = theLi.dataset.percent;
    theLi.appendChild(nameProperty);
    theLi.appendChild(valueProperty);
    theLi.appendChild(percentProperty);
}
function SetBindingValue() {
    var allProdItems = $('#evenProductLs li').toArray().concat($('#oddProductLs li').toArray());
    var purchaseDetailInfos = [];
    allProdItems.forEach(function (item) {
        var purchaseDetailInfo = new PurchaseDetailInfo();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLG1CQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLGdDQUFZLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsYUFBYTtRQUNiLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFekMsZ0JBQWdCO1FBQ2hCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFBQSxDQUFDO0lBRUssb0NBQWdCLEdBQXZCO1FBQ0ksYUFBYTtRQUNiLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFdEMsT0FBTztRQUNQLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0MsUUFBUTtRQUNSLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNILFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRU0saUNBQWEsR0FBcEI7UUFDSSxhQUFhO1FBQ2IsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU1QixzQkFBc0I7UUFDdEIsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxJQUFNLE9BQU8sR0FBTSxJQUFJLENBQUMsT0FBTyxzQkFBbUIsQ0FBQztRQUNuRCxpSEFBaUg7UUFFakgsUUFBUTtRQUVSLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7WUFDckcsdUZBQXVGO1lBQ3ZGLDZCQUE2QjtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtnQkFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUIscUJBQXFCO2dCQUNyQixtRUFBbUU7Z0JBQ25FLHVCQUF1QjtnQkFDdkIsZ0NBQWdDO2dCQUNoQyxvQkFBb0I7Z0JBQ3BCLGdDQUFnQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBR0gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZiwyQkFBMkI7UUFDM0IsK0JBQStCO1FBQy9CLGdDQUFnQztRQUNoQyxrQ0FBa0M7UUFDbEMsMkJBQTJCO1FBQzNCLGlHQUFpRztRQUNqRyx1Q0FBdUM7UUFDdkMsMkJBQTJCO1FBQzNCLHFFQUFxRTtRQUNyRSx3Q0FBd0M7UUFDeEMsMENBQTBDO1FBQzFDLDhFQUE4RTtRQUM5RSx3Q0FBd0M7UUFDeEMsbUNBQW1DO1FBQ25DLGlGQUFpRjtRQUNqRixxQ0FBcUM7UUFDckMsOENBQThDO1FBQzlDLGtDQUFrQztRQUNsQyw4Q0FBOEM7UUFDOUMsYUFBYTtRQUViLDJCQUEyQjtRQUMzQixRQUFRO0lBSVosQ0FBQztJQUVNLGlDQUFhLEdBQXBCO1FBQ0ksYUFBYTtRQUNiLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUIsU0FBUztRQUNULElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUU7WUFDMUIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFTSxrQ0FBYyxHQUFyQjtRQUNJLDRCQUE0QjtRQUM1QixJQUFJLFVBQVUsR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQyxLQUFLLENBQUEsQ0FBQyxPQUFPO1FBQzFGLElBQUksZUFBZSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXNCLENBQUMsS0FBSyxDQUFBLENBQUMsS0FBSztRQUNsRyxJQUFJLFNBQVMsR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQyxLQUFLLENBQUEsQ0FBQyxLQUFLO1FBQ3RGLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSw0Q0FBNEM7UUFDakgsSUFBSSxlQUFlLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBc0IsQ0FBQyxLQUFLLENBQUEsQ0FBQyxPQUFPO1FBQ3BHLElBQUksU0FBUyxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUMsS0FBSyxDQUFBO1FBRXJGLCtCQUErQjtRQUMvQixxREFBcUQ7UUFDckQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlFLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQW9CLENBQUMsV0FBVyxHQUFHLENBQUMsV0FBVyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6SixtQkFBbUI7UUFDbkIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFvQixDQUFDLFdBQVcsR0FBRyxDQUFDLFdBQVcsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU5SSx5QkFBeUI7UUFDekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDekQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxVQUFVLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0TSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUVsRCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBeEpELElBd0pDO0FBQUEsQ0FBQztBQUlGO0lBS0k7SUFDQSxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVELENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBRTFCLHVCQUF1QjtJQUN2QixLQUFLLENBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLDJCQUF3QixDQUFDO1NBQ25ELElBQUksQ0FBQyxVQUFDLFFBQVE7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3RCLHdCQUF3QjtJQUM1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1FBQ1gsdUZBQXVGO1FBQ3ZGLDZCQUE2QjtRQUM3QixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJO1lBQ3pCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxxQkFBcUI7WUFDckIsbUVBQW1FO1lBQ25FLHVCQUF1QjtZQUN2QixnQ0FBZ0M7WUFDaEMsb0JBQW9CO1lBQ3BCLGdDQUFnQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQyxDQUFDLENBQUE7QUFHVixDQUFDLENBQUMsQ0FBQztBQUtILFNBQVMsZ0JBQWdCLENBQUMsUUFBMkI7SUFDakQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFHN0YsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUNuQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDL0IsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDN0IsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQW9CLENBQUM7SUFHbEUsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQWtCLENBQUM7SUFDNUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLENBQUMsV0FBVyxHQUFNLFFBQVEsQ0FBQyxXQUFXLGtCQUFlLENBQUM7SUFDM0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUIsYUFBYTtJQUNiLElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzVDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsMEJBQTBCO0lBRTFCLE9BQU87SUFDUCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUE4QixDQUFDO1FBQ25ELGVBQWUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixhQUFhLEVBQUUsQ0FBQztRQUNoQixlQUFlLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQThCLENBQUE7UUFDbEQsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3pCLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGVBQWUsRUFBRSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBR0gsa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUd0QixxSkFBcUo7SUFDckosaUNBQWlDO0lBRWpDLDBCQUEwQjtBQUM5QixDQUFDO0FBQUEsQ0FBQztBQUNGLFNBQVMsUUFBUTtJQUNiLHFGQUFxRjtJQUNyRixXQUFXO0lBQ1gsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQXlCLENBQUM7SUFFckYsVUFBVTtJQUNWLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBb0IsQ0FBQztJQUkzRyxVQUFVO0lBQ1YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUk7UUFDbEIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQW5CLENBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7SUFDN0MsY0FBYztJQUNkLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLO1FBQ2pCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBR2xDLFlBQVk7SUFDWixpREFBaUQ7SUFDakQsZ0NBQWdDO0lBRWhDLDJKQUEySjtJQUMzSix1Q0FBdUM7SUFDdkMsSUFBSTtJQUtKLDhDQUE4QztJQUM5Qyx1QkFBdUI7SUFDdkIsSUFBSTtJQUdKLHdCQUF3QjtJQUN4QixlQUFlO0lBQ2YsMERBQTBEO0lBQzFELGdFQUFnRTtJQUNoRSw0RUFBNEU7SUFDNUUsdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQixPQUFPO0lBQ1AsUUFBUTtJQUNSLEdBQUc7SUFHSCxnREFBZ0Q7SUFDaEQsaUNBQWlDO0lBQ2pDLDZDQUE2QztJQUM3QywrQ0FBK0M7SUFDL0MsZ0NBQWdDO0lBQ2hDLDJDQUEyQztJQUMzQyxvRUFBb0U7SUFDcEUsNEJBQTRCO0lBRTVCLHlDQUF5QztJQUN6Qyw4REFBOEQ7SUFDOUQsNkRBQTZEO0lBQzdELCtDQUErQztJQUMvQywrQkFBK0I7SUFDL0IsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUU3Qiw0REFBNEQ7SUFDNUQsK0JBQStCO0lBRS9CLHNCQUFzQjtJQUd0QixxSkFBcUo7SUFDckosaUNBQWlDO0lBRWpDLDBCQUEwQjtBQUM5QixDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsV0FBMEIsRUFBRSxNQUFlO0lBQ2hFLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzNDLElBQUksTUFBTSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDMUQsSUFBSSxNQUFNLEdBQUcsR0FBRztRQUNaLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUNWLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDZixXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEQsOENBQThDO0lBQzlDLGtEQUFrRDtBQUN0RCxDQUFDO0FBQ0QsU0FBUyxzQkFBc0I7SUFDM0IsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUN0RCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBb0IsQ0FBQztJQUV4RCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsaUJBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGtCQUFlLENBQUE7SUFDMUUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxhQUFhOztJQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQ3RELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFvQixDQUFDO0lBRXhELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLE9BQXNCLENBQUM7SUFDM0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7UUFDL0IsVUFBVSxHQUFHLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO2FBQU07WUFDSCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMvRTtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsUUFBUSxDQUFDLFNBQVMsR0FBRyx1QkFBTSxZQUFZLENBQUMsTUFBTSxXQUFHLENBQUM7SUFDbEQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxXQUFXLENBQUMsU0FBUyxHQUFHLG9DQUFTLFVBQVUsTUFBRyxDQUFBO0lBQzlDLElBQUksVUFBVSxHQUFHLEdBQUc7UUFDaEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdkQsaUZBQWlGO0lBQ2pGLG9CQUFvQjtJQUVwQiw2RkFBNkY7SUFDN0YsK0ZBQStGO0lBQy9GLGVBQWUsQ0FBQyxTQUFTLEdBQUcsaUNBQVUsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxDQUFDLElBQUksbUNBQUksR0FBRyxDQUFFLENBQUE7SUFFcEUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2QyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbkMsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDdkIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUVqQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFDLEtBQW9CLEVBQUUsS0FBYTtJQUNsRCwwREFBMEQ7SUFDMUQsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxZQUFZLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtJQUNwQyxZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUM3QixZQUFZLENBQUMsSUFBSSxHQUFHLHdCQUFzQixLQUFLLFdBQVEsQ0FBQztJQUN4RCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3ZDLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUE7SUFDcEMsYUFBYSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7SUFDOUIsYUFBYSxDQUFDLElBQUksR0FBRyx3QkFBc0IsS0FBSyxZQUFTLENBQUM7SUFDMUQsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtJQUN6QyxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELFlBQVksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFBO0lBQ3BDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsd0JBQXNCLEtBQUssY0FBVyxDQUFDO0lBQzlELGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFFN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELFNBQVMsZUFBZTtJQUVwQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQ3RELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFvQixDQUFDO0lBRXhELElBQUksbUJBQW1CLEdBQXlCLEVBQUUsQ0FBQztJQUNuRCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtRQUMvQixJQUFJLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUNsRCxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDOUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDM0Msa0JBQWtCLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDaEMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQzVFO0FBRUwsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBhZ2VDbGFzcyB7XHJcbiAgICAvLyBHbG9iYWxcclxuXHJcbiAgICAvLyBSZWFkeSBQb3N0XHJcblxyXG5cclxuXHJcblxyXG4gICAgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbmlQYWdlRXZlbnQoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBmdWxsV2VpZ2h0ID0gJChcIiNGdWxsV2VpZ2h0XCIpLmdldCgwKTtcclxuICAgICAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gJChcIiNEZWZlY3RpdmVXZWlnaHRcIikuZ2V0KDApO1xyXG4gICAgICAgIGxldCB1bml0UHJpY2UgPSAkKFwiI1VuaXRQcmljZVwiKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IHRyYWZpY1VuaXRQcmljZSA9ICQoXCIjVHJhZmljVW5pdFByaWNlXCIpLmdldCgwKTtcclxuICAgICAgICBsZXQgd2VpZ2h0RmVlID0gJChcIiNUaGlyZFdlaWdodEZlZVwiKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IGlzaGFzVGF4TGlzdCA9ICQoXCIuaXNoYXNfdGF4XCIpLmdldCgpO1xyXG5cclxuICAgICAgICAvLyBMb2dpYyAgICAgICAgXHJcbiAgICAgICAgZnVsbFdlaWdodC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIGRlZmVjdGl2ZVdlaWdodC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHVuaXRQcmljZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHRyYWZpY1VuaXRQcmljZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHdlaWdodEZlZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIGlzaGFzVGF4TGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIFNob3dDdXN0b21lck5hbWUoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjdXN0b21lcklkID0gJChcIiNDdXN0b21lcklkXCIpO1xyXG4gICAgICAgIGxldCBjdXN0b21lck5hbWUgPSAkKFwiI0N1c3RvbWVyTmFtZVwiKTtcclxuXHJcbiAgICAgICAgLy8gVmFyc1xyXG4gICAgICAgIGxldCBvcHRpb25PYmogPSBjdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvLyBMb2dpY1xyXG4gICAgICAgIGN1c3RvbWVyTmFtZS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKG9wdGlvbk9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY3VzdG9tZXJOYW1lLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXN0b21lck5hbWUuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS52YWwob3B0aW9uT2JqLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRDYXJOb0l0ZW1zKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjdXN0b21lcklkID0gJChcIiNDdXN0b21lcklkXCIpO1xyXG4gICAgICAgIGxldCBjYXJOb0lkID0gJChcIiNDYXJOb0lkXCIpO1xyXG5cclxuICAgICAgICAvLyBWYXJzICAgICAgICAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uT2JqID0gY3VzdG9tZXJJZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuICAgICAgICBjb25zdCBnZXRVcmwyID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzYDtcclxuICAgICAgICAvL2NvbnN0IGdldFVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ2Fycz9jdXN0b21lcklkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbk9iai52YWwoKS50b1N0cmluZygpKX1gO1xyXG5cclxuICAgICAgICAvLyBMb2dpY1xyXG5cclxuICAgICAgICByZXR1cm4gJC5nZXQoZ2V0VXJsMiwgeyBjdXN0b21lcklkOiBlbmNvZGVVUklDb21wb25lbnQob3B0aW9uT2JqLnZhbCgpLnRvU3RyaW5nKCkpIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gbGV0IGNvbnRyYWN0RnJvbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvbnRyYWN0RnJvbVwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgICAgICAgICAgLy8gY29udHJhY3RGcm9tTGlzdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3b3dfMlwiKVxyXG4gICAgICAgICAgICBjYXJOb0lkLmh0bWwoJycpO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgY2FyTm9JZC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY2FyTm9JZC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudmFsdWUgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnRleHQgPSB1c2VyLmNvbnRyYWN0TmFtZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRyYWN0RnJvbUxpc3QuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIOWPluW+l+i7iueJjOWFp+WuuSDpgI/pgY5BUEkgXHJcbiAgICAgICAgLy9mZXRjaChnZXRVcmwpXHJcbiAgICAgICAgLy8gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgLy8gICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIC8vICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgIC8vICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICBjYXJOb0lkLmh0bWwoJycpO1xyXG4gICAgICAgIC8vICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgY2FyTm9JZC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgLy8gICAgICAgIG15SnNvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgY2FyTm9JZC52YWwobnVsbClcclxuICAgICAgICAvLyAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93Q2FyTm9OYW1lKCkge1xyXG4gICAgICAgIC8vIFBhZ2UgRmllbGRcclxuICAgICAgICBsZXQgY2FyTm9JZCA9ICQoXCIjQ2FyTm9JZFwiKTtcclxuICAgICAgICBsZXQgY2FyTmFtZSA9ICQoXCIjQ2FyTm9cIik7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljIFxyXG4gICAgICAgIGxldCBjYXJOb0lkT2JqID0gY2FyTm9JZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuICAgICAgICBjYXJOYW1lLnZhbChcIlwiKTtcclxuICAgICAgICBpZiAoY2FyTm9JZE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgY2FyTmFtZS52YWwoY2FyTm9JZE9iai50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgLy9sZXQgaGFoYSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGxldCBmdWxsV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDpgLLloLTph43ph49cclxuICAgICAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVmZWN0aXZlV2VpZ2h0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOaJo+mHjVxyXG4gICAgICAgIGxldCB1bml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g5Zau5YO5XHJcbiAgICAgICAgbGV0IGlzSGFzVGF4ID0gJCgnLmlzaGFzX3RheDpjaGVja2VkJykudmFsKCkgPT09IFwiVHJ1ZVwiID8gMS4wNSA6IDE7ICAvLyDmmK/lkKblkKvnqIUgKHJhZGlvIGJ1dHRvbiDmspLmnIkgbmFtZSBhdHRyaWJ1dGUg5omA5Lul55SoKVxyXG4gICAgICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUcmFmaWNVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YGL6LK75Zau5YO5XHJcbiAgICAgICAgbGV0IHdlaWdodEZlZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlRoaXJkV2VpZ2h0RmVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlXHJcblxyXG4gICAgICAgIC8vIOioiOWDuemHkemhjSA9ICjpgLLlu6Dph43ph48gLSDmiaPph40pICog5Zau5YO5ICog56iF546HXHJcbiAgICAgICAgLy9sZXQgd2VpZ2h0RmVlID0gKCtmdWxsV2VpZ2h0IC0gKCtkZWZlY3RpdmVXZWlnaHQpKTtcclxuICAgICAgICBsZXQgd2VpZ2h0UHJpY2UgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpICogKCt1bml0UHJpY2UpICogaXNIYXNUYXg7XHJcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd193ZWlnaHRfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIXdlaWdodFByaWNlIHx8IHdlaWdodFByaWNlIDwgMCA/IFwiMFwiIDogd2VpZ2h0UHJpY2UudG9GaXhlZCgyKS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDpgYvosrsgPSDpgLLlu6Dph43ph48gKiDpgYvosrvllq7lg7lcclxuICAgICAgICBsZXQgdHJhZmljUHJpY2UgPSAoK2Z1bGxXZWlnaHQpICogKCt0cmFmaWNVbml0UHJpY2UpO1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfdHJhZmljX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF0cmFmaWNQcmljZSB8fCB0cmFmaWNQcmljZSA8IDAgPyBcIjBcIiA6IHRyYWZpY1ByaWNlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIOe4vemHkemhjSA9ICjno4XosrsgKyDoqIjlg7nph5HpoY0gKyDpgYvosrspXHJcbiAgICAgICAgbGV0IGZpbmFsUHJpY2UgPSAoK3dlaWdodEZlZSkgKyB3ZWlnaHRQcmljZSArIHRyYWZpY1ByaWNlO1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfZmluYWxfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIWZpbmFsUHJpY2UgfHwgZmluYWxQcmljZSA8IDAgPyBcIjBcIiA6IE1hdGgucm91bmQoZmluYWxQcmljZSkudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPzwhXFwuXFxkKikoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XHJcbiAgICAgICAgJChcIiNBY3R1YWxQcmljZVwiKS52YWwoTWF0aC5yb3VuZChmaW5hbFByaWNlKSk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5jbGFzcyBQdXJjaGFzZURldGFpbEluZm8ge1xyXG4gICAgVmFsdWU6IHN0cmluZztcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIFBlcmNlbnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxufVxyXG5cclxuJCgnI0N1c3RvbWVySWQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIOiuiuabtOewvee0hOWWrueahFNlbGVjdOWFp+WuuSDpgI/pgY5BUElcclxuICAgIGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9DdXN0b21lckNvbnRyYWN0c2ApXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyYWN0RnJvbVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLnZhbChudWxsKVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBBcHBlbmRUb1Nob3dMaXN0KHByb2RJdGVtOiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgY29uc3QgYWxsU2hvd0xpc3QgPSAkKFwiI2V2ZW5Qcm9kdWN0THMgbGlcIikudG9BcnJheSgpLmNvbmNhdCgkKFwiI29kZFByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkpO1xyXG5cclxuXHJcbiAgICBjb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICBpTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBpTWludXNUYWcuc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgIGNvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBpUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcbiAgICBjb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgbGlUYWcuZGF0YXNldC50ZXh0ID0gcHJvZEl0ZW0udGV4dENvbnRlbnQ7XHJcbiAgICBsaVRhZy50ZXh0Q29udGVudCA9IGAke3Byb2RJdGVtLnRleHRDb250ZW50fSBcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnZhbHVlID0gcHJvZEl0ZW0udmFsdWUudG9TdHJpbmcoKTtcclxuICAgIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IGFsbFNob3dMaXN0Lmxlbmd0aCA9PT0gMCA/IFwiOTBcIiA6IFwiMTBcIjtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcbiAgICAvLyBBY3Rpb24gICAgXHJcbiAgICBjb25zdCBzaG93TGlzdCA9IGFsbFNob3dMaXN0Lmxlbmd0aCAlIDIgPT09IDAgP1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXZlblByb2R1Y3RMc1wiKSA6XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvZGRQcm9kdWN0THNcIik7XHJcbiAgICBzaG93TGlzdD8uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG4gICAgLy9BZGRIaWRkZW4obGlUYWcsIGluZGV4KTtcclxuXHJcbiAgICAvL0V2ZW50XHJcbiAgICBpTWludXNUYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5vd0xJVGFnID0gdGhpcy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgQ2FjdWxhdGVQZXJjZW50KG5vd0xJVGFnLCBmYWxzZSk7XHJcbiAgICAgICAgUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgIFNob3dUb3RhbEluZm8oKTtcclxuICAgICAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuICAgIH0pO1xyXG4gICAgaVBsdXNUYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5vd0xJVGFnID0gdGhpcy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnRcclxuICAgICAgICBDYWN1bGF0ZVBlcmNlbnQobm93TElUYWcsIHRydWUpO1xyXG4gICAgICAgIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICAgICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9TaG93VG90YWxJbmZvKCk7XHJcbiAgICAvLyBBc3NpZ24gc2hvdyB1bCBsaXN0XHJcblxyXG5cclxuICAgIC8vICQoJyN0ZXN0THMnKS5hcHBlbmQoJzxsaT4nICsgJCh0aGlzKS52YWwoKSArIFwiX1wiICsgJCh0aGlzKS50ZXh0KCkgKyAnPGkgY2xhc3M9XCJmYXMgZmEtbWludXMtY2lyY2xlXCI+PC9pPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvbGk+Jyk7XHJcbiAgICAvKnZhciB2YWwgPSAkLnBhcnNlSlNPTih2YWx1ZSk7Ki9cclxuXHJcbiAgICAvLyByZXR1cm4gbnVtYmVyICogbnVtYmVyO1xyXG59O1xyXG5mdW5jdGlvbiBTaG93TGlzdCgpIHtcclxuICAgIC8vbGV0IHVzZXJTZWxlY3QgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS5nZXQoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdKTtcclxuICAgIC8vIFVzZXLnlavpnaLmiYDpgbhcclxuICAgIGxldCB1c2VyU2VsZWN0ID0gJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXTtcclxuXHJcbiAgICAvLyDmupblgpnopoFTaG93XHJcbiAgICBsZXQgc2hvd0xpc3QgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeXHJcbiAgICB1c2VyU2VsZWN0LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gc2hvd0xpc3QubWFwKGxpdGFnID0+IGxpdGFnLmRhdGFzZXQudmFsdWUpLmluZGV4T2YoaXRlbS52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaCgoaXRlbSkgPT4gQXBwZW5kVG9TaG93TGlzdChpdGVtKSk7XHJcbiAgICAvLyDopoHliKrpmaTnmoTlsLHliKrpmaQgICAgXHJcbiAgICBzaG93TGlzdC5maWx0ZXIobGl0YWcgPT4ge1xyXG4gICAgICAgIHJldHVybiB1c2VyU2VsZWN0Lm1hcChpdGVtID0+IGl0ZW0udmFsdWUpLmluZGV4T2YobGl0YWcuZGF0YXNldC52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xyXG5cclxuXHJcbiAgICAvLyDopoHmlrDlop7nmoTlsLHmlrDlop5WMlxyXG4gICAgLy8kLmVhY2gobmV3QWRkSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdChlbGVtZW50KTtcclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcbiAgICAvL30pXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8kLmVhY2goZGVsSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vfSlcclxuXHJcblxyXG4gICAgLy9sZXQgdGhpc09iaiA9ICQodGhpcyk7XHJcbiAgICAvLy8vIOS4jeWGjeS/neeVmemgheebrueahOWwseWIqumZpFxyXG4gICAgLy9pZiAod2FudFNhdmUuaW5kZXhPZigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpID09PSAtMSkge1xyXG4gICAgLy8gICAgJC5lYWNoKCQoJyNldmVuUHJvZHVjdExzIGxpJyksIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgICAgIGxldCBpc1JlbW92ZSA9IGVsZW1lbnQuZGF0YXNldC52YWx1ZSA9PT0gdGhpc09iai52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy8gICAgICAgIGlmIChpc1JlbW92ZSlcclxuICAgIC8vICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgLy9jb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgLy9jb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAvL3NwYW5UYWcuaW5uZXJIVE1MID0gXCI1MCVcIjtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHByb2RJdGVtLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgLy9jb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgLy9saVRhZy50ZXh0Q29udGVudCA9IGAke3Byb2RJdGVtLnZhbCgpfV8ke3Byb2RJdGVtLnRleHQoKX1gO1xyXG4gICAgLy9saVRhZy5kYXRhc2V0LnZ2ID0gcHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuXHJcbiAgICAvL2NvbnN0IHNob3dMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldmVuUHJvZHVjdExzXCIpO1xyXG4gICAgLy9zaG93TGlzdD8uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBzaG93IHVsIGxpc3RcclxuXHJcblxyXG4gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG5cclxuICAgIC8vIHJldHVybiBudW1iZXIgKiBudW1iZXI7XHJcbn1cclxuZnVuY3Rpb24gQ2FjdWxhdGVQZXJjZW50KGN1clByb2RJdGVtOiBIVE1MTElFbGVtZW50LCBpc1BsdXM6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGN1clZhbCA9IGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudDtcclxuICAgIGxldCBuZXdWYWw6IG51bWJlciA9IGlzUGx1cyA/ICtjdXJWYWwgKyAxMCA6ICtjdXJWYWwgLSAxMDtcclxuICAgIGlmIChuZXdWYWwgPiAxMDApXHJcbiAgICAgICAgbmV3VmFsID0gMTAwO1xyXG4gICAgaWYgKG5ld1ZhbCA8IDApXHJcbiAgICAgICAgbmV3VmFsID0gMDtcclxuICAgIGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudCA9IG5ld1ZhbC50b1N0cmluZygpO1xyXG4gICAgLy92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHNpZGVcIik7XHJcbiAgICAvL2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RpZnlUZXh0LCBmYWxzZSk7XHJcbn1cclxuZnVuY3Rpb24gUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpIHtcclxuICAgIGxldCBhbGxQcm9kSXRlbXMgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoXHJcbiAgICAgICAgJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHNwYW5UYWcgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xyXG4gICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLmRhdGFzZXQucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgXHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBTaG93VG90YWxJbmZvKCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgbGV0IG1heEl0ZW06IEhUTUxMSUVsZW1lbnQ7XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0uZGF0YXNldC5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLmRhdGFzZXQucGVyY2VudCA+ICtpdGVtLmRhdGFzZXQucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxcIik7XHJcbiAgICB0b3RhbEluZm8ucXVlcnlTZWxlY3RvckFsbChcInNwYW5cIikuZm9yRWFjaChpdGVtID0+IHsgaXRlbS5yZW1vdmUoKSB9KTtcclxuXHJcbiAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7YWxsUHJvZEl0ZW1zLmxlbmd0aH3poIVgO1xyXG4gICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICAvL2xldCBoYWhhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdDJiczQgOmNoZWNrZWQnKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgIC8vYWxlcnQoaGFoYS52YWx1ZSk7XHJcblxyXG4gICAgLy9sZXQgcmVjb2duaXRpb25UZXh0ID0gKCQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W10pXHJcbiAgICAvLyAgICAuZmlsdGVyKGl0ZW0gPT4geyByZXR1cm4gaXRlbS52YWx1ZSA9PT0gbWF4SXRlbS5kYXRhc2V0LnZhbHVlOyB9KVswXT8udGV4dENvbnRlbnQgPz8gXCLnhKFcIjtcclxuICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5kYXRhc2V0LnRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHBlcmNlbnRTcGFuKTtcclxuXHJcbiAgICBpZiAoYWxsUHJvZEl0ZW1zLmxlbmd0aCA+IDApXHJcbiAgICAgICAgJCgnI0lzUGFzc1B1cmNoYXNlJykudmFsKFwidHJ1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJmYWxzZVwiKTtcclxufVxyXG5mdW5jdGlvbiBBZGRIaWRkZW4odGhlTGk6IEhUTUxMSUVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIC8vIENyZWF0ZSBhIGhpZGRlbiBpbnB1dCBlbGVtZW50LCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaTpcclxuICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgbmFtZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5OYW1lYDtcclxuICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudGV4dFxyXG4gICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLlZhbHVlYDtcclxuICAgIHZhbHVlUHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnZhbHVlXHJcbiAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uUGVyY2VudGA7XHJcbiAgICBwZXJjZW50UHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnBlcmNlbnRcclxuXHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChuYW1lUHJvcGVydHkpO1xyXG4gICAgdGhlTGkuYXBwZW5kQ2hpbGQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChwZXJjZW50UHJvcGVydHkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTZXRCaW5kaW5nVmFsdWUoKSB7XHJcblxyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mb3M6IFB1cmNoYXNlRGV0YWlsSW5mb1tdID0gW107XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGxldCBwdXJjaGFzZURldGFpbEluZm8gPSBuZXcgUHVyY2hhc2VEZXRhaWxJbmZvKCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLlZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5OYW1lID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uUGVyY2VudCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wZXJjZW50LCAxMCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvcy5wdXNoKHB1cmNoYXNlRGV0YWlsSW5mbyk7XHJcbiAgICB9KTtcclxuICAgIGlmIChwdXJjaGFzZURldGFpbEluZm9zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAkKCcjU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvcycpLnZhbChudWxsKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKEpTT04uc3RyaW5naWZ5KHB1cmNoYXNlRGV0YWlsSW5mb3MpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19