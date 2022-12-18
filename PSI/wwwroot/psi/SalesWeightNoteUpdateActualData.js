var SalesWeightNoteUpdateActualData = /** @class */ (function () {
    function SalesWeightNoteUpdateActualData(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        /* Field Doms */
        // this
        this.DomOfUserSelectProditem = document.getElementById('InspectMethord');
        this.BaseUrl = baseUrl;
        this.SalesPriceAPI = new SalesPriceAPIClass(this.BaseUrl);
        this.CustomerContractAPI = new CustomerContractAPIClass(this.BaseUrl);
    }
    SalesWeightNoteUpdateActualData.prototype.PagePluginInit = function () {
        var curObj = this;
        /* Page Initialize */
        // Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4',
            placeholder: "請選擇"
        });
        // jquery dialog
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            autoOpen: false,
            buttons: {
                "送出": function () {
                    $('#create-form').submit();
                    $(this).dialog("close");
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    };
    SalesWeightNoteUpdateActualData.prototype.PageEventInit = function () {
        var curObj = this;
        //$(curObj.DomOfUnitPrice).trigger("input");
        ///* Page Events */
        //// 表單建立
        //$(curObj.DomOfFormCreate).on('input', function () {
        //    $("#dialog-confirm").dialog("open");
        //})
    };
    SalesWeightNoteUpdateActualData.prototype.PageValidateInit = function () {
    };
    /* Class Variable */
    /* Page Function */
    SalesWeightNoteUpdateActualData.prototype.CaculateAllFee = function () {
        var thisObj = this;
    };
    return SalesWeightNoteUpdateActualData;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvU2FsZXNXZWlnaHROb3RlVXBkYXRlQWN0dWFsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQWFJLHlDQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFNaEMsZ0JBQWdCO1FBQ2hCLE9BQU87UUFDQSw0QkFBdUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFzQixDQUFDO1FBUDVGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFTTSx3REFBYyxHQUFyQjtRQUNJLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDckIsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLEtBQUs7U0FDckIsQ0FBQyxDQUFBO1FBS0YsZ0JBQWdCO1FBQ2hCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN4QixTQUFTLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsS0FBSztZQUNmLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0YsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUNELElBQUksRUFBRTtvQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2FBQ0o7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sdURBQWEsR0FBcEI7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFcEIsNENBQTRDO1FBRTVDLG1CQUFtQjtRQUNuQixTQUFTO1FBQ1QscURBQXFEO1FBQ3JELDBDQUEwQztRQUMxQyxJQUFJO0lBSVIsQ0FBQztJQUVNLDBEQUFnQixHQUF2QjtJQUVBLENBQUM7SUFHRCxvQkFBb0I7SUFFcEIsbUJBQW1CO0lBR1gsd0RBQWMsR0FBdEI7UUFDSSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFHekIsQ0FBQztJQUlMLHNDQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNhbGVzV2VpZ2h0Tm90ZVVwZGF0ZUFjdHVhbERhdGEge1xyXG4gICAgLy8gQmFzZSBQb3JwZXJpdGVzXHJcbiAgICByZWFkb25seSBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgIFxyXG4gICAgLy8gRm9yIFBvc3RcclxuXHJcblxyXG4gICAgLy8gUmVmZXJlbmNlcyAgXHJcbiAgICBwcml2YXRlIFNhbGVzUHJpY2VBUEk6IFNhbGVzUHJpY2VBUElDbGFzcztcclxuICAgIHByaXZhdGUgQ3VzdG9tZXJDb250cmFjdEFQSTogQ3VzdG9tZXJDb250cmFjdEFQSUNsYXNzO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoYmFzZVVybDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuQmFzZVVybCA9IGJhc2VVcmw7XHJcbiAgICAgICAgdGhpcy5TYWxlc1ByaWNlQVBJID0gbmV3IFNhbGVzUHJpY2VBUElDbGFzcyh0aGlzLkJhc2VVcmwpO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tZXJDb250cmFjdEFQSSA9IG5ldyBDdXN0b21lckNvbnRyYWN0QVBJQ2xhc3ModGhpcy5CYXNlVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBGaWVsZCBEb21zICovXHJcbiAgICAvLyB0aGlzXHJcbiAgICBwdWJsaWMgRG9tT2ZVc2VyU2VsZWN0UHJvZGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnSW5zcGVjdE1ldGhvcmQnKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZVBsdWdpbkluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgY3VyT2JqID0gdGhpcztcclxuICAgICAgICAvKiBQYWdlIEluaXRpYWxpemUgKi9cclxuICAgICAgICAvLyBTZWxlY3QyIEVsZW1lbnRzXHJcbiAgICAgICAgJCgnLnNlbGVjdDJiczQnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXA0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8ganF1ZXJ5IGRpYWxvZ1xyXG4gICAgICAgICQoXCIjZGlhbG9nLWNvbmZpcm1cIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgICAgICAgd2lkdGg6IDQwMCxcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgXCLpgIHlh7pcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcmVhdGUtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCLlj5bmtohcIjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlRXZlbnRJbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGN1ck9iaiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vJChjdXJPYmouRG9tT2ZVbml0UHJpY2UpLnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuXHJcbiAgICAgICAgLy8vKiBQYWdlIEV2ZW50cyAqL1xyXG4gICAgICAgIC8vLy8g6KGo5Zau5bu656uLXHJcbiAgICAgICAgLy8kKGN1ck9iai5Eb21PZkZvcm1DcmVhdGUpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgLy99KVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhZ2VWYWxpZGF0ZUluaXQoKSB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogQ2xhc3MgVmFyaWFibGUgKi9cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIENhY3VsYXRlQWxsRmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHRoaXNPYmogPSB0aGlzO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=