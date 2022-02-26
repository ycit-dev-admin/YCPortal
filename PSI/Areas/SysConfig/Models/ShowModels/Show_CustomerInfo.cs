using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models
{
    public class Show_CustomerInfo
    {
        public string Id { get; set; }
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string PostCarNo { get; set; }
        public string HasContract { get; set; }
        public DateTime UpdateTime { get; set; }
        public string UpdateEmpNo { get; set; }
    }
}
