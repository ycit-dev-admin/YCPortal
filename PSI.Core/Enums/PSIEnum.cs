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
            Purchase = 1,
            [Description("出貨")]
            Sale = 2,
            [Description("進出貨")]
            Both = 5
        }
    }
}
