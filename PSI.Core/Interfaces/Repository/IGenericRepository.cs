using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PSI.Core.Helpers;

namespace PSI.Core.Interfaces.Repository
{
    public interface IGenericRepository<TEntity> : IDisposable where TEntity : class
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">實體</param>
        FunctionResult Create(TEntity entity);

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">實體</param>
        FunctionResult Create(List<TEntity> entityLs);

        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity">實體</param>
        FunctionResult<TEntity> Create2(TEntity entity);

        void CreateNotSave(TEntity entity);
        void CreateNotSave(List<TEntity> entityLs);

        /// <summary>
        /// 取得全部
        /// </summary>
        /// <returns></returns>
        Task<ICollection<TEntity>> GetAllAsync();

        /// <summary>
        /// 取得單筆
        /// </summary>
        /// <param name="predicate">查詢條件</param>
        /// <returns></returns>
        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// 刪除
        /// </summary>
        /// <param name="entity">實體</param>
        void Remove(TEntity entity);

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">實體</param>
        FunctionResult<TEntity> Update(TEntity entity);

        /// <summary>
        /// 更新一筆資料的內容。只更新部分欄位。
        /// Lambda 運算式 只需要傳遞欄位屬性 EX : x => { x.ColumnName1, x.Column2 }
        /// </summary>
        /// <param name="entity">要更新的內容</param>
        /// <param name="updateProperties">需要更新的欄位。</param>
        void Update(TEntity entity, Expression<Func<TEntity, object>>[] updateProperties);

        /// <summary>
        /// 取得第一筆符合條件的內容。如果符合條件有多筆，也只取得第一筆。
        /// </summary>
        /// <param name="predicate">要取得的Where條件。</param>
        /// <returns>取得第一筆符合條件的內容。</returns>
        TEntity Read(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// 取得合條件的內容。可能回傳一筆或是多筆
        /// </summary>
        /// <param name="predicate">要取得的Where條件。</param>
        /// <param name="predicates">要取得的Where條件。可新增N個條件值</param>
        /// <returns>只要符合條件則回傳全部筆數的IQueryable。</returns>
        IQueryable<TEntity> Reads(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, bool>>[] predicates);
        IQueryable<TEntity> Reads2(params Expression<Func<TEntity, bool>>[] predicates);

        /// <summary>
        /// 取得Entity全部筆數的IQueryable。
        /// </summary>
        /// <returns>Entity全部筆數的IQueryable。</returns>
        IQueryable<TEntity> Reads();
    }
}
