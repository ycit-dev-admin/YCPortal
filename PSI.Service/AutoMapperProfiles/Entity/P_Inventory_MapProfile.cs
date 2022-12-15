using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class P_Inventory_MapProfile : Profile
    {

        public P_Inventory_MapProfile()
        {
            this.CreateMap<P_Inventory, DTO_P_Inventory>();
        }
    }


}
