namespace Hona.Commons.Helpers.Entities
{
    /// <summary>
    /// 实体变动
    /// </summary>
    public class ListEntityDelta<T>
    {
        /// <summary>
        /// 实体状态
        /// </summary>
        public EntityState State { get; set; }

        /// <summary>
        /// 旧值
        /// </summary>
        public T Old { get; set; }

        /// <summary>
        /// 新值
        /// </summary>
        public T New { get; set; }
    }
}