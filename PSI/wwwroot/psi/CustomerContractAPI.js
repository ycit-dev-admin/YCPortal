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
    CustomerContractAPIClass.prototype.GetContractsByCustomerUNID = function (argUNID) {
        var apiUrl = this.BaseUrl + "/api/CustomerContracts/GetContractsByCustomerUNID/" + argUNID;
        //const apiUrl = `${this.BaseUrl}/api/CustomerCars`;
        //return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });
        //return $.get(apiUrl, { unid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);
    };
    return CustomerContractAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJDb250cmFjdEFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvQ3VzdG9tZXJDb250cmFjdEFQSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLGtDQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLHFEQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLCtCQUEwQixPQUFTLENBQUM7UUFHbEUsK0RBQStEO1FBQy9ELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QixDQUFDO0lBRU0sNkRBQTBCLEdBQWpDLFVBQWtDLE9BQWU7UUFDN0MsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sMERBQXFELE9BQVMsQ0FBQztRQUc3RixvREFBb0Q7UUFDcEQsMkVBQTJFO1FBRTNFLDhEQUE4RDtRQUM5RCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekIsQ0FBQztJQUtMLCtCQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3Mge1xyXG4gICAgLy8gR2xvYmFsXHJcblxyXG4gICAgLy8gUmVhZHkgUG9zdFxyXG5cclxuXHJcblxyXG5cclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgR2V0Q29udHJhY3RJdGVtc0J5KGFyZ1VOSUQ6IHN0cmluZyk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDb250cmFjdHMvJHthcmdVTklEfWA7XHJcblxyXG5cclxuICAgICAgICAvLyByZXR1cm4gJC5nZXQoYXBpVXJsLCB7IGd1aWQ6IGVuY29kZVVSSUNvbXBvbmVudChhcmdVTklEKSB9KTtcclxuICAgICAgICByZXR1cm4gJC5nZXQoYXBpVXJsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENvbnRyYWN0c0J5Q3VzdG9tZXJVTklEKGFyZ1VOSUQ6IHN0cmluZyk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDb250cmFjdHMvR2V0Q29udHJhY3RzQnlDdXN0b21lclVOSUQvJHthcmdVTklEfWA7XHJcblxyXG5cclxuICAgICAgICAvL2NvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ2Fyc2A7XHJcbiAgICAgICAgLy9yZXR1cm4gJC5nZXQoYXBpVXJsLCB7IGN1c3RvbWVyVU5JRDogZW5jb2RlVVJJQ29tcG9uZW50KGN1c3RvbWVyVU5JRCkgfSk7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuICQuZ2V0KGFwaVVybCwgeyB1bmlkOiBlbmNvZGVVUklDb21wb25lbnQoYXJnVU5JRCkgfSk7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGFwaVVybCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufTsiXX0=