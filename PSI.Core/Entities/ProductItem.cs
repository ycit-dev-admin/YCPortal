using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class ProductItem : Entity
    {
        public Guid PRODUCT_UNID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public int? PSI_TYPE { get; set; }
        //public string Title { get; set; }
        public string IS_EFFECTIVE { get; set; }
        public string REMARK { get; set; }
    }
}
