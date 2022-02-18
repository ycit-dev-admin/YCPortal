using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSI.Areas.Purchase.Models.IVE_Models
{
    public interface IVE_PurchaseWeightNote_Edit
    {
        public string DocNo { get; set; }
        public DateTime FullWeightTime { get; set; }
        public string CustomerName { get; set; }  // 當下客戶名
        public string CarNo { get; set; }
        public double FullWeight { get; set; }
        public double DefectiveWeight { get; set; }
        public string UnitPrice { get; set; }
        public bool HasTax { get; set; }
        public string ScaleNo { get; set; }  // 磅秤編號 (1:大磅 2:小磅)
        public decimal TraficUnitPrice { get; set; }  // 運費單價
        public string ThirdWeightFee { get; set; }  // 磅費
        public decimal WeightPrice { get; set; }  // 計價金額
        public decimal DeliveryFee { get; set; }  // 運費
        public decimal ActualPrice { get; set; }
        public string PayType { get; set; }
        public DateTime PayTime { get; set; }
        public string Remark { get; set; }
    }
}



