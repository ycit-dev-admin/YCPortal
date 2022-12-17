using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;
using PSI.Core.Models.PageModels.Areas.Sales;
using PSI.Service.IService;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class S_WeightNote_Ingredient_MapProfile : Profile
    {

        public S_WeightNote_Ingredient_MapProfile()
        {
            this.CreateMap<S_WeightNote_Ingredient, DTO_S_WeightNote_Ingredient>()
               .AfterMap<S_WeightNote_Ingredient_MapProfile_Action1>();
        }
    }


}
