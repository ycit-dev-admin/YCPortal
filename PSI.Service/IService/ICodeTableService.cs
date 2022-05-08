using PSI.Core.Entities;
using PSI.Core.Entities.Identity;
using PSI.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace PSI.Service.IService
{
    public interface ICodeTableService
    {
        /* CodeTable */
        IQueryable<CodeTable> GetPayTypeItems();
        IQueryable<CodeTable> GetPsiTypeItems();
    }
}
