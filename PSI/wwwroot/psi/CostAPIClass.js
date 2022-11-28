var CostAPIClass = /** @class */ (function () {
    function CostAPIClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    CostAPIClass.prototype.GetCostUnitPrce = function (percent, unitPrice) {
        var apiUrl = this.BaseUrl + "/Sales/api/Cost/GetCostUnitPrce";
        return $.get(apiUrl, {
            percent: percent,
            unitPrice: unitPrice
        });
    };
    return CostAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29zdEFQSUNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9Db3N0QVBJQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFLSSxzQkFBWSxPQUFvQjtRQUFwQix3QkFBQSxFQUFBLFlBQW9CO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFTSxzQ0FBZSxHQUF0QixVQUF1QixPQUFlLEVBQUUsU0FBaUI7UUFDckQsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sb0NBQWlDLENBQUM7UUFDaEUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDZjtZQUNJLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFHTCxtQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29zdEFQSUNsYXNzIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDb3N0VW5pdFByY2UocGVyY2VudDogbnVtYmVyLCB1bml0UHJpY2U6IG51bWJlcik6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9TYWxlcy9hcGkvQ29zdC9HZXRDb3N0VW5pdFByY2VgO1xyXG4gICAgICAgIHJldHVybiAkLmdldChhcGlVcmwsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQ6IHBlcmNlbnQsXHJcbiAgICAgICAgICAgICAgICB1bml0UHJpY2U6IHVuaXRQcmljZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59OyJdfQ==