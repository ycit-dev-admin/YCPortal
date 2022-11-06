using System;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IHelper;

namespace PSI.Service.Mappings
{

    public class VVVMappings : Profile
    {

        public VVVMappings()
        {
            // DTOModel -> Entity
            this.CreateMap<WeightNoteCreateWeightNote, SalesWeightNote>()
                .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => 965432))
                .ForMember(tar => tar.REMARK, ss => ss.MapFrom(src => "lulala"));



            //.AfterMap((src, tar) =>
            //{
            //    tar.RECEIVED_PRICE = tar.INVOICE_PRICE - tar.TRAFIC_FEE;
            //});



        }
    }


}
