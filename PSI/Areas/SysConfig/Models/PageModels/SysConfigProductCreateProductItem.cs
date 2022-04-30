using System;

namespace PSI.Areas.SysConfig.Models.PageModels
{
    public class SysConfigProductCreateProductItem
    {
        // For Bidding
        public Guid CarGUID { get; set; }
        public Guid CustomerGUID { get; set; }
        public long CustomerID { get; set; }
        public Guid ProductUNID { get; set; }
        public string ProductItemName { get; set; }
        public string PsiType { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }
        public DateTime UpdateTime { get; set; }

        // For Page
        //public List<VE_CustomerCar> CustomerCarInfoLs { get; set; }

    }
}
