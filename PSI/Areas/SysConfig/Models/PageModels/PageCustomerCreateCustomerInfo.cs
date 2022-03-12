using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Areas.SysConfig.Models.ShowModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCustomerCreateCustomerInfo
    {
        #region -- ForPost -- 
        public string EditCompanyName { get; set; }
        public string EditTaxId { get; set; }
        public string EditCustomerName { get; set; }
        public string EditPsiType { get; set; }
        public string EditAddress { get; set; }
        public string EditRemark { get; set; }
        public string EditContentInfo { get; set; }

        #endregion


        #region --- Page Only ---

        public List<SelectListItem> PsiTypeItems { set; get; }

        #endregion



    }
}
