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
        IGenericRepository<S_WeightNote> SalesWeightNoteRepository { get; }
        IGenericRepository<SalesIngredient> SalesIngredientRepository { get; }
        IGenericRepository<SeqTypeConfig> SeqTypeConfigRepository { get; }
        IGenericRepository<SalesWeightNoteStepData> SalesWeightNoteResultPriceRepository { get; }


        /// <summary>
        /// DB Context
        /// </summary>
       // DbContext Context { get; }

        /// <summary>
        /// Saves the change.
        /// </summary>
        /// <returns></returns>
        FunctionResult SaveChange();

        /// <summary>
        /// 取得某一個Entity的Repository。
        /// 如果沒有取過，會initialise一個
        /// 如果有就取得之前initialise的那個。
        /// 產生出 UnitOfWork 的物件時 可循環利用該方法達到節省記憶體空間之功能
        /// </summary>
        /// <typeparam name="T">此Context裡面的Entity Type</typeparam>
        /// <returns>Entity的Repository</returns>
        IGenericRepository<T> GetRepository<T>() where T : class;
    }
}
