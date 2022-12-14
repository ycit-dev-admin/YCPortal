using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Enums;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.AutoMapperProfiles.Entity;
using PSI.Service.IService;
using System;

namespace PSI.Service.AutoMapperProfiles.PageMoedl
{
    public class WeightNoteCreateWeightNote_MapProfile : Profile
    {

        public WeightNoteCreateWeightNote_MapProfile()
        {


            // Entity -> DTOModel
            //CreateMap<S_WeightNote, DTO_SalesWeightNote>()
            //    .AfterMap<S_WeightNote_MapProfile_Action1>();
            CreateMap<WeightNoteCreateWeightNote, S_WeightNote>()
                .ForMember(tar => tar.UNID, ss => ss.MapFrom(src => Guid.NewGuid()))
                .ForMember(tar => tar.CUSTOMER_UNID, ss => ss.MapFrom(src => src.CustomerUNID))
                .ForMember(tar => tar.CARNO_UNID, ss => ss.MapFrom(src => src.CarNoUNID))
                .ForMember(tar => tar.SALES_TIME, ss => ss.MapFrom(src => src.SalesTime))
                .ForMember(tar => tar.SCALE_NO, ss => ss.MapFrom(src => src.ScaleNo))
                .ForMember(tar => tar.EXCAVATOR_OPERATOR_UNID, ss => ss.MapFrom(src => src.ExcavatorOperUNID))
                .ForMember(tar => tar.NOTE_STATUS, ss => ss.MapFrom(src => (int)S_Enum.WeightNotesStatus.CreateDoc))
                .ForMember(tar => tar.INSIDE_SALES_WEIGHT, ss => ss.MapFrom(src => src.SalesWeight))
                .ForMember(tar => tar.REMARK, ss => ss.MapFrom(src => src.Remark))
                .ForMember(tar => tar.CREATE_TIME, ss => ss.MapFrom(src => DateTime.Now))
                .ForMember(tar => tar.UPDATE_TIME, ss => ss.MapFrom(src => DateTime.Now));

            //.AfterMap<WeightNoteCreateWeightNote_MapProfile_Action1>();
            //.AfterMap((ss, tt) =>
            //{
            //    var qq = psiService.GetWeightNoteDocNo("A", Core.Enums.PSIEnum.PSIType.Purchase);
            //    tt.DOC_NO = "45678";
            //});


        }
    }


}
