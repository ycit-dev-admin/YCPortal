class CustomerAPIClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetCarNoItemsBy(customerUNID: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/api/CustomerCars`;


        return $.get(apiUrl, { customerUNID: encodeURIComponent(customerUNID) });
    }




};