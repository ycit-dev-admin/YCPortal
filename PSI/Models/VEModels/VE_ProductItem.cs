using System;

namespace PSI.Models.VEModels
{
    public class VE_ProductItem
    {
        public Guid ProductGUID { get; set; }
        public string ProductName { get; set; }
        public string PsiType { get; set; }
        //public string Title { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }
        public string UpdateEmpInfo { get; set; }
        public DateTime UpdateTime { get; set; }

    }
}
