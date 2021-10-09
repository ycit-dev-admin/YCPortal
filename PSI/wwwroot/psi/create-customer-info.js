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
        if (!this.CarNoList.includes(carNo)) {
            this.CarNoList.push(carNo);
        }
    };
    CarNoList.prototype.ShowCarNoMessage = function (msg) {
        document.getElementById("carno-message").innerHTML = msg;
    };
    return CarNoList;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWN1c3RvbWVyLWluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NyZWF0ZS1jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBR0k7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFBQSxDQUFDO0FBRUY7SUFJSSxtQkFBWSxVQUFrQjtRQUY5QixjQUFTLEdBQWEsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxpQ0FBYSxHQUFwQjtRQUFBLGlCQXlCQztRQXhCRyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQXFCLENBQUM7UUFDOUUsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBRSxlQUFlO1FBRTFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN4QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBcUIsQ0FBQztZQUNyRSxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDOUIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQWtCLENBQUM7WUFDNUQsS0FBSyxDQUFDLFdBQVcsR0FBTSxLQUFLLGtCQUFlLENBQUM7WUFDNUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx1QkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sWUFBSSxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVPLHNDQUFrQixHQUExQixVQUEyQixLQUFhO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFHTywrQkFBVyxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFDTSxvQ0FBZ0IsR0FBdkIsVUFBd0IsR0FBVztRQUMvQixRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7SUFDNUQsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBhZ2VKc0NsYXNzIHtcclxuICAgIENhck5vTGlzdDogQ2FyTm9MaXN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuQ2FyTm9MaXN0ID0gbmV3IENhck5vTGlzdChcInNlbGVjdGVkLWNhcm5vXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY2xhc3MgQ2FyTm9MaXN0IHtcclxuICAgIFNob3dUYWdOYW1lOiBzdHJpbmc7XHJcbiAgICBDYXJOb0xpc3Q6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobGlzdEh0bWxJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5TaG93VGFnTmFtZSA9IGxpc3RIdG1sSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dDYXJOb0xpc3QoKSB7XHJcbiAgICAgICAgbGV0IHNob3dVbFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU2hvd1RhZ05hbWUpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICAgICAgc2hvd1VsVGFnLmlubmVySFRNTCA9IFwiXCI7ICAvLyDkuIDnqK51bCB0YWfmuIXnqbrmlrnms5VcclxuXHJcbiAgICAgICAgdGhpcy5DYXJOb0xpc3QuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlucHV0VGFnLm5hbWUgPSBcIlBvc3RDYXJOb1wiO1xyXG4gICAgICAgICAgICBpbnB1dFRhZy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBpbnB1dFRhZy50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgY29uc3QgaURlbFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgICAgICAgICBpRGVsVGFnLmNsYXNzTGlzdC5hZGQoXCJmYXNcIiwgXCJmYS10aW1lcy1jaXJjbGVcIik7XHJcbiAgICAgICAgICAgIGlEZWxUYWcuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGlEZWxUYWcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICBpRGVsVGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZW12b2VDYXJOb1Byb2Nlc3ModmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgbGlUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikgYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgbGlUYWcudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX0gXFx1MDBBMFxcdTAwQTBgO1xyXG4gICAgICAgICAgICBsaVRhZy5hcHBlbmRDaGlsZChpbnB1dFRhZyk7XHJcbiAgICAgICAgICAgIGxpVGFnLmFwcGVuZENoaWxkKGlEZWxUYWcpO1xyXG4gICAgICAgICAgICBzaG93VWxUYWcuYXBwZW5kQ2hpbGQobGlUYWcpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOeLgOaFi+mhr+ekulxyXG4gICAgICAgIHRoaXMuU2hvd0Nhck5vTWVzc2FnZSh0aGlzLkNhck5vTGlzdC5sZW5ndGggPT09IDAgPyBcIueEoeebuOmXnOi7iueJjFwiIDogYOW3suWKoOWFpSR7dGhpcy5DYXJOb0xpc3QubGVuZ3RofSDpoIVgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlbXZvZUNhck5vUHJvY2VzcyhjYXJObzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5SZW12b2VDYXJObyhjYXJObyk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2FyTm9MaXN0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgUmVtdm9lQ2FyTm8oY2FyTm86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuQ2FyTm9MaXN0LnNwbGljZSh0aGlzLkNhck5vTGlzdC5pbmRleE9mKGNhck5vKSwgMSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQXBwZW5kVG9MaXN0KGNhck5vOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuQ2FyTm9MaXN0LmluY2x1ZGVzKGNhck5vKSkge1xyXG4gICAgICAgICAgICB0aGlzLkNhck5vTGlzdC5wdXNoKGNhck5vKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2hvd0Nhck5vTWVzc2FnZShtc2c6IHN0cmluZykge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2Fybm8tbWVzc2FnZVwiKS5pbm5lckhUTUwgPSBtc2dcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==