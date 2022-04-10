var SysConfigPageHelper = /** @class */ (function () {
    function SysConfigPageHelper(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    SysConfigPageHelper.prototype.GetCarNoInfoModel = function (carGUID, isOnlyQuery) {
        if (carGUID === void 0) { carGUID = ""; }
        if (isOnlyQuery === void 0) { isOnlyQuery = false; }
        var pageUrl = this.BaseUrl + "/SysConfig/CarNo/_GetCarNoInfoModel";
        return $.get(pageUrl, {
            carGUID: encodeURIComponent(carGUID),
            isOnlyQuery: encodeURIComponent(isOnlyQuery)
        });
    };
    return SysConfigPageHelper;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ29uZmlnUGFnZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU3lzQ29uZmlnUGFnZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLDZCQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLCtDQUFpQixHQUF4QixVQUF5QixPQUFvQixFQUFFLFdBQTRCO1FBQWxELHdCQUFBLEVBQUEsWUFBb0I7UUFBRSw0QkFBQSxFQUFBLG1CQUE0QjtRQUN2RSxJQUFNLE9BQU8sR0FBTSxJQUFJLENBQUMsT0FBTyx3Q0FBcUMsQ0FBQztRQUVyRSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7WUFDcEMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztTQUMvQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBS0wsMEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN5c0NvbmZpZ1BhZ2VIZWxwZXIge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcblxyXG5cclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2FyTm9JbmZvTW9kZWwoY2FyR1VJRDogc3RyaW5nID0gXCJcIiwgaXNPbmx5UXVlcnk6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgcGFnZVVybCA9IGAke3RoaXMuQmFzZVVybH0vU3lzQ29uZmlnL0Nhck5vL19HZXRDYXJOb0luZm9Nb2RlbGA7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmdldChwYWdlVXJsLCB7XHJcbiAgICAgICAgICAgIGNhckdVSUQ6IGVuY29kZVVSSUNvbXBvbmVudChjYXJHVUlEKSxcclxuICAgICAgICAgICAgaXNPbmx5UXVlcnk6IGVuY29kZVVSSUNvbXBvbmVudChpc09ubHlRdWVyeSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn07Il19