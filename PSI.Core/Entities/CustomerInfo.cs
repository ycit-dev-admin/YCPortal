using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerInfo : Entity
    {
        public string CompanyName { get; set; }
        public string TaxId { get; set; }
        public string Title { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string ContentInfo { get; set; }
        public string PsiType { get; set; }  // 進出貨類型的客戶(1:進貨 2:出貨 3:Both)
        public string IsEffective { get; set; }
        public bool? IsContract { get; set; }
        public string Remark { get; set; }
    }
}
