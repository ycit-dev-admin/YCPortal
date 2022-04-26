﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageContractEditCustomerContract
    {
        public DateTime StratTime { get; set; }
        public DateTime? EditStratTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime? EditEndTime { get; set; }
        public string ContractName { get; set; }
        public string EditContractName { get; set; }
        public double DealWeight { get; set; }
        public double? EditDealWeight { get; set; }
        public double DealUnitPrice { get; set; }
        public double? EditDealUnitPrice { get; set; }
        public double ActualWeight { get; set; }
        public Guid CustomerGUID { get; set; }
        public Guid EditCustomerGUID { get; set; }
        public Guid ProductGUID { get; set; }
        public Guid EditProductGUID { get; set; }
        public string ContractType { get; set; }
        public string EditContractType { get; set; }
        public string Remark { get; set; }
        public string EditRemark { get; set; }



        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> ProductItems { set; get; }

        #endregion



    }
}
