/* Page Initialize */
var SysConfigProductOnlineInfo = /** @class */ (function () {
    function SysConfigProductOnlineInfo(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        /* Field Doms */
        this.DomOfAddProductItem = document.getElementById("add-productItem");
        this.DomOfQuerryBtn = document.getElementsByName("query-btn");
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }
    /* Class Variable */
    /* Page Function */
    SysConfigProductOnlineInfo.prototype.SetChageStatus = function (result) {
        //  this.DomOfIsChanged.value = result.toString();
    };
    SysConfigProductOnlineInfo.prototype.PageEventInit = function () {
        var curObj = this;
        /* Page Events */
        $(curObj.DomOfAddProductItem).on('click', function () {
            var pageRs = curObj.SysConfigPageHelper.GetProductItemModel("");
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-prodItem]").html(data);
                var modalObj = $("div[name=model-temp-prodItem]").find('#myModal');
                modalObj.modal('show');
                $.getScript("/psi/SysConfigProductOnlineInfoValidate.js"); // 載入檢核js
                modalObj.find("#PsiType").select2({
                    theme: 'bootstrap4',
                    placeholder: "請選擇"
                });
                modalObj.find("#product-info-action").on('click', function () {
                    // modalObj.modal('hide');
                    // modalObj.find('#CreateCarNoInfo').submit();
                    modalObj.find('#product-info-form').submit();
                });
            });
        });
        $(curObj.DomOfQuerryBtn).on("click", function (event) {
            var pageRs = curObj.SysConfigPageHelper.GetProductItemModel($(this).val().toString());
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-prodItem]").html(data);
                var modalObj = $("div[name=model-temp-prodItem]").find('#myModal');
                modalObj.modal('show');
                $.getScript("/psi/SysConfigProductOnlineInfoValidate.js"); // 載入檢核js
                modalObj.find("#PsiType").select2({
                    theme: 'bootstrap4',
                    placeholder: "請選擇"
                });
                modalObj.find("#product-info-action").on('click', function () {
                    // modalObj.modal('hide');
                    // modalObj.find('#CreateCarNoInfo').submit();
                    modalObj.find('#product-info-form').submit();
                });
            });
        });
    };
    return SysConfigProductOnlineInfo;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ29uZmlnUHJvZHVjdE9ubGluZUluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL1N5c0NvbmZpZ1Byb2R1Y3RPbmxpbmVJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQjtBQUdyQjtJQVdJLG9DQUFZLE9BQW9CO1FBQXBCLHdCQUFBLEVBQUEsWUFBb0I7UUFLaEMsZ0JBQWdCO1FBQ1Isd0JBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBc0IsQ0FBQztRQUN0RixtQkFBYyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQWtDLENBQUM7UUFOOUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFTRCxvQkFBb0I7SUFFcEIsbUJBQW1CO0lBQ1osbURBQWMsR0FBckIsVUFBc0IsTUFBZTtRQUNqQyxrREFBa0Q7SUFDdEQsQ0FBQztJQUlNLGtEQUFhLEdBQXBCO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBSXBCLGlCQUFpQjtRQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJO2dCQUM5QixDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFdkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFFcEUsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQzlCLEtBQUssRUFBRSxZQUFZO29CQUNuQixXQUFXLEVBQUUsS0FBSztpQkFDckIsQ0FBQyxDQUFBO2dCQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUM1QztvQkFDSSwwQkFBMEI7b0JBQzFCLDhDQUE4QztvQkFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztZQUVYLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7UUFJRixDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxLQUFLO1lBQ2hELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUk7Z0JBQzlCLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV2QixDQUFDLENBQUMsU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUVwRSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDOUIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFdBQVcsRUFBRSxLQUFLO2lCQUNyQixDQUFDLENBQUE7Z0JBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQzVDO29CQUNJLDBCQUEwQjtvQkFDMUIsOENBQThDO29CQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pELENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxpQ0FBQztBQUFELENBQUMsQUF4RkQsSUF3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBQYWdlIEluaXRpYWxpemUgKi9cclxuXHJcblxyXG5jbGFzcyBTeXNDb25maWdQcm9kdWN0T25saW5lSW5mbyB7XHJcbiAgICAvLyBCYXNlIFBvcnBlcml0ZXNcclxuICAgIHJlYWRvbmx5IEJhc2VVcmw6IHN0cmluZztcclxuXHJcbiAgICAvLyBGb3IgUG9zdFxyXG5cclxuXHJcbiAgICAvLyBSZWZlcmVuY2VzICBcclxuICAgIHB1YmxpYyBTeXNDb25maWdQYWdlSGVscGVyOiBTeXNDb25maWdQYWdlSGVscGVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5CYXNlVXJsID0gYmFzZVVybDtcclxuICAgICAgICB0aGlzLlN5c0NvbmZpZ1BhZ2VIZWxwZXIgPSBuZXcgU3lzQ29uZmlnUGFnZUhlbHBlcih0aGlzLkJhc2VVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEZpZWxkIERvbXMgKi9cclxuICAgIHByaXZhdGUgRG9tT2ZBZGRQcm9kdWN0SXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2R1Y3RJdGVtXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBEb21PZlF1ZXJyeUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwicXVlcnktYnRuXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qIENsYXNzIFZhcmlhYmxlICovXHJcblxyXG4gICAgLyogUGFnZSBGdW5jdGlvbiAqL1xyXG4gICAgcHVibGljIFNldENoYWdlU3RhdHVzKHJlc3VsdDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIC8vICB0aGlzLkRvbU9mSXNDaGFuZ2VkLnZhbHVlID0gcmVzdWx0LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgUGFnZUV2ZW50SW5pdCgpIHtcclxuICAgICAgICBjb25zdCBjdXJPYmogPSB0aGlzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8qIFBhZ2UgRXZlbnRzICovXHJcbiAgICAgICAgJChjdXJPYmouRG9tT2ZBZGRQcm9kdWN0SXRlbSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgcGFnZVJzID0gY3VyT2JqLlN5c0NvbmZpZ1BhZ2VIZWxwZXIuR2V0UHJvZHVjdEl0ZW1Nb2RlbChcIlwiKTtcclxuICAgICAgICAgICAgJC53aGVuKHBhZ2VScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcImRpdltuYW1lPW1vZGVsLXRlbXAtcHJvZEl0ZW1dXCIpLmh0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1wcm9kSXRlbV1cIikuZmluZCgnI215TW9kYWwnKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5nZXRTY3JpcHQoXCIvcHNpL1N5c0NvbmZpZ1Byb2R1Y3RPbmxpbmVJbmZvVmFsaWRhdGUuanNcIik7IC8vIOi8ieWFpeaqouaguGpzXHJcblxyXG4gICAgICAgICAgICAgICAgbW9kYWxPYmouZmluZChcIiNQc2lUeXBlXCIpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbW9kYWxPYmouZmluZChcIiNwcm9kdWN0LWluZm8tYWN0aW9uXCIpLm9uKCdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbE9iai5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbE9iai5maW5kKCcjQ3JlYXRlQ2FyTm9JbmZvJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsT2JqLmZpbmQoJyNwcm9kdWN0LWluZm8tZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgICAkKGN1ck9iai5Eb21PZlF1ZXJyeUJ0bikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VScyA9IGN1ck9iai5TeXNDb25maWdQYWdlSGVscGVyLkdldFByb2R1Y3RJdGVtTW9kZWwoJCh0aGlzKS52YWwoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgJC53aGVuKHBhZ2VScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcImRpdltuYW1lPW1vZGVsLXRlbXAtcHJvZEl0ZW1dXCIpLmh0bWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1wcm9kSXRlbV1cIikuZmluZCgnI215TW9kYWwnKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5nZXRTY3JpcHQoXCIvcHNpL1N5c0NvbmZpZ1Byb2R1Y3RPbmxpbmVJbmZvVmFsaWRhdGUuanNcIik7IC8vIOi8ieWFpeaqouaguGpzXHJcblxyXG4gICAgICAgICAgICAgICAgbW9kYWxPYmouZmluZChcIiNQc2lUeXBlXCIpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi6KuL6YG45pOHXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgbW9kYWxPYmouZmluZChcIiNwcm9kdWN0LWluZm8tYWN0aW9uXCIpLm9uKCdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbE9iai5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbE9iai5maW5kKCcjQ3JlYXRlQ2FyTm9JbmZvJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsT2JqLmZpbmQoJyNwcm9kdWN0LWluZm8tZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=