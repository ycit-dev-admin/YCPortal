using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace PSI.Core.Enums
{
    public class P_Enum
    {
        public enum WeightNotesStatus // 進貨磅單狀態
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
        

       


      
    }
}
