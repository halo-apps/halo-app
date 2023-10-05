using Hona.Requests;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace Hona.Test.Bases;

[TestClass]
public class PluginTest : BaseTest
{
    [TestMethod]
    public void Plugin()
    {
        //Install(20);//安装任务插件
        UnInstall(20);//卸载任务插件
    }

    /// <summary>
    /// 打包
    /// </summary>
    [TestMethod]
    public void Pack()
    {
        var body = "{\"type\":\"pack\",\"id\":\"9\"}";
        var request = new Request("/system/Plugin", body);
        ExecuteRequest(request);
    }
}