var curPage = new PageOfSysConfigEditCustomerInfo("");
/* Page Events */
// 表單建立
$('#form_create').on('click', function () {
    // $("#dialog-confirm").dialog("open");
});
$('#EditCompanyName').on('keyup', function () {
    curPage.EditCompanyName_Keyup();
});
// 車牌編輯
$('#has-carno').on('click', "button", curPage, function () {
    // curPage.Test2Func();
    var pageRs = curPage.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
    $.when(pageRs).then(function (data) {
        $("div[name=model-temp-carnoinfo]").html(data);
        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        modalObj.modal('show');
        // modalObj.find("#testqqc").on('click', '.tr-row',
        modalObj.find("#testqqc").on('click', function () {
            modalObj.modal('hide');
        });
    });
});
// 新增車牌
//$('#add-carno').on('click', function () {
//    pageMain.Test3Func();
//})
//$('#add-carno').on('click',["Wayne","abc"], function (event,myName) {
//    alert(`WoW => ${event.data} & ${myName}`);
//})
$("#add-carno").on("click", curPage, function (event) {
    var pageRs = curPage.SysConfigPageHelper.GetCarNoInfoModel();
    $.when(pageRs).then(function (data) {
        $("div[name=model-temp-carnoinfo]").html(data);
        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        modalObj.modal('show');
        // modalObj.find("#testqqc").on('click', '.tr-row',
        modalObj.find("#testqqc").on('click', function () {
            modalObj.modal('hide');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mb0V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mb0V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLE9BQU8sR0FBRyxJQUFJLCtCQUErQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXhELGlCQUFpQjtBQUNqQixPQUFPO0FBQ1AsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7SUFDMUIsdUNBQXVDO0FBQzNDLENBQUMsQ0FBQyxDQUFBO0FBR0YsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtJQUM5QixPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQTtBQUVGLE9BQU87QUFDUCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQzNDLHVCQUF1QjtJQUN2QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNGLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTtRQUM5QixDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHdkIsbURBQW1EO1FBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFDaEM7WUFDSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQTtBQUVGLE9BQU87QUFDUCwyQ0FBMkM7QUFDM0MsMkJBQTJCO0FBQzNCLElBQUk7QUFDSix1RUFBdUU7QUFDdkUsZ0RBQWdEO0FBQ2hELElBQUk7QUFHSixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxLQUFLO0lBQ2hELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTtRQUM5QixDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHdkIsbURBQW1EO1FBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFDaEM7WUFDSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGN1clBhZ2UgPSBuZXcgUGFnZU9mU3lzQ29uZmlnRWRpdEN1c3RvbWVySW5mbyhcIlwiKTtcclxuXHJcbi8qIFBhZ2UgRXZlbnRzICovXHJcbi8vIOihqOWWruW7uueri1xyXG4kKCcjZm9ybV9jcmVhdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAkKFwiI2RpYWxvZy1jb25maXJtXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbn0pXHJcblxyXG5cclxuJCgnI0VkaXRDb21wYW55TmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGN1clBhZ2UuRWRpdENvbXBhbnlOYW1lX0tleXVwKCk7XHJcbn0pXHJcblxyXG4vLyDou4rniYznt6jovK9cclxuJCgnI2hhcy1jYXJubycpLm9uKCdjbGljaycsIGBidXR0b25gLCBjdXJQYWdlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBjdXJQYWdlLlRlc3QyRnVuYygpO1xyXG4gICAgbGV0IHBhZ2VScyA9IGN1clBhZ2UuU3lzQ29uZmlnUGFnZUhlbHBlci5HZXRDYXJOb0luZm9Nb2RlbCgkKHRoaXMpLnZhbCgpLnRvU3RyaW5nKCksIHRydWUpO1xyXG4gICAgJC53aGVuKHBhZ2VScykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQoXCJkaXZbbmFtZT1tb2RlbC10ZW1wLWNhcm5vaW5mb11cIikuaHRtbChkYXRhKTtcclxuICAgICAgICB2YXIgbW9kYWxPYmogPSAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1jYXJub2luZm9dXCIpLmZpbmQoJyNteU1vZGFsJyk7XHJcbiAgICAgICAgbW9kYWxPYmoubW9kYWwoJ3Nob3cnKTtcclxuXHJcblxyXG4gICAgICAgIC8vIG1vZGFsT2JqLmZpbmQoXCIjdGVzdHFxY1wiKS5vbignY2xpY2snLCAnLnRyLXJvdycsXHJcbiAgICAgICAgbW9kYWxPYmouZmluZChcIiN0ZXN0cXFjXCIpLm9uKCdjbGljaycsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59KVxyXG5cclxuLy8g5paw5aKe6LuK54mMXHJcbi8vJCgnI2FkZC1jYXJubycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgcGFnZU1haW4uVGVzdDNGdW5jKCk7XHJcbi8vfSlcclxuLy8kKCcjYWRkLWNhcm5vJykub24oJ2NsaWNrJyxbXCJXYXluZVwiLFwiYWJjXCJdLCBmdW5jdGlvbiAoZXZlbnQsbXlOYW1lKSB7XHJcbi8vICAgIGFsZXJ0KGBXb1cgPT4gJHtldmVudC5kYXRhfSAmICR7bXlOYW1lfWApO1xyXG4vL30pXHJcblxyXG5cclxuJChcIiNhZGQtY2Fybm9cIikub24oXCJjbGlja1wiLCBjdXJQYWdlLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGxldCBwYWdlUnMgPSBjdXJQYWdlLlN5c0NvbmZpZ1BhZ2VIZWxwZXIuR2V0Q2FyTm9JbmZvTW9kZWwoKTtcclxuICAgICQud2hlbihwYWdlUnMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKFwiZGl2W25hbWU9bW9kZWwtdGVtcC1jYXJub2luZm9dXCIpLmh0bWwoZGF0YSk7XHJcbiAgICAgICAgdmFyIG1vZGFsT2JqID0gJChcImRpdltuYW1lPW1vZGVsLXRlbXAtY2Fybm9pbmZvXVwiKS5maW5kKCcjbXlNb2RhbCcpO1xyXG4gICAgICAgIG1vZGFsT2JqLm1vZGFsKCdzaG93Jyk7XHJcblxyXG5cclxuICAgICAgICAvLyBtb2RhbE9iai5maW5kKFwiI3Rlc3RxcWNcIikub24oJ2NsaWNrJywgJy50ci1yb3cnLFxyXG4gICAgICAgIG1vZGFsT2JqLmZpbmQoXCIjdGVzdHFxY1wiKS5vbignY2xpY2snLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbE9iai5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7Il19