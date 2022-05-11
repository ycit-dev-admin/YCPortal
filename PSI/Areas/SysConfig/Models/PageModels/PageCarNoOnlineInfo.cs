using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCarNoOnlineInfo
    {
        // For Bidding


        // For Page
        public List<VE_CustomerCar> CustomerCarLs { get; set; }
        public List<VE_CustomerInfo> CustomerInfoLs { set; get; }

    }
}
