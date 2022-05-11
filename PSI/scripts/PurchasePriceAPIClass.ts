class PurchasePriceAPIClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetWeightNotePrice(fullWeight: number, defectiveWeight: number, unitPrice: number, hasTax: boolean): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/PurchasePrice/GetWeightNotePrice`;

        return $.get(apiUrl,
            {
                fullWeight: fullWeight,
                defectiveWeight: defectiveWeight,
                unitPrice: unitPrice,
                hasTax: hasTax
            });
    }
    public GetDeliveryPrice(fullWeight: number, traficUnitPrice: number): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/PurchasePrice/GetDeliveryPrice`;

        return $.get(apiUrl,
            {
                fullWeight: fullWeight,
                traficUnitPrice: traficUnitPrice
            });
    }
    public GetActualPayPrice(thirdWeightPrice: number, weightNotePrice: number, deliveryPrice: number): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/PurchasePrice/GetActualPayPrice`;

        return $.get(apiUrl,
            {
                thirdWeightPrice: thirdWeightPrice,
                weightNotePrice: weightNotePrice,
                deliveryPrice: deliveryPrice
            });
    }




};