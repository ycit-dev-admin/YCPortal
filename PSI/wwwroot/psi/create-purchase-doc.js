var PageClass = /** @class */ (function () {
    function PageClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        //Page Field
        this.FieldCustomerId = $("#CustomerId");
        this.FieldCustomerName = $("#CustomerName");
        this.FieldCarNoId = $("#CarNoId");
        this.FieldCarNoName = $("#CarNoName");
        this.BaseUrl = baseUrl;
        //this.CustomerId = $("#CustomerId");
        //this.CustomerName = $("#CustomerName");
    }
    PageClass.prototype.IniPageEvent = function (fullWeight, defectiveWeight, unitPrice, traficUnitPrice, weightFee, ishasTexList) {
        // Page Event Listioner
        //(document.getElementById("FullWeight") as HTMLInputElement).addEventListener('keydown', CaculateAllFee);
        fullWeight.addEventListener('keyup', CaculateAllFee);
        defectiveWeight.addEventListener('keyup', CaculateAllFee);
        unitPrice.addEventListener('keyup', CaculateAllFee);
        traficUnitPrice.addEventListener('keyup', CaculateAllFee);
        weightFee.addEventListener('keyup', CaculateAllFee);
        ishasTexList.forEach(function (item) { return item.addEventListener('change', CaculateAllFee); });
    };
    ;
    PageClass.prototype.ShowCustomerName = function () {
        var optionObj = this.FieldCustomerId.find(':selected');
        this.FieldCustomerName.val("");
        if (optionObj.val() === "0") {
            this.FieldCustomerName.removeAttr('disabled');
        }
        else {
            this.FieldCustomerName.attr('disabled', 'disabled');
            this.FieldCustomerName.val(optionObj.text());
        }
    };
    PageClass.prototype.SetCarNoItems = function () {
        var optionObj = this.FieldCustomerId.find(':selected');
        //const data = { foo: 1, bar: 2 };
        //const haha = `https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`;
        var getUrl = this.BaseUrl + "/api/CustomerCars?customerId=" + encodeURIComponent(optionObj.val().toString());
        var getUrl2 = this.BaseUrl + "/api/CustomerCars";
        console.log("wow_1");
        var thisObj = this;
        return $.get(getUrl2, { customerId: encodeURIComponent(optionObj.val().toString()) }).done(function (data) {
            // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
            // contractFromList.remove();
            console.log("wow_2");
            thisObj.FieldCarNoId.html('');
            var defaultOption = new Option("0.新車牌", "0", false, false);
            thisObj.FieldCarNoId.append(defaultOption);
            data.forEach(function (item) {
                var newOption = new Option(item.carName, item.id, false, false);
                thisObj.FieldCarNoId.append(newOption);
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
        var carNoIdObj = this.FieldCarNoId.find(':selected');
        this.FieldCarNoName.val("");
        if (carNoIdObj.val() === "0") {
            this.FieldCarNoName.removeAttr('disabled');
        }
        else {
            this.FieldCarNoName.attr('disabled', 'disabled');
            this.FieldCarNoName.val(carNoIdObj.text());
        }
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
//$('#CarNoId').on('change', function () {
//    const thisSelectObj = $(this).find(':selected');
//    $('#CarNoName').val("");
//    if (thisSelectObj.val() === "0") {
//        $('#CarNoName').removeAttr('disabled');
//    } else {
//        $('#CarNoName').attr('disabled', 'disabled');
//        $('#CarNoName').val(thisSelectObj.text());
//    }
//});
$('#user-select-proditem').on('change', function () {
    /*$('li[name="abc"]').remove();*/
    //$('#evenProductLs li').remove();
    // $('#oddnProductLs li').remove();
    ShowList();
    RefreshProdItemPercent();
    ShowTotalInfo();
    SetBindingValue();
    //$.each($('.select2bs4').find(':selected'), function (index, value) {
    //    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    //    AppendToShowList($(this));
    //    /*var val = $.parseJSON(value);*/
    //})
    //console.log($('.select2bs4:checked'));
    //alert($(".select2bs4:checked").val());
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
    // 
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
function CaculateAllFee() {
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
    document.getElementById("show_final_price").textContent = !finalPrice || finalPrice < 0 ? "0" : finalPrice.toString();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLG1CQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFSaEMsWUFBWTtRQUNaLG9CQUFlLEdBQThCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxzQkFBaUIsR0FBNkIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pFLGlCQUFZLEdBQThCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxtQkFBYyxHQUE2QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFLdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIscUNBQXFDO1FBQ3JDLHlDQUF5QztJQUM3QyxDQUFDO0lBQ00sZ0NBQVksR0FBbkIsVUFDSSxVQUE0QixFQUM1QixlQUFpQyxFQUNqQyxTQUEyQixFQUMzQixlQUFpQyxFQUNqQyxTQUEyQixFQUMzQixZQUEyQjtRQUUzQix1QkFBdUI7UUFDdkIsMEdBQTBHO1FBQzFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDckQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMxRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDMUQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxjQUFjLENB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OUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBhZ2VDbGFzcyB7XHJcbiAgICAvL1BhZ2UgRmllbGRcclxuICAgIEZpZWxkQ3VzdG9tZXJJZDogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoXCIjQ3VzdG9tZXJJZFwiKTtcclxuICAgIEZpZWxkQ3VzdG9tZXJOYW1lOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKFwiI0N1c3RvbWVyTmFtZVwiKTtcclxuICAgIEZpZWxkQ2FyTm9JZDogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoXCIjQ2FyTm9JZFwiKTtcclxuICAgIEZpZWxkQ2FyTm9OYW1lOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKFwiI0Nhck5vTmFtZVwiKTtcclxuXHJcblxyXG4gICAgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgLy90aGlzLkN1c3RvbWVySWQgPSAkKFwiI0N1c3RvbWVySWRcIik7XHJcbiAgICAgICAgLy90aGlzLkN1c3RvbWVyTmFtZSA9ICQoXCIjQ3VzdG9tZXJOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEluaVBhZ2VFdmVudChcclxuICAgICAgICBmdWxsV2VpZ2h0OiBIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgICAgIGRlZmVjdGl2ZVdlaWdodDogSFRNTElucHV0RWxlbWVudCxcclxuICAgICAgICB1bml0UHJpY2U6IEhUTUxJbnB1dEVsZW1lbnQsXHJcbiAgICAgICAgdHJhZmljVW5pdFByaWNlOiBIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgICAgIHdlaWdodEZlZTogSFRNTElucHV0RWxlbWVudCxcclxuICAgICAgICBpc2hhc1RleExpc3Q6IEhUTUxFbGVtZW50W11cclxuICAgICkge1xyXG4gICAgICAgIC8vIFBhZ2UgRXZlbnQgTGlzdGlvbmVyXHJcbiAgICAgICAgLy8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGdWxsV2VpZ2h0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBDYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgZnVsbFdlaWdodC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgICAgICBkZWZlY3RpdmVXZWlnaHQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBDYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgdW5pdFByaWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgICAgIHRyYWZpY1VuaXRQcmljZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgICAgICB3ZWlnaHRGZWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBDYWN1bGF0ZUFsbEZlZSk7XHJcbiAgICAgICAgaXNoYXNUZXhMaXN0LmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgQ2FjdWxhdGVBbGxGZWUpKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgU2hvd0N1c3RvbWVyTmFtZSgpIHtcclxuICAgICAgICBsZXQgb3B0aW9uT2JqID0gdGhpcy5GaWVsZEN1c3RvbWVySWQuZmluZCgnOnNlbGVjdGVkJyk7XHJcbiAgICAgICAgdGhpcy5GaWVsZEN1c3RvbWVyTmFtZS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKG9wdGlvbk9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5GaWVsZEN1c3RvbWVyTmFtZS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmllbGRDdXN0b21lck5hbWUuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5GaWVsZEN1c3RvbWVyTmFtZS52YWwob3B0aW9uT2JqLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIFNldENhck5vSXRlbXMoKTogSlF1ZXJ5LmpxWEhSIHtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbk9iaiA9IHRoaXMuRmllbGRDdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvL2NvbnN0IGRhdGEgPSB7IGZvbzogMSwgYmFyOiAyIH07XHJcbiAgICAgICAgLy9jb25zdCBoYWhhID0gYGh0dHBzOi8vYXBpLnBhcnNlLmNvbS8xL3VzZXJzP2Zvbz0ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLmZvbyl9JmJhcj0ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLmJhcil9YDtcclxuICAgICAgICBjb25zdCBnZXRVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNhcnM/Y3VzdG9tZXJJZD0ke2VuY29kZVVSSUNvbXBvbmVudChvcHRpb25PYmoudmFsKCkudG9TdHJpbmcoKSl9YDtcclxuICAgICAgICBjb25zdCBnZXRVcmwyID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzYDtcclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid293XzFcIilcclxuICAgICAgICBsZXQgdGhpc09iaiA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGdldFVybDIsIHsgY3VzdG9tZXJJZDogZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbk9iai52YWwoKS50b1N0cmluZygpKSB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid293XzJcIilcclxuICAgICAgICAgICAgdGhpc09iai5GaWVsZENhck5vSWQuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0T3B0aW9uID0gbmV3IE9wdGlvbihcIjAu5paw6LuK54mMXCIsIFwiMFwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzT2JqLkZpZWxkQ2FyTm9JZC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpc09iai5GaWVsZENhck5vSWQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyDlj5blvpfou4rniYzlhaflrrkg6YCP6YGOQVBJIFxyXG4gICAgICAgIC8vZmV0Y2goZ2V0VXJsKVxyXG4gICAgICAgIC8vICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIC8vICAgICAgICAvL3JldHVybiByZXNwb25zZS50ZXh0KClcclxuICAgICAgICAvLyAgICB9KS50aGVuKChteUpzb24pID0+IHtcclxuICAgICAgICAvLyAgICAgICAgLy8gbGV0IGNvbnRyYWN0RnJvbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvbnRyYWN0RnJvbVwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgICAgICAvLyAgICAgICAgLy8gY29udHJhY3RGcm9tTGlzdC5yZW1vdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgY2FyTm9JZC5odG1sKCcnKTtcclxuICAgICAgICAvLyAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQuYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIC8vICAgICAgICBteUpzb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgY2FyTm9JZC5hcHBlbmQobmV3T3B0aW9uKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL3Rlc3QudmFsdWUgPSB1c2VyLmlkO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90ZXN0LnRleHQgPSB1c2VyLmNvbnRyYWN0TmFtZTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2NvbnRyYWN0RnJvbUxpc3QuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIGNhck5vSWQudmFsKG51bGwpXHJcbiAgICAgICAgLy8gICAgfSlcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0Nhck5vTmFtZSgpIHtcclxuICAgICAgICBsZXQgY2FyTm9JZE9iaiA9IHRoaXMuRmllbGRDYXJOb0lkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG4gICAgICAgIHRoaXMuRmllbGRDYXJOb05hbWUudmFsKFwiXCIpO1xyXG4gICAgICAgIGlmIChjYXJOb0lkT2JqLnZhbCgpID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICB0aGlzLkZpZWxkQ2FyTm9OYW1lLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5GaWVsZENhck5vTmFtZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLkZpZWxkQ2FyTm9OYW1lLnZhbChjYXJOb0lkT2JqLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5jbGFzcyBQdXJjaGFzZURldGFpbEluZm8ge1xyXG4gICAgVmFsdWU6IHN0cmluZztcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIFBlcmNlbnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxufVxyXG5cclxuJCgnI0N1c3RvbWVySWQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIOiuiuabtOewvee0hOWWrueahFNlbGVjdOWFp+WuuSDpgI/pgY5BUElcclxuICAgIGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9DdXN0b21lckNvbnRyYWN0c2ApXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyYWN0RnJvbVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLnZhbChudWxsKVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxufSk7XHJcblxyXG4vLyQoJyNDYXJOb0lkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgY29uc3QgdGhpc1NlbGVjdE9iaiA9ICQodGhpcykuZmluZCgnOnNlbGVjdGVkJyk7XHJcblxyXG4vLyAgICAkKCcjQ2FyTm9OYW1lJykudmFsKFwiXCIpO1xyXG4vLyAgICBpZiAodGhpc1NlbGVjdE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuLy8gICAgICAgICQoJyNDYXJOb05hbWUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4vLyAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgJCgnI0Nhck5vTmFtZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbi8vICAgICAgICAkKCcjQ2FyTm9OYW1lJykudmFsKHRoaXNTZWxlY3RPYmoudGV4dCgpKTtcclxuLy8gICAgfVxyXG4vL30pO1xyXG5cclxuJCgnI3VzZXItc2VsZWN0LXByb2RpdGVtJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKiQoJ2xpW25hbWU9XCJhYmNcIl0nKS5yZW1vdmUoKTsqL1xyXG5cclxuICAgIC8vJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS5yZW1vdmUoKTtcclxuICAgIC8vICQoJyNvZGRuUHJvZHVjdExzIGxpJykucmVtb3ZlKCk7XHJcblxyXG5cclxuXHJcbiAgICBTaG93TGlzdCgpO1xyXG4gICAgUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8kLmVhY2goJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8vICAgIEFwcGVuZFRvU2hvd0xpc3QoJCh0aGlzKSk7XHJcbiAgICAvLyAgICAvKnZhciB2YWwgPSAkLnBhcnNlSlNPTih2YWx1ZSk7Ki9cclxuICAgIC8vfSlcclxuICAgIC8vY29uc29sZS5sb2coJCgnLnNlbGVjdDJiczQ6Y2hlY2tlZCcpKTtcclxuICAgIC8vYWxlcnQoJChcIi5zZWxlY3QyYnM0OmNoZWNrZWRcIikudmFsKCkpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIEFwcGVuZFRvU2hvd0xpc3QocHJvZEl0ZW06IEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICBjb25zdCBhbGxTaG93TGlzdCA9ICQoXCIjZXZlblByb2R1Y3RMcyBsaVwiKS50b0FycmF5KCkuY29uY2F0KCQoXCIjb2RkUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKSk7XHJcblxyXG5cclxuICAgIGNvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLW1pbnVzLWNpcmNsZVwiKTtcclxuICAgIGlNaW51c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGlNaW51c1RhZy5zdHlsZS5jb2xvciA9IFwiYmx1ZVwiO1xyXG4gICAgY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICBpUGx1c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGlQbHVzVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgIGNvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG5cclxuICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnRleHQgPSBwcm9kSXRlbS50ZXh0Q29udGVudDtcclxuICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7cHJvZEl0ZW0udGV4dENvbnRlbnR9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgIGxpVGFnLmRhdGFzZXQudmFsdWUgPSBwcm9kSXRlbS52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgbGlUYWcuZGF0YXNldC5wZXJjZW50ID0gYWxsU2hvd0xpc3QubGVuZ3RoID09PSAwID8gXCI5MFwiIDogXCIxMFwiO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgIGxpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG5cclxuICAgIC8vIEFjdGlvbiAgICBcclxuICAgIGNvbnN0IHNob3dMaXN0ID0gYWxsU2hvd0xpc3QubGVuZ3RoICUgMiA9PT0gMCA/XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldmVuUHJvZHVjdExzXCIpIDpcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9kZFByb2R1Y3RMc1wiKTtcclxuICAgIHNob3dMaXN0Py5hcHBlbmRDaGlsZChsaVRhZyk7XHJcbiAgICAvL0FkZEhpZGRlbihsaVRhZywgaW5kZXgpO1xyXG5cclxuICAgIC8vRXZlbnRcclxuICAgIGlNaW51c1RhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbm93TElUYWcgPSB0aGlzLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICBDYWN1bGF0ZVBlcmNlbnQobm93TElUYWcsIGZhbHNlKTtcclxuICAgICAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgICAgIFNldEJpbmRpbmdWYWx1ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBpUGx1c1RhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbm93TElUYWcgPSB0aGlzLnBhcmVudEVsZW1lbnQgYXMgSFRNTExJRWxlbWVudFxyXG4gICAgICAgIENhY3VsYXRlUGVyY2VudChub3dMSVRhZywgdHJ1ZSk7XHJcbiAgICAgICAgUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgIFNob3dUb3RhbEluZm8oKTtcclxuICAgICAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvL1Nob3dUb3RhbEluZm8oKTtcclxuICAgIC8vIEFzc2lnbiBzaG93IHVsIGxpc3RcclxuXHJcblxyXG4gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG5cclxuICAgIC8vIHJldHVybiBudW1iZXIgKiBudW1iZXI7XHJcbn07XHJcbmZ1bmN0aW9uIFNob3dMaXN0KCkge1xyXG4gICAgLy8gXHJcbiAgICAvL2xldCB1c2VyU2VsZWN0ID0gKCQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykuZ2V0KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXSk7XHJcbiAgICAvLyBVc2Vy55Wr6Z2i5omA6YG4XHJcbiAgICBsZXQgdXNlclNlbGVjdCA9ICQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W107XHJcblxyXG4gICAgLy8g5rqW5YKZ6KaBU2hvd1xyXG4gICAgbGV0IHNob3dMaXN0ID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KCQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcblxyXG5cclxuICAgIC8vIOimgeaWsOWinueahOWwseaWsOWinlxyXG4gICAgdXNlclNlbGVjdC5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNob3dMaXN0Lm1hcChsaXRhZyA9PiBsaXRhZy5kYXRhc2V0LnZhbHVlKS5pbmRleE9mKGl0ZW0udmFsdWUpID09PSAtMTtcclxuICAgIH0pLmZvckVhY2goKGl0ZW0pID0+IEFwcGVuZFRvU2hvd0xpc3QoaXRlbSkpO1xyXG4gICAgLy8g6KaB5Yiq6Zmk55qE5bCx5Yiq6ZmkICAgIFxyXG4gICAgc2hvd0xpc3QuZmlsdGVyKGxpdGFnID0+IHtcclxuICAgICAgICByZXR1cm4gdXNlclNlbGVjdC5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKS5pbmRleE9mKGxpdGFnLmRhdGFzZXQudmFsdWUpID09PSAtMTtcclxuICAgIH0pLmZvckVhY2goaXRlbSA9PiBpdGVtLnJlbW92ZSgpKTtcclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeVjJcclxuICAgIC8vJC5lYWNoKG5ld0FkZEl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgIEFwcGVuZFRvU2hvd0xpc3QoZWxlbWVudCk7XHJcblxyXG4gICAgLy8gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8vICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG4gICAgLy99KVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vJC5lYWNoKGRlbEl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAvL30pXHJcblxyXG5cclxuICAgIC8vbGV0IHRoaXNPYmogPSAkKHRoaXMpO1xyXG4gICAgLy8vLyDkuI3lho3kv53nlZnpoIXnm67nmoTlsLHliKrpmaRcclxuICAgIC8vaWYgKHdhbnRTYXZlLmluZGV4T2YoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKSA9PT0gLTEpIHtcclxuICAgIC8vICAgICQuZWFjaCgkKCcjZXZlblByb2R1Y3RMcyBsaScpLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgIC8vICAgICAgICBsZXQgaXNSZW1vdmUgPSBlbGVtZW50LmRhdGFzZXQudmFsdWUgPT09IHRoaXNPYmoudmFsKCkudG9TdHJpbmcoKTtcclxuICAgIC8vICAgICAgICBpZiAoaXNSZW1vdmUpXHJcbiAgICAvLyAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICApO1xyXG4gICAgLy99XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9jb25zdCBpTWludXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgLy9jb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIpO1xyXG4gICAgLy9pUGx1c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtcGx1cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IHNwYW5UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICAvL3NwYW5UYWcuaW5uZXJIVE1MID0gXCI1MCVcIjtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHByb2RJdGVtLnZhbCgpLnRvU3RyaW5nKCkpO1xyXG4gICAgLy9jb25zdCBsaVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgLy9saVRhZy50ZXh0Q29udGVudCA9IGAke3Byb2RJdGVtLnZhbCgpfV8ke3Byb2RJdGVtLnRleHQoKX1gO1xyXG4gICAgLy9saVRhZy5kYXRhc2V0LnZ2ID0gcHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaU1pbnVzVGFnKTtcclxuICAgIC8vbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuXHJcbiAgICAvL2NvbnN0IHNob3dMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldmVuUHJvZHVjdExzXCIpO1xyXG4gICAgLy9zaG93TGlzdD8uYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBzaG93IHVsIGxpc3RcclxuXHJcblxyXG4gICAgLy8gJCgnI3Rlc3RMcycpLmFwcGVuZCgnPGxpPicgKyAkKHRoaXMpLnZhbCgpICsgXCJfXCIgKyAkKHRoaXMpLnRleHQoKSArICc8aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9saT4nKTtcclxuICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG5cclxuICAgIC8vIHJldHVybiBudW1iZXIgKiBudW1iZXI7XHJcbn1cclxuZnVuY3Rpb24gQ2FjdWxhdGVQZXJjZW50KGN1clByb2RJdGVtOiBIVE1MTElFbGVtZW50LCBpc1BsdXM6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGN1clZhbCA9IGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudDtcclxuICAgIGxldCBuZXdWYWw6IG51bWJlciA9IGlzUGx1cyA/ICtjdXJWYWwgKyAxMCA6ICtjdXJWYWwgLSAxMDtcclxuICAgIGlmIChuZXdWYWwgPiAxMDApXHJcbiAgICAgICAgbmV3VmFsID0gMTAwO1xyXG4gICAgaWYgKG5ld1ZhbCA8IDApXHJcbiAgICAgICAgbmV3VmFsID0gMDtcclxuICAgIGN1clByb2RJdGVtLmRhdGFzZXQucGVyY2VudCA9IG5ld1ZhbC50b1N0cmluZygpO1xyXG4gICAgLy92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHNpZGVcIik7XHJcbiAgICAvL2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RpZnlUZXh0LCBmYWxzZSk7XHJcbn1cclxuZnVuY3Rpb24gUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpIHtcclxuICAgIGxldCBhbGxQcm9kSXRlbXMgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoXHJcbiAgICAgICAgJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHNwYW5UYWcgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xyXG4gICAgICAgIHNwYW5UYWcuaW5uZXJIVE1MID0gYFxcdTAwQTBcXHUwMEEwJHtpdGVtLmRhdGFzZXQucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgXHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBTaG93VG90YWxJbmZvKCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IGFsbFBlcmNlbnQgPSAwO1xyXG4gICAgbGV0IG1heEl0ZW06IEhUTUxMSUVsZW1lbnQ7XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0uZGF0YXNldC5wZXJjZW50ICsgYWxsUGVyY2VudDtcclxuICAgICAgICBpZiAoIW1heEl0ZW0pIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWF4SXRlbSA9ICttYXhJdGVtLmRhdGFzZXQucGVyY2VudCA+ICtpdGVtLmRhdGFzZXQucGVyY2VudCA/IG1heEl0ZW0gOiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YWxcIik7XHJcbiAgICB0b3RhbEluZm8ucXVlcnlTZWxlY3RvckFsbChcInNwYW5cIikuZm9yRWFjaChpdGVtID0+IHsgaXRlbS5yZW1vdmUoKSB9KTtcclxuXHJcbiAgICBjb25zdCBpdGVtU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgaXRlbVNwYW4uaW5uZXJIVE1MID0gYO+8jOW3sumBuCR7YWxsUHJvZEl0ZW1zLmxlbmd0aH3poIVgO1xyXG4gICAgY29uc3QgcGVyY2VudFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICBpZiAoYWxsUGVyY2VudCA+IDEwMClcclxuICAgICAgICBwZXJjZW50U3Bhbi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICAvL2xldCBoYWhhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdDJiczQgOmNoZWNrZWQnKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgIC8vYWxlcnQoaGFoYS52YWx1ZSk7XHJcblxyXG4gICAgLy9sZXQgcmVjb2duaXRpb25UZXh0ID0gKCQoJy5zZWxlY3QyYnM0JykuZmluZCgnOnNlbGVjdGVkJykudG9BcnJheSgpIGFzIEhUTUxTZWxlY3RFbGVtZW50W10pXHJcbiAgICAvLyAgICAuZmlsdGVyKGl0ZW0gPT4geyByZXR1cm4gaXRlbS52YWx1ZSA9PT0gbWF4SXRlbS5kYXRhc2V0LnZhbHVlOyB9KVswXT8udGV4dENvbnRlbnQgPz8gXCLnhKFcIjtcclxuICAgIHJlY29nbml0aW9uU3Bhbi5pbm5lckhUTUwgPSBg6KqN5YiX6aCF55uuIDogJHttYXhJdGVtPy5kYXRhc2V0LnRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHJlY29nbml0aW9uU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQoaXRlbVNwYW4pO1xyXG4gICAgdG90YWxJbmZvLmFwcGVuZENoaWxkKHBlcmNlbnRTcGFuKTtcclxuXHJcbiAgICBpZiAoYWxsUHJvZEl0ZW1zLmxlbmd0aCA+IDApXHJcbiAgICAgICAgJCgnI0lzUGFzc1B1cmNoYXNlJykudmFsKFwidHJ1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJmYWxzZVwiKTtcclxufVxyXG5mdW5jdGlvbiBBZGRIaWRkZW4odGhlTGk6IEhUTUxMSUVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIC8vIENyZWF0ZSBhIGhpZGRlbiBpbnB1dCBlbGVtZW50LCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaTpcclxuICAgIGxldCBuYW1lUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgbmFtZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgbmFtZVByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5OYW1lYDtcclxuICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudGV4dFxyXG4gICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgdmFsdWVQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLlZhbHVlYDtcclxuICAgIHZhbHVlUHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnZhbHVlXHJcbiAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbmFtZVByb3BlcnR5LmNsYXNzTmFtZSA9IFwibW9kZWxiaW5kXCJcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uUGVyY2VudGA7XHJcbiAgICBwZXJjZW50UHJvcGVydHkudmFsdWUgPSB0aGVMaS5kYXRhc2V0LnBlcmNlbnRcclxuXHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChuYW1lUHJvcGVydHkpO1xyXG4gICAgdGhlTGkuYXBwZW5kQ2hpbGQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZChwZXJjZW50UHJvcGVydHkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTZXRCaW5kaW5nVmFsdWUoKSB7XHJcblxyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mb3M6IFB1cmNoYXNlRGV0YWlsSW5mb1tdID0gW107XHJcbiAgICBhbGxQcm9kSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGxldCBwdXJjaGFzZURldGFpbEluZm8gPSBuZXcgUHVyY2hhc2VEZXRhaWxJbmZvKCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLlZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlO1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5OYW1lID0gaXRlbS50ZXh0Q29udGVudDtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uUGVyY2VudCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5wZXJjZW50LCAxMCk7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvcy5wdXNoKHB1cmNoYXNlRGV0YWlsSW5mbyk7XHJcbiAgICB9KTtcclxuICAgIGlmIChwdXJjaGFzZURldGFpbEluZm9zLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAkKCcjU2VsZWN0UHVyY2hhc2VEZXRhaWxJbmZvcycpLnZhbChudWxsKTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKEpTT04uc3RyaW5naWZ5KHB1cmNoYXNlRGV0YWlsSW5mb3MpKTtcclxuICAgIH1cclxuXHJcbn1cclxuZnVuY3Rpb24gQ2FjdWxhdGVBbGxGZWUoKSB7XHJcblxyXG4gICAgLy9sZXQgaGFoYSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgbGV0IGZ1bGxXZWlnaHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGdWxsV2VpZ2h0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOmAsuWgtOmHjemHj1xyXG4gICAgbGV0IGRlZmVjdGl2ZVdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDmiaPph41cclxuICAgIGxldCB1bml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g5Zau5YO5XHJcbiAgICBsZXQgaXNIYXNUZXggPSAkKCcuaXNoYXNfdGV4OmNoZWNrZWQnKS52YWwoKSA9PT0gXCIxXCIgPyAxLjA1IDogMTsgIC8vIOaYr+WQpuWQq+eohSAocmFkaW8gYnV0dG9uIOaykuaciSBuYW1lIGF0dHJpYnV0ZSDmiYDku6XnlKgpXHJcbiAgICBsZXQgdHJhZmljVW5pdFByaWNlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVHJhZmljVW5pdFByaWNlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOmBi+iyu+WWruWDuVxyXG4gICAgbGV0IHdlaWdodEZlZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIldlaWdodEZlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxyXG5cclxuICAgIC8vIOioiOWDuemHkemhjSA9ICjpgLLlu6Dph43ph48gLSDmiaPph40pICog5Zau5YO5ICog56iF546HXHJcbiAgICAvL2xldCB3ZWlnaHRGZWUgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpO1xyXG4gICAgbGV0IHdlaWdodFByaWNlID0gKCtmdWxsV2VpZ2h0IC0gKCtkZWZlY3RpdmVXZWlnaHQpKSAqICgrdW5pdFByaWNlKSAqIGlzSGFzVGV4O1xyXG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvd193ZWlnaHRfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIXdlaWdodFByaWNlIHx8IHdlaWdodFByaWNlIDwgMCA/IFwiMFwiIDogd2VpZ2h0UHJpY2UudG9TdHJpbmcoKTtcclxuXHJcbiAgICAvLyDpgYvosrsgPSDpgLLlu6Dph43ph48gKiDpgYvosrvllq7lg7lcclxuICAgIGxldCB0cmFmaWNQcmljZSA9ICgrZnVsbFdlaWdodCkgKiAoK3RyYWZpY1VuaXRQcmljZSk7XHJcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3RyYWZpY19wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhdHJhZmljUHJpY2UgfHwgdHJhZmljUHJpY2UgPCAwID8gXCIwXCIgOiB0cmFmaWNQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgIC8vIOe4vemHkemhjSA9ICjno4XosrsgKyDoqIjlg7nph5HpoY0gKyDpgYvosrspXHJcbiAgICBsZXQgZmluYWxQcmljZSA9ICgrd2VpZ2h0RmVlKSArIHdlaWdodFByaWNlICsgdHJhZmljUHJpY2U7XHJcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X2ZpbmFsX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICFmaW5hbFByaWNlIHx8IGZpbmFsUHJpY2UgPCAwID8gXCIwXCIgOiBmaW5hbFByaWNlLnRvU3RyaW5nKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=