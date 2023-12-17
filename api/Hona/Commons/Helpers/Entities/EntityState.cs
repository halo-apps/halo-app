namespace Hona.Commons.Helpers.Entities
{
    /// <summary>
    /// 实体状态的枚举
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// 添加
        /// </summary>
        Inserted = 1,

        /// <summary>
        /// 更新
        /// </summary>
        Updated = 2,

        /// <summary>
        /// 删除
        /// </summary>
        Deleted = 3,

        /// <summary>
        /// 未改变
        /// </summary>
        Unchanged = 4
    }
}