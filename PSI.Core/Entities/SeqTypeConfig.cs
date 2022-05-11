using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PSI.Core.Entities
{
    public class SeqTypeConfig : Entity
    {
        public string SEQ_TYPE { get; set; }
        public long SEQ_NO { get; set; }

    }
}
