using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models
{
    public class VM_Customer_Info
    {
        // Page
        public string P_Contract { get; set; }
        public string P_Car { get; set; }

        // Entity
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string TaxId { get; set; }
        public string Title { get; set; }
        public string PsiType { get; set; }
        //public bool IsContract { get; set; }
        public string Remark { get; set; }
        public string UpdateEmpNo { get; set; }
        public DateTime UpdateTime { get; set; }
        public string Address { get; set; }
        public string ContentInfo { get; set; }

    }
}
