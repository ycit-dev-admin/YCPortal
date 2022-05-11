using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models
{
    public class VM_CustomerInfo
    {
        // Post
        public string[] PostCarNo { get; set; }

        // Page
        public string HasContract { get; set; }  // 是否有合約
        public List<SelectListItem> PagePsiTypeItems { set; get; }
        public string PsiTypeName { get; set; }
        public string MappingCarNo { get; set; }  // 客戶資料對應的車牌

        // Entity
        public string Id { get; set; }
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string TaxId { get; set; }
        public string Title { get; set; }
        public string PsiType { get; set; }
        public string Remark { get; set; }
        public string UpdateEmpNo { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Address { get; set; }
        public string ContentInfo { get; set; }

    }
}
