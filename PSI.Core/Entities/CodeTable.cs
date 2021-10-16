using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CodeTable : Entity
    {
        public string CodeGroup { get; set; }
        public string CodeValue { get; set; }
        public string CodeText { get; set; }
        public int? Sort { get; set; }
        public string IsEffective { get; set; }
    }
}
