var PurchaseDetailInfo = /** @class */ (function () {
    function PurchaseDetailInfo() {
    }
    return PurchaseDetailInfo;
}());
$('#CustomerId').on('change', function () {
    var curCustomerIdObj = $(this).find(':selected');
    $('#CustomerName').val("");
    if (curCustomerIdObj.val() === "0") {
        $('#CustomerName').removeAttr('disabled');
    }
    else {
        $('#CustomerName').attr('disabled', 'disabled');
        $('#CustomerName').val(curCustomerIdObj.text());
    }
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
    // 取得車牌內容 透過API        
    fetch(window.location.origin + "/api/CustomerCars")
        .then(function (response) {
        console.log(response);
        return response.json();
        //return response.text()
    }).then(function (myJson) {
        // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
        // contractFromList.remove();
        $("#CarNoId").html('');
        myJson.forEach(function (item) {
            var newOption = new Option(item.carName, item.id, false, false);
            $('#CarNoId').append(newOption);
            //.trigger('change');
            //let test = document.createElement("option") as HTMLOptionElement;
            //test.value = user.id;
            //test.text = user.contractName;
            //console.log(test);
            //contractFromList.append(test);
        });
        $('#CarNoId').val(null);
    });
});
$('#CarNoId').on('change', function () {
    var thisSelectObj = $(this).find(':selected');
    $('#CarNoName').val("");
    if (thisSelectObj.val() === "0") {
        $('#CarNoName').removeAttr('disabled');
    }
    else {
        $('#CarNoName').attr('disabled', 'disabled');
        $('#CarNoName').val(thisSelectObj.text());
    }
});
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
function IniPageEvent() {
    // Page Event Listioner
    //(document.getElementById("FullWeight") as HTMLInputElement).addEventListener('keydown', CaculateAllFee);
    document.getElementById("FullWeight").addEventListener('keyup', CaculateAllFee);
    document.getElementById("DefectiveWeight").addEventListener('keyup', CaculateAllFee);
    document.getElementById("UnitPrice").addEventListener('keyup', CaculateAllFee);
    document.querySelectorAll(".ishas_tex").forEach(function (item) { return item.addEventListener('change', CaculateAllFee); });
    document.getElementById("TraficUnitPrice").addEventListener('keyup', CaculateAllFee);
    document.getElementById("WeightFee").addEventListener('keyup', CaculateAllFee);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUtJO0lBQ0EsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRCxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMxQixJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbkQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsRUFBRTtRQUNoQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdDO1NBQU07UUFDSCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbkQ7SUFFRCx1QkFBdUI7SUFDdkIsS0FBSyxDQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSwyQkFBd0IsQ0FBQztTQUNuRCxJQUFJLENBQUMsVUFBQyxRQUFRO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN0Qix3QkFBd0I7SUFDNUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtRQUNYLHVGQUF1RjtRQUN2Riw2QkFBNkI7UUFDN0IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFD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ekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDekQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxVQUFVLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDOUksQ0FBQztBQUVELFNBQVMsWUFBWTtJQUNqQix1QkFBdUI7SUFDdkIsMEdBQTBHO0lBQ3pHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNyRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDckcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEVBQS9DLENBQStDLENBQUMsQ0FBQztJQUMxRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMxRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDekcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFB1cmNoYXNlRGV0YWlsSW5mbyB7XHJcbiAgICBWYWx1ZTogc3RyaW5nO1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgUGVyY2VudDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG59XHJcblxyXG4kKCcjQ3VzdG9tZXJJZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBjdXJDdXN0b21lcklkT2JqID0gJCh0aGlzKS5maW5kKCc6c2VsZWN0ZWQnKTtcclxuXHJcbiAgICAkKCcjQ3VzdG9tZXJOYW1lJykudmFsKFwiXCIpO1xyXG4gICAgaWYgKGN1ckN1c3RvbWVySWRPYmoudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgJCgnI0N1c3RvbWVyTmFtZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJyNDdXN0b21lck5hbWUnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoJyNDdXN0b21lck5hbWUnKS52YWwoY3VyQ3VzdG9tZXJJZE9iai50ZXh0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuiuabtOewvee0hOWWrueahFNlbGVjdOWFp+WuuSDpgI/pgY5BUElcclxuICAgIGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9DdXN0b21lckNvbnRyYWN0c2ApXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiI0NvbnRyYWN0RnJvbVwiKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgbXlKc29uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdPcHRpb24gPSBuZXcgT3B0aW9uKGl0ZW0uY29udHJhY3ROYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgJCgnI0NvbnRyYWN0RnJvbScpLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudmFsdWUgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnRleHQgPSB1c2VyLmNvbnRyYWN0TmFtZTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRyYWN0RnJvbUxpc3QuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJyNDb250cmFjdEZyb20nKS52YWwobnVsbClcclxuICAgICAgICB9KVxyXG5cclxuICAgIC8vIOWPluW+l+i7iueJjOWFp+WuuSDpgI/pgY5BUEkgICAgICAgIFxyXG4gICAgZmV0Y2goYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL0N1c3RvbWVyQ2Fyc2ApXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxyXG4gICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgY29udHJhY3RGcm9tTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29udHJhY3RGcm9tXCIpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgICAgICAvLyBjb250cmFjdEZyb21MaXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiI0Nhck5vSWRcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIG15SnNvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3T3B0aW9uID0gbmV3IE9wdGlvbihpdGVtLmNhck5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ2FyTm9JZCcpLmFwcGVuZChuZXdPcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC52YWx1ZSA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29udHJhY3RGcm9tTGlzdC5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI0Nhck5vSWQnKS52YWwobnVsbClcclxuICAgICAgICB9KVxyXG59KTtcclxuXHJcbiQoJyNDYXJOb0lkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRoaXNTZWxlY3RPYmogPSAkKHRoaXMpLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICQoJyNDYXJOb05hbWUnKS52YWwoXCJcIik7XHJcbiAgICBpZiAodGhpc1NlbGVjdE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAkKCcjQ2FyTm9OYW1lJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI0Nhck5vTmFtZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgJCgnI0Nhck5vTmFtZScpLnZhbCh0aGlzU2VsZWN0T2JqLnRleHQoKSk7XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcjdXNlci1zZWxlY3QtcHJvZGl0ZW0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qJCgnbGlbbmFtZT1cImFiY1wiXScpLnJlbW92ZSgpOyovXHJcblxyXG4gICAgLy8kKCcjZXZlblByb2R1Y3RMcyBsaScpLnJlbW92ZSgpO1xyXG4gICAgLy8gJCgnI29kZG5Qcm9kdWN0THMgbGknKS5yZW1vdmUoKTtcclxuXHJcblxyXG5cclxuICAgIFNob3dMaXN0KCk7XHJcbiAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyQuZWFjaCgkKCcuc2VsZWN0MmJzNCcpLmZpbmQoJzpzZWxlY3RlZCcpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdCgkKHRoaXMpKTtcclxuICAgIC8vICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG4gICAgLy99KVxyXG4gICAgLy9jb25zb2xlLmxvZygkKCcuc2VsZWN0MmJzNDpjaGVja2VkJykpO1xyXG4gICAgLy9hbGVydCgkKFwiLnNlbGVjdDJiczQ6Y2hlY2tlZFwiKS52YWwoKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gQXBwZW5kVG9TaG93TGlzdChwcm9kSXRlbTogSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGFsbFNob3dMaXN0ID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKTtcclxuXHJcblxyXG4gICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG4gICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IHByb2RJdGVtLnRleHRDb250ZW50O1xyXG4gICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHtwcm9kSXRlbS50ZXh0Q29udGVudH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IHByb2RJdGVtLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSBhbGxTaG93TGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgLy8gQWN0aW9uICAgIFxyXG4gICAgY29uc3Qgc2hvd0xpc3QgPSBhbGxTaG93TGlzdC5sZW5ndGggJSAyID09PSAwID9cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIikgOlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2RkUHJvZHVjdExzXCIpO1xyXG4gICAgc2hvd0xpc3Q/LmFwcGVuZENoaWxkKGxpVGFnKTtcclxuICAgIC8vQWRkSGlkZGVuKGxpVGFnLCBpbmRleCk7XHJcblxyXG4gICAgLy9FdmVudFxyXG4gICAgaU1pbnVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgIENhY3VsYXRlUGVyY2VudChub3dMSVRhZywgZmFsc2UpO1xyXG4gICAgICAgIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICAgICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIGlQbHVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50XHJcbiAgICAgICAgQ2FjdWxhdGVQZXJjZW50KG5vd0xJVGFnLCB0cnVlKTtcclxuICAgICAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgICAgIFNldEJpbmRpbmdWYWx1ZSgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufTtcclxuZnVuY3Rpb24gU2hvd0xpc3QoKSB7XHJcbiAgICAvLyBcclxuICAgIC8vbGV0IHVzZXJTZWxlY3QgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS5nZXQoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdKTtcclxuICAgIC8vIFVzZXLnlavpnaLmiYDpgbhcclxuICAgIGxldCB1c2VyU2VsZWN0ID0gJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXTtcclxuXHJcbiAgICAvLyDmupblgpnopoFTaG93XHJcbiAgICBsZXQgc2hvd0xpc3QgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeXHJcbiAgICB1c2VyU2VsZWN0LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gc2hvd0xpc3QubWFwKGxpdGFnID0+IGxpdGFnLmRhdGFzZXQudmFsdWUpLmluZGV4T2YoaXRlbS52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaCgoaXRlbSkgPT4gQXBwZW5kVG9TaG93TGlzdChpdGVtKSk7XHJcbiAgICAvLyDopoHliKrpmaTnmoTlsLHliKrpmaQgICAgXHJcbiAgICBzaG93TGlzdC5maWx0ZXIobGl0YWcgPT4ge1xyXG4gICAgICAgIHJldHVybiB1c2VyU2VsZWN0Lm1hcChpdGVtID0+IGl0ZW0udmFsdWUpLmluZGV4T2YobGl0YWcuZGF0YXNldC52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xyXG5cclxuXHJcbiAgICAvLyDopoHmlrDlop7nmoTlsLHmlrDlop5WMlxyXG4gICAgLy8kLmVhY2gobmV3QWRkSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdChlbGVtZW50KTtcclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcbiAgICAvL30pXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8kLmVhY2goZGVsSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vfSlcclxuXHJcblxyXG4gICAgLy9sZXQgdGhpc09iaiA9ICQodGhpcyk7XHJcbiAgICAvLy8vIOS4jeWGjeS/neeVmemgheebrueahOWwseWIqumZpFxyXG4gICAgLy9pZiAod2FudFNhdmUuaW5kZXhPZigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpID09PSAtMSkge1xyXG4gICAgLy8gICAgJC5lYWNoKCQoJyNldmVuUHJvZHVjdExzIGxpJyksIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgICAgIGxldCBpc1JlbW92ZSA9IGVsZW1lbnQuZGF0YXNldC52YWx1ZSA9PT0gdGhpc09iai52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy8gICAgICAgIGlmIChpc1JlbW92ZSlcclxuICAgIC8vICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL2NvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIC8vY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIC8vc3BhblRhZy5pbm5lckhUTUwgPSBcIjUwJVwiO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2cocHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAvL2NvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAvL2xpVGFnLnRleHRDb250ZW50ID0gYCR7cHJvZEl0ZW0udmFsKCl9XyR7cHJvZEl0ZW0udGV4dCgpfWA7XHJcbiAgICAvL2xpVGFnLmRhdGFzZXQudnYgPSBwcm9kSXRlbS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcbiAgICAvL2xpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG5cclxuICAgIC8vY29uc3Qgc2hvd0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIik7XHJcbiAgICAvL3Nob3dMaXN0Py5hcHBlbmRDaGlsZChsaVRhZyk7XHJcblxyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufVxyXG5mdW5jdGlvbiBDYWN1bGF0ZVBlcmNlbnQoY3VyUHJvZEl0ZW06IEhUTUxMSUVsZW1lbnQsIGlzUGx1czogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VyVmFsID0gY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50O1xyXG4gICAgbGV0IG5ld1ZhbDogbnVtYmVyID0gaXNQbHVzID8gK2N1clZhbCArIDEwIDogK2N1clZhbCAtIDEwO1xyXG4gICAgaWYgKG5ld1ZhbCA+IDEwMClcclxuICAgICAgICBuZXdWYWwgPSAxMDA7XHJcbiAgICBpZiAobmV3VmFsIDwgMClcclxuICAgICAgICBuZXdWYWwgPSAwO1xyXG4gICAgY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50ID0gbmV3VmFsLnRvU3RyaW5nKCk7XHJcbiAgICAvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0c2lkZVwiKTtcclxuICAgIC8vZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGlmeVRleHQsIGZhbHNlKTtcclxufVxyXG5mdW5jdGlvbiBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgYWxsUHJvZEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBsZXQgc3BhblRhZyA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcInNwYW5cIik7XHJcbiAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0uZGF0YXNldC5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGBcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIFNob3dUb3RhbEluZm8oKSB7XHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICBsZXQgbWF4SXRlbTogSFRNTExJRWxlbWVudDtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5kYXRhc2V0LnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0uZGF0YXNldC5wZXJjZW50ID4gK2l0ZW0uZGF0YXNldC5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWxJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbFwiKTtcclxuICAgIHRvdGFsSW5mby5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnJlbW92ZSgpIH0pO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHthbGxQcm9kSXRlbXMubGVuZ3RofemghWA7XHJcbiAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgIC8vbGV0IGhhaGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0MmJzNCA6Y2hlY2tlZCcpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgLy9hbGVydChoYWhhLnZhbHVlKTtcclxuXHJcbiAgICAvL2xldCByZWNvZ25pdGlvblRleHQgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXSlcclxuICAgIC8vICAgIC5maWx0ZXIoaXRlbSA9PiB7IHJldHVybiBpdGVtLnZhbHVlID09PSBtYXhJdGVtLmRhdGFzZXQudmFsdWU7IH0pWzBdPy50ZXh0Q29udGVudCA/PyBcIueEoVwiO1xyXG4gICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LmRhdGFzZXQudGV4dCA/PyBcIueEoVwifWBcclxuXHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgIHRvdGFsSW5mby5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG5cclxuICAgIGlmIChhbGxQcm9kSXRlbXMubGVuZ3RoID4gMClcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJ0cnVlXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgICQoJyNJc1Bhc3NQdXJjaGFzZScpLnZhbChcImZhbHNlXCIpO1xyXG59XHJcbmZ1bmN0aW9uIEFkZEhpZGRlbih0aGVMaTogSFRNTExJRWxlbWVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLk5hbWVgO1xyXG4gICAgbmFtZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC50ZXh0XHJcbiAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uVmFsdWVgO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudmFsdWVcclxuICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5QZXJjZW50YDtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQucGVyY2VudFxyXG5cclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNldEJpbmRpbmdWYWx1ZSgpIHtcclxuXHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgcHVyY2hhc2VEZXRhaWxJbmZvczogUHVyY2hhc2VEZXRhaWxJbmZvW10gPSBbXTtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mbyA9IG5ldyBQdXJjaGFzZURldGFpbEluZm8oKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uVmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLk5hbWUgPSBpdGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5QZXJjZW50ID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LnBlcmNlbnQsIDEwKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm9zLnB1c2gocHVyY2hhc2VEZXRhaWxJbmZvKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHB1cmNoYXNlRGV0YWlsSW5mb3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKG51bGwpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnI1NlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3MnKS52YWwoSlNPTi5zdHJpbmdpZnkocHVyY2hhc2VEZXRhaWxJbmZvcykpO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuXHJcbiAgICAvL2xldCBoYWhhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgZnVsbFdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZ1bGxXZWlnaHRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YCy5aC06YeN6YePXHJcbiAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVmZWN0aXZlV2VpZ2h0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOaJo+mHjVxyXG4gICAgbGV0IHVuaXRQcmljZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDllq7lg7lcclxuICAgIGxldCBpc0hhc1RleCA9ICQoJy5pc2hhc190ZXg6Y2hlY2tlZCcpLnZhbCgpID09PSBcIjFcIiA/IDEuMDUgOiAxOyAgLy8g5piv5ZCm5ZCr56iFIChyYWRpbyBidXR0b24g5rKS5pyJIG5hbWUgYXR0cmlidXRlIOaJgOS7peeUqClcclxuICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUcmFmaWNVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YGL6LK75Zau5YO5XHJcbiAgICBsZXQgd2VpZ2h0RmVlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiV2VpZ2h0RmVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlXHJcblxyXG4gICAgLy8g6KiI5YO56YeR6aGNID0gKOmAsuW7oOmHjemHjyAtIOaJo+mHjSkgKiDllq7lg7kgKiDnqIXnjodcclxuICAgIC8vbGV0IHdlaWdodEZlZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSk7XHJcbiAgICBsZXQgd2VpZ2h0UHJpY2UgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpICogKCt1bml0UHJpY2UpICogaXNIYXNUZXg7XHJcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3dlaWdodF9wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhd2VpZ2h0UHJpY2UgfHwgd2VpZ2h0UHJpY2UgPCAwID8gXCIwXCIgOiB3ZWlnaHRQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgIC8vIOmBi+iyuyA9IOmAsuW7oOmHjemHjyAqIOmBi+iyu+WWruWDuVxyXG4gICAgbGV0IHRyYWZpY1ByaWNlID0gKCtmdWxsV2VpZ2h0KSAqICgrdHJhZmljVW5pdFByaWNlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfdHJhZmljX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF0cmFmaWNQcmljZSB8fCB0cmFmaWNQcmljZSA8IDAgPyBcIjBcIiA6IHRyYWZpY1ByaWNlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8g57i96YeR6aGNID0gKOejheiyuyArIOioiOWDuemHkemhjSArIOmBi+iyuylcclxuICAgIGxldCBmaW5hbFByaWNlID0gKCt3ZWlnaHRGZWUpICsgd2VpZ2h0UHJpY2UgKyB0cmFmaWNQcmljZTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfZmluYWxfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIWZpbmFsUHJpY2UgfHwgZmluYWxQcmljZSA8IDAgPyBcIjBcIiA6IGZpbmFsUHJpY2UudG9TdHJpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5pUGFnZUV2ZW50KCkge1xyXG4gICAgLy8gUGFnZSBFdmVudCBMaXN0aW9uZXJcclxuICAgIC8vKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaXNoYXNfdGV4XCIpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgQ2FjdWxhdGVBbGxGZWUpKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlRyYWZpY1VuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIldlaWdodEZlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxufVxyXG5cclxuIl19