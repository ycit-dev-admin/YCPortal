var CustomerContractAPIClass = /** @class */ (function () {
    function CustomerContractAPIClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    CustomerContractAPIClass.prototype.GetContractItemsBy = function (argUNID) {
        var apiUrl = this.BaseUrl + "/api/CustomerContracts/" + argUNID;
        // return $.get(apiUrl, { guid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);
    };
    CustomerContractAPIClass.prototype.GetPurchaseContractsByCustomerUNID = function (argUNID) {
        var apiUrl = this.BaseUrl + "/api/CustomerContracts/GetPurchaseContractsByCustomerUNID/" + argUNID;
        //const apiUrl = `${this.BaseUrl}/api/CustomerCars`;
        //return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });
        //return $.get(apiUrl, { unid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);
    };
    CustomerContractAPIClass.prototype.GetSalesContractsByCustomerUNID = function (argUNID) {
        var apiUrl = this.BaseUrl + "/api/CustomerContracts/GetSalesContractsByCustomerUNID/" + argUNID;
        //const apiUrl = `${this.BaseUrl}/api/CustomerCars`;
        //return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });
        //return $.get(apiUrl, { unid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);
    };
    return CustomerContractAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJDb250cmFjdEFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvQ3VzdG9tZXJDb250cmFjdEFQSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLGtDQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLHFEQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLCtCQUEwQixPQUFTLENBQUM7UUFHbEUsK0RBQStEO1FBQy9ELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QixDQUFDO0lBRU0scUVBQWtDLEdBQXpDLFVBQTBDLE9BQWU7UUFDckQsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sa0VBQTZELE9BQVMsQ0FBQztRQUdyRyxvREFBb0Q7UUFDcEQsMkVBQTJFO1FBRTNFLDhEQUE4RDtRQUM5RCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekIsQ0FBQztJQUNNLGtFQUErQixHQUF0QyxVQUF1QyxPQUFlO1FBQ2xELElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLCtEQUEwRCxPQUFTLENBQUM7UUFHbEcsb0RBQW9EO1FBQ3BELDJFQUEyRTtRQUUzRSw4REFBOEQ7UUFDOUQsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpCLENBQUM7SUFJTCwrQkFBQztBQUFELENBQUMsQUFoREQsSUFnREM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuXHJcblxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEdldENvbnRyYWN0SXRlbXNCeShhcmdVTklEOiBzdHJpbmcpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ29udHJhY3RzLyR7YXJnVU5JRH1gO1xyXG5cclxuXHJcbiAgICAgICAgLy8gcmV0dXJuICQuZ2V0KGFwaVVybCwgeyBndWlkOiBlbmNvZGVVUklDb21wb25lbnQoYXJnVU5JRCkgfSk7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGFwaVVybCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRQdXJjaGFzZUNvbnRyYWN0c0J5Q3VzdG9tZXJVTklEKGFyZ1VOSUQ6IHN0cmluZyk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDb250cmFjdHMvR2V0UHVyY2hhc2VDb250cmFjdHNCeUN1c3RvbWVyVU5JRC8ke2FyZ1VOSUR9YDtcclxuXHJcblxyXG4gICAgICAgIC8vY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzYDtcclxuICAgICAgICAvL3JldHVybiAkLmdldChhcGlVcmwsIHsgY3VzdG9tZXJVTklEOiBlbmNvZGVVUklDb21wb25lbnQoY3VzdG9tZXJVTklEKSB9KTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gJC5nZXQoYXBpVXJsLCB7IHVuaWQ6IGVuY29kZVVSSUNvbXBvbmVudChhcmdVTklEKSB9KTtcclxuICAgICAgICByZXR1cm4gJC5nZXQoYXBpVXJsKTtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0U2FsZXNDb250cmFjdHNCeUN1c3RvbWVyVU5JRChhcmdVTklEOiBzdHJpbmcpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ29udHJhY3RzL0dldFNhbGVzQ29udHJhY3RzQnlDdXN0b21lclVOSUQvJHthcmdVTklEfWA7XHJcblxyXG5cclxuICAgICAgICAvL2NvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ2Fyc2A7XHJcbiAgICAgICAgLy9yZXR1cm4gJC5nZXQoYXBpVXJsLCB7IGN1c3RvbWVyVU5JRDogZW5jb2RlVVJJQ29tcG9uZW50KGN1c3RvbWVyVU5JRCkgfSk7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuICQuZ2V0KGFwaVVybCwgeyB1bmlkOiBlbmNvZGVVUklDb21wb25lbnQoYXJnVU5JRCkgfSk7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGFwaVVybCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59OyJdfQ==