using Jin.Hona;
using Jin.Hona.Operations.Settings;
using Jin.Hona.Runtimes;

namespace Jin.Bootstrap.Models
{
    public class BaseViewModel
    {
        public Runtime Runtime { get; set; } = HonaFactory.Runtime;

        public Setting Setting { get; set; } = HonaFactory.Runtime.Setting;
    }
}