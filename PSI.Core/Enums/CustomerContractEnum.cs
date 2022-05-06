using System.ComponentModel;

namespace PSI.Core.Enums
{
    public class CustomerContractEnum
    {
        public enum Status
        {
            [Description("生效中")]
            Ongoing = 1,
            [Description("已過期")]
            OverTime = 2,
            [Description("合約完成")]
            Completed = 3,
            [Description("強制完成")]
            ForceCompleted = 9
        }
        public enum Types
        {
            [Description("進貨合約")]
            Purchase = 0,
            [Description("出貨合約")]
            Sale = 1,
        }
    }
}
