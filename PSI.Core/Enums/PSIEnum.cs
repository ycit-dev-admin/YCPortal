using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace PSI.Core.Enums
{
    public class PSIEnum
    {
        public enum PSIType
        {
            [Description("進貨")]
            Purchase = 0,
            [Description("出貨")]
            Sale = 1,
            [Description("進出貨")]
            Both = 2
        }
    }
}
