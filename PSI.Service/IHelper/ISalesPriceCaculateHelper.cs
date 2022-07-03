﻿using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;

namespace PSI.Service.IHelper
{
    public interface ISalesPriceCaculateHelper
    {
        public decimal GetInvoicePrice(double salesWeight, double defectiveWeight, decimal unitPrice,bool hasTax); // 出貨計價金額 = (出廠重量 - 扣重) * 單價
        public decimal GetDeliveryPrice(double salesWeight, decimal traficUnitPrice,bool hasTax); // 運費 = 進廠重量 * 運費單價
        public decimal GetReceivedPrice(decimal invoicePrice, decimal deliveryPrice);

    }
}
