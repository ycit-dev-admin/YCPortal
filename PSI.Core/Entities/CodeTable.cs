using System;
using System.Collections.Generic;
using System.Text;

namespace PSI.Core.Entities
{
    public class CodeTable : Entity
    {
        public string CODE_GROUP { get; set; }
        public string CODE_VALUE { get; set; }
        public string CODE_TEXT { get; set; }
        public int? SORT { get; set; }
        public string IS_EFFECTIVE { get; set; }
    }
}
