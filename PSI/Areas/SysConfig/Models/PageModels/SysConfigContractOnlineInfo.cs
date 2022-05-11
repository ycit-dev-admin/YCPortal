using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models
{
    public class SysConfigContractOnlineInfo
    {
        // Post

        // Entity

        // Page
        public List<SelectListItem> ContractTypeItems { set; get; }
        public List<VE_CustomerInfo> VeCustomerInfoList { get; set; }
        public List<VE_CustomerContract> VeCustomerContractList { get; set; }
        public Dictionary<string, double> CompletedWeightDic { get; set; }

    }
}
