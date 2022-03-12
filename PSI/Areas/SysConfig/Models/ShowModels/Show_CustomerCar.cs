using System;

namespace PSI.Areas.SysConfig.Models.ShowModels
{
    public class Show_CustomerCar
    {
        public Guid CustomerGUID { get; set; }
        public Guid CarGUID { get; set; }
        public string CarName { get; set; }
    }
}
