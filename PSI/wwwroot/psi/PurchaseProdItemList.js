var PurchaseProdItemList = /** @class */ (function () {
    function PurchaseProdItemList() {
        this.Data = [];
    }
    PurchaseProdItemList.prototype.Append = function (prodId, prodText) {
        var isItemExist = this.Data.filter(function (item) { return item.prodId === prodId; }).length > 0;
        if (!isItemExist) {
            var prodItem = new PurchaseProdItem(prodId, prodText, this.Data.length === 0 ? 90 : 10);
            this.Data.push(prodItem);
        }
    };
    PurchaseProdItemList.prototype.RemoveByProdId = function (prodId) {
        var wRemoveItem = this.Data.find(function (item) { return item.prodId === prodId; });
        this.Data.splice(this.Data.indexOf(wRemoveItem), 1);
    };
    return PurchaseProdItemList;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVyY2hhc2VQcm9kSXRlbUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL1B1cmNoYXNlUHJvZEl0ZW1MaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBR0k7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0scUNBQU0sR0FBYixVQUFjLE1BQWMsRUFBRSxRQUFnQjtRQUMxQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUF0QixDQUFzQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2QsSUFBSSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFHTSw2Q0FBYyxHQUFyQixVQUFzQixNQUFjO1FBQ2hDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHVyY2hhc2VQcm9kSXRlbUxpc3Qge1xyXG4gICAgcmVhZG9ubHkgRGF0YTogUHVyY2hhc2VQcm9kSXRlbVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuRGF0YSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBcHBlbmQocHJvZElkOiBzdHJpbmcsIHByb2RUZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBpc0l0ZW1FeGlzdCA9IHRoaXMuRGF0YS5maWx0ZXIoaXRlbSA9PiBpdGVtLnByb2RJZCA9PT0gcHJvZElkKS5sZW5ndGggPiAwO1xyXG4gICAgICAgIGlmICghaXNJdGVtRXhpc3QpIHtcclxuICAgICAgICAgICAgbGV0IHByb2RJdGVtID0gbmV3IFB1cmNoYXNlUHJvZEl0ZW0ocHJvZElkLCBwcm9kVGV4dCwgdGhpcy5EYXRhLmxlbmd0aCA9PT0gMCA/IDkwIDogMTApO1xyXG4gICAgICAgICAgICB0aGlzLkRhdGEucHVzaChwcm9kSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgUmVtb3ZlQnlQcm9kSWQocHJvZElkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgd1JlbW92ZUl0ZW0gPSB0aGlzLkRhdGEuZmluZChpdGVtID0+IGl0ZW0ucHJvZElkID09PSBwcm9kSWQpO1xyXG4gICAgICAgIHRoaXMuRGF0YS5zcGxpY2UodGhpcy5EYXRhLmluZGV4T2Yod1JlbW92ZUl0ZW0pLCAxKTtcclxuICAgIH1cclxufSJdfQ==