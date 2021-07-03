using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Core.Interfaces.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        ///
        /// </summary>
        IGenericRepository<PurchaseWeightNote> PurchaseWeightNoteRepository { get; }
        IGenericRepository<CustomerInfo> CustomerInfoRepository { get; }
        IGenericRepository<CustomerContract> CustomerContractRepository { get; }
        IGenericRepository<ProductItem> ProductItemRepository { get; }

        /// <summary>
        /// DB Context
        /// </summary>
        DbContext Context { get; }

        /// <summary>
        /// Saves the change.
        /// </summary>
        /// <returns></returns>
        int SaveChange();
    }
}
