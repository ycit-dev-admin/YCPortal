using Microsoft.EntityFrameworkCore;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PSI.Core.Repositorys
{
    /// <summary>
    ///
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <seealso cref="Sample.Repository.Interface.IGenericRepository{TEntity}" />
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {

        /// <summary>
        /// UnitOfWork 實體
        /// </summary>
        private readonly DbContext _context;
        private bool disposedValue;

        /// <summary>
        /// Initializes a new instance of the <see cref="GenericRepository{TEntity}"/> class.
        /// </summary>
        /// <param name="context">db context.</param>
        public GenericRepository(DbContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public FunctionResult Create(TEntity entity)
        {
            var funcRs = new FunctionResult();

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                _context.Set<TEntity>().Add(entity);
                this.SaveChanges();
                funcRs.ResultSuccess("新增成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }



            return funcRs;
        }
        /// <summary>
        /// 新增多筆
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public FunctionResult Create(List<TEntity> entityLs)
        {
            var funcRs = new FunctionResult();
            if (entityLs == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                _context.Set<TEntity>().AddRange(entityLs);
                this.SaveChanges();
                funcRs.ResultSuccess("新增成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }
            return funcRs;
        }

        public FunctionResult CreateNotSave(TEntity entity)
        {
            var funcRs = new FunctionResult();

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                _context.Set<TEntity>().Add(entity);
                //this.SaveChanges();
                funcRs.ResultSuccess("新增成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }



            return funcRs;
        }

        public FunctionResult CreateNotSave(List<TEntity> entityLs)
        {
            var funcRs = new FunctionResult();
            if (entityLs == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                _context.Set<TEntity>().AddRange(entityLs);
                //this.SaveChanges();
                funcRs.ResultSuccess("新增成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.Message);
            }
            return funcRs;
        }

        /// <summary>
        /// 取得全部
        /// </summary>
        /// <returns></returns>
        public async Task<ICollection<TEntity>> GetAllAsync()
        {
            return await this._context.Set<TEntity>().ToListAsync();
        }

        /// <summary>
        /// 取得全部
        /// </summary>
        /// <returns></returns>
        //public ICollection<TEntity> GetAll()
        //{
        //    return this._context.Set<TEntity>().ToList();
        //}

        /// <summary>
        /// 取得單筆
        /// </summary>
        /// <param name="predicate">查詢條件</param>
        /// <returns></returns>
        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await this._context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        /// <summary>
        /// 刪除
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public void Remove(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            this._context.Entry(entity).State = EntityState.Deleted;
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public void Update(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            this._context.Entry(entity).State = EntityState.Modified;
        }
        public void SaveChanges()
        {
            this._context.SaveChanges();
        }



        // // TODO: 僅有當 'Dispose(bool disposing)' 具有會釋出非受控資源的程式碼時，才覆寫完成項
        // ~GenericRepository()
        // {
        //     // 請勿變更此程式碼。請將清除程式碼放入 'Dispose(bool disposing)' 方法
        //     Dispose(disposing: false);
        // }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: 處置受控狀態 (受控物件)
                }

                // TODO: 釋出非受控資源 (非受控物件) 並覆寫完成項
                // TODO: 將大型欄位設為 Null
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // 請勿變更此程式碼。請將清除程式碼放入 'Dispose(bool disposing)' 方法
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

      

        // private bool _disposedValue;
        //protected virtual void Dispose(bool disposing)
        //{
        //    if (!_disposedValue)
        //    {
        //        if (disposing)
        //        {

        //        }
        //        _disposedValue = true;
        //    }
        //}


    }
}
