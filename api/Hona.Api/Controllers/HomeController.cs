using Hona.Commons.Helpers;
using Hona.Drivers.Configers;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Hona.Api.Controllers;

public class HomeController(IHostEnvironment env) : ControllerBase
{
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
            Host = new
            {
                Name = NetworkHelper.GetHost(),
                Environment = env.EnvironmentName,
                Root = DirectoryHelper.GetRunDirectory(),
                LocalIp = NetworkHelper.GetIp() + ":" + Request.HttpContext.Connection.LocalPort,
                RemoteIp = Request.HttpContext.Connection.RemoteIpAddress + ":" + Request.HttpContext.Connection.RemotePort,
            },
            Config = config,
            Schema = Request.Scheme,
            Url = Request.GetDisplayUrl(),
            Args = EnvironmentHelper.GetArgs(),
            Request.Headers,
        };
        return result;
    }
}