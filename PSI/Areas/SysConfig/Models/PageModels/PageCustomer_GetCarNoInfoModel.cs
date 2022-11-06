using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models
{
    public class PageCustomer_GetCarNoInfoModel
    {
        // For Post

        // For Show      
        public Guid CustomerGUID { get; set; }
        public Guid CarGUID { get; set; }
        public string CarName { get; set; }
        public int? PsiType { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }

        // Page
        public string ActionTypeName { get; set; }
        public string FormActionName { get; set; }
        public bool IsNewOpen { get; set; }
        public bool IsOnlyQuery { get; set; }

        public List<SelectListItem> CustomerInfoItems { set; get; }
        public List<SelectListItem> PsiTypeItems { set; get; }

    }
}
