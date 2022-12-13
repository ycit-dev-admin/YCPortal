using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using System.Collections.Generic;

namespace PSI.Service.Logic.ILogic
{
    public interface ISalesWeightNoteLogic
    {
        FunctionResult<S_WeightNote> CreateSalesWeightNote<T1, T2>(T1 tWeightNote, List<T2> tWeightNoteIngredient, AppUser operUserInfo)
        where T1 : class
                 where T2 : class;

    }
}
