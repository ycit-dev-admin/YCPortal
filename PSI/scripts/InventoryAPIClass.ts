class InventoryAPIClass {
    // Global

    // Ready Post
    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }

    public GetInventoryWeight(prodItemGuid: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/Inventory/GetInventoryWeight`;
        return $.get(apiUrl,
            {
                prodItemGuid: prodItemGuid
            });
    }
    public GetInventoryUnitPrice(prodItemGuid: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/Inventory/GetInventoryUnitPrice`;
        return $.get(apiUrl,
            {
                prodItemGuid: prodItemGuid
            });
    }
    public GetInventoryMaxUnitPrice(prodItemGuid: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/Inventory/GetInventoryMaxUnitPrice`;
        return $.get(apiUrl,
            {
                prodItemGuid: prodItemGuid
            });
    }
    public GetInventoryMinUnitPrice(prodItemGuid: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/Purchase/api/Inventory/GetInventoryMinUnitPrice`;
        return $.get(apiUrl,
            {
                prodItemGuid: prodItemGuid
            });
    }

};