using System;

namespace PSI.Core.Entities
{
    public class CustomerInfo : Entity
    {
        public Guid CUSTOMER_GUID { get; set; }
        public string COMPANY_NAME { get; set; }
        public string TAX_ID { get; set; }
        public string TITLE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string ADDRESS { get; set; }
        public string CONTENT_INFO { get; set; }
        public string PSI_TYPE { get; set; }  // 進出貨類型的客戶(1:進貨 2:出貨 3:Both)
        public string IS_EFECTIVE { get; set; }
        public bool? IS_CONTRACT { get; set; }
        public string REMARK { get; set; }
    }
}
