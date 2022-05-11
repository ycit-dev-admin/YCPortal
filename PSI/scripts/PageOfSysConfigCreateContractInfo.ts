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
        "建立": function () {
            $('#creaet-contract-form').submit();
            $(this).dialog("close");
        },
        "取消": function () {
            $(this).dialog("close");
        }
    }
})

class PageOfSysConfigCreateContractInfo {
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
    public DomOfCarGuid = document.getElementById('CarGuid') as HTMLInputElement;
    public DomOfCustomerGuid = document.getElementById('CustomerGuid') as HTMLInputElement;
    public DomOfEditCompanyName = document.getElementById('EditCompanyName') as HTMLInputElement;
    public DomOfShowEditCompanyName = document.getElementById('show-edit-companyName') as HTMLSpanElement;
    public DomOfEditTaxId = document.getElementById('EditTaxId') as HTMLInputElement;
    public DomOfShowEditTaxId = document.getElementById('show-edit-taxId') as HTMLSpanElement;
    public DomOfEditCustomerName = document.getElementById('EditCustomerName') as HTMLInputElement;
    public DomOfShowEditCustomerName = document.getElementById('show-edit-customerName') as HTMLSpanElement;
    public DomOfEditPsiType = document.getElementById('EditPsiType') as HTMLSelectElement;
    public DomOfShowEditPsiType = document.getElementById('show-edit-psiType') as HTMLSpanElement;
    public DomOfEditContentInfo = document.getElementById('EditContentInfo') as HTMLInputElement;
    public DomOfShowEditContentInfo = document.getElementById('show-edit-contentInfo') as HTMLSpanElement;
    public DomOfEditAddress = document.getElementById('EditAddress') as HTMLInputElement;
    public DomOfShowEditAddress = document.getElementById('show-edit-address') as HTMLSpanElement;
    private DomOfIsChanged = document.getElementById("IsChanged") as HTMLInputElement;


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

        $('#EditCompanyName').on('keyup', function () {
            if (curObj.DomOfEditCompanyName.value.length > 0) {
                curObj.DomOfShowEditCompanyName.innerHTML = `=> 變更為 : ${curObj.DomOfEditCompanyName.value}`;
                curObj.DomOfShowEditCompanyName.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditCompanyName.innerHTML = ""
            }
        })
        $('#EditTaxId').on('keyup', function () {
            if (curObj.DomOfEditTaxId.value.length > 0) {
                curObj.DomOfShowEditTaxId.innerHTML = `=> 變更為 : ${curObj.DomOfEditTaxId.value}`;
                curObj.DomOfShowEditTaxId.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditTaxId.innerHTML = ""
            }
        })
        $('#EditCustomerName').on('keyup', function () {
            if (curObj.DomOfEditCustomerName.value.length > 0) {
                curObj.DomOfShowEditCustomerName.innerHTML = `=> 變更為 : ${curObj.DomOfEditCustomerName.value}`;
                curObj.DomOfShowEditCustomerName.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditCustomerName.innerHTML = ""
            }
        })
        $('#EditPsiType').on('change', function () {
            const selectedText = curObj.DomOfEditPsiType.options[curObj.DomOfEditPsiType.selectedIndex].text;
            if (selectedText.length > 0) {
                curObj.DomOfShowEditPsiType.innerHTML = `=> 變更為 : ${selectedText}`;
                curObj.DomOfShowEditPsiType.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditPsiType.innerHTML = ""
            }
        })
        $('#EditContentInfo').on('keyup', function () {
            if (curObj.DomOfEditContentInfo.value.length > 0) {
                curObj.DomOfShowEditContentInfo.innerHTML = `=> 變更為 : ${curObj.DomOfEditContentInfo.value}`;
                curObj.DomOfShowEditContentInfo.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditContentInfo.innerHTML = ""
            }
        })
        $('#EditAddress').on('keyup', function () {
            if (curObj.DomOfEditAddress.value.length > 0) {
                curObj.DomOfShowEditAddress.innerHTML = `=> 變更為 : ${curObj.DomOfEditAddress.value}`;
                curObj.DomOfShowEditAddress.style.color = "red";
                curObj.SetChageStatus(true);
            } else {
                curObj.DomOfShowEditAddress.innerHTML = ""
            }
        })

        // 車牌編輯
        $('#has-carno').on('click', `button`, function () {
            let pageRs = curObj.SysConfigPageHelper.GetCarNoInfoModel($(this).val().toString(), true);
            $.when(pageRs).then(function (data) {
                $("div[name=model-temp-carnoinfo]").html(data);
                var modalObj = $("div[name=model-temp-carnoinfo]").find('#myModal');
                modalObj.modal('show');
            });
        })
                
    }

}





