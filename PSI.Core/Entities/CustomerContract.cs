using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerContract : Entity
    {
        public Guid CONTRACT_GUID { get; set; }
        public string CONTRACT_NAME { get; set; }  // 合約名稱
        public Guid CUSTOMER_GUID { get; set; }
        public Guid PRODUCT_GUID { get; set; }         // 合約認列品項
        public int CONTRACT_TYPE { get; set; }
        public DateTime START_DATETIME { get; set; }
        public DateTime END_DATETIME { get; set; }
        public string EXPIRE_REASON { get; set; }
        public double DEAL_WEIGHT { get; set; }
        public double DEAL_UNIT_PRICE { get; set; }
        // public double ACTUAL_WEIGHT { get; set; }
        public int CONTRACT_STATUS { get; set; }
        public string REMARK { get; set; }
    }
}
