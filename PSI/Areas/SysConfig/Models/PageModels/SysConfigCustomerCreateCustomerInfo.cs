using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class SysConfigCustomerCreateCustomerInfo
    {
        #region -- ForPost -- 
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string CustomerName { get; set; }
        public string PsiType { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string Remark { get; set; }
        public DateTime LalaTime { get; set; }
        #endregion


        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }

        #endregion



    }
}
