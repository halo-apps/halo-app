using Hona.Drivers.Providers.Attributes;
using Hona.Igniters.Centrals;

namespace Hona.Igniters.Models
{
    /// <summary>
    /// 角色资源表
    /// </summary>
    [Table("Sys_Role_Resource")]
    public class SysRoleResource : BaseCtl
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        [Identity]
        public int Id { get; set; }

        /// <summary>
        /// 角色
        /// </summary>
        public string RoleId { get; set; }

        /// <summary>
        /// 资源
        /// </summary>
        public string ResourceId { get; set; }
    }
}