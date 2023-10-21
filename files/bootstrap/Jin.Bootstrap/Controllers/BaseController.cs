using Jin.Hona;
using Jin.Hona.Outputs;
using Jin.Hona.Requests;
using Microsoft.AspNetCore.Mvc;

namespace Jin.Bootstrap.Controllers
{
    public class BaseController : Controller
    {
        /// <summary>
        /// 获取输出信息
        /// </summary>
        public Output GetOutput()
        {
            var request = new Request(Request.Path + Request.QueryString)
            {
                Header = { Platform = "3" }
            };
            var response = HonaProvider.Execute(request);
            return null;
        }
    }
}