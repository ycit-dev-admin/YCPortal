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
        AddHidden(item, index);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLG1CQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLGdDQUFZLEdBQW5CO1FBQUEsaUJBZ0JDO1FBZkcsYUFBYTtRQUNiLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXpDLGdCQUFnQjtRQUNoQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxl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RSxDQUFDLENBQUM7UUFDaEUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztRQUNELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztLQUM1RTtBQUVMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQYWdlQ2xhc3Mge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcblxyXG5cclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgSW5pUGFnZUV2ZW50KCkge1xyXG4gICAgICAgIC8vIFBhZ2UgRmllbGRcclxuICAgICAgICBsZXQgZnVsbFdlaWdodCA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfRnVsbFdlaWdodFRpbWUnKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IGRlZmVjdGl2ZVdlaWdodCA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfRGVmZWN0aXZlV2VpZ2h0JykuZ2V0KDApO1xyXG4gICAgICAgIGxldCB1bml0UHJpY2UgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1VuaXRQcmljZScpLmdldCgwKTtcclxuICAgICAgICBsZXQgdHJhZmljVW5pdFByaWNlID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2UnKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IHdlaWdodEZlZSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfVGhpcmRXZWlnaHRGZWUnKS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IGlzaGFzVGF4TGlzdCA9ICQoXCIuaXNoYXNfdGF4XCIpLmdldCgpO1xyXG5cclxuICAgICAgICAvLyBMb2dpYyAgICAgICAgXHJcbiAgICAgICAgZnVsbFdlaWdodC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIGRlZmVjdGl2ZVdlaWdodC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHVuaXRQcmljZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHRyYWZpY1VuaXRQcmljZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHdlaWdodEZlZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIGlzaGFzVGF4TGlzdC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuQ2FjdWxhdGVBbGxGZWUpKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIFNob3dDdXN0b21lck5hbWUoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjdXN0b21lcklkID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lcklkJyk7XHJcbiAgICAgICAgbGV0IGN1c3RvbWVyTmFtZSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ3VzdG9tZXJOYW1lJyk7XHJcblxyXG4gICAgICAgIC8vIFZhcnNcclxuICAgICAgICBsZXQgb3B0aW9uT2JqID0gY3VzdG9tZXJJZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgLy8gTG9naWNcclxuICAgICAgICBjdXN0b21lck5hbWUudmFsKFwiXCIpO1xyXG4gICAgICAgIGlmIChvcHRpb25PYmoudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VzdG9tZXJOYW1lLmF0dHIoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgICAgICBjdXN0b21lck5hbWUudmFsKG9wdGlvbk9iai50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2FyTm9JdGVtcygpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIC8vIFBhZ2UgRmllbGRcclxuICAgICAgICBsZXQgY3VzdG9tZXJJZCA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ3VzdG9tZXJJZCcpO1xyXG4gICAgICAgIGxldCBjYXJOb0lkID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJOb0lkJyk7XHJcblxyXG4gICAgICAgIC8vIFZhcnMgICAgICAgICAgICAgICBcclxuICAgICAgICBjb25zdCBvcHRpb25PYmogPSBjdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG4gICAgICAgIGNvbnN0IGdldFVybDIgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNhcnNgO1xyXG4gICAgICAgIC8vY29uc3QgZ2V0VXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzP2N1c3RvbWVySWQ9JHtlbmNvZGVVUklDb21wb25lbnQob3B0aW9uT2JqLnZhbCgpLnRvU3RyaW5nKCkpfWA7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljXHJcblxyXG4gICAgICAgIHJldHVybiAkLmdldChnZXRVcmwyLCB7IGN1c3RvbWVySWQ6IGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25PYmoudmFsKCkudG9TdHJpbmcoKSkgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndvd18yXCIpXHJcbiAgICAgICAgICAgIGNhck5vSWQuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5Y+W5b6X6LuK54mM5YWn5a65IOmAj+mBjkFQSSBcclxuICAgICAgICAvL2ZldGNoKGdldFVybClcclxuICAgICAgICAvLyAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICAvLyAgICAgICAgLy9yZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgLy8gICAgfSkudGhlbigobXlKc29uKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQuaHRtbCgnJyk7XHJcbiAgICAgICAgLy8gICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICBjYXJOb0lkLmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICAvLyAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY2FyTmFtZSwgaXRlbS5pZCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGNhck5vSWQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICBjYXJOb0lkLnZhbChudWxsKVxyXG4gICAgICAgIC8vICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dDYXJOb05hbWUoKSB7XHJcbiAgICAgICAgLy8gUGFnZSBGaWVsZFxyXG4gICAgICAgIGxldCBjYXJOb0lkID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJOb0lkJyk7XHJcbiAgICAgICAgbGV0IGNhck5hbWUgPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vJyk7XHJcblxyXG4gICAgICAgIC8vIExvZ2ljIFxyXG4gICAgICAgIGxldCBjYXJOb0lkT2JqID0gY2FyTm9JZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuICAgICAgICBjYXJOYW1lLnZhbChcIlwiKTtcclxuICAgICAgICBpZiAoY2FyTm9JZE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5yZW1vdmVBdHRyKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FyTmFtZS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgY2FyTmFtZS52YWwoY2FyTm9JZE9iai50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2FjdWxhdGVBbGxGZWUoKSB7XHJcbiAgICAgICAgLy9sZXQgaGFoYSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGxldCBmdWxsV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Z1bGxXZWlnaHRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YCy5aC06YeN6YePXHJcbiAgICAgICAgbGV0IGRlZmVjdGl2ZVdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9EZWZlY3RpdmVXZWlnaHRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g5omj6YeNXHJcbiAgICAgICAgbGV0IHVuaXRQcmljZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9Vbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g5Zau5YO5XHJcbiAgICAgICAgbGV0IGlzSGFzVGF4ID0gJCgnLmlzaGFzX3RheDpjaGVja2VkJykudmFsKCkgPT09IFwiVHJ1ZVwiID8gMS4wNSA6IDE7ICAvLyDmmK/lkKblkKvnqIUgKHJhZGlvIGJ1dHRvbiDmspLmnIkgbmFtZSBhdHRyaWJ1dGUg5omA5Lul55SoKVxyXG4gICAgICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJWRV9QdXJjaGFzZVdlaWdodE5vdGVfVHJhZmljVW5pdFByaWNlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOmBi+iyu+WWruWDuVxyXG4gICAgICAgIGxldCB3ZWlnaHRGZWUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJWRV9QdXJjaGFzZVdlaWdodE5vdGVfVGhpcmRXZWlnaHRGZWVcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWVcclxuXHJcbiAgICAgICAgLy8g6KiI5YO56YeR6aGNID0gKOmAsuW7oOmHjemHjyAtIOaJo+mHjSkgKiDllq7lg7kgKiDnqIXnjodcclxuICAgICAgICAvL2xldCB3ZWlnaHRGZWUgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpO1xyXG4gICAgICAgIGxldCB3ZWlnaHRQcmljZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSkgKiAoK3VuaXRQcmljZSkgKiBpc0hhc1RheDtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3dlaWdodF9wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhd2VpZ2h0UHJpY2UgfHwgd2VpZ2h0UHJpY2UgPCAwID8gXCIwXCIgOiB3ZWlnaHRQcmljZS50b0ZpeGVkKDIpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIOmBi+iyuyA9IOmAsuW7oOmHjemHjyAqIOmBi+iyu+WWruWDuVxyXG4gICAgICAgIGxldCB0cmFmaWNQcmljZSA9ICgrZnVsbFdlaWdodCkgKiAoK3RyYWZpY1VuaXRQcmljZSk7XHJcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd190cmFmaWNfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIXRyYWZpY1ByaWNlIHx8IHRyYWZpY1ByaWNlIDwgMCA/IFwiMFwiIDogdHJhZmljUHJpY2UudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8g57i96YeR6aGNID0gKOejheiyuyArIOioiOWDuemHkemhjSArIOmBi+iyuylcclxuICAgICAgICBsZXQgZmluYWxQcmljZSA9ICgrd2VpZ2h0RmVlKSArIHdlaWdodFByaWNlICsgdHJhZmljUHJpY2U7XHJcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd19maW5hbF9wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhZmluYWxQcmljZSB8fCBmaW5hbFByaWNlIDwgMCA/IFwiMFwiIDogTWF0aC5yb3VuZChmaW5hbFByaWNlKS50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PCFcXC5cXGQqKSg/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcclxuICAgICAgICAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0FjdHVhbFByaWNlJykudmFsKE1hdGgucm91bmQoZmluYWxQcmljZSkpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9wdWJsaWMgUHVyY2hhc2VJbmdyZWRpZW50cyhPYmpuYW1lOiBzdHJpbmcpIHtcclxuXHJcblxyXG4gICAgLy8gICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIC8vICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICAvLyAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAvLyAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLk5hbWVgO1xyXG4gICAgLy8gICAgbmFtZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC50ZXh0XHJcbiAgICAvLyAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIC8vICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICAvLyAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgLy8gICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uVmFsdWVgO1xyXG4gICAgLy8gICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudmFsdWVcclxuICAgIC8vICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAvLyAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgLy8gICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgLy8gICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5QZXJjZW50YDtcclxuICAgIC8vICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQucGVyY2VudFxyXG5cclxuICAgIC8vICAgIHRoZUxpLmFwcGVuZENoaWxkKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICAvLyAgICB0aGVMaS5hcHBlbmRDaGlsZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgIC8vICAgIHRoZUxpLmFwcGVuZENoaWxkKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbiAgICAvL31cclxufTtcclxuXHJcblxyXG5cclxuY2xhc3MgUHVyY2hhc2VEZXRhaWxJbmZvIHtcclxuICAgIFZhbHVlOiBzdHJpbmc7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBQZXJjZW50OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiQoJyNDdXN0b21lcklkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyDorormm7TnsL3ntITllq7nmoRTZWxlY3Tlhaflrrkg6YCP6YGOQVBJXHJcbiAgICBmZXRjaChgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9hcGkvQ3VzdG9tZXJDb250cmFjdHNgKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAvL3JldHVybiByZXNwb25zZS50ZXh0KClcclxuICAgICAgICB9KS50aGVuKChteUpzb24pID0+IHtcclxuICAgICAgICAgICAgLy8gbGV0IGNvbnRyYWN0RnJvbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvbnRyYWN0RnJvbVwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgICAgICAgICAgLy8gY29udHJhY3RGcm9tTGlzdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIiNDb250cmFjdEZyb21cIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIG15SnNvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNvbnRyYWN0TmFtZSwgaXRlbS5pZCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICQoJyNDb250cmFjdEZyb20nKS5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudmFsdWUgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnRleHQgPSB1c2VyLmNvbnRyYWN0TmFtZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRyYWN0RnJvbUxpc3QuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJyNDb250cmFjdEZyb20nKS52YWwobnVsbClcclxuICAgICAgICB9KVxyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gQXBwZW5kVG9TaG93TGlzdChwcm9kSXRlbTogSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGFsbFNob3dMaXN0ID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKTtcclxuXHJcblxyXG4gICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG4gICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IHByb2RJdGVtLnRleHRDb250ZW50O1xyXG4gICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHtwcm9kSXRlbS50ZXh0Q29udGVudH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IHByb2RJdGVtLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSBhbGxTaG93TGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG5cclxuICAgIC8vQWRkSGlkZGVuKGxpVGFnLCBpbmRleCk7XHJcblxyXG4gICAgLy8gQWN0aW9uICAgIFxyXG4gICAgY29uc3Qgc2hvd0xpc3QgPSBhbGxTaG93TGlzdC5sZW5ndGggJSAyID09PSAwID9cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIikgOlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2RkUHJvZHVjdExzXCIpO1xyXG4gICAgc2hvd0xpc3Q/LmFwcGVuZENoaWxkKGxpVGFnKTtcclxuXHJcbiAgICBsZXQgYWxsU2hvd0xpc3QyID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKVxyXG4gICAgYWxsU2hvd0xpc3QyLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgQXJyYXkuZnJvbShpdGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKS5mb3JFYWNoKHN1Ykl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBzdWJJdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBBZGRIaWRkZW4oaXRlbSBhcyBIVE1MTElFbGVtZW50LCBpbmRleCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0V2ZW50XHJcbiAgICBpTWludXNUYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5vd0xJVGFnID0gdGhpcy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgQ2FjdWxhdGVQZXJjZW50KG5vd0xJVGFnLCBmYWxzZSk7XHJcbiAgICAgICAgUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgIFNob3dUb3RhbEluZm8oKTtcclxuICAgICAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuICAgICAgICBsZXQgYWxsU2hvd0xpc3QzID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKVxyXG4gICAgICAgIGFsbFNob3dMaXN0My5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBBcnJheS5mcm9tKGl0ZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykpLmZvckVhY2goc3ViSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEFkZEhpZGRlbihpdGVtIGFzIEhUTUxMSUVsZW1lbnQsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaVBsdXNUYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG5vd0xJVGFnID0gdGhpcy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnRcclxuICAgICAgICBDYWN1bGF0ZVBlcmNlbnQobm93TElUYWcsIHRydWUpO1xyXG4gICAgICAgIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICAgICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcbiAgICAgICAgbGV0IGFsbFNob3dMaXN0NCA9ICQoXCIjZXZlblByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkuY29uY2F0KCQoXCIjb2RkUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKSlcclxuICAgICAgICBhbGxTaG93TGlzdDQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShpdGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKS5mb3JFYWNoKHN1Ykl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBBZGRIaWRkZW4oaXRlbSBhcyBIVE1MTElFbGVtZW50LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9TaG93VG90YWxJbmZvKCk7XHJcbiAgICAvLyBBc3NpZ24gc2hvdyB1bCBsaXN0XHJcblxyXG5cclxuICAgIC8vICQoJyN0ZXN0THMnKS5hcHBlbmQoJzxsaT4nICsgJCh0aGlzKS52YWwoKSArIFwiX1wiICsgJCh0aGlzKS50ZXh0KCkgKyAnPGkgY2xhc3M9XCJmYXMgZmEtbWludXMtY2lyY2xlXCI+PC9pPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvbGk+Jyk7XHJcbiAgICAvKnZhciB2YWwgPSAkLnBhcnNlSlNPTih2YWx1ZSk7Ki9cclxuXHJcbiAgICAvLyByZXR1cm4gbnVtYmVyICogbnVtYmVyO1xyXG59O1xyXG5mdW5jdGlvbiBTaG93TGlzdCgpIHtcclxuICAgIC8vbGV0IHVzZXJTZWxlY3QgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS5nZXQoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdKTtcclxuICAgIC8vIFVzZXLnlavpnaLmiYDpgbhcclxuICAgIGxldCB1c2VyU2VsZWN0ID0gJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXTtcclxuXHJcbiAgICAvLyDmupblgpnopoFTaG93XHJcbiAgICBsZXQgc2hvd0xpc3QgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeXHJcbiAgICB1c2VyU2VsZWN0LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gc2hvd0xpc3QubWFwKGxpdGFnID0+IGxpdGFnLmRhdGFzZXQudmFsdWUpLmluZGV4T2YoaXRlbS52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaCgoaXRlbSkgPT4gQXBwZW5kVG9TaG93TGlzdChpdGVtKSk7XHJcbiAgICAvLyDopoHliKrpmaTnmoTlsLHliKrpmaQgICAgXHJcbiAgICBzaG93TGlzdC5maWx0ZXIobGl0YWcgPT4ge1xyXG4gICAgICAgIHJldHVybiB1c2VyU2VsZWN0Lm1hcChpdGVtID0+IGl0ZW0udmFsdWUpLmluZGV4T2YobGl0YWcuZGF0YXNldC52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xyXG5cclxuXHJcbiAgICAvL2xldCBhbGxTaG93TGlzdDIgPSAkKFwiI2V2ZW5Qcm9kdWN0THMgbGlcIikudG9BcnJheSgpLmNvbmNhdCgkKFwiI29kZFByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkpXHJcbiAgICAvL2FsbFNob3dMaXN0Mi5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT5cclxuICAgIC8vICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoKVxyXG4gICAgLy8gICAgQWRkSGlkZGVuKGl0ZW0gYXMgSFRNTExJRWxlbWVudCwgaW5kZXgpKVxyXG5cclxuXHJcbiAgICAvLyDopoHmlrDlop7nmoTlsLHmlrDlop5WMlxyXG4gICAgLy8kLmVhY2gobmV3QWRkSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdChlbGVtZW50KTtcclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcbiAgICAvL30pXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8kLmVhY2goZGVsSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vfSlcclxuXHJcblxyXG4gICAgLy9sZXQgdGhpc09iaiA9ICQodGhpcyk7XHJcbiAgICAvLy8vIOS4jeWGjeS/neeVmemgheebrueahOWwseWIqumZpFxyXG4gICAgLy9pZiAod2FudFNhdmUuaW5kZXhPZigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpID09PSAtMSkge1xyXG4gICAgLy8gICAgJC5lYWNoKCQoJyNldmVuUHJvZHVjdExzIGxpJyksIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgICAgIGxldCBpc1JlbW92ZSA9IGVsZW1lbnQuZGF0YXNldC52YWx1ZSA9PT0gdGhpc09iai52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy8gICAgICAgIGlmIChpc1JlbW92ZSlcclxuICAgIC8vICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG4gICAgLy9jb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgLy9jb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAvL3NwYW5UYWcuaW5uZXJIVE1MID0gXCI1MCVcIjtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHByb2RJdGVtLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgLy9jb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgLy9saVRhZy50ZXh0Q29udGVudCA9IGAke3Byb2RJdGVtLnZhbCgpfV8ke3Byb2RJdGVtLnRleHQoKX1gO1xyXG4gICAgLy9saVRhZy5kYXRhc2V0LnZ2ID0gcHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuXHJcbiAgICAvL2NvbnN0IHNob3dMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldmVuUHJvZHVjdExzXCIpO1xyXG4gICAgLy9zaG93TGlzdD8uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBzaG93IHVsIGxpc3RcclxuXHJcblxyXG4gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG5cclxuICAgIC8vIHJldHVybiBudW1iZXIgKiBudW1iZXI7XHJcbn1cclxuZnVuY3Rpb24gQ2FjdWxhdGVQZXJjZW50KGN1clByb2RJdGVtOiBIVE1MTElFbGVtZW50LCBpc1BsdXM6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGN1clZhbCA9IGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudDtcclxuICAgIGxldCBuZXdWYWw6IG51bWJlciA9IGlzUGx1cyA/ICtjdXJWYWwgKyAxMCA6ICtjdXJWYWwgLSAxMDtcclxuICAgIGlmIChuZXdWYWwgPiAxMDApXHJcbiAgICAgICAgbmV3VmFsID0gMTAwO1xyXG4gICAgaWYgKG5ld1ZhbCA8IDApXHJcbiAgICAgICAgbmV3VmFsID0gMDtcclxuICAgIGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudCA9IG5ld1ZhbC50b1N0cmluZygpO1xyXG4gICAgLy92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHNpZGVcIik7XHJcbiAgICAvL2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RpZnlUZXh0LCBmYWxzZSk7XHJcbn1cclxuZnVuY3Rpb24gUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpIHtcclxuICAgIGxldCBhbGxQcm9kSXRlbXMgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoXHJcbiAgICAgICAgJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHNwYW5UYWcgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xyXG4gICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLmRhdGFzZXQucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgXHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBTaG93VG90YWxJbmZvKCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgbGV0IG1heEl0ZW06IEhUTUxMSUVsZW1lbnQ7XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0uZGF0YXNldC5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLmRhdGFzZXQucGVyY2VudCA+ICtpdGVtLmRhdGFzZXQucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxcIik7XHJcbiAgICB0b3RhbEluZm8ucXVlcnlTZWxlY3RvckFsbChcInNwYW5cIikuZm9yRWFjaChpdGVtID0+IHsgaXRlbS5yZW1vdmUoKSB9KTtcclxuXHJcbiAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7YWxsUHJvZEl0ZW1zLmxlbmd0aH3poIVgO1xyXG4gICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICAvL2xldCBoYWhhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdDJiczQgOmNoZWNrZWQnKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgIC8vYWxlcnQoaGFoYS52YWx1ZSk7XHJcblxyXG4gICAgLy9sZXQgcmVjb2duaXRpb25UZXh0ID0gKCQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W10pXHJcbiAgICAvLyAgICAuZmlsdGVyKGl0ZW0gPT4geyByZXR1cm4gaXRlbS52YWx1ZSA9PT0gbWF4SXRlbS5kYXRhc2V0LnZhbHVlOyB9KVswXT8udGV4dENvbnRlbnQgPz8gXCLnhKFcIjtcclxuICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5kYXRhc2V0LnRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHBlcmNlbnRTcGFuKTtcclxuXHJcbiAgICBpZiAoYWxsUHJvZEl0ZW1zLmxlbmd0aCA+IDApXHJcbiAgICAgICAgJCgnI0lzUGFzc1B1cmNoYXNlJykudmFsKFwidHJ1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJmYWxzZVwiKTtcclxufVxyXG5mdW5jdGlvbiBBZGRIaWRkZW4odGhlTGk6IEhUTUxMSUVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIC8vIENyZWF0ZSBhIGhpZGRlbiBpbnB1dCBlbGVtZW50LCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaTpcclxuICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgbmFtZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgVkVfUHVyY2hhc2VJbmdyZWRpZW50THNbJHtpbmRleH1dLkl0ZW1OYW1lYDtcclxuICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudGV4dFxyXG4gICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBWRV9QdXJjaGFzZUluZ3JlZGllbnRMc1ske2luZGV4fV0uUHJvZHVjdElkYDtcclxuICAgIHZhbHVlUHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnZhbHVlXHJcbiAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtUGVyY2VudGA7XHJcbiAgICBwZXJjZW50UHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnBlcmNlbnRcclxuXHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChuYW1lUHJvcGVydHkpO1xyXG4gICAgdGhlTGkuYXBwZW5kQ2hpbGQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChwZXJjZW50UHJvcGVydHkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTZXRCaW5kaW5nVmFsdWUoKSB7XHJcblxyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mb3M6IFB1cmNoYXNlRGV0YWlsSW5mb1tdID0gW107XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGxldCBwdXJjaGFzZURldGFpbEluZm8gPSBuZXcgUHVyY2hhc2VEZXRhaWxJbmZvKCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLlZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5OYW1lID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uUGVyY2VudCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wZXJjZW50LCAxMCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvcy5wdXNoKHB1cmNoYXNlRGV0YWlsSW5mbyk7XHJcbiAgICB9KTtcclxuICAgIGlmIChwdXJjaGFzZURldGFpbEluZm9zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAkKCcjU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvcycpLnZhbChudWxsKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKEpTT04uc3RyaW5naWZ5KHB1cmNoYXNlRGV0YWlsSW5mb3MpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19