using Hona.Commons.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
namespace Hona.Api.Controllers;

public class HomeController : Controller
{
    public IWebHostEnvironment WebHostEnvironment { get; set; }
    public HomeController(IWebHostEnvironment webHostEnvironment)
    {
        WebHostEnvironment = webHostEnvironment;
    }

    /// <summary>
    /// 状态检查接口
    /// </summary>
    [Route("/status")]
    public object Status()
    {
        var config = ObjectHelper.Clone(ConfigHelper.GetConfig());
        //清空敏感信息
        config.Central = null;
        config.Business = null;

        //limiter
        var result = new
        {
            LocalIp = NetworkHelper.GetIp() + ":" + Request.HttpContext.Connection.LocalPort,
            RemoteIp = Request.HttpContext.Connection.RemoteIpAddress + ":" + Request.HttpContext.Connection.RemotePort,
            Host = NetworkHelper.GetHost(),
            Root = DirectoryHelper.GetRunDirectory(),
            WebEnvironment = WebHostEnvironment.EnvironmentName,
            Config = config,
            Schema = Request.Scheme,
            Url = Request.GetDisplayUrl(),
            Args = EnvironmentHelper.GetArgs(),
            Request.Headers,
        };
        return result;
    }
}