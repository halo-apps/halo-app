using Jin.Hona.Outputs.Standards;
using Jin.Hona.Outputs.Standards.Entities;
using Microsoft.AspNetCore.Http;

namespace Jin.Bootstrap.Models
{
    public class InsertViewModel : BaseViewModel
    {
        public OutputModuleTable Table { get; set; }

        public InsertViewModel(InsertOutput result, HttpRequest request)
        {
            Table = result.Table;
        }
    }
}