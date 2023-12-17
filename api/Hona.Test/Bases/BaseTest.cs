using System;
using Hona.Commons.Helpers;
using Hona.Drivers.Configers;
using Hona.Drivers.Signers;
using Hona.Drivers.Tokers;
using Hona.Requests;
using Hona.Requests.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace Hona.Test.Bases;

/// <summary>
/// 测试基类
/// </summary>
[TestClass]
public class BaseTest
{
    /// <summary>
    /// 执行请求（无法改进为Requester，因为Requester依赖请求地址，而这里不需要地址，而是直接启动应用执行请求）
    /// </summary>
    public static void ExecuteRequest(Request request, bool throwException = false)
    {
        //设置业务配置器
        ConfigerFactory.Business = ConfigerFactory.Default;
        //加密得到Token
        var toker = TokerFactory.GetToker("Default");
        toker.Open("abc");
        var identity = toker.Encrypt("jay.zhou");

        var signer = SignerFactory.GetSigner("Default");
        signer.Open("234");
        var signature = signer.Compute("jay.zhou", request.Url.Value, request.Body);

        var authorization = new RequestAuthorization { Type = "Bearer", Token = identity.Token, Timestamp = signature.Timestamp, Signature = signature.Signature, Terminal = "pc" };
        request.Headers["authorization"] = authorization.ToString();

        try
        {
            var result = HonaFactory.Execute(request);
            var json = JsonHelper.Serialize(result, true);
            Console.WriteLine(json);
        }
        catch (Exception e)
        {
            if (throwException)
                throw;
            Console.WriteLine(JsonHelper.Serialize(e, true));
        }
    }

    /// <summary>
    /// 输出Json内容
    /// </summary>
    public static void ExecuteJson<T>(T entity)
    {
        var result = JsonHelper.Serialize(entity);
        Console.WriteLine(result);
    }

    public void Install(int id)
    {
        var data = "{\"type\":\"install\",\"id\":\"" + id + "\"}";
        var request = new Request("/system/Plugin", data);
        ExecuteRequest(request);
    }

    public void UnInstall(int id)
    {
        var body = "{\"type\":\"UnInstall\",\"id\":\"" + id + "\"}";
        var request = new Request("/system/Plugin", body);
        ExecuteRequest(request);
    }

    [TestMethod]
    public void GetRoot()
    {
        var root = DirectoryHelper.GetRoot($"../pc/plugins/");
        Console.WriteLine(root);
    }
}