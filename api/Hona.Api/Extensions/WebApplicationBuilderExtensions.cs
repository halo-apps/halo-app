using Hona.Api.Middlewares;
using Hona.Drivers.Configers;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;

namespace Hona.Api.Extensions;

public static class WebApplicationBuilderExtensions
{
    /// <summary>
    /// Hona跨域策略
    /// </summary>
    public static string HonaAllowSpecificOrigins = "HonaAllowSpecificOrigins";

    /// <summary>
    /// 添加主机配置（后续Build时执行）
    /// </summary>
    public static void AddHona(this WebApplicationBuilder builder, IConfiger configer)
    {
        //只有在跨域情况下访问才会携带跨域响应头
        //  并且是在跨域的options请求中，返回的跨域响应头
        //  并且支持https
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(HonaAllowSpecificOrigins, policyBuilder =>
            {
                policyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                //builder.WithHeaders("content-type", "authorization");
            });
        });

        //解决Multipart body length limit 134217728 exceeded
        builder.Services.Configure<FormOptions>(options =>
        {
            options.ValueLengthLimit = int.MaxValue;
            options.MultipartBodyLengthLimit = long.MaxValue; // In case of multipart
        });

        //解决Multipart body length limit 134217728 exceeded
        builder.Services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            //新增如下两行
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();

            //可以自定义这个头防止伪造X-Forwarded-For攻击，不过我觉得在第一层nginx那里配置 ：proxy_set_header X-Forwarded-For $remote_addr; 比较方便，具体不展开了大家自己搜下
            //options.ForwardedForHeaderName = "X-Forwarded-For-My-Custom-Header-Name"; 
        });

        builder.Services.AddScoped(typeof(HonaMiddleware));
    }
}