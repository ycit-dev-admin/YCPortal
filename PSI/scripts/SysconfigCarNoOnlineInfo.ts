class OnlineInfoPage {
    // Porperites
    readonly BaseUrl: string;
    readonly HasChange: boolean;


    // Page  Dom
    public EditCompanyName_Dom = document.getElementById('EditCompanyName') as HTMLInputElement;
    public ShowEditCompanyName_Dom = document.getElementById('show-edit-companyName') as HTMLSpanElement;


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

    // WebAPI
    private SysConfigPageHelper: SysConfigPage;


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPage(this.BaseUrl);
    }


    /* Action */
    public EditCompanyName_Keyup() {
        if (this.EditCompanyName_Dom.value.length > 0) {
            this.ShowEditCompanyName_Dom.innerHTML = `=> 變更為 : ${this.EditCompanyName_Dom.value}`;
            this.ShowEditCompanyName_Dom.style.color = "red";
        } else {
            this.ShowEditCompanyName_Dom.innerHTML = ""
        }
    }

    public Test2Func() {
        const modalUrl = `${this.BaseUrl}/SysConfig/Customer/_GetCarNoInfoModel`;

        return $.get(modalUrl, { carGUID: encodeURIComponent("") }).done(function (data) {
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

}

