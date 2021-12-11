using AutoMapper;
using Microsoft.AspNetCore.Identity;
using PSI.Areas.SysConfig.Models;
using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Models.PageModels;
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
