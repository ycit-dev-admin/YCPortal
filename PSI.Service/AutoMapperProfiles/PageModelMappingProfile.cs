using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperMappActions;
using PSI.Service.IService;

namespace PSI.Service.Mappings
{
    public class PageModelMappingProfile : Profile
    {
        // PageModel -> Entity
        public PageModelMappingProfile()
        {
            this.CreateMap<WeightNoteCreateWeightNote, SalesWeightNote>()
                .ForMember(tar => tar.CUSTOMER_UNID, ss => ss.MapFrom(src => src.CustomerUNID))
                .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => src.ScaleNo))
                .ForMember(tar => tar.SALES_WEIGHT, ss => ss.MapFrom(src => src.SalesWeight))
                .ForMember(tar => tar.CARNO_UNID, ss => ss.MapFrom(src => src.CarNoUNID))
                .ForMember(tar => tar.EXCAVATOR_OPERATOR_UNID, ss => ss.MapFrom(src => src.ExcavatorOperUNID))
                .ForMember(tar => tar.SALES_TIME, ss => ss.MapFrom(src => src.SalesTime))
                .ForMember(tar => tar.CONTRACT_UNID, ss => ss.MapFrom(src => src.ContractUNID))
                .ForMember(tar => tar.UNID, ss => ss.MapFrom(src => Guid.NewGuid()))
                .ForMember(tar => tar.CONTRACT_UNID, ss => ss.MapFrom(src => src.ContractUNID))
                .ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                .ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                .ForMember(tar => tar.NOTE_STATUS, ss => ss.MapFrom(src => (int)PSIWeightNoteEnum.SWeightNotesStatus.CreateDoc))
               .AfterMap<WeightNoteCreateWeightNote_ToEntityAction>();


        }
    }


}
