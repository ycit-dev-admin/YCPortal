using Microsoft.EntityFrameworkCore;
using PSI.Core.Entities;
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

        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWork"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="purchaseWeightNoteRepository">The blog repository.</param>
        public UnitOfWork(
            DbContext context,
            IGenericRepository<PurchaseWeightNote> purchaseWeightNoteRepository)
        {
            this.Context = context;
            this.PurchaseWeightNoteRepository = purchaseWeightNoteRepository;
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
        public int SaveChange()
        {
            return this.Context.SaveChanges();
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
