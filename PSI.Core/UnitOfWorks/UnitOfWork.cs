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
        public IGenericRepository<PurchaseWeightNote> PurchaseWeightNoteRepository { get; private set; }
        public IGenericRepository<CustomerInfo> CustomerInfoRepository { get; private set; }
        public IGenericRepository<CustomerContract> CustomerContractRepository { get; private set; }
        public IGenericRepository<CustomerContractLog> CustomerContractLogRepository { get; private set; }
        public IGenericRepository<CustomerCar> CustomerCarRepository { get; private set; }
        public IGenericRepository<ProductItem> ProductItemRepository { get; private set; }
        public IGenericRepository<CodeTable> CodeTableRepository { get; private set; }
        public IGenericRepository<PurchaseIngredient> PurchaseIngredientRepository { get; private set; }
        public IGenericRepository<SeqTypeConfig> SeqTypeConfigRepository { get; private set; }
        public IGenericRepository<SalesWeightNote> SalesWeightNoteRepository { get; private set; }
        public IGenericRepository<SalesWeightNoteResultPrice> SalesWeightNoteResultPriceRepository { get; private set; }
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
            IGenericRepository<SalesWeightNote> salesWeightNoteRepository,
            IGenericRepository<SalesWeightNoteResultPrice> salesWeightNoteResultPriceRepository,
            IGenericRepository<SalesIngredient> salesIngredientRepository)



        {
            this.Context = context;
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
        /// Context
        /// </summary>
        public DbContext Context { get; private set; }

        /// <summary>
        /// Dispose
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
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
                this.Context.SaveChanges();
                funcRs.ResultSuccess("Commit success.");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }

            return funcRs;
        }

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.Context.Dispose();
                    this.Context = null;
                }
            }
            this.disposed = true;
        }
    }
}
