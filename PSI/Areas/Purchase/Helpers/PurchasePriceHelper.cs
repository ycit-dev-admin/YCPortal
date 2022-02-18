using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Areas.Purchase.Helpers
{
    public class PurchasePriceHelper
    {
        public PurchasePriceHelper()
        {
        }
        public decimal GetWeightNotePrice(double fullWeight, double defectiveWeight, decimal unitPrice, bool hasTax) // 進貨計價金額 = (進廠重量 - 扣重) * 單價 * 稅率
        {
            var caculateWeight = fullWeight - defectiveWeight;
            if (caculateWeight <= 0 || unitPrice <= 0)
                return 0;

            var taxVal = hasTax ? 1.05 : 1;
            return (decimal)caculateWeight * unitPrice * (decimal)taxVal;
        }
        public decimal GetDeliveryPrice(double fullWeight, decimal traficUnitPrice) // 運費 = 進廠重量 * 運費單價
        {
            if (fullWeight <= 0 || traficUnitPrice <= 0)
                return 0;

            return (decimal)fullWeight * traficUnitPrice;
        }
        public decimal GetActualPayPrice(decimal thirdWeightPrice, decimal weightNotePrice, decimal deliveryPrice) // 實付金額 = (磅費 + 計價金額 + 運費)
        {
            return thirdWeightPrice + weightNotePrice + deliveryPrice < 0 ?
                0 :
                decimal.Round(thirdWeightPrice + weightNotePrice + deliveryPrice);
        }
    }
}
