using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace PSI.Core.Enums
{
    public class PSIWeightNoteEnum
    {
        public enum PWeightNotesStatus
        {
            [Description("未結清")]
            Ongo = 0,
            [Description("已結清")]
            Completed = 1,
            [Description("臨時客戶建立異常")]
            CustomerError = 10,
            [Description("進貨磅單建立異常")]
            WeightNoteError = 11,
            [Description("合約紀錄建立異常")]
            ContractLogError = 12
        }
    }
}
