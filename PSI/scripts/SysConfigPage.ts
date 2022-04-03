class SysConfigPage {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetCarNoInfoModel(carGUID: string): JQuery.jqXHR {
        const pageUrl = `${this.BaseUrl}/SysConfig/CarNo/_GetCarNoInfoModel`;

        return $.get(pageUrl, { carGUID: encodeURIComponent(carGUID) });
    }




};