class SalesWeightNoteUpdateActualData {
    // Base Porperites
    readonly BaseUrl: string;
   
    // For Post


    // References  
    private SalesPriceAPI: SalesPriceAPIClass;
    private CustomerContractAPI: CustomerContractAPIClass;



    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.SalesPriceAPI = new SalesPriceAPIClass(this.BaseUrl);
        this.CustomerContractAPI = new CustomerContractAPIClass(this.BaseUrl);
    }

    /* Field Doms */
    // this
    public DomOfUserSelectProditem = document.getElementById('InspectMethord') as HTMLSelectElement;




    public PagePluginInit() {
        const curObj = this;
        /* Page Initialize */
        // Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4',
            placeholder: "請選擇"
        })
       



        // jquery dialog
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            autoOpen: false,
            buttons: {
                "送出": function () {
                    $('#create-form').submit();
                    $(this).dialog("close");
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        })
    }

    public PageEventInit() {
        const curObj = this;

        //$(curObj.DomOfUnitPrice).trigger("input");

        ///* Page Events */
        //// 表單建立
        //$(curObj.DomOfFormCreate).on('input', function () {
        //    $("#dialog-confirm").dialog("open");
        //})

        

    }

    public PageValidateInit() {
       
    }


    /* Class Variable */

    /* Page Function */
    

    private CaculateAllFee() {
        const thisObj = this;


    }



}





