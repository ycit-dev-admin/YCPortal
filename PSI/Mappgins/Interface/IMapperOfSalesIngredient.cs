using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using PSI.Models.VEModels;

namespace PSI.Mappgins.Interface
{
    public interface IMapperOfSalesIngredient
    {
        IMapper SalesWeightNoteCreate<T>();
    }
}
