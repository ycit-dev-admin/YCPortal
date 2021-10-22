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
        var weightFee = $("#WeightFee").get(0);
        var ishasTexList = $(".ishas_tex").get();
        // Logic        
        fullWeight.addEventListener('keyup', this.CaculateAllFee);
        defectiveWeight.addEventListener('keyup', this.CaculateAllFee);
        unitPrice.addEventListener('keyup', this.CaculateAllFee);
        traficUnitPrice.addEventListener('keyup', this.CaculateAllFee);
        weightFee.addEventListener('keyup', this.CaculateAllFee);
        ishasTexList.forEach(function (item) { return item.addEventListener('change', _this.CaculateAllFee); });
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
        var carName = $("#CarNoName");
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
        var isHasTex = $('.ishas_tex:checked').val() === "1" ? 1.05 : 1; // 是否含稅 (radio button 沒有 name attribute 所以用)
        var traficUnitPrice = document.getElementById("TraficUnitPrice").value; // 運費單價
        var weightFee = document.getElementById("WeightFee").value;
        // 計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        //let weightFee = (+fullWeight - (+defectiveWeight));
        var weightPrice = (+fullWeight - (+defectiveWeight)) * (+unitPrice) * isHasTex;
        document.getElementById("show_weight_price").textContent = !weightPrice || weightPrice < 0 ? "0" : weightPrice.toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLG1CQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLGdDQUFZLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsYUFBYTtRQUNiLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXpDLGdCQUFnQjtRQUNoQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxlQUFlLENB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Q2xhc3Mge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcblxyXG5cclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgSW5pUGFnZUV2ZW50KCkge1xyXG4gICAgICAgIC8vIFBhZ2UgRmllbGRcclxuICAgICAgICBsZXQgZnVsbFdlaWdodCA9ICQoXCIjRnVsbFdlaWdodFwiKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IGRlZmVjdGl2ZVdlaWdodCA9ICQoXCIjRGVmZWN0aXZlV2VpZ2h0XCIpLmdldCgwKTtcclxuICAgICAgICBsZXQgdW5pdFByaWNlID0gJChcIiNVbml0UHJpY2VcIikuZ2V0KDApO1xyXG4gICAgICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAkKFwiI1RyYWZpY1VuaXRQcmljZVwiKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IHdlaWdodEZlZSA9ICQoXCIjV2VpZ2h0RmVlXCIpLmdldCgwKTtcclxuICAgICAgICBsZXQgaXNoYXNUZXhMaXN0ID0gJChcIi5pc2hhc190ZXhcIikuZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljICAgICAgICBcclxuICAgICAgICBmdWxsV2VpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgZGVmZWN0aXZlV2VpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgdW5pdFByaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgdHJhZmljVW5pdFByaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgd2VpZ2h0RmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgaXNoYXNUZXhMaXN0LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgU2hvd0N1c3RvbWVyTmFtZSgpIHtcclxuICAgICAgICAvLyBQYWdlIEZpZWxkXHJcbiAgICAgICAgbGV0IGN1c3RvbWVySWQgPSAkKFwiI0N1c3RvbWVySWRcIik7XHJcbiAgICAgICAgbGV0IGN1c3RvbWVyTmFtZSA9ICQoXCIjQ3VzdG9tZXJOYW1lXCIpO1xyXG5cclxuICAgICAgICAvLyBWYXJzXHJcbiAgICAgICAgbGV0IG9wdGlvbk9iaiA9IGN1c3RvbWVySWQuZmluZCgnOnNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljXHJcbiAgICAgICAgY3VzdG9tZXJOYW1lLnZhbChcIlwiKTtcclxuICAgICAgICBpZiAob3B0aW9uT2JqLnZhbCgpID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICBjdXN0b21lck5hbWUucmVtb3ZlQXR0cihcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgY3VzdG9tZXJOYW1lLnZhbChvcHRpb25PYmoudGV4dCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldENhck5vSXRlbXMoKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICAvLyBQYWdlIEZpZWxkXHJcbiAgICAgICAgbGV0IGN1c3RvbWVySWQgPSAkKFwiI0N1c3RvbWVySWRcIik7XHJcbiAgICAgICAgbGV0IGNhck5vSWQgPSAkKFwiI0Nhck5vSWRcIik7XHJcblxyXG4gICAgICAgIC8vIFZhcnMgICAgICAgICAgICAgICBcclxuICAgICAgICBjb25zdCBvcHRpb25PYmogPSBjdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG4gICAgICAgIGNvbnN0IGdldFVybDIgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNhcnNgO1xyXG4gICAgICAgIC8vY29uc3QgZ2V0VXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzP2N1c3RvbWVySWQ9JHtlbmNvZGVVUklDb21wb25lbnQob3B0aW9uT2JqLnZhbCgpLnRvU3RyaW5nKCkpfWA7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljXHJcblxyXG4gICAgICAgIHJldHVybiAkLmdldChnZXRVcmwyLCB7IGN1c3RvbWVySWQ6IGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25PYmoudmFsKCkudG9TdHJpbmcoKSkgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndvd18yXCIpXHJcbiAgICAgICAgICAgIGNhck5vSWQuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5Y+W5b6X6LuK54mM5YWn5a65IOmAj+mBjkFQSSBcclxuICAgICAgICAvL2ZldGNoKGdldFVybClcclxuICAgICAgICAvLyAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICAvLyAgICAgICAgLy9yZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgLy8gICAgfSkudGhlbigobXlKc29uKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQuaHRtbCgnJyk7XHJcbiAgICAgICAgLy8gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICBjYXJOb0lkLmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICAvLyAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5pZCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGNhck5vSWQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICBjYXJOb0lkLnZhbChudWxsKVxyXG4gICAgICAgIC8vICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dDYXJOb05hbWUoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjYXJOb0lkID0gJChcIiNDYXJOb0lkXCIpO1xyXG4gICAgICAgIGxldCBjYXJOYW1lID0gJChcIiNDYXJOb05hbWVcIik7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljIFxyXG4gICAgICAgIGxldCBjYXJOb0lkT2JqID0gY2FyTm9JZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuICAgICAgICBjYXJOYW1lLnZhbChcIlwiKTtcclxuICAgICAgICBpZiAoY2FyTm9JZE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgY2FyTmFtZS52YWwoY2FyTm9JZE9iai50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcblxyXG4gICAgICAgIC8vbGV0IGhhaGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBsZXQgZnVsbFdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZ1bGxXZWlnaHRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YCy5aC06YeN6YePXHJcbiAgICAgICAgbGV0IGRlZmVjdGl2ZVdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDmiaPph41cclxuICAgICAgICBsZXQgdW5pdFByaWNlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVW5pdFByaWNlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOWWruWDuVxyXG4gICAgICAgIGxldCBpc0hhc1RleCA9ICQoJy5pc2hhc190ZXg6Y2hlY2tlZCcpLnZhbCgpID09PSBcIjFcIiA/IDEuMDUgOiAxOyAgLy8g5piv5ZCm5ZCr56iFIChyYWRpbyBidXR0b24g5rKS5pyJIG5hbWUgYXR0cmlidXRlIOaJgOS7peeUqClcclxuICAgICAgICBsZXQgdHJhZmljVW5pdFByaWNlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVHJhZmljVW5pdFByaWNlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOmBi+iyu+WWruWDuVxyXG4gICAgICAgIGxldCB3ZWlnaHRGZWUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJXZWlnaHRGZWVcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWVcclxuXHJcbiAgICAgICAgLy8g6KiI5YO56YeR6aGNID0gKOmAsuW7oOmHjemHjyAtIOaJo+mHjSkgKiDllq7lg7kgKiDnqIXnjodcclxuICAgICAgICAvL2xldCB3ZWlnaHRGZWUgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpO1xyXG4gICAgICAgIGxldCB3ZWlnaHRQcmljZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSkgKiAoK3VuaXRQcmljZSkgKiBpc0hhc1RleDtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3dlaWdodF9wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhd2VpZ2h0UHJpY2UgfHwgd2VpZ2h0UHJpY2UgPCAwID8gXCIwXCIgOiB3ZWlnaHRQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDpgYvosrsgPSDpgLLlu6Dph43ph48gKiDpgYvosrvllq7lg7lcclxuICAgICAgICBsZXQgdHJhZmljUHJpY2UgPSAoK2Z1bGxXZWlnaHQpICogKCt0cmFmaWNVbml0UHJpY2UpO1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfdHJhZmljX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF0cmFmaWNQcmljZSB8fCB0cmFmaWNQcmljZSA8IDAgPyBcIjBcIiA6IHRyYWZpY1ByaWNlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIOe4vemHkemhjSA9ICjno4XosrsgKyDoqIjlg7nph5HpoY0gKyDpgYvosrspXHJcbiAgICAgICAgbGV0IGZpbmFsUHJpY2UgPSAoK3dlaWdodEZlZSkgKyB3ZWlnaHRQcmljZSArIHRyYWZpY1ByaWNlO1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfZmluYWxfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIWZpbmFsUHJpY2UgfHwgZmluYWxQcmljZSA8IDAgPyBcIjBcIiA6IE1hdGgucm91bmQoZmluYWxQcmljZSkudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPzwhXFwuXFxkKikoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7ICAgICAgICBcclxuICAgICAgICAkKFwiI0FjdHVhbFByaWNlXCIpLnZhbChNYXRoLnJvdW5kKGZpbmFsUHJpY2UpKTtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuXHJcbmNsYXNzIFB1cmNoYXNlRGV0YWlsSW5mbyB7XHJcbiAgICBWYWx1ZTogc3RyaW5nO1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgUGVyY2VudDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG59XHJcblxyXG4kKCcjQ3VzdG9tZXJJZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8g6K6K5pu057C957SE5Zau55qEU2VsZWN05YWn5a65IOmAj+mBjkFQSVxyXG4gICAgZmV0Y2goYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL0N1c3RvbWVyQ29udHJhY3RzYClcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgfSkudGhlbigobXlKc29uKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIjQ29udHJhY3RGcm9tXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICBteUpzb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jb250cmFjdE5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ29udHJhY3RGcm9tJykuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjQ29udHJhY3RGcm9tJykudmFsKG51bGwpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIEFwcGVuZFRvU2hvd0xpc3QocHJvZEl0ZW06IEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICBjb25zdCBhbGxTaG93TGlzdCA9ICQoXCIjZXZlblByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkuY29uY2F0KCQoXCIjb2RkUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKSk7XHJcblxyXG5cclxuICAgIGNvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgIGlNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGlNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICBpUGx1c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGlQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG5cclxuICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnRleHQgPSBwcm9kSXRlbS50ZXh0Q29udGVudDtcclxuICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7cHJvZEl0ZW0udGV4dENvbnRlbnR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgIGxpVGFnLmRhdGFzZXQudmFsdWUgPSBwcm9kSXRlbS52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgbGlUYWcuZGF0YXNldC5wZXJjZW50ID0gYWxsU2hvd0xpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG5cclxuICAgIC8vIEFjdGlvbiAgICBcclxuICAgIGNvbnN0IHNob3dMaXN0ID0gYWxsU2hvd0xpc3QubGVuZ3RoICUgMiA9PT0gMCA/XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldmVuUHJvZHVjdExzXCIpIDpcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9kZFByb2R1Y3RMc1wiKTtcclxuICAgIHNob3dMaXN0Py5hcHBlbmRDaGlsZChsaVRhZyk7XHJcbiAgICAvL0FkZEhpZGRlbihsaVRhZywgaW5kZXgpO1xyXG5cclxuICAgIC8vRXZlbnRcclxuICAgIGlNaW51c1RhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbm93TElUYWcgPSB0aGlzLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICBDYWN1bGF0ZVBlcmNlbnQobm93TElUYWcsIGZhbHNlKTtcclxuICAgICAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgICAgIFNldEJpbmRpbmdWYWx1ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpUGx1c1RhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbm93TElUYWcgPSB0aGlzLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudFxyXG4gICAgICAgIENhY3VsYXRlUGVyY2VudChub3dMSVRhZywgdHJ1ZSk7XHJcbiAgICAgICAgUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgIFNob3dUb3RhbEluZm8oKTtcclxuICAgICAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL1Nob3dUb3RhbEluZm8oKTtcclxuICAgIC8vIEFzc2lnbiBzaG93IHVsIGxpc3RcclxuXHJcblxyXG4gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG5cclxuICAgIC8vIHJldHVybiBudW1iZXIgKiBudW1iZXI7XHJcbn07XHJcbmZ1bmN0aW9uIFNob3dMaXN0KCkge1xyXG4gICAgLy9sZXQgdXNlclNlbGVjdCA9ICgkKCcuc2VsZWN0MmJzNCcpLmZpbmQoJzpzZWxlY3RlZCcpLmdldCgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W10pO1xyXG4gICAgLy8gVXNlcueVq+mdouaJgOmBuFxyXG4gICAgbGV0IHVzZXJTZWxlY3QgPSAkKCcuc2VsZWN0MmJzNCcpLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdO1xyXG5cclxuICAgIC8vIOa6luWCmeimgVNob3dcclxuICAgIGxldCBzaG93TGlzdCA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdCgkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG5cclxuXHJcbiAgICAvLyDopoHmlrDlop7nmoTlsLHmlrDlop5cclxuICAgIHVzZXJTZWxlY3QuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiBzaG93TGlzdC5tYXAobGl0YWcgPT4gbGl0YWcuZGF0YXNldC52YWx1ZSkuaW5kZXhPZihpdGVtLnZhbHVlKSA9PT0gLTE7XHJcbiAgICB9KS5mb3JFYWNoKChpdGVtKSA9PiBBcHBlbmRUb1Nob3dMaXN0KGl0ZW0pKTtcclxuICAgIC8vIOimgeWIqumZpOeahOWwseWIqumZpCAgICBcclxuICAgIHNob3dMaXN0LmZpbHRlcihsaXRhZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHVzZXJTZWxlY3QubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSkuaW5kZXhPZihsaXRhZy5kYXRhc2V0LnZhbHVlKSA9PT0gLTE7XHJcbiAgICB9KS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW1vdmUoKSk7XHJcblxyXG5cclxuICAgIC8vIOimgeaWsOWinueahOWwseaWsOWinlYyXHJcbiAgICAvLyQuZWFjaChuZXdBZGRJdGVtcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAvLyAgICBBcHBlbmRUb1Nob3dMaXN0KGVsZW1lbnQpO1xyXG5cclxuICAgIC8vICAgIC8vICQoJyN0ZXN0THMnKS5hcHBlbmQoJzxsaT4nICsgJCh0aGlzKS52YWwoKSArIFwiX1wiICsgJCh0aGlzKS50ZXh0KCkgKyAnPGkgY2xhc3M9XCJmYXMgZmEtbWludXMtY2lyY2xlXCI+PC9pPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvbGk+Jyk7XHJcbiAgICAvLyAgICAvKnZhciB2YWwgPSAkLnBhcnNlSlNPTih2YWx1ZSk7Ki9cclxuICAgIC8vfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyQuZWFjaChkZWxJdGVtcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAvLyAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgLy99KVxyXG5cclxuXHJcbiAgICAvL2xldCB0aGlzT2JqID0gJCh0aGlzKTtcclxuICAgIC8vLy8g5LiN5YaN5L+d55WZ6aCF55uu55qE5bCx5Yiq6ZmkXHJcbiAgICAvL2lmICh3YW50U2F2ZS5pbmRleE9mKCQodGhpcykudmFsKCkudG9TdHJpbmcoKSkgPT09IC0xKSB7XHJcbiAgICAvLyAgICAkLmVhY2goJCgnI2V2ZW5Qcm9kdWN0THMgbGknKSwgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAvLyAgICAgICAgbGV0IGlzUmVtb3ZlID0gZWxlbWVudC5kYXRhc2V0LnZhbHVlID09PSB0aGlzT2JqLnZhbCgpLnRvU3RyaW5nKCk7XHJcbiAgICAvLyAgICAgICAgaWYgKGlzUmVtb3ZlKVxyXG4gICAgLy8gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgKTtcclxuICAgIC8vfVxyXG5cclxuXHJcbiAgICAvL2NvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIC8vY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIC8vc3BhblRhZy5pbm5lckhUTUwgPSBcIjUwJVwiO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2cocHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAvL2NvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAvL2xpVGFnLnRleHRDb250ZW50ID0gYCR7cHJvZEl0ZW0udmFsKCl9XyR7cHJvZEl0ZW0udGV4dCgpfWA7XHJcbiAgICAvL2xpVGFnLmRhdGFzZXQudnYgPSBwcm9kSXRlbS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcbiAgICAvL2xpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG5cclxuICAgIC8vY29uc3Qgc2hvd0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIik7XHJcbiAgICAvL3Nob3dMaXN0Py5hcHBlbmRDaGlsZChsaVRhZyk7XHJcblxyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufVxyXG5mdW5jdGlvbiBDYWN1bGF0ZVBlcmNlbnQoY3VyUHJvZEl0ZW06IEhUTUxMSUVsZW1lbnQsIGlzUGx1czogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VyVmFsID0gY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50O1xyXG4gICAgbGV0IG5ld1ZhbDogbnVtYmVyID0gaXNQbHVzID8gK2N1clZhbCArIDEwIDogK2N1clZhbCAtIDEwO1xyXG4gICAgaWYgKG5ld1ZhbCA+IDEwMClcclxuICAgICAgICBuZXdWYWwgPSAxMDA7XHJcbiAgICBpZiAobmV3VmFsIDwgMClcclxuICAgICAgICBuZXdWYWwgPSAwO1xyXG4gICAgY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50ID0gbmV3VmFsLnRvU3RyaW5nKCk7XHJcbiAgICAvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0c2lkZVwiKTtcclxuICAgIC8vZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGlmeVRleHQsIGZhbHNlKTtcclxufVxyXG5mdW5jdGlvbiBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgYWxsUHJvZEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBsZXQgc3BhblRhZyA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcInNwYW5cIik7XHJcbiAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0uZGF0YXNldC5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGBcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIFNob3dUb3RhbEluZm8oKSB7XHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICBsZXQgbWF4SXRlbTogSFRNTExJRWxlbWVudDtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5kYXRhc2V0LnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0uZGF0YXNldC5wZXJjZW50ID4gK2l0ZW0uZGF0YXNldC5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWxJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbFwiKTtcclxuICAgIHRvdGFsSW5mby5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnJlbW92ZSgpIH0pO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHthbGxQcm9kSXRlbXMubGVuZ3RofemghWA7XHJcbiAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgIC8vbGV0IGhhaGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0MmJzNCA6Y2hlY2tlZCcpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgLy9hbGVydChoYWhhLnZhbHVlKTtcclxuXHJcbiAgICAvL2xldCByZWNvZ25pdGlvblRleHQgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXSlcclxuICAgIC8vICAgIC5maWx0ZXIoaXRlbSA9PiB7IHJldHVybiBpdGVtLnZhbHVlID09PSBtYXhJdGVtLmRhdGFzZXQudmFsdWU7IH0pWzBdPy50ZXh0Q29udGVudCA/PyBcIueEoVwiO1xyXG4gICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LmRhdGFzZXQudGV4dCA/PyBcIueEoVwifWBcclxuXHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgIHRvdGFsSW5mby5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG5cclxuICAgIGlmIChhbGxQcm9kSXRlbXMubGVuZ3RoID4gMClcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJ0cnVlXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgICQoJyNJc1Bhc3NQdXJjaGFzZScpLnZhbChcImZhbHNlXCIpO1xyXG59XHJcbmZ1bmN0aW9uIEFkZEhpZGRlbih0aGVMaTogSFRNTExJRWxlbWVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLk5hbWVgO1xyXG4gICAgbmFtZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC50ZXh0XHJcbiAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uVmFsdWVgO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudmFsdWVcclxuICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5QZXJjZW50YDtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQucGVyY2VudFxyXG5cclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNldEJpbmRpbmdWYWx1ZSgpIHtcclxuXHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgcHVyY2hhc2VEZXRhaWxJbmZvczogUHVyY2hhc2VEZXRhaWxJbmZvW10gPSBbXTtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mbyA9IG5ldyBQdXJjaGFzZURldGFpbEluZm8oKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uVmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLk5hbWUgPSBpdGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5QZXJjZW50ID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LnBlcmNlbnQsIDEwKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm9zLnB1c2gocHVyY2hhc2VEZXRhaWxJbmZvKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHB1cmNoYXNlRGV0YWlsSW5mb3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKG51bGwpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnI1NlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3MnKS52YWwoSlNPTi5zdHJpbmdpZnkocHVyY2hhc2VEZXRhaWxJbmZvcykpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=