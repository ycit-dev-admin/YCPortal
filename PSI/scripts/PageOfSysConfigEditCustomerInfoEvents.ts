const curPage = new PageOfSysConfigEditCustomerInfo("");

/* Page Events */
// 表單建立
$('#form_create').on('click', function () {
    // $("#dialog-confirm").dialog("open");
})


$('#EditCompanyName').on('keyup', function () {
    curPage.EditCompanyName_Keyup();
})

// 車牌編輯
$('#has-carno').on('click', `button`, curPage, function () {
    // curPage.Test2Func();
    let pageRs = curPage.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
    $.when(pageRs).then(function (data) {
        $("div[name=model-temp-carnoinfo]").html(data);
        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        modalObj.modal('show');


        // modalObj.find("#testqqc").on('click', '.tr-row',
        modalObj.find("#testqqc").on('click',
            function () {
                modalObj.modal('hide');
            });

    });
})

// 新增車牌
//$('#add-carno').on('click', function () {
//    pageMain.Test3Func();
//})
//$('#add-carno').on('click',["Wayne","abc"], function (event,myName) {
//    alert(`WoW => ${event.data} & ${myName}`);
//})


$("#add-carno").on("click", curPage, function (event) {
    let pageRs = curPage.SysConfigPageHelper.GetCarNoInfoModel();
    $.when(pageRs).then(function (data) {
        $("div[name=model-temp-carnoinfo]").html(data);
        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        modalObj.modal('show');


        // modalObj.find("#testqqc").on('click', '.tr-row',
        modalObj.find("#testqqc").on('click',
            function () {
                modalObj.modal('hide');
            });

    });
});