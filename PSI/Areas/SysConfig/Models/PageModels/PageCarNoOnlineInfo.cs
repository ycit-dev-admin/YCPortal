using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using PSI.Models.VEModels;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class PageCarNoOnlineInfo
    {
        // For Bidding


        // For Page
        public List<VE_CustomerCar> CustomerCarInfoLs { get; set; }
        public List<SelectListItem> CustomerInfoItems { set; get; }

    }
}
