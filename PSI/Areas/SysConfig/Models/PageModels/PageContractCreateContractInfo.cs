using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models.ShowModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageContractCreateContractInfo
    {

        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public Guid CustomerGUID { get; set; }
        public Guid ProductGUID { get; set; }
        public DateTime StratTime { get; set; }
        public DateTime EndTime { get; set; }
        public string PsiType { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string Remark { get; set; }



        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }
        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> ProductItems { set; get; }

        #endregion



    }
}
