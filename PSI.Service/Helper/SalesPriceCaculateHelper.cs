using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Service.IHelper;

namespace PSI.Service.Helper
{
    public class SalesPriceCaculateHelper : ISalesPriceCaculateHelper
    {


        public SalesPriceCaculateHelper()
        {

        }


        public decimal GetInvoicePrice(double salesWeight, double defectiveWeight, decimal unitPrice, bool hasTax)
        {
            var caculateWeight = salesWeight - defectiveWeight;
            if (caculateWeight <= 0 || unitPrice <= 0)
                return 0;
            var taxVal = hasTax ? 1.05 : 1;
            return (decimal)caculateWeight * unitPrice * (decimal)taxVal;
        }

        public decimal GetDeliveryPrice(double salesWeight, decimal traficUnitPrice, bool hasTax)
        {
            if (salesWeight <= 0 || traficUnitPrice <= 0)
                return 0;
            var taxVal = hasTax ? 1.05 : 1;
            return (decimal)salesWeight * traficUnitPrice* (decimal)taxVal;
        }

        public decimal GetReceivedPrice(decimal invoicePrice, decimal deliveryPrice)
        {
            //return invoicePrice - deliveryPrice < 0 ?
            //    0 :
            //    decimal.Round(invoicePrice - deliveryPrice);
            return decimal.Round(invoicePrice - deliveryPrice);
        }
    }
}
