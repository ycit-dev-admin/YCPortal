/* Page Initialize */


class SysConfigProductOnlineInfo {
    // Base Porperites
    readonly BaseUrl: string;

    // For Post


    // References  
    public SysConfigPageHelper: SysConfigPageHelper;


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }

    /* Field Doms */
    private DomOfAddProductItem = document.getElementById("add-productItem") as HTMLButtonElement;
    private DomOfQuerryBtn = document.getElementsByName("query-btn") as NodeListOf<HTMLButtonElement>;




    /* Class Variable */

    /* Page Function */
    public SetChageStatus(result: boolean): void {
        //  this.DomOfIsChanged.value = result.toString();
    }



    public PageEventInit() {
        const curObj = this;



        /* Page Events */
        $(curObj.DomOfAddProductItem).on('click', function () {
            let pageRs = curObj.SysConfigPageHelper.GetProductItemModel("");
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-carnoinfo]").html(data);
                var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
                modalObj.modal('show');

                $.getScript("/psi/PageOfSysConfigCarNoOnlineInfoValidate.js"); // 載入檢核js

                modalObj.find("#CustomerGUID").select2({
                    theme: 'bootstrap4',
                    placeholder: "請選擇"
                })

                modalObj.find("#carno-info-action").on('click',
                    function () {
                        // modalObj.modal('hide');
                        // modalObj.find('#CreateCarNoInfo').submit();
                        modalObj.find('#carNo-info-form').submit();
                    });

            });
        })



        $(curObj.DomOfQuerryBtn).on("click", function (event) {
            let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString());
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-carnoinfo]").html(data);
                var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
                modalObj.modal('show');

                $.getScript("/psi/PageOfSysConfigCarNoOnlineInfoValidate.js"); // 載入檢核js

                modalObj.find("#CustomerGUID").select2({
                    theme: 'bootstrap4',
                    placeholder: "請選擇"
                })

                modalObj.find("#carno-info-action").on('click',
                    function () {
                        // modalObj.modal('hide');
                        // modalObj.find('#CreateCarNoInfo').submit();
                        modalObj.find('#carNo-info-form').submit();
                    });
            });
        });
    }

}





