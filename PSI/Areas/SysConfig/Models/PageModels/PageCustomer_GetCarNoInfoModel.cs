using System;
using System.Collections.Generic;

namespace PSI.Areas.SysConfig.Models
{
    public class PageCustomer_GetCarNoInfoModel
    {
        // For Post

        // For Show      
        public Guid CustomerGUID { get; set; }
        public Guid CarGUID { get; set; }
        public string CarName { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }

        // Page
        public string ActionType { get; set; }

    }
}
