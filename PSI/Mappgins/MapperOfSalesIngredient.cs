using System;
using System.Linq;
using AutoMapper;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Mappgins.Interface;
using PSI.Models.PEModels;
using PSI.Service.IService;

namespace PSI.Mappgins
{
    public class MapperOfSalesIngredient : IMapperOfSalesIngredient
    {
     

        public MapperOfSalesIngredient()
        {
        
        }

        public IMapper SalesWeightNoteCreate<T>() 
        {

            return new MapperConfiguration(cfg =>
            cfg.CreateMap<PE_SalesIngredient, SalesIngredient>()).CreateMapper();
        }




    }
}

