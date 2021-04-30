using Microsoft.EntityFrameworkCore;
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
        //IGenericRepository<Blog> BlogRepository { get; }

        /// <summary>
        /// DB Context
        /// </summary>
        DbContext Context { get; }

        /// <summary>
        /// Saves the change.
        /// </summary>
        /// <returns></returns>
        Task<int> SaveChangeAsync();
    }
}
