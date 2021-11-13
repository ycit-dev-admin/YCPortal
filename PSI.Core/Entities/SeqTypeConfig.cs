using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PSI.Core.Entities
{
    public class SeqTypeConfig
    {
        [Key]
        public string SeqType { get; set; }
        public long SeqNo { get; set; }

    }
}
