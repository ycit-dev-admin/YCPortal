var PageOfSysconfigCarNoOnlineInfo = /** @class */ (function () {
    function PageOfSysconfigCarNoOnlineInfo(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        // Page  Dom
        this.EditCompanyName_Dom = document.getElementById('EditCompanyName');
        this.ShowEditCompanyName_Dom = document.getElementById('show-edit-companyName');
        this.EvenShow_JqUlDom = $('#evenProductLs');
        this.OddLShow_JqUlDom = $('#oddProductLs');
        this.UsProdItem_JqSelectDom = $('#user-select-proditem');
        this.TotalProdItemInfo_JqSelectDom = $('#total');
        this.ingredientPost_JqDivDom = $('#ingredientPost');
        this.CustomerId_JqSelectDom = $('#VE_PurchaseWeightNote_CustomerId');
        this.CustomerName_JqInputDom = $('#VE_PurchaseWeightNote_CustomerName');
        this.CarNoId_JqSelectDom = $('#VE_PurchaseWeightNote_CarNoId');
        this.CarName_JqInputDom = $('#VE_PurchaseWeightNote_CarNo');
        this.FullWeight_Dom = $('#VE_PurchaseWeightNote_FullWeight').get(0);
        this.DefectiveWeight_DOM = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0);
        this.UnitPrice_DOM = $('#VE_PurchaseWeightNote_UnitPrice').get(0);
        this.TraficUnitPrice_DOM = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0);
        this.ThirdWeightFee_DOM = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0);
        this.HasTaxList = $(".ishas_tax").get();
        this.DisplayFinalPrice_DOM = $('#show_final_price').get(0);
        this.DisplayWeightPrice_DOM = $('#show_weight_price').get(0);
        this.DispalyTraficPrice_DOM = $('#show_trafic_price').get(0);
        this.ActualPrice_DOM = $('#VE_PurchaseWeightNote_ActualPrice').get(0);
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }
    return PageOfSysconfigCarNoOnlineInfo;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzY29uZmlnQ2FyTm9PbmxpbmVJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9QYWdlT2ZTeXNjb25maWdDYXJOb09ubGluZUluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFtQ0ksd0NBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQTdCaEMsWUFBWTtRQUNMLHdCQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQXFCLENBQUM7UUFDckYsNEJBQXVCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBb0IsQ0FBQztRQUc5RixxQkFBZ0IsR0FBNkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUscUJBQWdCLEdBQTZCLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRSwyQkFBc0IsR0FBOEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0Usa0NBQTZCLEdBQStCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSw0QkFBdUIsR0FBMkIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsMkJBQXNCLEdBQThCLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQzNGLDRCQUF1QixHQUE2QixDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUM3Rix3QkFBbUIsR0FBd0IsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDL0UsdUJBQWtCLEdBQTZCLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ2pGLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBcUIsQ0FBQztRQUNuRix3QkFBbUIsR0FBRyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFxQixDQUFDO1FBQzdGLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBcUIsQ0FBQztRQUNqRix3QkFBbUIsR0FBRyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFxQixDQUFDO1FBQzdGLHVCQUFrQixHQUFHLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQXFCLENBQUM7UUFDM0YsZUFBVSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQXdCLENBQUM7UUFDekQsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBdUIsQ0FBQztRQUM1RSwyQkFBc0IsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFtQixDQUFDO1FBQzFFLDJCQUFzQixHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQW1CLENBQUM7UUFDMUUsb0JBQWUsR0FBRyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFxQixDQUFDO1FBT3hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBTUwscUNBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFnZU9mU3lzY29uZmlnQ2FyTm9PbmxpbmVJbmZvIHtcclxuICAgIC8vIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IEhhc0NoYW5nZTogYm9vbGVhbjtcclxuXHJcblxyXG4gICAgLy8gUGFnZSAgRG9tXHJcbiAgICBwdWJsaWMgRWRpdENvbXBhbnlOYW1lX0RvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFZGl0Q29tcGFueU5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHVibGljIFNob3dFZGl0Q29tcGFueU5hbWVfRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctZWRpdC1jb21wYW55TmFtZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuXHJcblxyXG4gICAgcHVibGljIEV2ZW5TaG93X0pxVWxEb206IEpRdWVyeTxIVE1MVUxpc3RFbGVtZW50PiA9ICQoJyNldmVuUHJvZHVjdExzJyk7XHJcbiAgICBwdWJsaWMgT2RkTFNob3dfSnFVbERvbTogSlF1ZXJ5PEhUTUxVTGlzdEVsZW1lbnQ+ID0gJCgnI29kZFByb2R1Y3RMcycpO1xyXG4gICAgcHVibGljIFVzUHJvZEl0ZW1fSnFTZWxlY3REb206IEpRdWVyeTxIVE1MU2VsZWN0RWxlbWVudD4gPSAkKCcjdXNlci1zZWxlY3QtcHJvZGl0ZW0nKTtcclxuICAgIHB1YmxpYyBUb3RhbFByb2RJdGVtSW5mb19KcVNlbGVjdERvbTogSlF1ZXJ5PEhUTUxIZWFkaW5nRWxlbWVudD4gPSAkKCcjdG90YWwnKTtcclxuICAgIHB1YmxpYyBpbmdyZWRpZW50UG9zdF9KcURpdkRvbTogSlF1ZXJ5PEhUTUxEaXZFbGVtZW50PiA9ICQoJyNpbmdyZWRpZW50UG9zdCcpO1xyXG4gICAgcHVibGljIEN1c3RvbWVySWRfSnFTZWxlY3REb206IEpRdWVyeTxIVE1MU2VsZWN0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0N1c3RvbWVySWQnKTtcclxuICAgIHB1YmxpYyBDdXN0b21lck5hbWVfSnFJbnB1dERvbTogSlF1ZXJ5PEhUTUxJbnB1dEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DdXN0b21lck5hbWUnKTtcclxuICAgIHB1YmxpYyBDYXJOb0lkX0pxU2VsZWN0RG9tOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9DYXJOb0lkJyk7XHJcbiAgICBwdWJsaWMgQ2FyTmFtZV9KcUlucHV0RG9tOiBKUXVlcnk8SFRNTElucHV0RWxlbWVudD4gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Nhck5vJyk7XHJcbiAgICBwdWJsaWMgRnVsbFdlaWdodF9Eb20gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX0Z1bGxXZWlnaHQnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBEZWZlY3RpdmVXZWlnaHRfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9EZWZlY3RpdmVXZWlnaHQnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBVbml0UHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9Vbml0UHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBUcmFmaWNVbml0UHJpY2VfRE9NID0gJCgnI1ZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHB1YmxpYyBUaGlyZFdlaWdodEZlZV9ET00gPSAkKCcjVkVfUHVyY2hhc2VXZWlnaHROb3RlX1RoaXJkV2VpZ2h0RmVlJykuZ2V0KDApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgSGFzVGF4TGlzdCA9ICQoXCIuaXNoYXNfdGF4XCIpLmdldCgpIGFzIEhUTUxJbnB1dEVsZW1lbnRbXTtcclxuICAgIHB1YmxpYyBEaXNwbGF5RmluYWxQcmljZV9ET00gPSAkKCcjc2hvd19maW5hbF9wcmljZScpLmdldCgwKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgRGlzcGxheVdlaWdodFByaWNlX0RPTSA9ICQoJyNzaG93X3dlaWdodF9wcmljZScpLmdldCgwKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHB1YmxpYyBEaXNwYWx5VHJhZmljUHJpY2VfRE9NID0gJCgnI3Nob3dfdHJhZmljX3ByaWNlJykuZ2V0KDApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHVibGljIEFjdHVhbFByaWNlX0RPTSA9ICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQWN0dWFsUHJpY2UnKS5nZXQoMCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICAvLyBXZWJBUElcclxuICAgIHB1YmxpYyBTeXNDb25maWdQYWdlSGVscGVyOiBTeXNDb25maWdQYWdlSGVscGVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLlN5c0NvbmZpZ1BhZ2VIZWxwZXIgPSBuZXcgU3lzQ29uZmlnUGFnZUhlbHBlcih0aGlzLkJhc2VVcmwpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBQYWdlIEZ1bmN0aW9uICovXHJcbiAgICBcclxuXHJcbn1cclxuXHJcbiJdfQ==