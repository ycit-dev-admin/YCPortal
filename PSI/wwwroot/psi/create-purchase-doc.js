var PageClass = /** @class */ (function () {
    function PageClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    PageClass.prototype.IniPageEvent = function () {
        var _this = this;
        // Page Field
        var fullWeight = $('#VE_PurchaseWeightNote_FullWeightTime').get(0);
        var defectiveWeight = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0);
        var unitPrice = $('#VE_PurchaseWeightNote_UnitPrice').get(0);
        var traficUnitPrice = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0);
        var weightFee = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0);
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
        var customerId = $('#VE_PurchaseWeightNote_CustomerId');
        var customerName = $('#VE_PurchaseWeightNote_CustomerName');
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
        var customerId = $('#VE_PurchaseWeightNote_CustomerId');
        var carNoId = $('#VE_PurchaseWeightNote_CarNoId');
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
        var carNoId = $('#VE_PurchaseWeightNote_CarNoId');
        var carName = $('#VE_PurchaseWeightNote_CarNo');
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
        var fullWeight = document.getElementById("VE_PurchaseWeightNote_FullWeight").value; // 進場重量
        var defectiveWeight = document.getElementById("VE_PurchaseWeightNote_DefectiveWeight").value; // 扣重
        var unitPrice = document.getElementById("VE_PurchaseWeightNote_UnitPrice").value; // 單價
        var isHasTax = $('.ishas_tax:checked').val() === "True" ? 1.05 : 1; // 是否含稅 (radio button 沒有 name attribute 所以用)
        var traficUnitPrice = document.getElementById("VE_PurchaseWeightNote_TraficUnitPrice").value; // 運費單價
        var weightFee = document.getElementById("VE_PurchaseWeightNote_ThirdWeightFee").value;
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
        $('#VE_PurchaseWeightNote_ActualPrice').val(Math.round(finalPrice));
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
    var _this = this;
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
    //AddHidden(liTag, index);
    // Action    
    var showList = allShowList.length % 2 === 0 ?
        document.getElementById("evenProductLs") :
        document.getElementById("oddProductLs");
    showList === null || showList === void 0 ? void 0 : showList.appendChild(liTag);
    var allShowList2 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray());
    allShowList2.forEach(function (item, index) {
        Array.from(item.getElementsByTagName('input')).forEach(function (subItem) {
            subItem.remove();
        });
        _this.AddHidden(item, index);
    });
    //Event
    iMinusTag.addEventListener('click', function () {
        var nowLITag = this.parentElement;
        CaculatePercent(nowLITag, false);
        RefreshProdItemPercent();
        ShowTotalInfo();
        SetBindingValue();
        var allShowList3 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray());
        allShowList3.forEach(function (item, index) {
            Array.from(item.getElementsByTagName('input')).forEach(function (subItem) {
                subItem.remove();
            });
            AddHidden(item, index);
        });
    });
    iPlusTag.addEventListener('click', function () {
        var nowLITag = this.parentElement;
        CaculatePercent(nowLITag, true);
        RefreshProdItemPercent();
        ShowTotalInfo();
        SetBindingValue();
        var allShowList4 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray());
        allShowList4.forEach(function (item, index) {
            Array.from(item.getElementsByTagName('input')).forEach(function (subItem) {
                subItem.remove();
            });
            AddHidden(item, index);
        });
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
    //let allShowList2 = $("#evenProductLs li").toArray().concat($("#oddProductLs li").toArray())
    //allShowList2.forEach((item, index) =>
    //    item.removeChild()
    //    AddHidden(item as HTMLLIElement, index))
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
    nameProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemName";
    nameProperty.value = theLi.dataset.text;
    var valueProperty = document.createElement("input");
    nameProperty.className = "modelbind";
    valueProperty.type = "hidden";
    valueProperty.name = "VE_PurchaseIngredientLs[" + index + "].ProductId";
    valueProperty.value = theLi.dataset.value;
    var percentProperty = document.createElement("input");
    nameProperty.className = "modelbind";
    percentProperty.type = "hidden";
    percentProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemPercent";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLG1CQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLGdDQUFZLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsYUFBYTtRQUNiLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXpDLGdCQUFnQjtRQUNoQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxl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T0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksbUJBQW1CLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDaEMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0tBQzVFO0FBRUwsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBhZ2VDbGFzcyB7XHJcbiAgICAvLyBHbG9iYWxcclxuXHJcbiAgICAvLyBSZWFkeSBQb3N0XHJcblxyXG5cclxuXHJcblxyXG4gICAgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBJbmlQYWdlRXZlbnQoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBmdWxsV2VpZ2h0ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9GdWxsV2VpZ2h0VGltZScpLmdldCgwKTtcclxuICAgICAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9EZWZlY3RpdmVXZWlnaHQnKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IHVuaXRQcmljZSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfVW5pdFByaWNlJykuZ2V0KDApO1xyXG4gICAgICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1RyYWZpY1VuaXRQcmljZScpLmdldCgwKTtcclxuICAgICAgICBsZXQgd2VpZ2h0RmVlID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UaGlyZFdlaWdodEZlZScpLmdldCgwKTtcclxuICAgICAgICBsZXQgaXNoYXNUYXhMaXN0ID0gJChcIi5pc2hhc190YXhcIikuZ2V0KCk7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljICAgICAgICBcclxuICAgICAgICBmdWxsV2VpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgZGVmZWN0aXZlV2VpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgdW5pdFByaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgdHJhZmljVW5pdFByaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgd2VpZ2h0RmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgaXNoYXNUYXhMaXN0LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5DYWN1bGF0ZUFsbEZlZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgU2hvd0N1c3RvbWVyTmFtZSgpIHtcclxuICAgICAgICAvLyBQYWdlIEZpZWxkXHJcbiAgICAgICAgbGV0IGN1c3RvbWVySWQgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVySWQnKTtcclxuICAgICAgICBsZXQgY3VzdG9tZXJOYW1lID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lck5hbWUnKTtcclxuXHJcbiAgICAgICAgLy8gVmFyc1xyXG4gICAgICAgIGxldCBvcHRpb25PYmogPSBjdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvLyBMb2dpY1xyXG4gICAgICAgIGN1c3RvbWVyTmFtZS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKG9wdGlvbk9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY3VzdG9tZXJOYW1lLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXN0b21lck5hbWUuYXR0cihcInJlYWRvbmx5XCIsIFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS52YWwob3B0aW9uT2JqLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRDYXJOb0l0ZW1zKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjdXN0b21lcklkID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lcklkJyk7XHJcbiAgICAgICAgbGV0IGNhck5vSWQgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vSWQnKTtcclxuXHJcbiAgICAgICAgLy8gVmFycyAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG9wdGlvbk9iaiA9IGN1c3RvbWVySWQuZmluZCgnOnNlbGVjdGVkJyk7XHJcbiAgICAgICAgY29uc3QgZ2V0VXJsMiA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ2Fyc2A7XHJcbiAgICAgICAgLy9jb25zdCBnZXRVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNhcnM/Y3VzdG9tZXJJZD0ke2VuY29kZVVSSUNvbXBvbmVudChvcHRpb25PYmoudmFsKCkudG9TdHJpbmcoKSl9YDtcclxuXHJcbiAgICAgICAgLy8gTG9naWNcclxuXHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGdldFVybDIsIHsgY3VzdG9tZXJJZDogZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbk9iai52YWwoKS50b1N0cmluZygpKSB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid293XzJcIilcclxuICAgICAgICAgICAgY2FyTm9JZC5odG1sKCcnKTtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGNhck5vSWQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5pZCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNhck5vSWQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyDlj5blvpfou4rniYzlhaflrrkg6YCP6YGOQVBJIFxyXG4gICAgICAgIC8vZmV0Y2goZ2V0VXJsKVxyXG4gICAgICAgIC8vICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIC8vICAgICAgICAvL3JldHVybiByZXNwb25zZS50ZXh0KClcclxuICAgICAgICAvLyAgICB9KS50aGVuKChteUpzb24pID0+IHtcclxuICAgICAgICAvLyAgICAgICAgLy8gbGV0IGNvbnRyYWN0RnJvbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvbnRyYWN0RnJvbVwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgICAgICAvLyAgICAgICAgLy8gY29udHJhY3RGcm9tTGlzdC5yZW1vdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgY2FyTm9JZC5odG1sKCcnKTtcclxuICAgICAgICAvLyAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIC8vICAgICAgICBteUpzb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgY2FyTm9JZC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL3Rlc3QudmFsdWUgPSB1c2VyLmlkO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90ZXN0LnRleHQgPSB1c2VyLmNvbnRyYWN0TmFtZTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnRyYWN0RnJvbUxpc3QuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQudmFsKG51bGwpXHJcbiAgICAgICAgLy8gICAgfSlcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0Nhck5vTmFtZSgpIHtcclxuICAgICAgICAvLyBQYWdlIEZpZWxkXHJcbiAgICAgICAgbGV0IGNhck5vSWQgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vSWQnKTtcclxuICAgICAgICBsZXQgY2FyTmFtZSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ2FyTm8nKTtcclxuXHJcbiAgICAgICAgLy8gTG9naWMgXHJcbiAgICAgICAgbGV0IGNhck5vSWRPYmogPSBjYXJOb0lkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG4gICAgICAgIGNhck5hbWUudmFsKFwiXCIpO1xyXG4gICAgICAgIGlmIChjYXJOb0lkT2JqLnZhbCgpID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICBjYXJOYW1lLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXJOYW1lLmF0dHIoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgICAgICBjYXJOYW1lLnZhbChjYXJOb0lkT2JqLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuICAgICAgICAvL2xldCBoYWhhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgbGV0IGZ1bGxXZWlnaHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJWRV9QdXJjaGFzZVdlaWdodE5vdGVfRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDpgLLloLTph43ph49cclxuICAgICAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlX0RlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDmiaPph41cclxuICAgICAgICBsZXQgdW5pdFByaWNlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlX1VuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDllq7lg7lcclxuICAgICAgICBsZXQgaXNIYXNUYXggPSAkKCcuaXNoYXNfdGF4OmNoZWNrZWQnKS52YWwoKSA9PT0gXCJUcnVlXCIgPyAxLjA1IDogMTsgIC8vIOaYr+WQpuWQq+eohSAocmFkaW8gYnV0dG9uIOaykuaciSBuYW1lIGF0dHJpYnV0ZSDmiYDku6XnlKgpXHJcbiAgICAgICAgbGV0IHRyYWZpY1VuaXRQcmljZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YGL6LK75Zau5YO5XHJcbiAgICAgICAgbGV0IHdlaWdodEZlZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UaGlyZFdlaWdodEZlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxyXG5cclxuICAgICAgICAvLyDoqIjlg7nph5HpoY0gPSAo6YCy5bug6YeN6YePIC0g5omj6YeNKSAqIOWWruWDuSAqIOeoheeOh1xyXG4gICAgICAgIC8vbGV0IHdlaWdodEZlZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSk7XHJcbiAgICAgICAgbGV0IHdlaWdodFByaWNlID0gKCtmdWxsV2VpZ2h0IC0gKCtkZWZlY3RpdmVXZWlnaHQpKSAqICgrdW5pdFByaWNlKSAqIGlzSGFzVGF4O1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfd2VpZ2h0X3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF3ZWlnaHRQcmljZSB8fCB3ZWlnaHRQcmljZSA8IDAgPyBcIjBcIiA6IHdlaWdodFByaWNlLnRvRml4ZWQoMikudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8g6YGL6LK7ID0g6YCy5bug6YeN6YePICog6YGL6LK75Zau5YO5XHJcbiAgICAgICAgbGV0IHRyYWZpY1ByaWNlID0gKCtmdWxsV2VpZ2h0KSAqICgrdHJhZmljVW5pdFByaWNlKTtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3RyYWZpY19wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhdHJhZmljUHJpY2UgfHwgdHJhZmljUHJpY2UgPCAwID8gXCIwXCIgOiB0cmFmaWNQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDnuL3ph5HpoY0gPSAo56OF6LK7ICsg6KiI5YO56YeR6aGNICsg6YGL6LK7KVxyXG4gICAgICAgIGxldCBmaW5hbFByaWNlID0gKCt3ZWlnaHRGZWUpICsgd2VpZ2h0UHJpY2UgKyB0cmFmaWNQcmljZTtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X2ZpbmFsX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICFmaW5hbFByaWNlIHx8IGZpbmFsUHJpY2UgPCAwID8gXCIwXCIgOiBNYXRoLnJvdW5kKGZpbmFsUHJpY2UpLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD88IVxcLlxcZCopKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG4gICAgICAgICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQWN0dWFsUHJpY2UnKS52YWwoTWF0aC5yb3VuZChmaW5hbFByaWNlKSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3B1YmxpYyBQdXJjaGFzZUluZ3JlZGllbnRzKE9iam5hbWU6IHN0cmluZykge1xyXG5cclxuXHJcbiAgICAvLyAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgLy8gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIC8vICAgIG5hbWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIC8vICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uTmFtZWA7XHJcbiAgICAvLyAgICBuYW1lUHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnRleHRcclxuICAgIC8vICAgIGxldCB2YWx1ZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgLy8gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIC8vICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAvLyAgICB2YWx1ZVByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5WYWx1ZWA7XHJcbiAgICAvLyAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC52YWx1ZVxyXG4gICAgLy8gICAgbGV0IHBlcmNlbnRQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIC8vICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICAvLyAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAvLyAgICBwZXJjZW50UHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLlBlcmNlbnRgO1xyXG4gICAgLy8gICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC5wZXJjZW50XHJcblxyXG4gICAgLy8gICAgdGhlTGkuYXBwZW5kQ2hpbGQobmFtZVByb3BlcnR5KTtcclxuICAgIC8vICAgIHRoZUxpLmFwcGVuZENoaWxkKHZhbHVlUHJvcGVydHkpO1xyXG4gICAgLy8gICAgdGhlTGkuYXBwZW5kQ2hpbGQocGVyY2VudFByb3BlcnR5KTtcclxuICAgIC8vfVxyXG59O1xyXG5cclxuXHJcblxyXG5jbGFzcyBQdXJjaGFzZURldGFpbEluZm8ge1xyXG4gICAgVmFsdWU6IHN0cmluZztcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIFBlcmNlbnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxufVxyXG5cclxuJCgnI0N1c3RvbWVySWQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIOiuiuabtOewvee0hOWWrueahFNlbGVjdOWFp+WuuSDpgI/pgY5BUElcclxuICAgIGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9DdXN0b21lckNvbnRyYWN0c2ApXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyYWN0RnJvbVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLnZhbChudWxsKVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBBcHBlbmRUb1Nob3dMaXN0KHByb2RJdGVtOiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgY29uc3QgYWxsU2hvd0xpc3QgPSAkKFwiI2V2ZW5Qcm9kdWN0THMgbGlcIikudG9BcnJheSgpLmNvbmNhdCgkKFwiI29kZFByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkpO1xyXG5cclxuXHJcbiAgICBjb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICBpTWludXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBpTWludXNUYWcuc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgIGNvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgaVBsdXNUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBpUGx1c1RhZy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBjb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuXHJcbiAgICBjb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgbGlUYWcuZGF0YXNldC50ZXh0ID0gcHJvZEl0ZW0udGV4dENvbnRlbnQ7XHJcbiAgICBsaVRhZy50ZXh0Q29udGVudCA9IGAke3Byb2RJdGVtLnRleHRDb250ZW50fSBcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnZhbHVlID0gcHJvZEl0ZW0udmFsdWUudG9TdHJpbmcoKTtcclxuICAgIGxpVGFnLmRhdGFzZXQucGVyY2VudCA9IGFsbFNob3dMaXN0Lmxlbmd0aCA9PT0gMCA/IFwiOTBcIiA6IFwiMTBcIjtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuXHJcblxyXG4gICAgLy9BZGRIaWRkZW4obGlUYWcsIGluZGV4KTtcclxuXHJcbiAgICAvLyBBY3Rpb24gICAgXHJcbiAgICBjb25zdCBzaG93TGlzdCA9IGFsbFNob3dMaXN0Lmxlbmd0aCAlIDIgPT09IDAgP1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXZlblByb2R1Y3RMc1wiKSA6XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvZGRQcm9kdWN0THNcIik7XHJcbiAgICBzaG93TGlzdD8uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG5cclxuICAgIGxldCBhbGxTaG93TGlzdDIgPSAkKFwiI2V2ZW5Qcm9kdWN0THMgbGlcIikudG9BcnJheSgpLmNvbmNhdCgkKFwiI29kZFByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkpXHJcbiAgICBhbGxTaG93TGlzdDIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBBcnJheS5mcm9tKGl0ZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykpLmZvckVhY2goc3ViSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHN1Ykl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuQWRkSGlkZGVuKGl0ZW0gYXMgSFRNTExJRWxlbWVudCwgaW5kZXgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9FdmVudFxyXG4gICAgaU1pbnVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgIENhY3VsYXRlUGVyY2VudChub3dMSVRhZywgZmFsc2UpO1xyXG4gICAgICAgIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICAgICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcbiAgICAgICAgbGV0IGFsbFNob3dMaXN0MyA9ICQoXCIjZXZlblByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkuY29uY2F0KCQoXCIjb2RkUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKSlcclxuICAgICAgICBhbGxTaG93TGlzdDMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShpdGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKS5mb3JFYWNoKHN1Ykl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBBZGRIaWRkZW4oaXRlbSBhcyBIVE1MTElFbGVtZW50LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlQbHVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50XHJcbiAgICAgICAgQ2FjdWxhdGVQZXJjZW50KG5vd0xJVGFnLCB0cnVlKTtcclxuICAgICAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgICAgIFNldEJpbmRpbmdWYWx1ZSgpO1xyXG4gICAgICAgIGxldCBhbGxTaG93TGlzdDQgPSAkKFwiI2V2ZW5Qcm9kdWN0THMgbGlcIikudG9BcnJheSgpLmNvbmNhdCgkKFwiI29kZFByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkpXHJcbiAgICAgICAgYWxsU2hvd0xpc3Q0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20oaXRlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKSkuZm9yRWFjaChzdWJJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgQWRkSGlkZGVuKGl0ZW0gYXMgSFRNTExJRWxlbWVudCwgaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufTtcclxuZnVuY3Rpb24gU2hvd0xpc3QoKSB7XHJcbiAgICAvL2xldCB1c2VyU2VsZWN0ID0gKCQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykuZ2V0KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXSk7XHJcbiAgICAvLyBVc2Vy55Wr6Z2i5omA6YG4XHJcbiAgICBsZXQgdXNlclNlbGVjdCA9ICQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W107XHJcblxyXG4gICAgLy8g5rqW5YKZ6KaBU2hvd1xyXG4gICAgbGV0IHNob3dMaXN0ID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KCQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcblxyXG5cclxuICAgIC8vIOimgeaWsOWinueahOWwseaWsOWinlxyXG4gICAgdXNlclNlbGVjdC5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNob3dMaXN0Lm1hcChsaXRhZyA9PiBsaXRhZy5kYXRhc2V0LnZhbHVlKS5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMTtcclxuICAgIH0pLmZvckVhY2goKGl0ZW0pID0+IEFwcGVuZFRvU2hvd0xpc3QoaXRlbSkpO1xyXG4gICAgLy8g6KaB5Yiq6Zmk55qE5bCx5Yiq6ZmkICAgIFxyXG4gICAgc2hvd0xpc3QuZmlsdGVyKGxpdGFnID0+IHtcclxuICAgICAgICByZXR1cm4gdXNlclNlbGVjdC5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKS5pbmRleE9mKGxpdGFnLmRhdGFzZXQudmFsdWUpID09PSAtMTtcclxuICAgIH0pLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlbW92ZSgpKTtcclxuXHJcblxyXG4gICAgLy9sZXQgYWxsU2hvd0xpc3QyID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKVxyXG4gICAgLy9hbGxTaG93TGlzdDIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+XHJcbiAgICAvLyAgICBpdGVtLnJlbW92ZUNoaWxkKClcclxuICAgIC8vICAgIEFkZEhpZGRlbihpdGVtIGFzIEhUTUxMSUVsZW1lbnQsIGluZGV4KSlcclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeVjJcclxuICAgIC8vJC5lYWNoKG5ld0FkZEl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgIEFwcGVuZFRvU2hvd0xpc3QoZWxlbWVudCk7XHJcblxyXG4gICAgLy8gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8vICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG4gICAgLy99KVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vJC5lYWNoKGRlbEl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAvL30pXHJcblxyXG5cclxuICAgIC8vbGV0IHRoaXNPYmogPSAkKHRoaXMpO1xyXG4gICAgLy8vLyDkuI3lho3kv53nlZnpoIXnm67nmoTlsLHliKrpmaRcclxuICAgIC8vaWYgKHdhbnRTYXZlLmluZGV4T2YoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSA9PT0gLTEpIHtcclxuICAgIC8vICAgICQuZWFjaCgkKCcjZXZlblByb2R1Y3RMcyBsaScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgICAgICBsZXQgaXNSZW1vdmUgPSBlbGVtZW50LmRhdGFzZXQudmFsdWUgPT09IHRoaXNPYmoudmFsKCkudG9TdHJpbmcoKTtcclxuICAgIC8vICAgICAgICBpZiAoaXNSZW1vdmUpXHJcbiAgICAvLyAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICApO1xyXG4gICAgLy99XHJcblxyXG5cclxuICAgIC8vY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgIC8vY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIC8vaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIC8vaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgLy9jb25zdCBzcGFuVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikgYXMgSFRNTFNwYW5FbGVtZW50O1xyXG4gICAgLy9zcGFuVGFnLmlubmVySFRNTCA9IFwiNTAlXCI7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhwcm9kSXRlbS52YWwoKS50b1N0cmluZygpKTtcclxuICAgIC8vY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIC8vbGlUYWcudGV4dENvbnRlbnQgPSBgJHtwcm9kSXRlbS52YWwoKX1fJHtwcm9kSXRlbS50ZXh0KCl9YDtcclxuICAgIC8vbGlUYWcuZGF0YXNldC52diA9IHByb2RJdGVtLnZhbCgpLnRvU3RyaW5nKCk7XHJcbiAgICAvL2xpVGFnLmFwcGVuZENoaWxkKGlNaW51c1RhZyk7XHJcbiAgICAvL2xpVGFnLmFwcGVuZENoaWxkKGlQbHVzVGFnKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcblxyXG4gICAgLy9jb25zdCBzaG93TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXZlblByb2R1Y3RMc1wiKTtcclxuICAgIC8vc2hvd0xpc3Q/LmFwcGVuZENoaWxkKGxpVGFnKTtcclxuXHJcbiAgICAvLyBBc3NpZ24gc2hvdyB1bCBsaXN0XHJcblxyXG5cclxuICAgIC8vICQoJyN0ZXN0THMnKS5hcHBlbmQoJzxsaT4nICsgJCh0aGlzKS52YWwoKSArIFwiX1wiICsgJCh0aGlzKS50ZXh0KCkgKyAnPGkgY2xhc3M9XCJmYXMgZmEtbWludXMtY2lyY2xlXCI+PC9pPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvbGk+Jyk7XHJcbiAgICAvKnZhciB2YWwgPSAkLnBhcnNlSlNPTih2YWx1ZSk7Ki9cclxuXHJcbiAgICAvLyByZXR1cm4gbnVtYmVyICogbnVtYmVyO1xyXG59XHJcbmZ1bmN0aW9uIENhY3VsYXRlUGVyY2VudChjdXJQcm9kSXRlbTogSFRNTExJRWxlbWVudCwgaXNQbHVzOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBjdXJWYWwgPSBjdXJQcm9kSXRlbS5kYXRhc2V0LnBlcmNlbnQ7XHJcbiAgICBsZXQgbmV3VmFsOiBudW1iZXIgPSBpc1BsdXMgPyArY3VyVmFsICsgMTAgOiArY3VyVmFsIC0gMTA7XHJcbiAgICBpZiAobmV3VmFsID4gMTAwKVxyXG4gICAgICAgIG5ld1ZhbCA9IDEwMDtcclxuICAgIGlmIChuZXdWYWwgPCAwKVxyXG4gICAgICAgIG5ld1ZhbCA9IDA7XHJcbiAgICBjdXJQcm9kSXRlbS5kYXRhc2V0LnBlcmNlbnQgPSBuZXdWYWwudG9TdHJpbmcoKTtcclxuICAgIC8vdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRzaWRlXCIpO1xyXG4gICAgLy9lbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kaWZ5VGV4dCwgZmFsc2UpO1xyXG59XHJcbmZ1bmN0aW9uIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKSB7XHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGxldCBzcGFuVGFnID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwic3BhblwiKTtcclxuICAgICAgICBzcGFuVGFnLmlubmVySFRNTCA9IGBcXHUwMEEwXFx1MDBBMCR7aXRlbS5kYXRhc2V0LnBlcmNlbnR9JVxcdTAwQTBcXHUwMEEwYFxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gU2hvd1RvdGFsSW5mbygpIHtcclxuICAgIGxldCBhbGxQcm9kSXRlbXMgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoXHJcbiAgICAgICAgJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuICAgIGxldCBhbGxQZXJjZW50ID0gMDtcclxuICAgIGxldCBtYXhJdGVtOiBIVE1MTElFbGVtZW50O1xyXG4gICAgYWxsUHJvZEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBhbGxQZXJjZW50ID0gKyBpdGVtLmRhdGFzZXQucGVyY2VudCArIGFsbFBlcmNlbnQ7XHJcbiAgICAgICAgaWYgKCFtYXhJdGVtKSB7XHJcbiAgICAgICAgICAgIG1heEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1heEl0ZW0gPSArbWF4SXRlbS5kYXRhc2V0LnBlcmNlbnQgPiAraXRlbS5kYXRhc2V0LnBlcmNlbnQgPyBtYXhJdGVtIDogaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbEluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFsXCIpO1xyXG4gICAgdG90YWxJbmZvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzcGFuXCIpLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0ucmVtb3ZlKCkgfSk7XHJcblxyXG4gICAgY29uc3QgaXRlbVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGl0ZW1TcGFuLmlubmVySFRNTCA9IGDvvIzlt7Lpgbgke2FsbFByb2RJdGVtcy5sZW5ndGh96aCFYDtcclxuICAgIGNvbnN0IHBlcmNlbnRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBwZXJjZW50U3Bhbi5pbm5lckhUTUwgPSBg77yM5q+U5L6L5Yqg57i9OiR7YWxsUGVyY2VudH0lYFxyXG4gICAgaWYgKGFsbFBlcmNlbnQgPiAxMDApXHJcbiAgICAgICAgcGVyY2VudFNwYW4uc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgY29uc3QgcmVjb2duaXRpb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblxyXG4gICAgLy9sZXQgaGFoYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QyYnM0IDpjaGVja2VkJykgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAvL2FsZXJ0KGhhaGEudmFsdWUpO1xyXG5cclxuICAgIC8vbGV0IHJlY29nbml0aW9uVGV4dCA9ICgkKCcuc2VsZWN0MmJzNCcpLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdKVxyXG4gICAgLy8gICAgLmZpbHRlcihpdGVtID0+IHsgcmV0dXJuIGl0ZW0udmFsdWUgPT09IG1heEl0ZW0uZGF0YXNldC52YWx1ZTsgfSlbMF0/LnRleHRDb250ZW50ID8/IFwi54ShXCI7XHJcbiAgICByZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MID0gYOiqjeWIl+mgheebriA6ICR7bWF4SXRlbT8uZGF0YXNldC50ZXh0ID8/IFwi54ShXCJ9YFxyXG5cclxuICAgIHRvdGFsSW5mby5hcHBlbmRDaGlsZChyZWNvZ25pdGlvblNwYW4pO1xyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKGl0ZW1TcGFuKTtcclxuICAgIHRvdGFsSW5mby5hcHBlbmRDaGlsZChwZXJjZW50U3Bhbik7XHJcblxyXG4gICAgaWYgKGFsbFByb2RJdGVtcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICQoJyNJc1Bhc3NQdXJjaGFzZScpLnZhbChcInRydWVcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgJCgnI0lzUGFzc1B1cmNoYXNlJykudmFsKFwiZmFsc2VcIik7XHJcbn1cclxuZnVuY3Rpb24gQWRkSGlkZGVuKHRoZUxpOiBIVE1MTElFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAvLyBDcmVhdGUgYSBoaWRkZW4gaW5wdXQgZWxlbWVudCwgYW5kIGFwcGVuZCBpdCB0byB0aGUgbGk6XHJcbiAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIG5hbWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtTmFtZWA7XHJcbiAgICBuYW1lUHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnRleHRcclxuICAgIGxldCB2YWx1ZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICB2YWx1ZVByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLlByb2R1Y3RJZGA7XHJcbiAgICB2YWx1ZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC52YWx1ZVxyXG4gICAgbGV0IHBlcmNlbnRQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICBwZXJjZW50UHJvcGVydHkubmFtZSA9IGBWRV9QdXJjaGFzZUluZ3JlZGllbnRMc1ske2luZGV4fV0uSXRlbVBlcmNlbnRgO1xyXG4gICAgcGVyY2VudFByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC5wZXJjZW50XHJcblxyXG4gICAgdGhlTGkuYXBwZW5kQ2hpbGQobmFtZVByb3BlcnR5KTtcclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKHZhbHVlUHJvcGVydHkpO1xyXG4gICAgdGhlTGkuYXBwZW5kQ2hpbGQocGVyY2VudFByb3BlcnR5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gU2V0QmluZGluZ1ZhbHVlKCkge1xyXG5cclxuICAgIGxldCBhbGxQcm9kSXRlbXMgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoXHJcbiAgICAgICAgJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuICAgIGxldCBwdXJjaGFzZURldGFpbEluZm9zOiBQdXJjaGFzZURldGFpbEluZm9bXSA9IFtdO1xyXG4gICAgYWxsUHJvZEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBsZXQgcHVyY2hhc2VEZXRhaWxJbmZvID0gbmV3IFB1cmNoYXNlRGV0YWlsSW5mbygpO1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5WYWx1ZSA9IGl0ZW0uZGF0YXNldC52YWx1ZTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uTmFtZSA9IGl0ZW0udGV4dENvbnRlbnQ7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLlBlcmNlbnQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQucGVyY2VudCwgMTApO1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mb3MucHVzaChwdXJjaGFzZURldGFpbEluZm8pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAocHVyY2hhc2VEZXRhaWxJbmZvcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgJCgnI1NlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3MnKS52YWwobnVsbCk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCcjU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvcycpLnZhbChKU09OLnN0cmluZ2lmeShwdXJjaGFzZURldGFpbEluZm9zKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==