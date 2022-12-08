var WeightAPIClass = /** @class */ (function () {
    function WeightAPIClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    WeightAPIClass.prototype.GetProportionWeight = function (nominator, totalWeight) {
        var apiUrl = this.BaseUrl + "/api/Weight/GetProportionWeight";
        return $.get(apiUrl, {
            nominator: nominator,
            totalWeight: totalWeight
        });
    };
    return WeightAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VpZ2h0QVBJQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL1dlaWdodEFQSUNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBT0ksd0JBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sNENBQW1CLEdBQTFCLFVBQTJCLFNBQWlCLEVBQUUsV0FBbUI7UUFDN0QsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sb0NBQWlDLENBQUM7UUFDaEUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDZjtZQUNJLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFHTCxxQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgV2VpZ2h0QVBJQ2xhc3Mge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJvcG9ydGlvbldlaWdodChub21pbmF0b3I6IG51bWJlciwgdG90YWxXZWlnaHQ6IG51bWJlcik6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvV2VpZ2h0L0dldFByb3BvcnRpb25XZWlnaHRgO1xyXG4gICAgICAgIHJldHVybiAkLmdldChhcGlVcmwsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vbWluYXRvcjogbm9taW5hdG9yLFxyXG4gICAgICAgICAgICAgICAgdG90YWxXZWlnaHQ6IHRvdGFsV2VpZ2h0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn07Il19