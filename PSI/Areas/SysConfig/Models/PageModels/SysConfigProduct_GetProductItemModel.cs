using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models
{
    public class SysConfigProduct_GetProductItemModel
    {
        // For Post

        // For Show      
        public Guid ProductUNID { get; set; }
        public string ProductName { get; set; }
        public string PsiType { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }

        // Page
        public string ActionTypeName { get; set; }
        public string FormActionName { get; set; }
        public bool IsNewOpen { get; set; }
        public bool IsOnlyQuery { get; set; }
        public List<SelectListItem> PsiTypeItems { set; get; }


    }
}
