class PurchaseProdItemList {
    readonly Data: PurchaseProdItem[];

    constructor() {
        this.Data = [];
    }

    public AppendToProdItemList(prodId: string, prodText: string) {
        const isItemExist = this.Data.filter(item => item.prodId === prodId).length > 0;
        if (!isItemExist) {
            let prodItem = new PurchaseProdItem(prodId, prodText, this.Data.length === 0 ? 90 : 10);
            this.Data.push(prodItem);
        }
    }


    public RemoveOfProdItemList(prodId: string) {
        let wRemoveItem = this.Data.find(item => item.prodId === prodId);
        this.Data.splice(this.Data.indexOf(wRemoveItem), 1);
    }
}