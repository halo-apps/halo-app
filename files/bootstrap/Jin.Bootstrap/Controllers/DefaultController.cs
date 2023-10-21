using Jin.Bootstrap.Models;
using Jin.Hona.Outputs;
using Jin.Hona.Outputs.Standards;
using Microsoft.AspNetCore.Mvc;

namespace Jin.Bootstrap.Controllers
{
    public class DefaultController : BaseController
    {
        //[Route("/product/list")]这里定义会覆盖路由表信息！！！
        public ActionResult List()
        {
            var result = (Output<PagingOutput>)GetOutput();
            var model = new PagingViewModel(result.Data, Request);
            return View("Paging", model);
        }

        public ActionResult Insert()
        {
            var result = (Output<InsertOutput>)GetOutput();
            var model = new InsertViewModel(result.Data, Request);
            return View("Insert", model);
        }
    }
}