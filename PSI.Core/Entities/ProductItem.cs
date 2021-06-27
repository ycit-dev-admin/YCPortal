using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class ProductItem : Entity
    {
        public string ProductName { get; set; }
        public string PsiType { get; set; }
        //public string Title { get; set; }
        public string IsEffective { get; set; }
        public string Remark { get; set; }  
    }
}
