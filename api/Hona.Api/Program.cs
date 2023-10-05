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
                //var urls = "https://localhost:6001;http://localhost:6090";
                //webBuilder.UseUrls("http://0.0.0.0:5000");//TODO: ��Ϊ��Ӽ���IP�Ͷ˿ڣ���ֹĬ�ϼ���localhost:5000�����ⲿ�޷����ʷ���
                webBuilder.UseStartup<Startup>();
            });
}