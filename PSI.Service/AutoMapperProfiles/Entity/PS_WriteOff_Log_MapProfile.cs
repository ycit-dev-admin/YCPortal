using AutoMapper;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;

namespace PSI.Service.AutoMapperProfiles.Entity
{
    public class PS_WriteOff_Log_MapProfile : Profile
    {

        public PS_WriteOff_Log_MapProfile()
        {
            this.CreateMap<PS_WriteOff_Log, DTO_PS_WriteOff_Log>();
        }
    }


}
