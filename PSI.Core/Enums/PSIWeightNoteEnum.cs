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

        public enum P_InventoryStatus // 庫存狀態  // 1:在庫存  0:已出貨
        {
            [Description("已出貨")]
            SellOut = 0,
            [Description("在庫存")]
            HasInventory = 1
        }
        public enum S_WriteOffLogStatus  // 庫存狀態  // 1:有效沖銷紀錄  0:無效沖銷紀錄
        {
            [Description("有效")]
            Available = 0,
            [Description("無效")]
            Unavailable = 1
        }

        public enum SWeightNotesStatus // 出貨磅單狀態
        {
            [Description("廠內出貨")]
            CreateDoc = 1,
            [Description("客戶收貨回填")]
            Customer = 2,
            [Description("完成")]
            Done = 3,
            [Description("單據異常")]
            ContractLogError = 90
        }


        public static IQueryable<PSIWeightNoteEnum.SWeightNotesStatus> GetOngoSalesWeightDocStatus()
        {
            return new[] { PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc }.AsQueryable();
        }
    }
}
