using System;
using System.ComponentModel;
using System.Linq;

namespace PSI.Core.Enums
{
    public class S_Enum
    {
        public enum WriteOffLogStatus  // 庫存狀態  // 1:有效沖銷紀錄  0:無效沖銷紀錄
        {
            [Description("有效")]
            Available = 0,
            [Description("無效")]
            Unavailable = 1
        }

        public enum WeightNotesStatus // 出貨磅單狀態
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
        public enum InspectMethord // 客戶評級驗收方式
        {
            [Description("整批驗收")]
            LotInspection = 1,
            [Description("品項驗收")]
            ItemInspection = 2
        }


        public static IQueryable<WeightNotesStatus> GetOngoSalesWeightDocStatus()
        {
            return new[] { WeightNotesStatus.CreateDoc }.AsQueryable();
        }
        public static IQueryable<InspectMethord> GetAllInspectMethords()
        {
            return Enum.GetValues(typeof(InspectMethord))
                        .Cast<InspectMethord>().AsQueryable();
        }
    }
}
