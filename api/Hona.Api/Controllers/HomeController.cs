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
        //limiter
        //TODO 获取当前POD唯一标识 包括IP和端口号
        var result = new
        {
            LocalIp = NetworkHelper.GetIp() + ":" + Request.HttpContext.Connection.LocalPort,
            RemoteIp = Request.HttpContext.Connection.RemoteIpAddress + ":" + Request.HttpContext.Connection.RemotePort,
            Host = NetworkHelper.GetHost(),
            Root = DirectoryHelper.GetRunDirectory(),
            WebEnvironment = WebHostEnvironment.EnvironmentName,
            Config = ConfigHelper.GetFile(),
            ConfigHelper.GetConfig().Environment,
            Schema = Request.Scheme,
            Url = Request.GetDisplayUrl(),
            Args = EnvironmentHelper.GetArgs(),
            Request.Headers,
        };
        return result;
    }
}