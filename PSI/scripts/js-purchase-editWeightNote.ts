class JsPurchaseEditWeightNote {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public IniPageEvent() {

    };


    public CaculatePriceFee(fullWeight: number, defectiveWeight: number, unitPrice: number, hasTex: boolean) {
        let taxArg = hasTex === true ? 1.05 : 1;  // 是否含稅 (radio button 沒有 name attribute 所以用)
        let weightPrice = (fullWeight - defectiveWeight) * unitPrice * taxArg;
        return weightPrice;
    };
    public CaculateTraficFee() {

    };
    public GetActualPayFee(priceFee: number, traficFee: number, thirdWeightFee: number) {

    };


    public CaculateAllFee() {
        //let haha = new FormData();
        let fullWeight = (document.getElementById("VE_PurchaseWeightNote_FullWeight") as HTMLInputElement).value // 進場重量
        let defectiveWeight = (document.getElementById("VE_PurchaseWeightNote_DefectiveWeight") as HTMLInputElement).value // 扣重
        let unitPrice = (document.getElementById("VE_PurchaseWeightNote_UnitPrice") as HTMLInputElement).value // 單價
        let isHasTax = $('.ishas_tax:checked').val() === "True" ? 1.05 : 1;  // 是否含稅 (radio button 沒有 name attribute 所以用)
        let traficUnitPrice = (document.getElementById("VE_PurchaseWeightNote_TraficUnitPrice") as HTMLInputElement).value // 運費單價
        let weightFee = (document.getElementById("VE_PurchaseWeightNote_ThirdWeightFee") as HTMLInputElement).value

        // 計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        //let weightFee = (+fullWeight - (+defectiveWeight));
        let weightPrice = (+fullWeight - (+defectiveWeight)) * (+unitPrice) * isHasTax;
        (document.getElementById("show_weight_price") as HTMLDivElement).textContent = !weightPrice || weightPrice < 0 ? "0" : weightPrice.toFixed(2).toString();

        // 運費 = 進廠重量 * 運費單價
        let traficPrice = (+fullWeight) * (+traficUnitPrice);
        (document.getElementById("show_trafic_price") as HTMLDivElement).textContent = !traficPrice || traficPrice < 0 ? "0" : traficPrice.toString();

        // 總金額 = (磅費 + 計價金額 + 運費)
        let finalPrice = (+weightFee) + weightPrice + traficPrice;
        (document.getElementById("show_final_price") as HTMLDivElement).textContent = !finalPrice || finalPrice < 0 ? "0" : Math.round(finalPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        $('#VE_PurchaseWeightNote_ActualPrice').val(Math.round(finalPrice));

    }



};






