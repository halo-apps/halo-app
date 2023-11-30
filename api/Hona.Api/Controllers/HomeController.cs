using Hona.Commons.Helpers;
using Hona.Drivers.Configers;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Hona.Api.Controllers;

public class HomeController : ControllerBase
{
    public IWebHostEnvironment WebHostEnvironment { get; set; }
    public HomeController(IWebHostEnvironment webHostEnvironment)
    {
        WebHostEnvironment = webHostEnvironment;
        var configer = ConfigerFactory.Business;
        var central = configer.GetValue("central", "name");
    }

    /// <summary>
    /// 状态检查接口
    /// </summary>
    [Route("/status")]
    public object Status()
    {
        var config = ObjectHelper.Clone(ConfigerFactory.Default.Config);
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