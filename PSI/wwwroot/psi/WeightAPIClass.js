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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VpZ2h0QVBJQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL1dlaWdodEFQSUNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBT0ksd0JBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sNENBQW1CLEdBQTFCLFVBQTJCLFNBQWlCLEVBQUUsV0FBa0I7UUFDNUQsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sb0NBQWlDLENBQUM7UUFDaEUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDZjtZQUNJLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUMsQ0FBQztJQUNYLENBQUM7SUFHTCxxQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgV2VpZ2h0QVBJQ2xhc3Mge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJvcG9ydGlvbldlaWdodChub21pbmF0b3I6IHN0cmluZywgdG90YWxXZWlnaHQ6c3RyaW5nKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICBjb25zdCBhcGlVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9XZWlnaHQvR2V0UHJvcG9ydGlvbldlaWdodGA7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGFwaVVybCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9taW5hdG9yOiBub21pbmF0b3IsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFdlaWdodDogdG90YWxXZWlnaHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufTsiXX0=