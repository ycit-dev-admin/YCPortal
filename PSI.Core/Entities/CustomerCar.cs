using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CustomerCar : Entity
    {
        public Guid CAR_GUID { get; set; }
        public Guid CUSTOMER_GUID { get; set; }
        public int CAR_NO_TYPE { get; set; }   // 車牌類型  有內部 有外部
        public long CUSTOMER_ID { get; set; }
        public string CAR_NAME { get; set; }
        public string IS_EFFECTIVE { get; set; }
        public string REMARK { get; set; }
    }
}
