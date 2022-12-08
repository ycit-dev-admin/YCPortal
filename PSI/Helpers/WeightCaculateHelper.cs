using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IHelper;

namespace PSI.Service.Helper
{
    public class WeightCaculateHelper : IWeightCaculateHelper
    {


        public WeightCaculateHelper()
        {

        }


        public decimal GetProportionWeight(decimal nominator, decimal totalWeight)
        {
            // 4捨5入參考來源  https://ithelp.ithome.com.tw/articles/10213221

            var caculateRs = 0m;
            if (nominator > 0m &&
                nominator <= 100m &&
                totalWeight > 0m)
                caculateRs = nominator / 100m * totalWeight;
            //caculateRs = Convert.ToInt64(nomiRs / 100 * tWeightRs).ToString("N0");

            //var lala = decimal.TryParse(totalWeight, out decimal tWeightRs2) &&
            //    decimal.TryParse(nominator, out decimal nomiRs2);
            //var lala2 = decimal.TryParse(totalWeight.Trim(), out decimal tWeightRs3) &&
            //    decimal.TryParse(nominator.Trim(), out decimal nomiRs3);




            //tWeightRs = 0;




            return caculateRs;
        }
    }
}
