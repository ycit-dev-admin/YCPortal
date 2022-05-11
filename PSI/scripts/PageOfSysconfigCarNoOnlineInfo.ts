class PageOfSysConfigCarNoOnlineInfo {
    // Porperites
    readonly BaseUrl: string;


    // WebAPI
    public SysConfigPageHelper: SysConfigPageHelper;


    constructor(baseUrl: string = "") {
        this.BaseUrl = baseUrl;
        this.SysConfigPageHelper = new SysConfigPageHelper(this.BaseUrl);
    }


    /* Page Function */


}

