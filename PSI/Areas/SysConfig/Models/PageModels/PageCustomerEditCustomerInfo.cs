using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCustomerEditCustomerInfo
    {
        #region -- ForPost -- 
        public string EncodeSn { get; set; }
        public string EditCompanyName { get; set; }
        public string EditTaxId { get; set; }
        public string EditCustomerName { get; set; }
        public string EditAddress { get; set; }
        public string EditContentInfo { get; set; }
        public string EditPsiType { get; set; }
        public string EditRemark { get; set; }

        #endregion

        #region --- ForShow ---

        public List<VE_CustomerCar> VE_CustomerCarList { get; set; }
        public Guid CustomerGuid { get; set; }
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string CustomerName { get; set; }
        public string ContentInfo { get; set; }
        public string Address { get; set; }
        public string PsiType { get; set; }
        public string Remark { get; set; }

        #endregion

        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }
        public bool IsChanged { get; set; }

        #endregion



    }
}
