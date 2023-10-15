using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
namespace Hona.Api;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                //本地不自定义URL监听，本地配置后会导致非调试模式下无法启动，线上启用监听会导致SSL证书无法使用而启动失败
                webBuilder.UseStartup<Startup>();
            });
}