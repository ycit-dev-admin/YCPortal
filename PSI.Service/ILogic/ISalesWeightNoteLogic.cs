using System.Collections.Generic;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;

namespace PSI.Service.ILogic
{
    public interface ISalesWeightNoteLogic
    {
        FunctionResult<S_WeightNote> CreateSalesWeightNote<T1, T2, T3>(T1 salesWeightNote,
         List<T2> s,
         T3 salesWeightNoteResultPrice,
         string docNo,
         AppUser operUserInfo);

    }
}
