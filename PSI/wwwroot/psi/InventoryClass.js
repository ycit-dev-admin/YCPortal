var InventoryClass = /** @class */ (function () {
    function InventoryClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    InventoryClass.prototype.GetInventoryWeight = function (prodItemGuid) {
        var apiUrl = this.BaseUrl + "/Purchase/api/Inventory/GetInventoryWeight";
        return $.get(apiUrl, {
            prodItemGuid: prodItemGuid
        });
    };
    return InventoryClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52ZW50b3J5Q2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL0ludmVudG9yeUNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBS0ksd0JBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRU0sMkNBQWtCLEdBQXpCLFVBQTBCLFlBQW9CO1FBQzFDLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxPQUFPLCtDQUE0QyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQ2Y7WUFDSSxZQUFZLEVBQUUsWUFBWTtTQUM3QixDQUFDLENBQUM7SUFDWCxDQUFDO0lBR0wscUJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEludmVudG9yeUNsYXNzIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuICAgIEJhc2VVcmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLkJhc2VVcmwgPSBiYXNlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJbnZlbnRvcnlXZWlnaHQocHJvZEl0ZW1HdWlkOiBzdHJpbmcpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vUHVyY2hhc2UvYXBpL0ludmVudG9yeS9HZXRJbnZlbnRvcnlXZWlnaHRgO1xyXG4gICAgICAgIHJldHVybiAkLmdldChhcGlVcmwsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2RJdGVtR3VpZDogcHJvZEl0ZW1HdWlkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn07Il19