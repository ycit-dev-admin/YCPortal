class PurchaseProdItem {
    readonly prodId: string;
    readonly prodText: string;
    public percent: number;

    //constructor(params: Partial<PurchaseProdItem>) {
    //    Object.assign(this, params);
    //}
    public constructor(prodId: string, prodText: string, percent: number) {
        this.prodId = prodId;
        this.prodText = prodText;
        this.percent = percent;
    }
}