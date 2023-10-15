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
                //���ز��Զ���URL�������������ú�ᵼ�·ǵ���ģʽ���޷��������������ü����ᵼ��SSL֤���޷�ʹ�ö�����ʧ��
                webBuilder.UseStartup<Startup>();
            });
}