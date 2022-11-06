class SalesPriceAPIClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetInvoicePrice(salesWeight: number, defectiveWeight: number, unitPrice: number, hasTax: boolean): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Sales/api/SalesPrice/GetInvoicePrice`;

        return $.get(apiUrl,
            {
                salesWeight: salesWeight,
                defectiveWeight: defectiveWeight,
                unitPrice: unitPrice,
                hasTax: hasTax
            });
    }
    public GetDeliveryPrice(fullWeight: number, traficUnitPrice: number, hasTax: boolean): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Sales/api/SalesPrice/GetDeliveryPrice`;

        return $.get(apiUrl,
            {
                fullWeight: fullWeight,
                traficUnitPrice: traficUnitPrice,
                hasTax: hasTax
            });
    }
    public GetReceivedPrice(invoicePrice: number, deliveryPrice: number): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Sales/api/SalesPrice/GetReceivedPrice`;

        return $.get(apiUrl,
            {
                invoicePrice: invoicePrice,
                deliveryPrice: deliveryPrice
            });
    }
    public GetTaxPrice(price: number): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Sales/api/SalesPrice/GetTaxPrice`;

        return $.get(apiUrl,
            {
                price: price
            });
    }




};