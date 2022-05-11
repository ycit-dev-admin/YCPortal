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

    public GetContractsByCustomerUNID(argUNID: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/api/CustomerContracts/GetContractsByCustomerUNID/${argUNID}`;


        //const apiUrl = `${this.BaseUrl}/api/CustomerCars`;
        //return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });

        //return $.get(apiUrl, { unid: encodeURIComponent(argUNID) });
        return $.get(apiUrl);

    }




};