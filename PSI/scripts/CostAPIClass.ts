class CostAPIClass {
    // Global

    // Ready Post
    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }

    public GetCostUnitPrce(percent: number, unitPrice: number): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Sales/api/Cost/GetCostUnitPrce`;
        return $.get(apiUrl,
            {
                percent: percent,
                unitPrice: unitPrice
            });
    }


};