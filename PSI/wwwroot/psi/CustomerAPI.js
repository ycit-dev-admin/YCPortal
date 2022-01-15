var CustomerAPIClass = /** @class */ (function () {
    function CustomerAPIClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    CustomerAPIClass.prototype.GetCarNoItemsBy = function (customerId) {
        var apiUrl = this.BaseUrl + "/api/CustomerCars";
        return $.get(apiUrl, { customerId: encodeURIComponent(customerId) });
    };
    return CustomerAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJBUEkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL0N1c3RvbWVyQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBU0ksMEJBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBR00sMENBQWUsR0FBdEIsVUFBdUIsVUFBa0I7UUFDckMsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sc0JBQW1CLENBQUM7UUFHbEQsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUtMLHVCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDdXN0b21lckFQSUNsYXNzIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuXHJcblxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEdldENhck5vSXRlbXNCeShjdXN0b21lcklkOiBzdHJpbmcpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAke3RoaXMuQmFzZVVybH0vYXBpL0N1c3RvbWVyQ2Fyc2A7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gJC5nZXQoYXBpVXJsLCB7IGN1c3RvbWVySWQ6IGVuY29kZVVSSUNvbXBvbmVudChjdXN0b21lcklkKSB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn07Il19