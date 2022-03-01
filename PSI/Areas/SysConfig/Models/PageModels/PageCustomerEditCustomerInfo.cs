using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models.ShowModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCustomerEditCustomerInfo
    {
        #region -- ForPost -- 
        public string EncodeSn { get; set; }
        public string EditCompanyName { get; set; }
        public string EditTaxId { get; set; }
        public string EditCustomerName { get; set; }
        public string EditPsiType { get; set; }
        public string EditRemark { get; set; }

        #endregion

        #region --- ForShow ---

        public List<Show_CustomerCar> CustomerCarList { get; set; }
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string CustomerName { get; set; }
        // public string Address { get; set; }
        //  public string ContentInfo { get; set; }
        public string PsiType { get; set; }
        public string Remark { get; set; }

        #endregion

        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }

        #endregion



    }
}
