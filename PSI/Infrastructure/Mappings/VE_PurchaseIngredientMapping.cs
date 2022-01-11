using AutoMapper;
using PSI.Core.Entities;
using PSI.Models.VEModels;

namespace PSI.Infrastructure.Mappings
{
    public class VE_PurchaseIngredientMapping : Profile
    {
        public VE_PurchaseIngredientMapping()
        {
            CreateMap<VE_PurchaseIngredient, PurchaseIngredient>().ReverseMap();
        }
    }
}
