using System.Collections.Generic;
using PSI.Core.Entities;
using PSI.Core.Models.DTOModels;


namespace PSI.Service.IService
{
    public interface ICodeTableServiceNew : IGenericService<CodeTable>
    {
        /* CodeTable */
        List<DTO_CodeTable> GetPayTypeItems();
        List<DTO_CodeTable> GetReceivedTypeItems();
    }
}
