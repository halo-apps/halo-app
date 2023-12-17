using Hona.Api.Middlewares;
using Hona.Drivers.Configers;
using Hona.Requests;

namespace Hona.Api.Extensions;

/// <summary>
/// ApplicatitonBuilder Hona扩展
/// </summary>
public static class WebApplicationExtensions
{
    /// <summary>
    /// 使用Hona框架指定的配置文件启动服务
    /// </summary>
    public static void UseHona(this WebApplication app, IConfiger configer)
    {
        //初始化业务配置器
        HonaFactory.Initialize(configer, app.Configuration);

        //解决经Nginx代理后无法拿到 IP 和 Schema 问题，必须第1行，否则不生效
        app.UseForwardedHeaders();

        app.UseCors(WebApplicationBuilderExtensions.HonaAllowSpecificOrigins);
        app.UseDefaultFiles(); //设置默认首页，必须早于UseStaticFiles
        app.UseStaticFiles(); //将会使用wwwroot作为静态文件的目录
        app.UseMiddleware<HonaMiddleware>();
    }
}