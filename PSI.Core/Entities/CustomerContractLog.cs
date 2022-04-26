using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerContractLog : Entity
    {
        public Guid CONTRACT_GUID { get; set; }  // 認列合約
        public Guid PSI_DOC_GUID { get; set; }  // 進貨or出貨的GUID
        public Guid CONTRACT_TYPE { get; set; }  // 進貨 出貨  進出貨
        public double CALCULATE_WEIGHT { get; set; }  // 認列重量
        public string IS_EFFECTIVE { get; set; }  // Default 1
        public string REMARK { get; set; }
    }
}
