﻿using PSI.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;


namespace PSI.Service.IService
{
    public interface IPsiService
    {
        bool CreatePurchaseWeightNote(PurchaseWeightNote purchaseWeightNote);
    }
}
