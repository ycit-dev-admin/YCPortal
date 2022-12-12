using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class S_WeightNote_MapProfile : Profile
    {
        public S_WeightNote_MapProfile()
        {
            var qq = "";
        }
        public S_WeightNote_MapProfile(IPsiService psiService)
        {
            var lala = 0;
            if (psiService == null)
                lala = 123;
            else
                lala = 456;

            // Entity -> DTOModel
            //CreateMap<S_WeightNote, DTO_SalesWeightNote>()
            //    .AfterMap<S_WeightNote_MapProfile_Action1>();
            CreateMap<S_WeightNote, DTO_SalesWeightNote>()
                .ForMember(tt => tt.DOC_NO,
                src => src.MapFrom(ss => psiService.GetWeightNoteDocNo("A", Core.Enums.PSIEnum.PSIType.Purchase)));
            //.AfterMap((ss, tt) =>
            //{
            //    var qq = psiService.GetWeightNoteDocNo("A", Core.Enums.PSIEnum.PSIType.Purchase);
            //    tt.DOC_NO = "45678";
            //});


        }
    }


}
