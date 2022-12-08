using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
using PSI.Core.Helpers;
using PSI.Core.Infrastructure.DBContext;
using PSI.Core.Interfaces.Repository;
using PSI.Core.Interfaces.UnitOfWork;
using PSI.Core.Repositorys;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PSI.Core.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private bool disposed = false;
        //在生命週期結束前 使用 雜湊表 儲存 泛行方法 的 類型 當KEY 值
        //產生出的 instance 當 Value
        private Hashtable _repositories = null;
        private readonly DbContext _context;

        public IGenericRepository<PurchaseWeightNote> PurchaseWeightNoteRepository { get; private set; }
        public IGenericRepository<CustomerInfo> CustomerInfoRepository { get; private set; }
        public IGenericRepository<CustomerContract> CustomerContractRepository { get; private set; }
        public IGenericRepository<CustomerContractLog> CustomerContractLogRepository { get; private set; }
        public IGenericRepository<CustomerCar> CustomerCarRepository { get; private set; }
        public IGenericRepository<ProductItem> ProductItemRepository { get; private set; }
        public IGenericRepository<CodeTable> CodeTableRepository { get; private set; }
        public IGenericRepository<PurchaseIngredient> PurchaseIngredientRepository { get; private set; }
        public IGenericRepository<SeqTypeConfig> SeqTypeConfigRepository { get; private set; }
        public IGenericRepository<S_WeightNote> SalesWeightNoteRepository { get; private set; }
        public IGenericRepository<SalesWeightNoteStepData> SalesWeightNoteResultPriceRepository { get; private set; }
        public IGenericRepository<SalesIngredient> SalesIngredientRepository { get; private set; }



        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWork"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="purchaseWeightNoteRepository">The blog repository.</param>
        public UnitOfWork(
            DbContext context,
            IGenericRepository<PurchaseWeightNote> purchaseWeightNoteRepository,
            IGenericRepository<CustomerInfo> customerInfoRepository,
            IGenericRepository<CustomerContract> customerContractRepository,
            IGenericRepository<CustomerContractLog> customerContractLogRepository,
            IGenericRepository<CustomerCar> customerCarRepository,
            IGenericRepository<ProductItem> productItemRepository,
            IGenericRepository<CodeTable> codeTableRepository,
            IGenericRepository<PurchaseIngredient> purchaseIngredientRepository,
            IGenericRepository<SeqTypeConfig> seqTypeConfigRepository,
            IGenericRepository<S_WeightNote> salesWeightNoteRepository,
            IGenericRepository<SalesWeightNoteStepData> salesWeightNoteResultPriceRepository,
            IGenericRepository<SalesIngredient> salesIngredientRepository)



        {
            this._context = context;
            this.PurchaseWeightNoteRepository = purchaseWeightNoteRepository;
            this.CustomerInfoRepository = customerInfoRepository;
            this.CustomerContractRepository = customerContractRepository;
            this.CustomerContractLogRepository = customerContractLogRepository;
            this.CustomerCarRepository = customerCarRepository;
            this.ProductItemRepository = productItemRepository;
            this.CodeTableRepository = codeTableRepository;
            this.PurchaseIngredientRepository = purchaseIngredientRepository;
            this.SeqTypeConfigRepository = seqTypeConfigRepository;
            this.SalesWeightNoteRepository = salesWeightNoteRepository;
            this.SalesIngredientRepository = salesIngredientRepository;
            this.SalesWeightNoteResultPriceRepository = salesWeightNoteResultPriceRepository;
        }



        /// <summary>
        /// SaveChange
        /// </summary>
        /// <returns></returns>
        public FunctionResult SaveChange()
        {
            var funcRs = new FunctionResult();

            try
            {
                this._context.SaveChanges();
                funcRs.ResultSuccess("Commit success.");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }

            return funcRs;
        }

        /// <summary>
        /// 取得某一個Entity的Repository。
        /// 如果沒有取過，會initialise一個
        /// 如果有就取得之前initialise的那個。
        /// 產生出 UnitOfWork 的物件時 可循環利用該方法達到節省記憶體空間之功能
        /// </summary>
        /// <typeparam name="T">此Context裡面的Entity Type</typeparam>
        /// <returns>Entity的Repository</returns>
        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            if (this._repositories == null) this._repositories = new Hashtable();

            // 取得泛型中的類型型態
            var type = typeof(T).Name;

            // 雜湊表中找不到對應的類型時 創立 Key 儲存 T 類型，Value 儲存 對應的實體
            if (!this._repositories.ContainsKey(type))
            {
                // 取得通用的REPOSITORY類型
                var repositoryType = typeof(GenericRepository<>);

                // 使用 EFGenericRepository類型 與外部的傳遞的 泛型 建立出對應的實體，
                // 最後傳遞 EFGenericRepository 建構子所需的參數
                var repositoryInsetance = Activator.CreateInstance(repositoryType.MakeGenericType(
                    typeof(T)), this._context);

                // 儲存型別名稱 與對應的實例 到雜湊表之中
                this._repositories.Add(type, repositoryInsetance);
            }

            // 將雜湊表中的Object取出 並 轉型
            return (this._repositories[type] as IGenericRepository<T>);
        }

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="disposing"></param>
        //protected virtual void Dispose(bool disposing)
        //{
        //    if (!this.disposed)
        //    {
        //        if (disposing)
        //        {
        //            this._context.Dispose();
        //            this._context = null;
        //        }
        //    }
        //    this.disposed = true;
        //}


        #region IDisposable Support
        private bool disposedValue = false; // 偵測多餘的呼叫

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this._context.Dispose();
                    if (this._repositories != null)
                        this._repositories.Clear();
                    this._repositories = null;
                }
            }
            disposedValue = true;
        }

        ~UnitOfWork()  // 前面有波浪號 代表為解構函式 但也許這邊不需要... 待研究
        {
            Dispose(false);
        }

        // 加入這個程式碼的目的在正確實作可處置的模式。
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
