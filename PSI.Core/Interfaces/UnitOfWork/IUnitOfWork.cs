using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Helpers;
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
        IGenericRepository<CustomerContractLog> CustomerContractLogRepository { get; }
        IGenericRepository<CustomerCar> CustomerCarRepository { get; }
        IGenericRepository<ProductItem> ProductItemRepository { get; }
        IGenericRepository<CodeTable> CodeTableRepository { get; }
        IGenericRepository<PurchaseIngredient> PurchaseIngredientRepository { get; }
        IGenericRepository<SalesWeightNote> SalesWeightNoteRepository { get; }
        IGenericRepository<SalesIngredient> SalesIngredientRepository { get; }
        IGenericRepository<SeqTypeConfig> SeqTypeConfigRepository { get; }

        /// <summary>
        /// DB Context
        /// </summary>
        DbContext Context { get; }

        /// <summary>
        /// Saves the change.
        /// </summary>
        /// <returns></returns>
        FunctionResult SaveChange();
    }
}
