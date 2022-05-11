using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace PSI.Models.VEModels
{
    public class VE_PurchaseWeightNote_Query : VE_PurchaseWeightNote_Main
    {
        public override string DocNo { get; set; }


        public new DateTime FullWeightTime { get => FullWeightTime; set => FullWeightTime = value; }
        public new string CustomerName // 當下客戶名
        {
            get => CustomerName;
            set => CustomerName = value;
        }

        public new string CarNo
        {
            get => CarNo;
            set => CarNo = value;
        }
        public new double FullWeight
        {
            get => FullWeight;
            set => FullWeight = value;
        }
        public new double DefectiveWeight
        {
            get => DefectiveWeight;
            set => DefectiveWeight = value;
        }
        public new string UnitPrice
        {
            get => UnitPrice;
            set => UnitPrice = value;
        }
        public new bool HasTax
        {
            get => HasTax;
            set => HasTax = value;
        }
        public new string ScaleNo   // 磅秤編號 (1:大磅 2:小磅)
        {
            get => CarNo;
            set => CarNo = value;
        }
        public new decimal TraficUnitPrice   // 運費單價
        {
            get => TraficUnitPrice;
            set => TraficUnitPrice = value;
        }
        public new string ThirdWeightFee   // 磅費
        {
            get => ThirdWeightFee;
            set => ThirdWeightFee = value;
        }
        public new decimal WeightPrice   // 計價金額
        {
            get => WeightPrice;
            set => WeightPrice = value;
        }
        public new decimal DeliveryFee  // 運費
        {
            get => DeliveryFee;
            set => DeliveryFee = value;
        }
        public new decimal ActualPrice
        {
            get => ActualPrice;
            set => ActualPrice = value;
        }
        public new string PayType
        {
            get => PayType;
            set => PayType = value;
        }
        public new DateTime PayTime
        {
            get => PayTime;
            set => PayTime = value;
        }
        public new string Remark
        {
            get => Remark;
            set => Remark = value;
        }



    }

}
