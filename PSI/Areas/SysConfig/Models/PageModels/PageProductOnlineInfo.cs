using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageProductOnlineInfo
    {
        public List<VE_ProductItem> VeProductItemList { get; set; }
        public List<VE_CustomerInfo> CustomerInfoLs { set; get; }


        // For Page
        public List<SelectListItem> PsiTypeItems { get; set; }

    }
}
