using System.Collections.Generic;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class SysConfigCustomerOnlineInfo
    {
        // Post

        // Entity

        // Page
        public List<VE_CustomerCar> VeCustomerCarLs { get; set; }
        public List<VE_CustomerInfo> VeCustomerInfoLs { get; set; }
        public List<VE_CustomerContract> VeCustomerContractList { get; set; }

    }
}
