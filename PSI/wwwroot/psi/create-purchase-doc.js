var PageClass = /** @class */ (function () {
    function PageClass(baseUrl) {
        //CustomerId: JQuery<HTMLSelectElement>;
        //CustomerName: JQuery<HTMLInputElement>;
        this.BaseUrl = "";
        this.BaseUrl = baseUrl;
        //this.CustomerId = $("#CustomerId");
        //this.CustomerName = $("#CustomerName");
    }
    PageClass.prototype.ShowCustomerName = function (customerId, customerName) {
        var optionObj = customerId.find(':selected');
        customerName.val("");
        if (optionObj.val() === "0") {
            customerName.removeAttr('disabled');
        }
        else {
            customerName.attr('disabled', 'disabled');
            customerName.val(optionObj.text());
        }
    };
    PageClass.prototype.SetCarNoItems = function (customerId, carNoId) {
        var optionObj = customerId.find(':selected');
        //const data = { foo: 1, bar: 2 };
        //const haha = `https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`;
        var getUrl = this.BaseUrl + "/api/CustomerCars?customerId=" + encodeURIComponent(optionObj.val().toString());
        // 取得車牌內容 透過API        
        fetch(getUrl)
            .then(function (response) {
            console.log(response);
            return response.json();
            //return response.text()
        }).then(function (myJson) {
            // let contractFromList = document.getElementById("ContractFrom") as HTMLSelectElement;
            // contractFromList.remove();
            carNoId.html('');
            var defaultOption = new Option("0.新車牌", "0", false, false);
            carNoId.append(defaultOption);
            myJson.forEach(function (item) {
                var newOption = new Option(item.carName, item.id, false, false);
                carNoId.append(newOption);
                //.trigger('change');
                //let test = document.createElement("option") as HTMLOptionElement;
                //test.value = user.id;
                //test.text = user.contractName;
                //console.log(test);
                //contractFromList.append(test);
            });
            carNoId.val(null);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXB1cmNoYXNlLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvY3JlYXRlLXB1cmNoYXNlLWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUtJLG1CQUFZLE9BQWU7UUFKM0Isd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBR2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLHFDQUFxQztRQUNyQyx5Q0FBeUM7SUFDN0MsQ0FBQztJQUNNLG9DQUFnQixHQUF2QixVQUF3QixVQUFxQyxFQUN6RCxZQUFzQztRQUV0QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNILFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBQ00saUNBQWEsR0FBcEIsVUFBcUIsVUFBcUMsRUFDdEQsT0FBa0M7UUFFbEMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUvQyxrQ0FBa0M7UUFDbEMsdUhBQXVIO1FBQ3ZILElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLHFDQUFnQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUcsQ0FBQztRQUUvRyx1QkFBdUI7UUFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FB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VyxDQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNyRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0lBQzFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXNCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN6RyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFnZUNsYXNzIHtcclxuICAgIC8vQ3VzdG9tZXJJZDogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PjtcclxuICAgIC8vQ3VzdG9tZXJOYW1lOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD47XHJcbiAgICBCYXNlVXJsOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgLy90aGlzLkN1c3RvbWVySWQgPSAkKFwiI0N1c3RvbWVySWRcIik7XHJcbiAgICAgICAgLy90aGlzLkN1c3RvbWVyTmFtZSA9ICQoXCIjQ3VzdG9tZXJOYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNob3dDdXN0b21lck5hbWUoY3VzdG9tZXJJZDogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PixcclxuICAgICAgICBjdXN0b21lck5hbWU6IEpRdWVyeTxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uT2JqID0gY3VzdG9tZXJJZC5maW5kKCc6c2VsZWN0ZWQnKTtcclxuICAgICAgICBjdXN0b21lck5hbWUudmFsKFwiXCIpO1xyXG4gICAgICAgIGlmIChvcHRpb25PYmoudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1c3RvbWVyTmFtZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICBjdXN0b21lck5hbWUudmFsKG9wdGlvbk9iai50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRDYXJOb0l0ZW1zKGN1c3RvbWVySWQ6IEpRdWVyeTxIVE1MU2VsZWN0RWxlbWVudD4sXHJcbiAgICAgICAgY2FyTm9JZDogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50Pikge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25PYmogPSBjdXN0b21lcklkLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvL2NvbnN0IGRhdGEgPSB7IGZvbzogMSwgYmFyOiAyIH07XHJcbiAgICAgICAgLy9jb25zdCBoYWhhID0gYGh0dHBzOi8vYXBpLnBhcnNlLmNvbS8xL3VzZXJzP2Zvbz0ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLmZvbyl9JmJhcj0ke2VuY29kZVVSSUNvbXBvbmVudChkYXRhLmJhcil9YDtcclxuICAgICAgICBjb25zdCBnZXRVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNhcnM/Y3VzdG9tZXJJZD0ke2VuY29kZVVSSUNvbXBvbmVudChvcHRpb25PYmoudmFsKCkudG9TdHJpbmcoKSl9YDtcclxuXHJcbiAgICAgICAgLy8g5Y+W5b6X6LuK54mM5YWn5a65IOmAj+mBjkFQSSAgICAgICAgXHJcbiAgICAgICAgZmV0Y2goZ2V0VXJsKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKG15SnNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGNvbnRyYWN0RnJvbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvbnRyYWN0RnJvbVwiKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBjYXJOb0lkLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRPcHRpb24gPSBuZXcgT3B0aW9uKFwiMC7mlrDou4rniYxcIiwgXCIwXCIsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjYXJOb0lkLmFwcGVuZChkZWZhdWx0T3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG15SnNvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhck5vSWQuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgICAgICAvL3Rlc3QudGV4dCA9IHVzZXIuY29udHJhY3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhck5vSWQudmFsKG51bGwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuXHJcbmNsYXNzIFB1cmNoYXNlRGV0YWlsSW5mbyB7XHJcbiAgICBWYWx1ZTogc3RyaW5nO1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgUGVyY2VudDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG59XHJcblxyXG4kKCcjQ3VzdG9tZXJJZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8g6K6K5pu057C957SE5Zau55qEU2VsZWN05YWn5a65IOmAj+mBjkFQSVxyXG4gICAgZmV0Y2goYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL0N1c3RvbWVyQ29udHJhY3RzYClcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcclxuICAgICAgICAgICAgLy9yZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgfSkudGhlbigobXlKc29uKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxldCBjb250cmFjdEZyb21MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb250cmFjdEZyb21cIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnRyYWN0RnJvbUxpc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIjQ29udHJhY3RGcm9tXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICBteUpzb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jb250cmFjdE5hbWUsIGl0ZW0uaWQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ29udHJhY3RGcm9tJykuYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgICAgICAgICAvLy50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgIC8vbGV0IHRlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0LnZhbHVlID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIC8vdGVzdC50ZXh0ID0gdXNlci5jb250cmFjdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgLy9jb250cmFjdEZyb21MaXN0LmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjQ29udHJhY3RGcm9tJykudmFsKG51bGwpXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG59KTtcclxuXHJcbiQoJyNDYXJOb0lkJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRoaXNTZWxlY3RPYmogPSAkKHRoaXMpLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cclxuICAgICQoJyNDYXJOb05hbWUnKS52YWwoXCJcIik7XHJcbiAgICBpZiAodGhpc1NlbGVjdE9iai52YWwoKSA9PT0gXCIwXCIpIHtcclxuICAgICAgICAkKCcjQ2FyTm9OYW1lJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI0Nhck5vTmFtZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgJCgnI0Nhck5vTmFtZScpLnZhbCh0aGlzU2VsZWN0T2JqLnRleHQoKSk7XHJcbiAgICB9XHJcbn0pO1xyXG4kKCcjdXNlci1zZWxlY3QtcHJvZGl0ZW0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qJCgnbGlbbmFtZT1cImFiY1wiXScpLnJlbW92ZSgpOyovXHJcblxyXG4gICAgLy8kKCcjZXZlblByb2R1Y3RMcyBsaScpLnJlbW92ZSgpO1xyXG4gICAgLy8gJCgnI29kZG5Qcm9kdWN0THMgbGknKS5yZW1vdmUoKTtcclxuXHJcblxyXG5cclxuICAgIFNob3dMaXN0KCk7XHJcbiAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICBTZXRCaW5kaW5nVmFsdWUoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyQuZWFjaCgkKCcuc2VsZWN0MmJzNCcpLmZpbmQoJzpzZWxlY3RlZCcpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdCgkKHRoaXMpKTtcclxuICAgIC8vICAgIC8qdmFyIHZhbCA9ICQucGFyc2VKU09OKHZhbHVlKTsqL1xyXG4gICAgLy99KVxyXG4gICAgLy9jb25zb2xlLmxvZygkKCcuc2VsZWN0MmJzNDpjaGVja2VkJykpO1xyXG4gICAgLy9hbGVydCgkKFwiLnNlbGVjdDJiczQ6Y2hlY2tlZFwiKS52YWwoKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gQXBwZW5kVG9TaG93TGlzdChwcm9kSXRlbTogSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGFsbFNob3dMaXN0ID0gJChcIiNldmVuUHJvZHVjdExzIGxpXCIpLnRvQXJyYXkoKS5jb25jYXQoJChcIiNvZGRQcm9kdWN0THMgbGlcIikudG9BcnJheSgpKTtcclxuXHJcblxyXG4gICAgY29uc3QgaU1pbnVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKFwiZmEtbWludXMtY2lyY2xlXCIpO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaU1pbnVzVGFnLnN0eWxlLmNvbG9yID0gXCJibHVlXCI7XHJcbiAgICBjb25zdCBpUGx1c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIGlQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIGlQbHVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG4gICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIGxpVGFnLmRhdGFzZXQudGV4dCA9IHByb2RJdGVtLnRleHRDb250ZW50O1xyXG4gICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHtwcm9kSXRlbS50ZXh0Q29udGVudH0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgbGlUYWcuZGF0YXNldC52YWx1ZSA9IHByb2RJdGVtLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICBsaVRhZy5kYXRhc2V0LnBlcmNlbnQgPSBhbGxTaG93TGlzdC5sZW5ndGggPT09IDAgPyBcIjkwXCIgOiBcIjEwXCI7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgbGlUYWcuYXBwZW5kQ2hpbGQoc3BhblRhZyk7XHJcbiAgICBsaVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcblxyXG4gICAgLy8gQWN0aW9uICAgIFxyXG4gICAgY29uc3Qgc2hvd0xpc3QgPSBhbGxTaG93TGlzdC5sZW5ndGggJSAyID09PSAwID9cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIikgOlxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2RkUHJvZHVjdExzXCIpO1xyXG4gICAgc2hvd0xpc3Q/LmFwcGVuZENoaWxkKGxpVGFnKTtcclxuICAgIC8vQWRkSGlkZGVuKGxpVGFnLCBpbmRleCk7XHJcblxyXG4gICAgLy9FdmVudFxyXG4gICAgaU1pbnVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgIENhY3VsYXRlUGVyY2VudChub3dMSVRhZywgZmFsc2UpO1xyXG4gICAgICAgIFJlZnJlc2hQcm9kSXRlbVBlcmNlbnQoKTtcclxuICAgICAgICBTaG93VG90YWxJbmZvKCk7XHJcbiAgICAgICAgU2V0QmluZGluZ1ZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIGlQbHVzVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBub3dMSVRhZyA9IHRoaXMucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50XHJcbiAgICAgICAgQ2FjdWxhdGVQZXJjZW50KG5vd0xJVGFnLCB0cnVlKTtcclxuICAgICAgICBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCk7XHJcbiAgICAgICAgU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgICAgIFNldEJpbmRpbmdWYWx1ZSgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vU2hvd1RvdGFsSW5mbygpO1xyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufTtcclxuZnVuY3Rpb24gU2hvd0xpc3QoKSB7XHJcbiAgICAvLyBcclxuICAgIC8vbGV0IHVzZXJTZWxlY3QgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS5nZXQoKSBhcyBIVE1MU2VsZWN0RWxlbWVudFtdKTtcclxuICAgIC8vIFVzZXLnlavpnaLmiYDpgbhcclxuICAgIGxldCB1c2VyU2VsZWN0ID0gJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXTtcclxuXHJcbiAgICAvLyDmupblgpnopoFTaG93XHJcbiAgICBsZXQgc2hvd0xpc3QgPSAkKCcjZXZlblByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKS5jb25jYXQoJCgnI29kZFByb2R1Y3RMcyBsaScpLnRvQXJyYXkoKSkgYXMgSFRNTExJRWxlbWVudFtdO1xyXG5cclxuXHJcblxyXG4gICAgLy8g6KaB5paw5aKe55qE5bCx5paw5aKeXHJcbiAgICB1c2VyU2VsZWN0LmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gc2hvd0xpc3QubWFwKGxpdGFnID0+IGxpdGFnLmRhdGFzZXQudmFsdWUpLmluZGV4T2YoaXRlbS52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaCgoaXRlbSkgPT4gQXBwZW5kVG9TaG93TGlzdChpdGVtKSk7XHJcbiAgICAvLyDopoHliKrpmaTnmoTlsLHliKrpmaQgICAgXHJcbiAgICBzaG93TGlzdC5maWx0ZXIobGl0YWcgPT4ge1xyXG4gICAgICAgIHJldHVybiB1c2VyU2VsZWN0Lm1hcChpdGVtID0+IGl0ZW0udmFsdWUpLmluZGV4T2YobGl0YWcuZGF0YXNldC52YWx1ZSkgPT09IC0xO1xyXG4gICAgfSkuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVtb3ZlKCkpO1xyXG5cclxuXHJcbiAgICAvLyDopoHmlrDlop7nmoTlsLHmlrDlop5WMlxyXG4gICAgLy8kLmVhY2gobmV3QWRkSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgQXBwZW5kVG9TaG93TGlzdChlbGVtZW50KTtcclxuXHJcbiAgICAvLyAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLy8gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcbiAgICAvL30pXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8kLmVhY2goZGVsSXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vfSlcclxuXHJcblxyXG4gICAgLy9sZXQgdGhpc09iaiA9ICQodGhpcyk7XHJcbiAgICAvLy8vIOS4jeWGjeS/neeVmemgheebrueahOWwseWIqumZpFxyXG4gICAgLy9pZiAod2FudFNhdmUuaW5kZXhPZigkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCkpID09PSAtMSkge1xyXG4gICAgLy8gICAgJC5lYWNoKCQoJyNldmVuUHJvZHVjdExzIGxpJyksIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgLy8gICAgICAgIGxldCBpc1JlbW92ZSA9IGVsZW1lbnQuZGF0YXNldC52YWx1ZSA9PT0gdGhpc09iai52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy8gICAgICAgIGlmIChpc1JlbW92ZSlcclxuICAgIC8vICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgICk7XHJcbiAgICAvL31cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL2NvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgLy9pTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgIC8vaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAvL2NvbnN0IGlQbHVzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIik7XHJcbiAgICAvL2lQbHVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1wbHVzLWNpcmNsZVwiKTtcclxuICAgIC8vY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIC8vc3BhblRhZy5pbm5lckhUTUwgPSBcIjUwJVwiO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2cocHJvZEl0ZW0udmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAvL2NvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAvL2xpVGFnLnRleHRDb250ZW50ID0gYCR7cHJvZEl0ZW0udmFsKCl9XyR7cHJvZEl0ZW0udGV4dCgpfWA7XHJcbiAgICAvL2xpVGFnLmRhdGFzZXQudnYgPSBwcm9kSXRlbS52YWwoKS50b1N0cmluZygpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgLy9saVRhZy5hcHBlbmRDaGlsZChpUGx1c1RhZyk7XHJcbiAgICAvL2xpVGFnLmFwcGVuZENoaWxkKHNwYW5UYWcpO1xyXG5cclxuICAgIC8vY29uc3Qgc2hvd0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV2ZW5Qcm9kdWN0THNcIik7XHJcbiAgICAvL3Nob3dMaXN0Py5hcHBlbmRDaGlsZChsaVRhZyk7XHJcblxyXG4gICAgLy8gQXNzaWduIHNob3cgdWwgbGlzdFxyXG5cclxuXHJcbiAgICAvLyAkKCcjdGVzdExzJykuYXBwZW5kKCc8bGk+JyArICQodGhpcykudmFsKCkgKyBcIl9cIiArICQodGhpcykudGV4dCgpICsgJzxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2xpPicpO1xyXG4gICAgLyp2YXIgdmFsID0gJC5wYXJzZUpTT04odmFsdWUpOyovXHJcblxyXG4gICAgLy8gcmV0dXJuIG51bWJlciAqIG51bWJlcjtcclxufVxyXG5mdW5jdGlvbiBDYWN1bGF0ZVBlcmNlbnQoY3VyUHJvZEl0ZW06IEhUTUxMSUVsZW1lbnQsIGlzUGx1czogYm9vbGVhbikge1xyXG4gICAgY29uc3QgY3VyVmFsID0gY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50O1xyXG4gICAgbGV0IG5ld1ZhbDogbnVtYmVyID0gaXNQbHVzID8gK2N1clZhbCArIDEwIDogK2N1clZhbCAtIDEwO1xyXG4gICAgaWYgKG5ld1ZhbCA+IDEwMClcclxuICAgICAgICBuZXdWYWwgPSAxMDA7XHJcbiAgICBpZiAobmV3VmFsIDwgMClcclxuICAgICAgICBuZXdWYWwgPSAwO1xyXG4gICAgY3VyUHJvZEl0ZW0uZGF0YXNldC5wZXJjZW50ID0gbmV3VmFsLnRvU3RyaW5nKCk7XHJcbiAgICAvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0c2lkZVwiKTtcclxuICAgIC8vZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGlmeVRleHQsIGZhbHNlKTtcclxufVxyXG5mdW5jdGlvbiBSZWZyZXNoUHJvZEl0ZW1QZXJjZW50KCkge1xyXG4gICAgbGV0IGFsbFByb2RJdGVtcyA9ICQoJyNldmVuUHJvZHVjdExzIGxpJykudG9BcnJheSgpLmNvbmNhdChcclxuICAgICAgICAkKCcjb2RkUHJvZHVjdExzIGxpJykudG9BcnJheSgpKSBhcyBIVE1MTElFbGVtZW50W107XHJcblxyXG4gICAgYWxsUHJvZEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBsZXQgc3BhblRhZyA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcInNwYW5cIik7XHJcbiAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0uZGF0YXNldC5wZXJjZW50fSVcXHUwMEEwXFx1MDBBMGBcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIFNob3dUb3RhbEluZm8oKSB7XHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgYWxsUGVyY2VudCA9IDA7XHJcbiAgICBsZXQgbWF4SXRlbTogSFRNTExJRWxlbWVudDtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgYWxsUGVyY2VudCA9ICsgaXRlbS5kYXRhc2V0LnBlcmNlbnQgKyBhbGxQZXJjZW50O1xyXG4gICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0uZGF0YXNldC5wZXJjZW50ID4gK2l0ZW0uZGF0YXNldC5wZXJjZW50ID8gbWF4SXRlbSA6IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWxJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbFwiKTtcclxuICAgIHRvdGFsSW5mby5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKS5mb3JFYWNoKGl0ZW0gPT4geyBpdGVtLnJlbW92ZSgpIH0pO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHthbGxQcm9kSXRlbXMubGVuZ3RofemghWA7XHJcbiAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgcGVyY2VudFNwYW4uaW5uZXJIVE1MID0gYO+8jOavlOS+i+WKoOe4vToke2FsbFBlcmNlbnR9JWBcclxuICAgIGlmIChhbGxQZXJjZW50ID4gMTAwKVxyXG4gICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgIGNvbnN0IHJlY29nbml0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgIC8vbGV0IGhhaGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0MmJzNCA6Y2hlY2tlZCcpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgLy9hbGVydChoYWhhLnZhbHVlKTtcclxuXHJcbiAgICAvL2xldCByZWNvZ25pdGlvblRleHQgPSAoJCgnLnNlbGVjdDJiczQnKS5maW5kKCc6c2VsZWN0ZWQnKS50b0FycmF5KCkgYXMgSFRNTFNlbGVjdEVsZW1lbnRbXSlcclxuICAgIC8vICAgIC5maWx0ZXIoaXRlbSA9PiB7IHJldHVybiBpdGVtLnZhbHVlID09PSBtYXhJdGVtLmRhdGFzZXQudmFsdWU7IH0pWzBdPy50ZXh0Q29udGVudCA/PyBcIueEoVwiO1xyXG4gICAgcmVjb2duaXRpb25TcGFuLmlubmVySFRNTCA9IGDoqo3liJfpoIXnm64gOiAke21heEl0ZW0/LmRhdGFzZXQudGV4dCA/PyBcIueEoVwifWBcclxuXHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgIHRvdGFsSW5mby5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICB0b3RhbEluZm8uYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG5cclxuICAgIGlmIChhbGxQcm9kSXRlbXMubGVuZ3RoID4gMClcclxuICAgICAgICAkKCcjSXNQYXNzUHVyY2hhc2UnKS52YWwoXCJ0cnVlXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgICQoJyNJc1Bhc3NQdXJjaGFzZScpLnZhbChcImZhbHNlXCIpO1xyXG59XHJcbmZ1bmN0aW9uIEFkZEhpZGRlbih0aGVMaTogSFRNTExJRWxlbWVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgbGV0IG5hbWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICBuYW1lUHJvcGVydHkubmFtZSA9IGBQdXJjaGFzZURldGFpbEluZm9bJHtpbmRleH1dLk5hbWVgO1xyXG4gICAgbmFtZVByb3BlcnR5LnZhbHVlID0gdGhlTGkuZGF0YXNldC50ZXh0XHJcbiAgICBsZXQgdmFsdWVQcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIG5hbWVQcm9wZXJ0eS5jbGFzc05hbWUgPSBcIm1vZGVsYmluZFwiXHJcbiAgICB2YWx1ZVByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS5uYW1lID0gYFB1cmNoYXNlRGV0YWlsSW5mb1ske2luZGV4fV0uVmFsdWVgO1xyXG4gICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQudmFsdWVcclxuICAgIGxldCBwZXJjZW50UHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBuYW1lUHJvcGVydHkuY2xhc3NOYW1lID0gXCJtb2RlbGJpbmRcIlxyXG4gICAgcGVyY2VudFByb3BlcnR5LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgcGVyY2VudFByb3BlcnR5Lm5hbWUgPSBgUHVyY2hhc2VEZXRhaWxJbmZvWyR7aW5kZXh9XS5QZXJjZW50YDtcclxuICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IHRoZUxpLmRhdGFzZXQucGVyY2VudFxyXG5cclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKG5hbWVQcm9wZXJ0eSk7XHJcbiAgICB0aGVMaS5hcHBlbmRDaGlsZCh2YWx1ZVByb3BlcnR5KTtcclxuICAgIHRoZUxpLmFwcGVuZENoaWxkKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNldEJpbmRpbmdWYWx1ZSgpIHtcclxuXHJcbiAgICBsZXQgYWxsUHJvZEl0ZW1zID0gJCgnI2V2ZW5Qcm9kdWN0THMgbGknKS50b0FycmF5KCkuY29uY2F0KFxyXG4gICAgICAgICQoJyNvZGRQcm9kdWN0THMgbGknKS50b0FycmF5KCkpIGFzIEhUTUxMSUVsZW1lbnRbXTtcclxuXHJcbiAgICBsZXQgcHVyY2hhc2VEZXRhaWxJbmZvczogUHVyY2hhc2VEZXRhaWxJbmZvW10gPSBbXTtcclxuICAgIGFsbFByb2RJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IHB1cmNoYXNlRGV0YWlsSW5mbyA9IG5ldyBQdXJjaGFzZURldGFpbEluZm8oKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm8uVmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWU7XHJcbiAgICAgICAgcHVyY2hhc2VEZXRhaWxJbmZvLk5hbWUgPSBpdGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgIHB1cmNoYXNlRGV0YWlsSW5mby5QZXJjZW50ID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LnBlcmNlbnQsIDEwKTtcclxuICAgICAgICBwdXJjaGFzZURldGFpbEluZm9zLnB1c2gocHVyY2hhc2VEZXRhaWxJbmZvKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHB1cmNoYXNlRGV0YWlsSW5mb3MubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICQoJyNTZWxlY3RQdXJjaGFzZURldGFpbEluZm9zJykudmFsKG51bGwpO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnI1NlbGVjdFB1cmNoYXNlRGV0YWlsSW5mb3MnKS52YWwoSlNPTi5zdHJpbmdpZnkocHVyY2hhc2VEZXRhaWxJbmZvcykpO1xyXG4gICAgfVxyXG5cclxufVxyXG5mdW5jdGlvbiBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuXHJcbiAgICAvL2xldCBoYWhhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgZnVsbFdlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZ1bGxXZWlnaHRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YCy5aC06YeN6YePXHJcbiAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVmZWN0aXZlV2VpZ2h0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIC8vIOaJo+mHjVxyXG4gICAgbGV0IHVuaXRQcmljZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDllq7lg7lcclxuICAgIGxldCBpc0hhc1RleCA9ICQoJy5pc2hhc190ZXg6Y2hlY2tlZCcpLnZhbCgpID09PSBcIjFcIiA/IDEuMDUgOiAxOyAgLy8g5piv5ZCm5ZCr56iFIChyYWRpbyBidXR0b24g5rKS5pyJIG5hbWUgYXR0cmlidXRlIOaJgOS7peeUqClcclxuICAgIGxldCB0cmFmaWNVbml0UHJpY2UgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJUcmFmaWNVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YGL6LK75Zau5YO5XHJcbiAgICBsZXQgd2VpZ2h0RmVlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiV2VpZ2h0RmVlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlXHJcblxyXG4gICAgLy8g6KiI5YO56YeR6aGNID0gKOmAsuW7oOmHjemHjyAtIOaJo+mHjSkgKiDllq7lg7kgKiDnqIXnjodcclxuICAgIC8vbGV0IHdlaWdodEZlZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSk7XHJcbiAgICBsZXQgd2VpZ2h0UHJpY2UgPSAoK2Z1bGxXZWlnaHQgLSAoK2RlZmVjdGl2ZVdlaWdodCkpICogKCt1bml0UHJpY2UpICogaXNIYXNUZXg7XHJcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3dlaWdodF9wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhd2VpZ2h0UHJpY2UgfHwgd2VpZ2h0UHJpY2UgPCAwID8gXCIwXCIgOiB3ZWlnaHRQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgIC8vIOmBi+iyuyA9IOmAsuW7oOmHjemHjyAqIOmBi+iyu+WWruWDuVxyXG4gICAgbGV0IHRyYWZpY1ByaWNlID0gKCtmdWxsV2VpZ2h0KSAqICgrdHJhZmljVW5pdFByaWNlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfdHJhZmljX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF0cmFmaWNQcmljZSB8fCB0cmFmaWNQcmljZSA8IDAgPyBcIjBcIiA6IHRyYWZpY1ByaWNlLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLy8g57i96YeR6aGNID0gKOejheiyuyArIOioiOWDuemHkemhjSArIOmBi+iyuylcclxuICAgIGxldCBmaW5hbFByaWNlID0gKCt3ZWlnaHRGZWUpICsgd2VpZ2h0UHJpY2UgKyB0cmFmaWNQcmljZTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfZmluYWxfcHJpY2VcIikgYXMgSFRNTERpdkVsZW1lbnQpLnRleHRDb250ZW50ID0gIWZpbmFsUHJpY2UgfHwgZmluYWxQcmljZSA8IDAgPyBcIjBcIiA6IGZpbmFsUHJpY2UudG9TdHJpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5pUGFnZUV2ZW50KCkge1xyXG4gICAgLy8gUGFnZSBFdmVudCBMaXN0aW9uZXJcclxuICAgIC8vKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgQ2FjdWxhdGVBbGxGZWUpO1xyXG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaXNoYXNfdGV4XCIpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgQ2FjdWxhdGVBbGxGZWUpKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlRyYWZpY1VuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIldlaWdodEZlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIENhY3VsYXRlQWxsRmVlKTtcclxufVxyXG5cclxuIl19