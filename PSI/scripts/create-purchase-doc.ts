$('.select2bs4').on('change', function () {
    /*$('li[name="abc"]').remove();*/

    //$('#evenProductLs li').remove();
    // $('#oddnProductLs li').remove();



    ShowList()



    //$.each($('.select2bs4').find(':selected'), function (index, value) {



    //    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    //    AppendToShowList($(this));
    //    /*var val = $.parseJSON(value);*/
    //})
    //console.log($('.select2bs4:checked'));
    //alert($(".select2bs4:checked").val());
});

function AppendToShowList(prodItem: JQuery<HTMLElement>) {

    const iMinusTag = document.createElement("i");
    iMinusTag.classList.add("fas");
    iMinusTag.classList.add("fa-minus-circle");
    const iPlusTag = document.createElement("i");
    iPlusTag.classList.add("fas");
    iPlusTag.classList.add("fa-plus-circle");
    const spanTag = document.createElement("span") as HTMLSpanElement;
    spanTag.innerHTML = "50%";

    console.log(prodItem.val().toString());
    const liTag = document.createElement("li") as HTMLLIElement;
    liTag.textContent = `${prodItem.val()}_${prodItem.text()}_Wow2`;
    liTag.dataset.value = prodItem.val().toString();
    liTag.appendChild(iMinusTag);
    liTag.appendChild(iPlusTag);
    liTag.appendChild(spanTag);

    const showList = document.getElementById("evenProductLs");
    showList?.appendChild(liTag);

    // Assign show ul list


    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    /*var val = $.parseJSON(value);*/

    // return number * number;
};
function ShowList() {
    // 畫面所選
    let selectLs: string[] = $('.select2bs4').find(':selected').map(function () { return $(this).val().toString() }).toArray();

    // 準備要Show
    let allProdLs: string[] = [];
    let evenLs = $('#evenProductLs li').map(function () { return $(this).data('value').toString() }).toArray();
    // let oddLs = $('#oddProductLs li').map(function () { return $(this).data('value').toString() }).toArray();
    allProdLs = allProdLs.concat(evenLs);

    //allProdLs2.concat($('#evenProductLs li').map(function () { return $(this).data('value').toString() }).get());
    // allProdLs.concat($('#oddnProductLs li').map(function () { return $(this).data('value'); }).toArray());


    // 欲保留項目
    let wantSave = allProdLs.filter((e) => {
        return selectLs.indexOf(e) > -1
    });

    // 欲新增項目
    let wantAdd = selectLs.filter((e) => {
        return allProdLs.indexOf(e) === -1
    });



    $.each($('.select2bs4').find(':selected'), function (index, element) {

        let thisObj = $(this);
        let qqcc = $(this).val().toString();
        let hahaqq = wantSave.indexOf($(this).val().toString());
        // 不再保留項目的就刪除
        if (wantSave.indexOf($(this).val().toString()) === -1) {
            $.each($('#evenProductLs li'), function (index, element) {
                let isRemove = element.dataset.value === thisObj.val().toString();
                if (isRemove)
                    element.remove();
            }
            );
        }

        // 要新增的就新增
        if (wantAdd.indexOf($(this).val().toString()) > -1) {
            AppendToShowList($(this));
        }


        // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
        /*var val = $.parseJSON(value);*/
    })







    //const iMinusTag = document.createElement("i");
    //iMinusTag.classList.add("fas");
    //iMinusTag.classList.add("fa-minus-circle");
    //const iPlusTag = document.createElement("i");
    //iPlusTag.classList.add("fas");
    //iPlusTag.classList.add("fa-plus-circle");
    //const spanTag = document.createElement("span") as HTMLSpanElement;
    //spanTag.innerHTML = "50%";

    //console.log(prodItem.val().toString());
    //const liTag = document.createElement("li") as HTMLLIElement;
    //liTag.textContent = `${prodItem.val()}_${prodItem.text()}`;
    //liTag.dataset.vv = prodItem.val().toString();
    //liTag.appendChild(iMinusTag);
    //liTag.appendChild(iPlusTag);
    //liTag.appendChild(spanTag);

    //const showList = document.getElementById("evenProductLs");
    //showList?.appendChild(liTag);

    // Assign show ul list


    // $('#testLs').append('<li>' + $(this).val() + "_" + $(this).text() + '<i class="fas fa-minus-circle"></i><i class="fas fa-plus-circle"></i></li>');
    /*var val = $.parseJSON(value);*/

    // return number * number;
}






