class CustomerAPIClass {
    // Global

    // Ready Post




    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }


    public GetCarNoItemsBy(customerId: string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/api/CustomerCars`;


        return $.get(apiUrl, { customerId: encodeURIComponent(customerId) });
    }




};