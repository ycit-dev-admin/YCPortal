var PageJsClass = /** @class */ (function () {
    function PageJsClass() {
        this.CarNoList = new CarNoList("selected-carno");
    }
    return PageJsClass;
}());
;
var CarNoList = /** @class */ (function () {
    function CarNoList(listHtmlId) {
        this.CarNoList = [];
        this.ShowTagName = listHtmlId;
    }
    CarNoList.prototype.ShowCarNoList = function () {
        var _this = this;
        var showUlTag = document.getElementById(this.ShowTagName);
        showUlTag.innerHTML = ""; // 一種ul tag清空方法
        this.CarNoList.forEach(function (value) {
            var inputTag = document.createElement("input");
            inputTag.name = "PostCarNo";
            inputTag.value = value;
            inputTag.type = "hidden";
            var iDelTag = document.createElement("i");
            iDelTag.classList.add("fas", "fa-times-circle");
            iDelTag.style.cursor = "pointer";
            iDelTag.style.color = "red";
            iDelTag.addEventListener('click', function () {
                _this.RemvoeCarNoProcess(value);
            });
            var liTag = document.createElement("li");
            liTag.textContent = value + " \u00A0\u00A0";
            liTag.appendChild(inputTag);
            liTag.appendChild(iDelTag);
            showUlTag.appendChild(liTag);
        });
        // 狀態顯示
        this.ShowCarNoMessage(this.CarNoList.length === 0 ? "無相關車牌" : "\u5DF2\u52A0\u5165" + this.CarNoList.length + " \u9805");
    };
    CarNoList.prototype.RemvoeCarNoProcess = function (carNo) {
        this.RemvoeCarNo(carNo);
        this.ShowCarNoList();
    };
    CarNoList.prototype.RemvoeCarNo = function (carNo) {
        this.CarNoList.splice(this.CarNoList.indexOf(carNo), 1);
    };
    CarNoList.prototype.AppendToList = function (carNo) {
        if (carNo && !this.CarNoList.includes(carNo)) {
            this.CarNoList.push(carNo.toUpperCase());
        }
    };
    CarNoList.prototype.ShowCarNoMessage = function (msg) {
        document.getElementById("carno-message").innerHTML = msg;
    };
    return CarNoList;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWN1c3RvbWVyLWluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBR0k7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFBQSxDQUFDO0FBRUY7SUFJSSxtQkFBWSxVQUFrQjtRQUY5QixjQUFTLEdBQWEsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxpQ0FBYSxHQUFwQjtRQUFBLGlCQXlCQztRQXhCRyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQXFCLENBQUM7UUFDOUUsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBRSxlQUFlO1FBRTFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN4QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBcUIsQ0FBQztZQUNyRSxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDOUIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQWtCLENBQUM7WUFDNUQsS0FBSyxDQUFDLFdBQVcsR0FBTSxLQUFLLGtCQUFlLENBQUM7WUFDNUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx1QkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sWUFBSSxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVPLHNDQUFrQixHQUExQixVQUEyQixLQUFhO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFHTywrQkFBVyxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBQ00sb0NBQWdCLEdBQXZCLFVBQXdCLEdBQVc7UUFDL0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO0lBQzVELENBQUM7SUFFTCxnQkFBQztBQUFELENBQUMsQUF0REQsSUFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQYWdlSnNDbGFzcyB7XHJcbiAgICBDYXJOb0xpc3Q6IENhck5vTGlzdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLkNhck5vTGlzdCA9IG5ldyBDYXJOb0xpc3QoXCJzZWxlY3RlZC1jYXJub1wiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIENhck5vTGlzdCB7XHJcbiAgICBTaG93VGFnTmFtZTogc3RyaW5nO1xyXG4gICAgQ2FyTm9MaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpc3RIdG1sSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuU2hvd1RhZ05hbWUgPSBsaXN0SHRtbElkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93Q2FyTm9MaXN0KCkge1xyXG4gICAgICAgIGxldCBzaG93VWxUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNob3dUYWdOYW1lKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgIHNob3dVbFRhZy5pbm5lckhUTUwgPSBcIlwiOyAgLy8g5LiA56iudWwgdGFn5riF56m65pa55rOVXHJcblxyXG4gICAgICAgIHRoaXMuQ2FyTm9MaXN0LmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgICBpbnB1dFRhZy5uYW1lID0gXCJQb3N0Q2FyTm9cIjtcclxuICAgICAgICAgICAgaW5wdXRUYWcudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaW5wdXRUYWcudHlwZSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGlEZWxUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgICAgICAgICAgaURlbFRhZy5jbGFzc0xpc3QuYWRkKFwiZmFzXCIsIFwiZmEtdGltZXMtY2lyY2xlXCIpO1xyXG4gICAgICAgICAgICBpRGVsVGFnLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBpRGVsVGFnLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgaURlbFRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtdm9lQ2FyTm9Qcm9jZXNzKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxpVGFnLnRleHRDb250ZW50ID0gYCR7dmFsdWV9IFxcdTAwQTBcXHUwMEEwYDtcclxuICAgICAgICAgICAgbGlUYWcuYXBwZW5kQ2hpbGQoaW5wdXRUYWcpO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpRGVsVGFnKTtcclxuICAgICAgICAgICAgc2hvd1VsVGFnLmFwcGVuZENoaWxkKGxpVGFnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDni4DmhYvpoa/npLpcclxuICAgICAgICB0aGlzLlNob3dDYXJOb01lc3NhZ2UodGhpcy5DYXJOb0xpc3QubGVuZ3RoID09PSAwID8gXCLnhKHnm7jpl5zou4rniYxcIiA6IGDlt7LliqDlhaUke3RoaXMuQ2FyTm9MaXN0Lmxlbmd0aH0g6aCFYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZW12b2VDYXJOb1Byb2Nlc3MoY2FyTm86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuUmVtdm9lQ2FyTm8oY2FyTm8pO1xyXG4gICAgICAgIHRoaXMuU2hvd0Nhck5vTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIFJlbXZvZUNhck5vKGNhck5vOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLkNhck5vTGlzdC5zcGxpY2UodGhpcy5DYXJOb0xpc3QuaW5kZXhPZihjYXJObyksIDEpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFwcGVuZFRvTGlzdChjYXJObzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGNhck5vICYmICF0aGlzLkNhck5vTGlzdC5pbmNsdWRlcyhjYXJObykpIHtcclxuICAgICAgICAgICAgdGhpcy5DYXJOb0xpc3QucHVzaChjYXJOby50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2hvd0Nhck5vTWVzc2FnZShtc2c6IHN0cmluZykge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2Fybm8tbWVzc2FnZVwiKS5pbm5lckhUTUwgPSBtc2dcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==