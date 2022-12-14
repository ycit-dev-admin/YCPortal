using System;
using System.Collections.Generic;
using System.Linq;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.IService
{
    public interface ISalesWeightNoteService : IGenericService<S_WeightNote>
    {

        List<DTO_S_WeightNote> GetDTOOngoSalesWeightDocs();
    }
}
