using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models.ShowModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCustomerEditCustomerInfo
    {
        #region Post

        #endregion

        #region --- ShowModel ---

        public List<Show_CustomerCar> CustomerCarList { get; set; }
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string CustomerName { get; set; }
        // public string Address { get; set; }
        //  public string ContentInfo { get; set; }
        public string PsiType { get; set; }
        public string Remark { get; set; }

        #endregion

        #region --- Page ---

        public List<SelectListItem> PsiTypeItems { set; get; }

        #endregion



    }
}
