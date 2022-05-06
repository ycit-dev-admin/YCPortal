class CustomerContractAPIClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetContractItemsBy(argUNID: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/api/CustomerContracts/${argUNID}`;


        // return $.get(apiUrl, { guid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);

    }




};