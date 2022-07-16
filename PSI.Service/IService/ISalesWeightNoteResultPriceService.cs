using System;
using PSI.Core.Entities;

namespace PSI.Service.IService
{
    public interface ISalesWeightNoteResultPriceService
    {
        SalesWeightNoteResultPrice GetEstimateSalesWeightNoteResultPrice(Guid salesWeightNoteDocGUID);


    }
}
