class CreateWeightNotePageClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public IniPageEvent() {
        // Page Field
        let fullWeight = $('#VE_PurchaseWeightNote_FullWeightTime').get(0);
        let defectiveWeight = $('#VE_PurchaseWeightNote_DefectiveWeight').get(0);
        let unitPrice = $('#VE_PurchaseWeightNote_UnitPrice').get(0);
        let traficUnitPrice = $('#VE_PurchaseWeightNote_TraficUnitPrice').get(0);
        let weightFee = $('#VE_PurchaseWeightNote_ThirdWeightFee').get(0);
        let ishasTaxList = $(".ishas_tax").get();

        // Logic        
        //fullWeight.addEventListener('keyup', this.CaculateAllFee);
        //defectiveWeight.addEventListener('keyup', this.CaculateAllFee);
        //unitPrice.addEventListener('keyup', this.CaculateAllFee);
        //traficUnitPrice.addEventListener('keyup', this.CaculateAllFee);
        //weightFee.addEventListener('keyup', this.CaculateAllFee);
        //ishasTaxList.forEach((item) => item.addEventListener('change', this.CaculateAllFee));
    };

    public ReSetCarNoItems(carNoIdObj: JQuery<HTMLElement>, dataObjLs) {
        carNoIdObj.html('');  // 選項清空
        let defaultOption = new Option("0.新車牌", "0", false, false);
        carNoIdObj.append(defaultOption);
        dataObjLs.forEach(function (item) {  // 清單項目
            let newOption = new Option(item.carName, item.id, false, false);
            carNoIdObj.append(newOption);
        });
    }


    public GetShowCarNoName(carNoIdObj: JQuery<HTMLElement>) {
        // Page Field
        let carNoId = $('#VE_PurchaseWeightNote_CarNoId');
        let carName = $('#VE_PurchaseWeightNote_CarNo');

        // Logic 
        let carNoIdObj = carNoId.find(':selected');
        carName.val("");
        if (carNoIdObj.val() === "0") {
            carName.removeAttr("readonly");
        } else {
            carName.attr("readonly", "readonly");
            carName.val(carNoIdObj.text());
        }
    }





};






