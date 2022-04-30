class SysConfigPageHelper {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetCarNoInfoModel(carGUID: string = "", isOnlyQuery: boolean = false): JQuery.jqXHR {
        const pageUrl = `${this.BaseUrl}/SysConfig/CarNo/_GetCarNoInfoModel`;

        return $.get(pageUrl, {
            carGUID: encodeURIComponent(carGUID),
            isOnlyQuery: encodeURIComponent(isOnlyQuery)
        });
    }

    public GetProductItemModel(prodUNID: string = "", isOnlyQuery: boolean = false): JQuery.jqXHR {
        const pageUrl = `${this.BaseUrl}/SysConfig/Product/_GetProductItemModel`;

        return $.get(pageUrl, {
            prodUNID: encodeURIComponent(prodUNID),
            isOnlyQuery: encodeURIComponent(isOnlyQuery)
        });
    }


};