using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace PSI.Core.Enums
{
    public class PSIWeightNoteEnum
    {
        public enum PWeightNotesStatus // 進貨磅單狀態
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

        public enum SWeightNotesStatus // 出貨磅單狀態
        {
            [Description("預估完成")]
            Estimate = 0,
            [Description("回寫完成")]
            Actual = 1,
            [Description("單據異常")]
            ContractLogError = 90
        }


        public static IQueryable<PSIWeightNoteEnum.SWeightNotesStatus> GetOngoSalesWeightDocStatus()
        {
            return new[] { PSIWeightNoteEnum.SWeightNotesStatus.Estimate }.AsQueryable();
        }
    }
}
