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
            this.CreateMap<S_WeightNote, DTO_S_WeightNote>()
               .AfterMap<S_WeightNote_MapProfile_Action1>();
        }
    }


}
