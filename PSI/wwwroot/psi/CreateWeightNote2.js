var CreateWeightNotePage_Main = /** @class */ (function () {
    function CreateWeightNotePage_Main(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._prodItemList = new PurchaseProdItemList();
        this.MinusPercentClassName = "minus-percent";
        this.PlusPercentClassName = "plus-percent";
        // Page  Dom
        this.EvenShow_JqUlDom = $('#evenProductLs');
        this.OddLShow_JqUlDom = $('#oddProductLs');
        this.UsProdItem_JqSelectDom = $('#user-select-proditem');
        this.TotalProdItemInfo_JqSelectDom = $('#total');
        this.ingredientPost_JqDivDom = $('#ingredientPost');
        this.CustomerId_JqSelectDom = $('#VE_PurchaseWeightNote_CustomerId');
        this.CustomerName_JqInputDom = $('#VE_PurchaseWeightNote_CustomerName');
        this.CarNoId_JqSelectDom = $('#VE_PurchaseWeightNote_CarNoId');
        this.CarName_JqInputDom = $('#VE_PurchaseWeightNote_CarNo');
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
    }
    /* Action */
    CreateWeightNotePage_Main.prototype.USProdItem_Change = function () {
        var _this = this;
        var usProdItemDoms = this.UsProdItem_JqSelectDom.find(':selected').toArray();
        // User所選
        usProdItemDoms.forEach(function (item) {
            _this._prodItemList.Append(item.value, item.text);
        });
        // 要刪除的
        this._prodItemList.Data.filter(function (showItem) {
            return !(usProdItemDoms.map(function (usItem) { return usItem.value; }).includes(showItem.prodId));
        }).forEach(function (showItem) { return _this._prodItemList.RemoveByProdId(showItem.prodId); });
        // pageMain.ProdList.RefreshProdItemPercent();
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    CreateWeightNotePage_Main.prototype.CustomerId_Change = function () {
        var thisObj = this;
        this.CustomerName_JqInputDom.val("");
        this.CarName_JqInputDom.val(""); // 車牌名稱清空
        if (this.CustomerId_JqSelectDom &&
            this.CustomerId_JqSelectDom.find(':selected').val() === "0") { // 新客戶
            this.CustomerName_JqInputDom.removeAttr("readonly");
            thisObj.ReSetCarNoItems([]);
        }
        else {
            this.CustomerName_JqInputDom.attr("readonly", "readonly");
            this.CustomerName_JqInputDom.val(this.CustomerId_JqSelectDom.find(':selected').text());
            var funcRs = this.CustomerAPI.GetCarNoItemsBy(this.CustomerId_JqSelectDom.find(':selected').val().toString());
            $.when(funcRs).then(function (data) {
                thisObj.ReSetCarNoItems(data);
            });
        }
    };
    CreateWeightNotePage_Main.prototype.CarNoId_Change = function () {
        this.CarName_JqInputDom.val("");
        if (this.CarNoId_JqSelectDom &&
            this.CarNoId_JqSelectDom.find(':selected').val() === "0") {
            this.CarName_JqInputDom.removeAttr("readonly");
        }
        else {
            this.CarName_JqInputDom.attr("readonly", "readonly");
            this.CarName_JqInputDom.val(this.CarNoId_JqSelectDom.find(':selected').text());
        }
    };
    CreateWeightNotePage_Main.prototype.PlusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent + 10 > 100 ? 100 : nowProdItem.percent + 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    CreateWeightNotePage_Main.prototype.MinusProdItemPercent_Click = function (iTagDom) {
        var nowITag = iTagDom;
        var nowLiTag = nowITag.parentElement;
        var nowProdItem = this._prodItemList.Data.find(function (item) { return item.prodId === nowLiTag.dataset.value; });
        if (nowProdItem) {
            nowProdItem.percent = nowProdItem.percent - 10 < 0 ? 0 : nowProdItem.percent - 10;
        }
        this.ShowUSProdItems();
        this.BindIngredientToDom();
    };
    /* Page Function */
    CreateWeightNotePage_Main.prototype.ShowUSProdItems = function () {
        var _this = this;
        var evenShowUlDom = this.EvenShow_JqUlDom.get(0);
        var oddShowUlDom = this.OddLShow_JqUlDom.get(0);
        evenShowUlDom.innerHTML = "";
        oddShowUlDom.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            var iMinusTag = document.createElement("i");
            iMinusTag.classList.add("fas");
            iMinusTag.classList.add("fa-minus-circle");
            iMinusTag.classList.add(_this.MinusPercentClassName);
            iMinusTag.style.cursor = "pointer";
            iMinusTag.style.color = "blue";
            var iPlusTag = document.createElement("i");
            iPlusTag.classList.add("fas");
            iPlusTag.classList.add("fa-plus-circle");
            iPlusTag.classList.add(_this.PlusPercentClassName);
            iPlusTag.style.cursor = "pointer";
            iPlusTag.style.color = "red";
            var spanTag = document.createElement("span");
            var liTag = document.createElement("li");
            liTag.dataset.text = item.prodText;
            liTag.textContent = item.prodText + " \u00A0\u00A0";
            liTag.dataset.value = item.prodId;
            // liTag.dataset.percent = this._prodItemList.length === 0 ? "90" : "10";
            spanTag.innerHTML = "\u00A0\u00A0" + item.percent + "%\u00A0\u00A0";
            liTag.appendChild(iMinusTag);
            liTag.appendChild(spanTag);
            liTag.appendChild(iPlusTag);
            index % 2 === 0 ? evenShowUlDom.appendChild(liTag) :
                oddShowUlDom.appendChild(liTag);
        });
        this.ShowProdItemSummary();
    };
    CreateWeightNotePage_Main.prototype.ShowProdItemSummary = function () {
        var _a;
        var allPercent = 0;
        var maxItem;
        this._prodItemList.Data.forEach(function (item) {
            allPercent = +item.percent + allPercent;
            if (!maxItem) {
                maxItem = item;
            }
            else {
                maxItem = +maxItem.percent > +item.percent ? maxItem : item;
            }
        });
        var itemSpan = document.createElement("span");
        itemSpan.innerHTML = "\uFF0C\u5DF2\u9078" + this._prodItemList.Data.length + "\u9805";
        var percentSpan = document.createElement("span");
        percentSpan.innerHTML = "\uFF0C\u6BD4\u4F8B\u52A0\u7E3D:" + allPercent + "%";
        if (allPercent > 100)
            percentSpan.style.color = "red";
        var recognitionSpan = document.createElement("span");
        recognitionSpan.innerHTML = "\u8A8D\u5217\u9805\u76EE : " + ((_a = maxItem === null || maxItem === void 0 ? void 0 : maxItem.prodText) !== null && _a !== void 0 ? _a : "無");
        //let summaryInfo = `${recognitionSpan.innerHTML}${itemSpan.innerHTML}${percentSpan.innerHTML}`;
        this.TotalProdItemInfo_JqSelectDom.get(0).innerHTML = "";
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(recognitionSpan);
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(itemSpan);
        this.TotalProdItemInfo_JqSelectDom.get(0).appendChild(percentSpan);
    };
    ;
    CreateWeightNotePage_Main.prototype.BindIngredientToDom = function () {
        var postDiv = this.ingredientPost_JqDivDom.get(0);
        postDiv.innerHTML = "";
        this._prodItemList.Data.forEach(function (item, index) {
            // Create a hidden input element, and append it to the li:
            var nameProperty = document.createElement("input");
            nameProperty.type = "hidden";
            nameProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemName";
            nameProperty.value = item.prodText;
            var valueProperty = document.createElement("input");
            valueProperty.type = "hidden";
            valueProperty.name = "VE_PurchaseIngredientLs[" + index + "].ProductId";
            valueProperty.value = item.prodId;
            var percentProperty = document.createElement("input");
            percentProperty.type = "hidden";
            percentProperty.name = "VE_PurchaseIngredientLs[" + index + "].ItemPercent";
            percentProperty.value = item.percent.toString();
            postDiv.append(nameProperty);
            postDiv.append(valueProperty);
            postDiv.append(percentProperty);
        });
    };
    CreateWeightNotePage_Main.prototype.ReSetCarNoItems = function (dataObjLs) {
        var thisPagObj = this;
        thisPagObj.CarNoId_JqSelectDom.html(''); // 選項清空
        var defaultOption = new Option("0.新車牌", "0", false, false);
        thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
        dataObjLs.forEach(function (item) {
            var newOption = new Option(item.carName, item.id, false, false);
            thisPagObj.CarNoId_JqSelectDom.append(newOption);
        });
    };
    return CreateWeightNotePage_Main;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlV2VpZ2h0Tm90ZTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL0NyZWF0ZVdlaWdodE5vdGUyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBdUJJLG1DQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFwQnpCLGtCQUFhLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUMvRCwwQkFBcUIsR0FBVyxlQUFlLENBQUE7UUFDL0MseUJBQW9CLEdBQVcsY0FBYyxDQUFBO1FBRXRELFlBQVk7UUFDTCxxQkFBZ0IsR0FBNkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUscUJBQWdCLEdBQTZCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSwyQkFBc0IsR0FBOEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0Usa0NBQTZCLEdBQStCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSw0QkFBdUIsR0FBMkIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsMkJBQXNCLEdBQThCLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQzNGLDRCQUF1QixHQUE2QixDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUM3Rix3QkFBbUIsR0FBd0IsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDL0UsdUJBQWtCLEdBQTZCLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBUXBGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELFlBQVk7SUFDTCxxREFBaUIsR0FBeEI7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFD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QUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFaEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sbURBQWUsR0FBdkIsVUFBd0IsU0FBUztRQUM3QixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDeEIsVUFBVSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLE9BQU87UUFDakQsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QsVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtZQUM1QixJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsZ0NBQUM7QUFBRCxDQUFDLEFBdk5ELElBdU5DIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ3JlYXRlV2VpZ2h0Tm90ZVBhZ2VfTWFpbiB7XHJcbiAgICAvLyBQb3JwZXJpdGVzXHJcbiAgICByZWFkb25seSBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgX3Byb2RJdGVtTGlzdDogUHVyY2hhc2VQcm9kSXRlbUxpc3QgPSBuZXcgUHVyY2hhc2VQcm9kSXRlbUxpc3QoKTtcclxuICAgIHJlYWRvbmx5IE1pbnVzUGVyY2VudENsYXNzTmFtZTogc3RyaW5nID0gXCJtaW51cy1wZXJjZW50XCJcclxuICAgIHJlYWRvbmx5IFBsdXNQZXJjZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSBcInBsdXMtcGVyY2VudFwiXHJcblxyXG4gICAgLy8gUGFnZSAgRG9tXHJcbiAgICBwdWJsaWMgRXZlblNob3dfSnFVbERvbTogSlF1ZXJ5PEhUTUxVTGlzdEVsZW1lbnQ+ID0gJCgnI2V2ZW5Qcm9kdWN0THMnKTtcclxuICAgIHB1YmxpYyBPZGRMU2hvd19KcVVsRG9tOiBKUXVlcnk8SFRNTFVMaXN0RWxlbWVudD4gPSAkKCcjb2RkUHJvZHVjdExzJyk7XHJcbiAgICBwdWJsaWMgVXNQcm9kSXRlbV9KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoJyN1c2VyLXNlbGVjdC1wcm9kaXRlbScpO1xyXG4gICAgcHVibGljIFRvdGFsUHJvZEl0ZW1JbmZvX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTEhlYWRpbmdFbGVtZW50PiA9ICQoJyN0b3RhbCcpO1xyXG4gICAgcHVibGljIGluZ3JlZGllbnRQb3N0X0pxRGl2RG9tOiBKUXVlcnk8SFRNTERpdkVsZW1lbnQ+ID0gJCgnI2luZ3JlZGllbnRQb3N0Jyk7XHJcbiAgICBwdWJsaWMgQ3VzdG9tZXJJZF9KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxTZWxlY3RFbGVtZW50PiA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ3VzdG9tZXJJZCcpO1xyXG4gICAgcHVibGljIEN1c3RvbWVyTmFtZV9KcUlucHV0RG9tOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVyTmFtZScpO1xyXG4gICAgcHVibGljIENhck5vSWRfSnFTZWxlY3REb206IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vSWQnKTtcclxuICAgIHB1YmxpYyBDYXJOYW1lX0pxSW5wdXREb206IEpRdWVyeTxIVE1MSW5wdXRFbGVtZW50PiA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQ2FyTm8nKTtcclxuXHJcbiAgICAvLyBXZWJBUElcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJBUEk6IEN1c3RvbWVyQVBJQ2xhc3M7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLkN1c3RvbWVyQVBJID0gbmV3IEN1c3RvbWVyQVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQWN0aW9uICovXHJcbiAgICBwdWJsaWMgVVNQcm9kSXRlbV9DaGFuZ2UoKSB7XHJcbiAgICAgICAgbGV0IHVzUHJvZEl0ZW1Eb21zID0gdGhpcy5Vc1Byb2RJdGVtX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnRvQXJyYXkoKSBhcyBIVE1MT3B0aW9uRWxlbWVudFtdO1xyXG5cclxuICAgICAgICAvLyBVc2Vy5omA6YG4XHJcbiAgICAgICAgdXNQcm9kSXRlbURvbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkFwcGVuZChpdGVtLnZhbHVlLCBpdGVtLnRleHQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOimgeWIqumZpOeahFxyXG4gICAgICAgIHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbHRlcihzaG93SXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKHVzUHJvZEl0ZW1Eb21zLm1hcCh1c0l0ZW0gPT4gdXNJdGVtLnZhbHVlKS5pbmNsdWRlcyhzaG93SXRlbS5wcm9kSWQpKTtcclxuICAgICAgICB9KS5mb3JFYWNoKHNob3dJdGVtID0+IHRoaXMuX3Byb2RJdGVtTGlzdC5SZW1vdmVCeVByb2RJZChzaG93SXRlbS5wcm9kSWQpKTtcclxuXHJcbiAgICAgICAgLy8gcGFnZU1haW4uUHJvZExpc3QuUmVmcmVzaFByb2RJdGVtUGVyY2VudCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ3VzdG9tZXJJZF9DaGFuZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgdGhpc09iaiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20udmFsKFwiXCIpO1xyXG4gICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLnZhbChcIlwiKTsgLy8g6LuK54mM5ZCN56ix5riF56m6XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkN1c3RvbWVySWRfSnFTZWxlY3REb20gJiZcclxuICAgICAgICAgICAgdGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnZhbCgpID09PSBcIjBcIikgeyAgLy8g5paw5a6i5oi2XHJcbiAgICAgICAgICAgIHRoaXMuQ3VzdG9tZXJOYW1lX0pxSW5wdXREb20ucmVtb3ZlQXR0cihcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgICAgICB0aGlzT2JqLlJlU2V0Q2FyTm9JdGVtcyhbXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DdXN0b21lck5hbWVfSnFJbnB1dERvbS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpcy5DdXN0b21lck5hbWVfSnFJbnB1dERvbS52YWwodGhpcy5DdXN0b21lcklkX0pxU2VsZWN0RG9tLmZpbmQoJzpzZWxlY3RlZCcpLnRleHQoKSk7XHJcbiAgICAgICAgICAgIGxldCBmdW5jUnMgPSB0aGlzLkN1c3RvbWVyQVBJLkdldENhck5vSXRlbXNCeSh0aGlzLkN1c3RvbWVySWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudmFsKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICQud2hlbihmdW5jUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNPYmouUmVTZXRDYXJOb0l0ZW1zKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENhck5vSWRfQ2hhbmdlKCkge1xyXG5cclxuICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS52YWwoXCJcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbSAmJlxyXG4gICAgICAgICAgICB0aGlzLkNhck5vSWRfSnFTZWxlY3REb20uZmluZCgnOnNlbGVjdGVkJykudmFsKCkgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FyTmFtZV9KcUlucHV0RG9tLnJlbW92ZUF0dHIoXCJyZWFkb25seVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkNhck5hbWVfSnFJbnB1dERvbS5hdHRyKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgdGhpcy5DYXJOYW1lX0pxSW5wdXREb20udmFsKHRoaXMuQ2FyTm9JZF9KcVNlbGVjdERvbS5maW5kKCc6c2VsZWN0ZWQnKS50ZXh0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFBsdXNQcm9kSXRlbVBlcmNlbnRfQ2xpY2soaVRhZ0RvbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgbm93SVRhZyA9IGlUYWdEb207XHJcbiAgICAgICAgbGV0IG5vd0xpVGFnID0gbm93SVRhZy5wYXJlbnRFbGVtZW50IGFzIEhUTUxMSUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBub3dQcm9kSXRlbSA9IHRoaXMuX3Byb2RJdGVtTGlzdC5EYXRhLmZpbmQoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gbm93TGlUYWcuZGF0YXNldC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vd1Byb2RJdGVtKSB7XHJcbiAgICAgICAgICAgIG5vd1Byb2RJdGVtLnBlcmNlbnQgPSBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTAgPiAxMDAgPyAxMDAgOiBub3dQcm9kSXRlbS5wZXJjZW50ICsgMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE1pbnVzUHJvZEl0ZW1QZXJjZW50X0NsaWNrKGlUYWdEb206IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5vd0lUYWcgPSBpVGFnRG9tO1xyXG4gICAgICAgIGxldCBub3dMaVRhZyA9IG5vd0lUYWcucGFyZW50RWxlbWVudCBhcyBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgICAgICBsZXQgbm93UHJvZEl0ZW0gPSB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5maW5kKGl0ZW0gPT4gaXRlbS5wcm9kSWQgPT09IG5vd0xpVGFnLmRhdGFzZXQudmFsdWUpO1xyXG4gICAgICAgIGlmIChub3dQcm9kSXRlbSkge1xyXG4gICAgICAgICAgICBub3dQcm9kSXRlbS5wZXJjZW50ID0gbm93UHJvZEl0ZW0ucGVyY2VudCAtIDEwIDwgMCA/IDAgOiBub3dQcm9kSXRlbS5wZXJjZW50IC0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2hvd1VTUHJvZEl0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5CaW5kSW5ncmVkaWVudFRvRG9tKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIFBhZ2UgRnVuY3Rpb24gKi9cclxuXHJcbiAgICBwcml2YXRlIFNob3dVU1Byb2RJdGVtcygpIHtcclxuICAgICAgICBsZXQgZXZlblNob3dVbERvbSA9IHRoaXMuRXZlblNob3dfSnFVbERvbS5nZXQoMCk7XHJcbiAgICAgICAgbGV0IG9kZFNob3dVbERvbSA9IHRoaXMuT2RkTFNob3dfSnFVbERvbS5nZXQoMCk7XHJcbiAgICAgICAgZXZlblNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIG9kZFNob3dVbERvbS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlNaW51c1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLmNsYXNzTGlzdC5hZGQoXCJmYS1taW51cy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlNaW51c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuTWludXNQZXJjZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaU1pbnVzVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpTWludXNUYWcuc3R5bGUuY29sb3IgPSBcImJsdWVcIjtcclxuICAgICAgICAgICAgY29uc3QgaVBsdXNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhc1wiKTtcclxuICAgICAgICAgICAgaVBsdXNUYWcuY2xhc3NMaXN0LmFkZChcImZhLXBsdXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5jbGFzc0xpc3QuYWRkKHRoaXMuUGx1c1BlcmNlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpUGx1c1RhZy5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgaVBsdXNUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3BhblRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgbGlUYWcuZGF0YXNldC50ZXh0ID0gaXRlbS5wcm9kVGV4dDtcclxuICAgICAgICAgICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHtpdGVtLnByb2RUZXh0fSBcXHUwMEEwXFx1MDBBMGA7XHJcbiAgICAgICAgICAgIGxpVGFnLmRhdGFzZXQudmFsdWUgPSBpdGVtLnByb2RJZDtcclxuICAgICAgICAgICAgLy8gbGlUYWcuZGF0YXNldC5wZXJjZW50ID0gdGhpcy5fcHJvZEl0ZW1MaXN0Lmxlbmd0aCA9PT0gMCA/IFwiOTBcIiA6IFwiMTBcIjtcclxuICAgICAgICAgICAgc3BhblRhZy5pbm5lckhUTUwgPSBgXFx1MDBBMFxcdTAwQTAke2l0ZW0ucGVyY2VudH0lXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpTWludXNUYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChzcGFuVGFnKTtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaVBsdXNUYWcpO1xyXG5cclxuICAgICAgICAgICAgaW5kZXggJSAyID09PSAwID8gZXZlblNob3dVbERvbS5hcHBlbmRDaGlsZChsaVRhZykgOlxyXG4gICAgICAgICAgICAgICAgb2RkU2hvd1VsRG9tLmFwcGVuZENoaWxkKGxpVGFnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5TaG93UHJvZEl0ZW1TdW1tYXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTaG93UHJvZEl0ZW1TdW1tYXJ5KCkge1xyXG4gICAgICAgIGxldCBhbGxQZXJjZW50ID0gMDtcclxuICAgICAgICBsZXQgbWF4SXRlbTogUHVyY2hhc2VQcm9kSXRlbTtcclxuICAgICAgICB0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGFsbFBlcmNlbnQgPSArIGl0ZW0ucGVyY2VudCArIGFsbFBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGlmICghbWF4SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbWF4SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXhJdGVtID0gK21heEl0ZW0ucGVyY2VudCA+ICtpdGVtLnBlcmNlbnQgPyBtYXhJdGVtIDogaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaXRlbVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBpdGVtU3Bhbi5pbm5lckhUTUwgPSBg77yM5bey6YG4JHt0aGlzLl9wcm9kSXRlbUxpc3QuRGF0YS5sZW5ndGh96aCFYDtcclxuICAgICAgICBjb25zdCBwZXJjZW50U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHBlcmNlbnRTcGFuLmlubmVySFRNTCA9IGDvvIzmr5TkvovliqDnuL06JHthbGxQZXJjZW50fSVgXHJcbiAgICAgICAgaWYgKGFsbFBlcmNlbnQgPiAxMDApXHJcbiAgICAgICAgICAgIHBlcmNlbnRTcGFuLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICBjb25zdCByZWNvZ25pdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICByZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MID0gYOiqjeWIl+mgheebriA6ICR7bWF4SXRlbT8ucHJvZFRleHQgPz8gXCLnhKFcIn1gXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9sZXQgc3VtbWFyeUluZm8gPSBgJHtyZWNvZ25pdGlvblNwYW4uaW5uZXJIVE1MfSR7aXRlbVNwYW4uaW5uZXJIVE1MfSR7cGVyY2VudFNwYW4uaW5uZXJIVE1MfWA7XHJcblxyXG4gICAgICAgIHRoaXMuVG90YWxQcm9kSXRlbUluZm9fSnFTZWxlY3REb20uZ2V0KDApLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFByb2RJdGVtSW5mb19KcVNlbGVjdERvbS5nZXQoMCkuYXBwZW5kQ2hpbGQocmVjb2duaXRpb25TcGFuKTtcclxuICAgICAgICB0aGlzLlRvdGFsUHJvZEl0ZW1JbmZvX0pxU2VsZWN0RG9tLmdldCgwKS5hcHBlbmRDaGlsZChpdGVtU3Bhbik7XHJcbiAgICAgICAgdGhpcy5Ub3RhbFByb2RJdGVtSW5mb19KcVNlbGVjdERvbS5nZXQoMCkuYXBwZW5kQ2hpbGQocGVyY2VudFNwYW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIEJpbmRJbmdyZWRpZW50VG9Eb20oKSB7XHJcbiAgICAgICAgbGV0IHBvc3REaXYgPSB0aGlzLmluZ3JlZGllbnRQb3N0X0pxRGl2RG9tLmdldCgwKTtcclxuXHJcbiAgICAgICAgcG9zdERpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZEl0ZW1MaXN0LkRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgaGlkZGVuIGlucHV0IGVsZW1lbnQsIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpOlxyXG4gICAgICAgICAgICBsZXQgbmFtZVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBuYW1lUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtTmFtZWA7XHJcbiAgICAgICAgICAgIG5hbWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZFRleHRcclxuICAgICAgICAgICAgbGV0IHZhbHVlUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHZhbHVlUHJvcGVydHkubmFtZSA9IGBWRV9QdXJjaGFzZUluZ3JlZGllbnRMc1ske2luZGV4fV0uUHJvZHVjdElkYDtcclxuICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucHJvZElkO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudFByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBwZXJjZW50UHJvcGVydHkudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS5uYW1lID0gYFZFX1B1cmNoYXNlSW5ncmVkaWVudExzWyR7aW5kZXh9XS5JdGVtUGVyY2VudGA7XHJcbiAgICAgICAgICAgIHBlcmNlbnRQcm9wZXJ0eS52YWx1ZSA9IGl0ZW0ucGVyY2VudC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQobmFtZVByb3BlcnR5KTtcclxuICAgICAgICAgICAgcG9zdERpdi5hcHBlbmQodmFsdWVQcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHBvc3REaXYuYXBwZW5kKHBlcmNlbnRQcm9wZXJ0eSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlU2V0Q2FyTm9JdGVtcyhkYXRhT2JqTHMpIHtcclxuICAgICAgICBjb25zdCB0aGlzUGFnT2JqID0gdGhpcztcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uaHRtbCgnJyk7ICAvLyDpgbjpoIXmuIXnqbpcclxuICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbiA9IG5ldyBPcHRpb24oXCIwLuaWsOi7iueJjFwiLCBcIjBcIiwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKGRlZmF1bHRPcHRpb24pO1xyXG4gICAgICAgIGRhdGFPYmpMcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7ICAvLyDmuIXllq7poIXnm65cclxuICAgICAgICAgICAgbGV0IG5ld09wdGlvbiA9IG5ldyBPcHRpb24oaXRlbS5jYXJOYW1lLCBpdGVtLmlkLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzUGFnT2JqLkNhck5vSWRfSnFTZWxlY3REb20uYXBwZW5kKG5ld09wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==