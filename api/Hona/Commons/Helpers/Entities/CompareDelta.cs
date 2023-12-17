using System.Collections.Generic;

namespace Hona.Commons.Helpers.Entities
{
    /// <summary>
    /// 变动比较结果
    /// </summary>
    public class CompareDelta<T>
    {
        /// <summary>
        /// 添加的数据
        /// </summary>
        public List<T> Inserted { get; set; }

        /// <summary>
        /// 修改的数据
        /// </summary>
        public List<ListEntityDelta<T>> Updated { get; set; }

        /// <summary>
        /// 删除的数据
        /// </summary>
        public List<T> Deleted { get; set; }
    }
}