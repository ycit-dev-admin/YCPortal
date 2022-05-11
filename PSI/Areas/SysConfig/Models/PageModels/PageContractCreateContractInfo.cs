using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models.ShowModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageContractCreateContractInfo
    {

        public string ContractName { get; set; }
        public double? DealWeight { get; set; }
        public double? DealUnitPrice { get; set; }
        public Guid CustomerGUID { get; set; }
        public Guid ProductGUID { get; set; }
        public DateTime? StratTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string ContractType { get; set; }
        public string Remark { get; set; }



        #region --- Page Only ---

        public List<SelectListItem> ContractTypeItems { set; get; }
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> ProductItems { set; get; }

        #endregion



    }
}
