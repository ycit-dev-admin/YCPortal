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
            $('#edit-contract-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
})

class PageOfSysConfigEditCustomerContract {
    // Base Porperites
    readonly BaseUrl: string;

    // For Post


    // References  
    private CustomerAPI: CustomerAPIClass;
    public SysConfigPageHelper: SysConfigPageHelper;


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.CustomerAPI = new CustomerAPIClass(this.BaseUrl);
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }

    /* Field Doms */
    private DomOfIsChanged = document.getElementById("IsChanged") as HTMLInputElement;
    public DomOfCarGuid = document.getElementById('CarGuid') as HTMLInputElement;
    public DomOfCustomerGuid = document.getElementById('CustomerGuid') as HTMLInputElement;
    public DomOfEditStratTime = document.getElementById('EditStratTime') as HTMLInputElement;
    public DomOfShowEditStratTime = document.getElementById('show-edit-editstrattime') as HTMLSpanElement;
    public DomOfEditEndTime = document.getElementById('EditEndTime') as HTMLInputElement;
    public DomOfShowEditEndTime = document.getElementById('show-edit-editendtime') as HTMLSpanElement;
    public DomOfEditContractStatus = document.getElementById('EditContractStatus') as HTMLSelectElement;
    public DomOfShowEditContractStatus = document.getElementById('show-edit-contractstatus') as HTMLSpanElement;
    public DomOfEditCustomerGUID = document.getElementById('EditCustomerGUID') as HTMLSelectElement;
    public DomOfShowEditCustomerGUID = document.getElementById('show-edit-editcustomerGUID') as HTMLSpanElement;
    public DomOfEditContractName = document.getElementById('EditContractName') as HTMLInputElement;
    public DomOfShowEditContractName = document.getElementById('show-edit-editcontractname') as HTMLSpanElement;
    public DomOfEditContractType = document.getElementById('EditContractType') as HTMLSelectElement;
    public DomOfShowEditContractType = document.getElementById('show-edit-editcontractType') as HTMLSpanElement;
    public DomOfEditProductGUID = document.getElementById('EditProductGUID') as HTMLSelectElement;
    public DomOfShowEditProductGUID = document.getElementById('show-edit-EditProductGUID') as HTMLSpanElement;
    public DomOfEditDealWeight = document.getElementById('EditDealWeight') as HTMLInputElement;
    public DomOfShowEditDealWeight = document.getElementById('show-edit-EditDealWeight') as HTMLSpanElement;
    public DomOfEditDealUnitPrice = document.getElementById('EditDealUnitPrice') as HTMLInputElement;
    public DomOfShowEditDealUnitPrice = document.getElementById('show-edit-EditDealUnitPrice') as HTMLSpanElement;
    public DomOfEditRemark = document.getElementById('EditRemark') as HTMLInputElement;


    /* Class Variable */

    /* Page Function */
    public SetChageStatus(result: boolean): void {
        this.DomOfIsChanged.value = result.toString();
    }



    public PageEventInit() {
        const curObj = this;



        /* Page Events */
        // 表單建立
        $('#form_create').on('click', function () {
            $("#dialog-confirm").dialog("open");
        })

        $(curObj.DomOfEditStratTime).on('input', function () {
            if (curObj.DomOfEditStratTime.value.length > 0) {
                curObj.DomOfShowEditStratTime.innerHTML = `=> 變更為 : ${curObj.DomOfEditStratTime.value}`;
                curObj.DomOfShowEditStratTime.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditStratTime.innerHTML = ""
            }
        })
        $(curObj.DomOfEditEndTime).on('input', function () {
            if (curObj.DomOfEditEndTime.value.length > 0) {
                curObj.DomOfShowEditEndTime.innerHTML = `=> 變更為 : ${curObj.DomOfEditEndTime.value}`;
                curObj.DomOfShowEditEndTime.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditEndTime.innerHTML = ""
            }
        })
        $(curObj.DomOfEditContractStatus).on('change', function () {
            const selectedText = curObj.DomOfEditContractStatus.options[curObj.DomOfEditContractStatus.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditContractStatus.innerHTML = `=> 變更為 : ${selectedText}`;
                curObj.DomOfShowEditContractStatus.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditContractStatus.innerHTML = ""
            }
        })
        $(curObj.DomOfEditCustomerGUID).on('change', function () {
            const selectedText = curObj.DomOfEditCustomerGUID.options[curObj.DomOfEditCustomerGUID.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditCustomerGUID.innerHTML = `=> 變更為 : ${selectedText}`;
                curObj.DomOfShowEditCustomerGUID.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditCustomerGUID.innerHTML = ""
            }
        })
        $(curObj.DomOfEditContractName).on('input', function () {
            if (curObj.DomOfEditContractName.value.length > 0) {
                curObj.DomOfShowEditContractName.innerHTML = `=> 變更為 : ${curObj.DomOfEditContractName.value}`;
                curObj.DomOfShowEditContractName.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditContractName.innerHTML = ""
            }
        })
        $(curObj.DomOfEditContractType).on('change', function () {
            const selectedText = curObj.DomOfEditContractType.options[curObj.DomOfEditContractType.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditContractType.innerHTML = `=> 變更為 : ${selectedText}`;
                curObj.DomOfShowEditContractType.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditContractType.innerHTML = ""
            }
        })
        $(curObj.DomOfEditProductGUID).on('change', function () {
            const selectedText = curObj.DomOfEditProductGUID.options[curObj.DomOfEditProductGUID.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditProductGUID.innerHTML = `=> 變更為 : ${selectedText}`;
                curObj.DomOfShowEditProductGUID.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditProductGUID.innerHTML = ""
            }
        })
        $(curObj.DomOfEditDealWeight).on('input', function () {
            if (curObj.DomOfEditDealWeight.value.length > 0) {
                curObj.DomOfShowEditDealWeight.innerHTML = `=> 變更為 : ${curObj.DomOfEditDealWeight.value}`;
                curObj.DomOfShowEditDealWeight.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditDealWeight.innerHTML = ""
            }
        })
        $(curObj.DomOfEditDealUnitPrice).on('input', function () {
            if (curObj.DomOfEditDealUnitPrice.value.length > 0) {
                curObj.DomOfShowEditDealUnitPrice.innerHTML = `=> 變更為 : ${curObj.DomOfEditDealUnitPrice.value}`;
                curObj.DomOfShowEditDealUnitPrice.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditDealUnitPrice.innerHTML = ""
            }
        })
        $(curObj.DomOfEditRemark).on('input', function () {
            if (curObj.DomOfEditRemark.value.length > 0) {
                curObj.SetChageStatus(true);
            }
        })




        // 車牌編輯
        //$('#has-carno').on('click', `button`, function () {
        //    let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
        //    $.when(pageRs).then(function (data) {
        //        $("div[name=model-temp-carnoinfo]").html(data);
        //        var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
        //        modalObj.modal('show');
        //    });
        //})


    }

}





