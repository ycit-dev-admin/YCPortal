﻿type Person = {
    email: string;
    rating: number;
};


/* Page Initialize */
// Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4',
    placeholder: "請選擇項目"
})

// jquery dialog
$("#dialog-confirm").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    autoOpen: false,
    buttons: {
        "儲存": function () {
            $('#creaet-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
})

class PageOfSysConfigEditCustomerInfo {
    // Base Porperites
    readonly BaseUrl: string;

    // For Post


    // References  
    private CustomerAPI: CustomerAPIClass;
    public SysConfigPageHelper: SysConfigPageHelper;
    public testQQ: Map<string, Person> = new Map<string, Person>();
    public testQQ2: Map<string, { haha: string, cc: number }> = new Map<string, { haha: string, cc: number }>();
    public testQQ3: [{ haha: string, cc: number }] = [{}] as [{ haha: string, cc: number }];
    public testQQ4: [{ haha: string, cc: number }] = [null];


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
        this.testQQ.set("wow", { email: "abcd", rating: 500 });
        this.testQQ.set("wow2", { email: "abcdefg", rating: 501 });
        this.testQQ2.set("wow3", { haha: "456", cc: 999 });
        this.testQQ2.set("wow3", { haha: "456", cc: 999 });
        let abc = { haha: "abc", cc: 456 };
        let abc2 = { haha: "abc7", cc: 4567 };
        this.testQQ3.push(abc);
        this.testQQ3.push(abc2);
        this.testQQ4.push(abc2);

        console.log(`wow ${this.testQQ3.filter(value => Object.keys(value).length !== 0).length}`);

    }





    readonly HasChange: boolean;


    // Page  Dom
    // Field Doms   
    public DomOfCarGuid: HTMLInputElement = document.getElementById('CarGuid') as HTMLInputElement;
    public DomOfCustomerGuid: HTMLInputElement = document.getElementById('CustomerGuid') as HTMLInputElement;
    public DomOfEditCompanyName = document.getElementById('EditCompanyName') as HTMLInputElement;
    public DomOfShowEditCompanyName = document.getElementById('show-edit-companyName') as HTMLSpanElement;


    public EvenShow_JqUlDom: JQuery<HTMLUListElement> = $('#evenProductLs');
    public OddLShow_JqUlDom: JQuery<HTMLUListElement> = $('#oddProductLs');
    public UsProdItem_JqSelectDom: JQuery<HTMLSelectElement> = $('#user-select-proditem');
    public TotalProdItemInfo_JqSelectDom: JQuery<HTMLHeadingElement> = $('#total');
    public ingredientPost_JqDivDom: JQuery<HTMLDivElement> = $('#ingredientPost');
    public CustomerId_JqSelectDom: JQuery<HTMLSelectElement> = $('#VE_PurchaseWeightNote_CustomerId');
    public CustomerName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CustomerName');
    public CarNoId_JqSelectDom: JQuery<HTMLElement> = $('#VE_PurchaseWeightNote_CarNoId');
    public CarName_JqInputDom: JQuery<HTMLInputElement> = $('#VE_PurchaseWeightNote_CarNo');
    public FullWeight_Dom = $('#VE_PurchaseWeightNote_FullWeight').get(0) as HTMLInputElement;
    public DefectiveWeight_DOM = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0) as HTMLInputElement;
    public UnitPrice_DOM = $('#VE_PurchaseWeightNote_UnitPrice').get(0) as HTMLInputElement;
    public TraficUnitPrice_DOM = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0) as HTMLInputElement;
    public ThirdWeightFee_DOM = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0) as HTMLInputElement;
    public HasTaxList = $(".ishas_tax").get() as HTMLInputElement[];
    public DisplayFinalPrice_DOM = $('#show_final_price').get(0) as HTMLHeadingElement;
    public DisplayWeightPrice_DOM = $('#show_weight_price').get(0) as HTMLDivElement;
    public DispalyTraficPrice_DOM = $('#show_trafic_price').get(0) as HTMLDivElement;
    public ActualPrice_DOM = $('#VE_PurchaseWeightNote_ActualPrice').get(0) as HTMLInputElement;



    // Page Functions
    public Test2Func() {
        const modalUrl = `${this.BaseUrl}/SysConfig/CarNo/_GetCarNoInfoModel`;
        return $.get(modalUrl, { carGUID: encodeURIComponent(""), isOnlyQuery: encodeURIComponent(true) }).done(function (data) {
            $("div[name=model-temp-carnoinfo]").html(data);
            var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
            modalObj.modal('show');

            //var modalObj = $("div[name=modal-temp-productId]").find('#modal-productId-selected');
            //var jTableObj = modalObj.find("#productId-table").DataTable({
            //    dom: 'Blfrtip',
            //    buttons: [
            //        {
            //            text: '選擇完畢',
            //            className: "btn btn-primary",
            //            action: function (e, dt, node, config) {
            //                $.each(jTableObj.rows('.selected').data(), function (index, item) {
            //                    if ($.inArray(item[0], thisObj.ProductList) === -1) {
            //                        thisObj.ProductList.push(item[0]);
            //                    };
            //                });
            //                modalObj.modal('hide');
            //            }
            //        }
            //    ],
            //    select: {
            //        style: 'multi'
            //    }
            //});

        });
    }

    public Test3Func() {
        const modalUrl = `${this.BaseUrl}/SysConfig/Customer/_GetCarNoInfoModel`;

        return $.get(modalUrl).done(function (data) {
            $("div[name=model-temp-carnoinfo]").html(data);
            var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
            modalObj.modal('show');
        });
    }




    public CustomerId_Change() {
        const thisObj = this;

        this.CustomerName_JqInputDom.val("");
        this.CarName_JqInputDom.val(""); // 車牌名稱清空

        if (this.CustomerId_JqSelectDom &&
            this.CustomerId_JqSelectDom.find(':selected').val() === "0") {  // 新客戶
            this.CustomerName_JqInputDom.removeAttr("readonly");
            thisObj.ReSetCarNoItems([]);
        } else {
            this.CustomerName_JqInputDom.attr("readonly", "readonly");
            this.CustomerName_JqInputDom.val(this.CustomerId_JqSelectDom.find(':selected').text());
            let funcRs = this.CustomerAPI.GetCarNoItemsBy(this.CustomerId_JqSelectDom.find(':selected').val().toString());
            $.when(funcRs).then(function (data) {
                thisObj.ReSetCarNoItems(data);
            });
        }
    }

    public CarNoId_Change() {
        this.CarName_JqInputDom.val("");
        if (this.CarNoId_JqSelectDom &&
            this.CarNoId_JqSelectDom.find(':selected').val() === "0") {
            this.CarName_JqInputDom.removeAttr("readonly");
        } else {
            this.CarName_JqInputDom.attr("readonly", "readonly");
            this.CarName_JqInputDom.val(this.CarNoId_JqSelectDom.find(':selected').text());
        }
    }





    /* Page Function */
    private ReSetCarNoItems(dataObjLs) {
        const thisPagObj = this;
        thisPagObj.CarNoId_JqSelectDom.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        thisPagObj.CarNoId_JqSelectDom.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.id, false, false);
            thisPagObj.CarNoId_JqSelectDom.append(newOption);
        });
    }


    public PageEventInit() {
        const curObj = this;



        /* Page Events */
        // 表單建立
        $('#form_create').on('click', function () {
            $("#dialog-confirm").dialog("open");
        })


        $('#EditCompanyName').on('keyup', function () {
            if (curObj.DomOfEditCompanyName.value.length > 0) {
                curObj.DomOfShowEditCompanyName.innerHTML = `=> 變更為 : ${curObj.DomOfEditCompanyName.value}`;
                curObj.DomOfShowEditCompanyName.style.color = "red";
            } else {
                curObj.DomOfShowEditCompanyName.innerHTML = ""
            }
        })

        // 車牌編輯
        $('#has-carno').on('click', `button`, function () {
            // curPage.Test2Func();
            let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
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


        $("#add-carno").on("click", function (event) {
            let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel();
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
    }

}





