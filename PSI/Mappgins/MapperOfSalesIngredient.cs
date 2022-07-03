using System;
using System.Linq;
using AutoMapper;
using PSI.Areas.Sales.Models.PageModels;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Mappgins.Interface;
using PSI.Models.VEModels;
using PSI.Service.IService;

namespace PSI.Mappgins
{
    public class MapperOfSalesIngredient : IMapperOfSalesIngredient
    {
        private readonly IPsiService _iPsiService;

        public MapperOfSalesIngredient(IPsiService iPsiService)
        {
            _iPsiService = iPsiService;
        }

        public IMapper SalesWeightNoteCreate<T>() where T : PE_SalesIngredient
        {

            return new MapperConfiguration(cfg =>
            cfg.CreateMap<PE_SalesIngredient, SalesIngredient>()).CreateMapper();
        }




    }
}

