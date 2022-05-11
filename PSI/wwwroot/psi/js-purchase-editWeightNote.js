var JsPurchaseEditWeightNote = /** @class */ (function () {
    function JsPurchaseEditWeightNote(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this.BaseUrl = baseUrl;
    }
    JsPurchaseEditWeightNote.prototype.IniPageEvent = function () {
    };
    ;
    JsPurchaseEditWeightNote.prototype.CaculatePriceFee = function (fullWeight, defectiveWeight, unitPrice, hasTex) {
        var taxArg = hasTex === true ? 1.05 : 1; // 是否含稅 (radio button 沒有 name attribute 所以用)
        var weightPrice = (fullWeight - defectiveWeight) * unitPrice * taxArg;
        return weightPrice;
    };
    ;
    JsPurchaseEditWeightNote.prototype.CaculateTraficFee = function () {
    };
    ;
    JsPurchaseEditWeightNote.prototype.GetActualPayFee = function (priceFee, traficFee, thirdWeightFee) {
    };
    ;
    JsPurchaseEditWeightNote.prototype.CaculateAllFee = function () {
        //let haha = new FormData();
        var fullWeight = document.getElementById("VE_PurchaseWeightNote_FullWeight").value; // 進場重量
        var defectiveWeight = document.getElementById("VE_PurchaseWeightNote_DefectiveWeight").value; // 扣重
        var unitPrice = document.getElementById("VE_PurchaseWeightNote_UnitPrice").value; // 單價
        var isHasTax = $('.ishas_tax:checked').val() === "True" ? 1.05 : 1; // 是否含稅 (radio button 沒有 name attribute 所以用)
        var traficUnitPrice = document.getElementById("VE_PurchaseWeightNote_TraficUnitPrice").value; // 運費單價
        var weightFee = document.getElementById("VE_PurchaseWeightNote_ThirdWeightFee").value;
        // 計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        //let weightFee = (+fullWeight - (+defectiveWeight));
        var weightPrice = (+fullWeight - (+defectiveWeight)) * (+unitPrice) * isHasTax;
        document.getElementById("show_weight_price").textContent = !weightPrice || weightPrice < 0 ? "0" : weightPrice.toFixed(2).toString();
        // 運費 = 進廠重量 * 運費單價
        var traficPrice = (+fullWeight) * (+traficUnitPrice);
        document.getElementById("show_trafic_price").textContent = !traficPrice || traficPrice < 0 ? "0" : traficPrice.toString();
        // 總金額 = (磅費 + 計價金額 + 運費)
        var finalPrice = (+weightFee) + weightPrice + traficPrice;
        document.getElementById("show_final_price").textContent = !finalPrice || finalPrice < 0 ? "0" : Math.round(finalPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        $('#VE_PurchaseWeightNote_ActualPrice').val(Math.round(finalPrice));
    };
    return JsPurchaseEditWeightNote;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtcHVyY2hhc2UtZWRpdFdlaWdodE5vdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2pzLXB1cmNoYXNlLWVkaXRXZWlnaHROb3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBU0ksa0NBQVksT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBR00sK0NBQVksR0FBbkI7SUFFQSxDQUFDO0lBQUEsQ0FBQztJQUdLLG1EQUFnQixHQUF2QixVQUF3QixVQUFrQixFQUFFLGVBQXVCLEVBQUUsU0FBaUIsRUFBRSxNQUFlO1FBQ25HLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsNENBQTRDO1FBQ3RGLElBQUksV0FBVyxHQUFHLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDdEUsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUFBLENBQUM7SUFDSyxvREFBaUIsR0FBeEI7SUFFQSxDQUFDO0lBQUEsQ0FBQztJQUNLLGtEQUFlLEdBQXRCLFVBQXVCLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxjQUFzQjtJQUVsRixDQUFDO0lBQUEsQ0FBQztJQUdLLGlEQUFjLEdBQXJCO1FBQ0ksNEJBQTRCO1FBQzVCLElBQUksVUFBVSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0NBQWtDLENBQXNCLENBQUMsS0FBSyxDQUFBLENBQUMsT0FBTztRQUNoSCxJQUFJLGVBQWUsR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLHVDQUF1QyxDQUFzQixDQUFDLEtBQUssQ0FBQSxDQUFDLEtBQUs7UUFDeEgsSUFBSSxTQUFTLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBc0IsQ0FBQyxLQUFLLENBQUEsQ0FBQyxLQUFLO1FBQzVHLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSw0Q0FBNEM7UUFDakgsSUFBSSxlQUFlLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyx1Q0FBdUMsQ0FBc0IsQ0FBQyxLQUFLLENBQUEsQ0FBQyxPQUFPO1FBQzFILElBQUksU0FBUyxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsc0NBQXNDLENBQXNCLENBQUMsS0FBSyxDQUFBO1FBRTNHLCtCQUErQjtRQUMvQixxREFBcUQ7UUFDckQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlFLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQW9CLENBQUMsV0FBVyxHQUFHLENBQUMsV0FBVyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6SixtQkFBbUI7UUFDbkIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwRCxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFvQixDQUFDLFdBQVcsR0FBRyxDQUFDLFdBQVcsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU5SSx5QkFBeUI7UUFDekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDekQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxVQUFVLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0TSxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRXhFLENBQUM7SUFJTCwrQkFBQztBQUFELENBQUMsQUEzREQsSUEyREM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSnNQdXJjaGFzZUVkaXRXZWlnaHROb3RlIHtcclxuICAgIC8vIEdsb2JhbFxyXG5cclxuICAgIC8vIFJlYWR5IFBvc3RcclxuXHJcblxyXG5cclxuXHJcbiAgICBCYXNlVXJsOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEluaVBhZ2VFdmVudCgpIHtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBwdWJsaWMgQ2FjdWxhdGVQcmljZUZlZShmdWxsV2VpZ2h0OiBudW1iZXIsIGRlZmVjdGl2ZVdlaWdodDogbnVtYmVyLCB1bml0UHJpY2U6IG51bWJlciwgaGFzVGV4OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHRheEFyZyA9IGhhc1RleCA9PT0gdHJ1ZSA/IDEuMDUgOiAxOyAgLy8g5piv5ZCm5ZCr56iFIChyYWRpbyBidXR0b24g5rKS5pyJIG5hbWUgYXR0cmlidXRlIOaJgOS7peeUqClcclxuICAgICAgICBsZXQgd2VpZ2h0UHJpY2UgPSAoZnVsbFdlaWdodCAtIGRlZmVjdGl2ZVdlaWdodCkgKiB1bml0UHJpY2UgKiB0YXhBcmc7XHJcbiAgICAgICAgcmV0dXJuIHdlaWdodFByaWNlO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBDYWN1bGF0ZVRyYWZpY0ZlZSgpIHtcclxuXHJcbiAgICB9O1xyXG4gICAgcHVibGljIEdldEFjdHVhbFBheUZlZShwcmljZUZlZTogbnVtYmVyLCB0cmFmaWNGZWU6IG51bWJlciwgdGhpcmRXZWlnaHRGZWU6IG51bWJlcikge1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIHB1YmxpYyBDYWN1bGF0ZUFsbEZlZSgpIHtcclxuICAgICAgICAvL2xldCBoYWhhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgbGV0IGZ1bGxXZWlnaHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJWRV9QdXJjaGFzZVdlaWdodE5vdGVfRnVsbFdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDpgLLloLTph43ph49cclxuICAgICAgICBsZXQgZGVmZWN0aXZlV2VpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlX0RlZmVjdGl2ZVdlaWdodFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDmiaPph41cclxuICAgICAgICBsZXQgdW5pdFByaWNlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVkVfUHVyY2hhc2VXZWlnaHROb3RlX1VuaXRQcmljZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAvLyDllq7lg7lcclxuICAgICAgICBsZXQgaXNIYXNUYXggPSAkKCcuaXNoYXNfdGF4OmNoZWNrZWQnKS52YWwoKSA9PT0gXCJUcnVlXCIgPyAxLjA1IDogMTsgIC8vIOaYr+WQpuWQq+eohSAocmFkaW8gYnV0dG9uIOaykuaciSBuYW1lIGF0dHJpYnV0ZSDmiYDku6XnlKgpXHJcbiAgICAgICAgbGV0IHRyYWZpY1VuaXRQcmljZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UcmFmaWNVbml0UHJpY2VcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgLy8g6YGL6LK75Zau5YO5XHJcbiAgICAgICAgbGV0IHdlaWdodEZlZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlZFX1B1cmNoYXNlV2VpZ2h0Tm90ZV9UaGlyZFdlaWdodEZlZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxyXG5cclxuICAgICAgICAvLyDoqIjlg7nph5HpoY0gPSAo6YCy5bug6YeN6YePIC0g5omj6YeNKSAqIOWWruWDuSAqIOeoheeOh1xyXG4gICAgICAgIC8vbGV0IHdlaWdodEZlZSA9ICgrZnVsbFdlaWdodCAtICgrZGVmZWN0aXZlV2VpZ2h0KSk7XHJcbiAgICAgICAgbGV0IHdlaWdodFByaWNlID0gKCtmdWxsV2VpZ2h0IC0gKCtkZWZlY3RpdmVXZWlnaHQpKSAqICgrdW5pdFByaWNlKSAqIGlzSGFzVGF4O1xyXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3dfd2VpZ2h0X3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICF3ZWlnaHRQcmljZSB8fCB3ZWlnaHRQcmljZSA8IDAgPyBcIjBcIiA6IHdlaWdodFByaWNlLnRvRml4ZWQoMikudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8g6YGL6LK7ID0g6YCy5bug6YeN6YePICog6YGL6LK75Zau5YO5XHJcbiAgICAgICAgbGV0IHRyYWZpY1ByaWNlID0gKCtmdWxsV2VpZ2h0KSAqICgrdHJhZmljVW5pdFByaWNlKTtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X3RyYWZpY19wcmljZVwiKSBhcyBIVE1MRGl2RWxlbWVudCkudGV4dENvbnRlbnQgPSAhdHJhZmljUHJpY2UgfHwgdHJhZmljUHJpY2UgPCAwID8gXCIwXCIgOiB0cmFmaWNQcmljZS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDnuL3ph5HpoY0gPSAo56OF6LK7ICsg6KiI5YO56YeR6aGNICsg6YGL6LK7KVxyXG4gICAgICAgIGxldCBmaW5hbFByaWNlID0gKCt3ZWlnaHRGZWUpICsgd2VpZ2h0UHJpY2UgKyB0cmFmaWNQcmljZTtcclxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93X2ZpbmFsX3ByaWNlXCIpIGFzIEhUTUxEaXZFbGVtZW50KS50ZXh0Q29udGVudCA9ICFmaW5hbFByaWNlIHx8IGZpbmFsUHJpY2UgPCAwID8gXCIwXCIgOiBNYXRoLnJvdW5kKGZpbmFsUHJpY2UpLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD88IVxcLlxcZCopKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG4gICAgICAgICQoJyNWRV9QdXJjaGFzZVdlaWdodE5vdGVfQWN0dWFsUHJpY2UnKS52YWwoTWF0aC5yb3VuZChmaW5hbFByaWNlKSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=