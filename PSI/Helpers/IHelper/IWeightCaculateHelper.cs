using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;

namespace PSI.Service.IHelper
{
    public interface IWeightCaculateHelper
    {
        public decimal GetProportionWeight(decimal nominator, decimal totalWeight); // 出貨計價金額 = (出廠重量 - 扣重) * 單價


    }
}
