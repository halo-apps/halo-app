using System.Collections.Generic;
using System.Linq;
using Jin.Hona;
using Jin.Hona.Commons.Extensions;
using Jin.Hona.Commons.Helpers;
using Jin.Hona.Operations.Tables.Entities;
using Jin.Hona.Outputs.Standards;
using Jin.Hona.Outputs.Standards.Entities;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Jin.Bootstrap.Models
{
    public class PagingViewModel : BaseViewModel
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string Condition { get; set; }
        public JObject ConditionParsed { get; set; }

        public OutputModuleTable Table { get; set; }

        public List<OutputModuleTable> Tables { get; set; } = new List<OutputModuleTable>();
        public List<Dictionary<string, dynamic>> RowsPrimary { get; set; }

        public bool IsHasSearch { get; set; }
        public string Path { get; set; }

        public OperationNext Next { get; set; }

        public Dictionary<string, dynamic> Data { get; set; }
        public int Count { get; set; }

        public PagingViewModel(PagingOutput result, HttpRequest request)
        {
            Table = result.Table;
            Tables.Add(Table);
            Tables.AddRange(Table.Children);

            Count = result.Count;
            Data = result.Data;
            Next = result.Next;

            RowsPrimary = result.Data[Table.Name];

            Condition = request.Query["condition"].ToString();

            var queryPageNumber = request.Query["page"].ToString();
            var queryPageSize = request.Query["pagesize"].ToString();
            Page = queryPageNumber.IsInt() ? queryPageNumber.ToInt() : 1;
            PageSize = queryPageSize.IsInt() ? queryPageSize.ToInt() : HonaFactory.Runtime.Setting.Handler.PageSize;

            if (!Condition.IsNullOrEmpty())
            {
                var conditionString = EncodingHelper.Base64Decode(Condition);//自动解码，不需再次解码
                ConditionParsed = JsonConvert.DeserializeObject<JObject>(conditionString);
            }

            IsHasSearch = Tables.SelectMany(n => n.Search).Any();
            Path = request.Path.Value;
        }


        /// <summary>
        /// 获取搜索条件值
        /// </summary>
        public string GetCondition(OutputModuleTable table, OutputModuleField field)
        {
            if (ConditionParsed == null)
                return null;
            var tableCondition = ConditionParsed.GetValueIgnoreCase(table.Name);
            var fieldCondition = ((JObject)tableCondition)?.GetValueIgnoreCase(field.Name);
            return fieldCondition?.ToString();
        }
    }
}