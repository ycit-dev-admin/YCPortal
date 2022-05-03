var CustomerAPIClass = /** @class */ (function () {
    function CustomerAPIClass(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    CustomerAPIClass.prototype.GetCarNoItemsBy = function (customerUNID) {
        var apiUrl = this.BaseUrl + "/api/CustomerCars";
        return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });
    };
    return CustomerAPIClass;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tZXJBUEkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL0N1c3RvbWVyQVBJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBU0ksMEJBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBR00sMENBQWUsR0FBdEIsVUFBdUIsWUFBb0I7UUFDdkMsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sc0JBQW1CLENBQUM7UUFHbEQsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUtMLHVCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDdXN0b21lckFQSUNsYXNzIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuXHJcblxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEdldENhck5vSXRlbXNCeShjdXN0b21lclVOSUQ6IHN0cmluZyk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYCR7dGhpcy5CYXNlVXJsfS9hcGkvQ3VzdG9tZXJDYXJzYDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAkLmdldChhcGlVcmwsIHsgY3VzdG9tZXJVTklEOiBlbmNvZGVVUklDb21wb25lbnQoY3VzdG9tZXJVTklEKSB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn07Il19