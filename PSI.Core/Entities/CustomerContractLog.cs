using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerContractLog : Entity
    {
        public Guid CONTRACT_UNID { get; set; }  // 認列合約
        public Guid PSI_DOC_UNID { get; set; }  // 進貨or出貨的GUID        
        public string IS_EFFECTIVE { get; set; }  // Default 1
        public string REMARK { get; set; }
    }
}
