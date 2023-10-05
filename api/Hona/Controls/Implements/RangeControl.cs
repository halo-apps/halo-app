namespace Hona.Controls.Implements
{
    /// <summary>
    /// 整型范围控件
    /// </summary>
    [Control("Range")]
    public class RangeControl : Control
    {
        /// <summary>
        /// 最小值
        /// </summary>
        public int Min { get; set; }

        /// <summary>
        /// 最大值
        /// </summary>
        public int Max { get; set; }
    }
}