class WeightAPIClass {
    // Global

    // Ready Post


    BaseUrl: string;
    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
    }

    public GetProportionWeight(nominator: string, totalWeight:string): JQuery.jqXHR {
        const apiUrl = `${this.BaseUrl}/api/Weight/GetProportionWeight`;
        return $.get(apiUrl,
            {
                nominator: nominator,
                totalWeight: totalWeight
            });
    }


};