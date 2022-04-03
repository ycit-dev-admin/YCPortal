var SysConfigPage = /** @class */ (function () {
    function SysConfigPage(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    SysConfigPage.prototype.GetCarNoInfoModel = function (carGUID) {
        var pageUrl = this.BaseUrl + "/SysConfig/CarNo/_GetCarNoInfoModel";
        return $.get(pageUrl, { carGUID: encodeURIComponent(carGUID) });
    };
    return SysConfigPage;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ29uZmlnUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU3lzQ29uZmlnUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLHVCQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLHlDQUFpQixHQUF4QixVQUF5QixPQUFlO1FBQ3BDLElBQU0sT0FBTyxHQUFNLElBQUksQ0FBQyxPQUFPLHdDQUFxQyxDQUFDO1FBRXJFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFLTCxvQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3lzQ29uZmlnUGFnZSB7XHJcbiAgICAvLyBHbG9iYWxcclxuXHJcbiAgICAvLyBSZWFkeSBQb3N0XHJcblxyXG5cclxuXHJcblxyXG4gICAgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBHZXRDYXJOb0luZm9Nb2RlbChjYXJHVUlEOiBzdHJpbmcpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L1N5c0NvbmZpZy9DYXJOby9fR2V0Q2FyTm9JbmZvTW9kZWxgO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5nZXQocGFnZVVybCwgeyBjYXJHVUlEOiBlbmNvZGVVUklDb21wb25lbnQoY2FyR1VJRCkgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59OyJdfQ==