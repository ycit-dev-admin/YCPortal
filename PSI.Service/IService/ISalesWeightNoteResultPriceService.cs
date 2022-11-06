using System;
using PSI.Core.Entities;

namespace PSI.Service.IService
{
    public interface ISalesWeightNoteResultPriceService
    {
        SalesWeightNoteStepData GetEstimateSalesWeightNoteResultPrice(Guid salesWeightNoteDocGUID);


    }
}
