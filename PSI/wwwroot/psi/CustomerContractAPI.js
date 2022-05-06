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
    return CustomerContractAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJDb250cmFjdEFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvQ3VzdG9tZXJDb250cmFjdEFQSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQVNJLGtDQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUdNLHFEQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLCtCQUEwQixPQUFTLENBQUM7UUFHbEUsK0RBQStEO1FBQy9ELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV6QixDQUFDO0lBS0wsK0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEN1c3RvbWVyQ29udHJhY3RBUElDbGFzcyB7XHJcbiAgICAvLyBHbG9iYWxcclxuXHJcbiAgICAvLyBSZWFkeSBQb3N0XHJcblxyXG5cclxuXHJcblxyXG4gICAgQmFzZVVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBHZXRDb250cmFjdEl0ZW1zQnkoYXJnVU5JRDogc3RyaW5nKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICBjb25zdCBhcGlVcmwgPSBgJHt0aGlzLkJhc2VVcmx9L2FwaS9DdXN0b21lckNvbnRyYWN0cy8ke2FyZ1VOSUR9YDtcclxuXHJcblxyXG4gICAgICAgIC8vIHJldHVybiAkLmdldChhcGlVcmwsIHsgZ3VpZDogZW5jb2RlVVJJQ29tcG9uZW50KGFyZ1VOSUQpIH0pO1xyXG4gICAgICAgIHJldHVybiAkLmdldChhcGlVcmwpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn07Il19