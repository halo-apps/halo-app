using System.Text;
using Hona.Commons.Extensions;
using Hona.Commons.Helpers;
using Hona.Drivers.Requesters;
using Hona.Drivers.Requesters.Entities;
using Hona.Requests;
using Hona.Requests.Entities;

namespace Hona.Api.Middlewares;

/// <summary>
/// Hona系统中间件[对所有非静态路由请求有效！]
/// </summary>
public class HonaMiddleware : IMiddleware
{
    /// <summary>
    /// 异步调用
    /// </summary>
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (!context.Request.Path.HasValue)
        {
            await next(context);
            return;
        }

        #region 请求

        var method = EnumHelper.Get<RequestMethod>(context.Request.Method);
        var url = context.Request.Scheme + "://" + context.Request.Host.Value + context.Request.Path.Value + context.Request.QueryString;
        var request = new Request(url, method);
        if (!context.Request.ContentType.IsNullOrEmpty())
        {
            var contentType = Requester.GetContentType(context.Request.ContentType);
            if (contentType == HttpContentType.MultipartFormData)
            {
                //防止GET请求访问Form导致无效操作异常
                if (context.Request.Form.Files.Any())
                {
                    foreach (var file in context.Request.Form.Files)
                    {
                        await using var stream = file.OpenReadStream();
                        var bytes = FileHelper.GetBytes(stream, stream.Length);
                        var requestFile = new RequestFile(file.FileName, bytes);
                        request.Files.Add(requestFile);
                    }
                }
            }
            else
            {
                using var reader = new StreamReader(context.Request.Body);
                request.Body = await reader.ReadToEndAsync();//访问文件后，reader中会没有内容
            }
        }

        foreach (var (key, value) in context.Request.Headers)
            request.Headers[key] = value;
        request.Headers.LocalIp = context.Connection.LocalIpAddress + ":" + context.Connection.LocalPort;
        request.Headers.RemoteIp = context.Connection.RemoteIpAddress + ":" + context.Connection.RemotePort;
        request.Headers.Host = NetworkHelper.GetHost();

        #endregion

        #region 响应

        var response = HonaFactory.Execute(request);
        if (response == null)
        {
            //404是否也应该记录日志
            //默认，放行，不输出404 json响应
            //否则导致部署在同一站点，无法访问静态页面了
            await next(context);
            return;
        }

        context.Response.StatusCode = response.Status;
        context.Response.ContentType = response.ContentType;
        foreach (var (key, value) in response.Headers)
            context.Response.Headers[key] = value;
        if (!response.Body.IsNullOrEmpty())
            await context.Response.WriteAsync(response.Body, Encoding.UTF8);

        #endregion
    }
}