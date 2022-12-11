using Microsoft.EntityFrameworkCore;
using PSI.Core.Helpers;
using PSI.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var funcRs = new FunctionResult(this);

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
            //catch (DbUpdateException dbEx)
            //{
            //    funcRs.ResultFailure(dbEx.Message);
            //}
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.InnerException.Message);
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
        /// 新增
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public FunctionResult<TEntity> Create2(TEntity entity)
        {
            var funcRs = new FunctionResult<TEntity>(this);

            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            try
            {
                _context.Set<TEntity>().Add(entity);
                //this.SaveChanges();
                funcRs.ResultSuccess("新增成功", entity);
            }
            //catch (DbUpdateException dbEx)
            //{
            //    funcRs.ResultFailure(dbEx.Message);
            //}
            catch (Exception ex)
            {
                funcRs.ResultFailure(ex.InnerException.Message);
            }



            return funcRs;
        }

        public void CreateNotSave(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");


            this._context.Set<TEntity>().Add(entity);
        }

        public void CreateNotSave(List<TEntity> entityLs)
        {
            if (entityLs == null)
                throw new ArgumentNullException("entityLs");

            entityLs.ForEach(item =>
            {
                this._context.Set<TEntity>().Add(item);
            });
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
        /// 取得合條件的內容。可能回傳一筆或是多筆 IQueryable
        /// </summary>
        /// <param name="predicate">要取得的Where條件。</param>
        /// <param name="predicates">要取得的Where條件。可新增N個條件值</param>
        /// <returns>只要符合條件則回傳全部筆數的IQueryable。</returns>
        public IQueryable<TEntity> Reads(Expression<Func<TEntity, bool>> predicate,
            params Expression<Func<TEntity, bool>>[] predicates)
        {
            var datas = this._context.Set<TEntity>().Where(predicate).AsNoTracking();
            if (predicates != null)
            {
                foreach (var expression in predicates)
                {
                    datas = datas.Where(expression);
                }
            }
            return datas;
        }
        public IQueryable<TEntity> Reads2(params Expression<Func<TEntity, bool>>[] predicates)
        {
            var datas = this._context.Set<TEntity>().AsQueryable();
            if (predicates == null) return datas;

            foreach (var expression in predicates)
                datas = datas.Where(expression);

            return datas;
        }

        /// <summary>
        /// 取得Entity全部筆數的IQueryable。
        /// </summary>
        /// <returns>Entity全部筆數的IQueryable。</returns>
        public IQueryable<TEntity> Reads()
        {
            return this._context.Set<TEntity>().AsQueryable();
        }

        /// <summary>
        /// 取得第一筆符合條件的內容。如果符合條件有多筆，也只取得第一筆。
        /// </summary>
        /// <param name="predicate">要取得的Where條件。</param>
        /// <returns>取得第一筆符合條件的內容。</returns>
        public TEntity Read(Expression<Func<TEntity, bool>> predicate)
        {
            return this._context.Set<TEntity>().FirstOrDefault(predicate);
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
        public FunctionResult<TEntity> Update(TEntity entity)
        {
            var funcRs = new FunctionResult<TEntity>(this);
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            try
            {
                //this._context.Entry(entity).State = EntityState.Modified;
                _context.Set<TEntity>().Update(entity);
                //this.SaveChanges();
                funcRs.ResultSuccess("更新成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultException(ex);
            }
            return funcRs;
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">實體</param>
        /// <exception cref="ArgumentNullException">entity</exception>
        public FunctionResult<List<TEntity>> Update(List<TEntity> entity)
        {
            var funcRs = new FunctionResult<List<TEntity>>(this);
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            try
            {
                //this._context.Entry(entity).State = EntityState.Modified;
                _context.Set<TEntity>().UpdateRange(entity);
                //this.SaveChanges();
                funcRs.ResultSuccess("更新成功");
            }
            catch (Exception ex)
            {
                funcRs.ResultException(ex);
            }
            return funcRs;
        }

        /// <summary>
        /// 更新一筆資料的內容。只更新部分欄位的。
        /// Lambda 運算式 只需要傳遞欄位屬性 EX : x => x.ColumnName1, x => x.Column2....
        /// </summary>
        /// <param name="entity">要更新的內容</param>
        /// <param name="updateProperties">需要更新的欄位。</param>
        public void Update(TEntity entity, Expression<Func<TEntity, object>>[] updateProperties)
        {
            // 想要略過 EF 檢查 關閉自動追蹤實體的驗證 (.net core 應該不需要 可參考https://blog.miniasp.com/post/2022/04/23/EF-Core-has-no-ValidateOnSaveEnabled-anymore)
            // this._context.Configuration.ValidateOnSaveEnabled = false;

            // 其屬性還未更新到資料庫 但先做紀錄
            this._context.Entry(entity).State = EntityState.Unchanged;

            if (updateProperties != null)
            {
                // 確認那些欄位是要修改的做上記號
                foreach (var item in updateProperties)
                {
                    this._context.Entry(entity).Property(item).IsModified = true;
                }
            }
        }



        //public void SaveChanges()
        //{
        //    this._context.SaveChanges();
        //}



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
