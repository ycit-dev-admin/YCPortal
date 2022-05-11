using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class VE_CustomerContractLog
    {
        public Guid ContractUNID { get; set; }  // 認列合約
        public Guid PsiDocUNID { get; set; }  // 進貨or出貨的GUID        
        public string IsEffective { get; set; }  // Default 1
        public string Remark { get; set; }
    }
}
