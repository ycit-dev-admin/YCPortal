using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace PSI.Areas.SysConfig.Models.BindModels
{
    public class Bind_CustomerCar
    {
        public Guid CarGUID { get; set; }
        public Guid CustomerGUID { get; set; }
        public long CustomerID { get; set; }
        public string CarName { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }
        public DateTime UpdateTime { get; set; }

    }
}
