class PageOfSysconfigCarNoOnlineInfo {
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
    public SysConfigPageHelper: SysConfigPageHelper;


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }


    /* Page Function */
    

}

