using System;

namespace PSI.Models.VEModels
{
    public class VE_CustomerCar
    {
        public Guid CarGUID { get; set; }
        public string CustomerGUID { get; set; }
        public long CustomerID { get; set; }
        public string CarName { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }
        public string UpdateEmpInfo { get; set; }
        public DateTime UpdateTime { get; set; }

    }
}
