<script setup lang="ts">
import {onActivated, onMounted, ref} from "vue";
import {
  UrlHelper, useConfigStore, useUserStore, DriverHelper, IProvider, MonacoEditor, PageTable,
  TreeHelper, JsonHelper, useSocketStore
} from "hona-pc";

let emit = defineEmits(['loaded', 'navigate'])
let userStore = useUserStore(), configStore = useConfigStore()
let indexedDb: IProvider, editorRef = ref(), editorValue = ref()
let pageForm = ref({page: 1, pageSize: 1})
let json = ref({tree: [], content: null})

json.value.tree = [
  {
    "FieldName": "result_code",
    "FieldValue": null,
    "FieldType": "string",
    "IsNecessary": true,
    "Description": "返回码，success表示成功",
    "ChildrenField": null
  },
  {
    "FieldName": "message",
    "FieldValue": null,
    "FieldType": "string",
    "IsNecessary": true,
    "Description": "错误信息\t",
    "ChildrenField": null
  },
  {
    "FieldName": "server_time",
    "FieldValue": null,
    "FieldType": "string",
    "IsNecessary": true,
    "Description": "服务端时间戳",
    "ChildrenField": null
  },
  {
    "FieldName": "request_id",
    "FieldValue": null,
    "FieldType": "string",
    "IsNecessary": true,
    "Description": "请求ID",
    "ChildrenField": null
  },
  {
    "FieldName": "data",
    "FieldValue": null,
    "FieldType": "object",
    "IsNecessary": true,
    "Description": "分页数据",
    "ChildrenField": [
      {
        "FieldName": "page",
        "FieldValue": null,
        "FieldType": "string",
        "IsNecessary": true,
        "Description": "页码",
        "ChildrenField": null
      },
      {
        "FieldName": "total_page",
        "FieldValue": null,
        "FieldType": "string",
        "IsNecessary": true,
        "Description": "总页码",
        "ChildrenField": null
      },
      {
        "FieldName": "total_count",
        "FieldValue": null,
        "FieldType": "string",
        "IsNecessary": true,
        "Description": "总条数",
        "ChildrenField": null
      },
      {
        "FieldName": "page_size",
        "FieldValue": null,
        "FieldType": "string",
        "IsNecessary": true,
        "Description": "每页条数",
        "ChildrenField": null
      },
      {
        "FieldName": "list",
        "FieldValue": null,
        "FieldType": "object []",
        "IsNecessary": true,
        "Description": "当前页数据集",
        "ChildrenField": [
          {
            "FieldName": "Answer_Id",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "主键",
            "ChildrenField": null
          },
          {
            "FieldName": "Season_ID",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "周期ID1",
            "ChildrenField": null
          },
          {
            "FieldName": "Stage_ID",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "任务阶段ID（周期5：1027）",
            "ChildrenField": null
          },
          {
            "FieldName": "Task_ID",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "任务ID(排代码，发现是废弃字段，可不赋值)",
            "ChildrenField": null
          },
          {
            "FieldName": "Action_ID",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": false,
            "Description": "子任务ID(自评未用，他评有用)",
            "ChildrenField": null
          },
          {
            "FieldName": "Survey_ID",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "题目ID（对应Mongo库SurveyId,3:自评 1:他评）",
            "ChildrenField": null
          },
          {
            "FieldName": "Appraiser",
            "FieldValue": null,
            "FieldType": "string",
            "IsNecessary": true,
            "Description": "评估人",
            "ChildrenField": null
          },
          {
            "FieldName": "EvaluatedPerson",
            "FieldValue": null,
            "FieldType": "string",
            "IsNecessary": true,
            "Description": "被评估人",
            "ChildrenField": null
          },
          {
            "FieldName": "CacheIndex",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": false,
            "Description": "存储在Redis的List位置,虽然我觉得为啥不用hash questionid_item",
            "ChildrenField": null
          },
          {
            "FieldName": "QuestionId",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "问题ID(打分:1-18 31-34 问答:20-21)",
            "ChildrenField": null
          },
          {
            "FieldName": "QuestionType",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": true,
            "Description": "问题类型(10:打分(含价值测温题) 20:简答)",
            "ChildrenField": null
          },
          {
            "FieldName": "Score",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": false,
            "Description": "得分(null:初始化值 0:表示不清楚)",
            "ChildrenField": null
          },
          {
            "FieldName": "AnswerContent",
            "FieldValue": null,
            "FieldType": "string",
            "IsNecessary": false,
            "Description": "内容(极值 和 简答)",
            "ChildrenField": null
          },
          {
            "FieldName": "CreateTime",
            "FieldValue": null,
            "FieldType": "DateTime",
            "IsNecessary": true,
            "Description": "创建时间",
            "ChildrenField": null
          },
          {
            "FieldName": "UpdateTime",
            "FieldValue": null,
            "FieldType": "DateTime",
            "IsNecessary": false,
            "Description": "更新时间",
            "ChildrenField": null
          },
          {
            "FieldName": "RH_DB_IS_DELETE",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": false,
            "Description": "是否删除",
            "ChildrenField": null
          },
          {
            "FieldName": "StageType",
            "FieldValue": null,
            "FieldType": "int",
            "IsNecessary": false,
            "Description": "阶段类型(2020010:我评谁 2020020:谁评我 2020030:上级确认下属名单 2020040:自评 2020050:他评 2020060:上级查看下属报告 2020070:本人报告 2020080:VC任务报告 2020090:查看非直属下级报告)",
            "ChildrenField": null
          },
          {
            "FieldName": "Platform",
            "FieldValue": null,
            "FieldType": "string",
            "IsNecessary": false,
            "Description": "请求来源平台(1:H5 2:PC 3:赤兔后台)",
            "ChildrenField": null
          },
          {
            "FieldName": "MessageUpdateTime",
            "FieldValue": null,
            "FieldType": "DateTime",
            "IsNecessary": false,
            "Description": "消息时间",
            "ChildrenField": null
          }
        ]
      }
    ]
  }
]

let refresh = () => {
}

let to = (menu: any) => {
  let url = UrlHelper.getUrl(menu.url, {m: menu.id})
  UrlHelper.toUrl(url)
  emit('navigate', url)
}

onActivated(() => {
  // emit('loaded', 'sys.name')
})

onMounted(async () => {
  emit('loaded', 'custom.command')

  let a = await configStore.getConfig('home')
  let b = await configStore.saveConfig('home', {a: 10})
  indexedDb = await DriverHelper.getProviderAsync('IndexedDb')
  let f = await indexedDb.createAsync('command1')
  let c = await indexedDb.getAsync('form')
  let d = await indexedDb.saveAsync('form', 12)
  let e = await indexedDb.getAsync('form')

  let editor = editorRef.value

  let content = JsonHelper.buildObject(json.value.tree, 'ChildrenField', n => {
    //获取数据类型
    let type: string
    if (n.FieldType == 'object []')
      type = 'array'
    else if (n.FieldType == 'object')
      type = 'object'
    else if (n.FieldType == 'DateTime')
      type = "date"
    else
      type = n.FieldType
    return {key: n.FieldName, value: n.FieldType, type: type, description: n.Description}
  })
  json.value.content = content

  useSocketStore().subscribe((event: MessageEvent) => {
    console.log(event)
  })
})

let editorMounted = (monaco: any, editor: any) => {
}

defineExpose({refresh})
</script>

<template>
  <div style="padding:100px;height:calc(100% - 200px);">
    <!--    <el-input type="textarea" :rows="20" v-model="json.content"></el-input>-->
    <!--    <monaco-editor ref="editorRef" :config="{language:'sql'}" @mounted="editorMounted"-->
    <!--                   v-model="editorValue"></monaco-editor>-->
    <page-table :page-size="1" :page="1" :data="[{Name:'abc'},{Name:'def'}]">
      <el-table-column label="名称" prop="Name">
      </el-table-column>
    </page-table>
    <div class="footer">
      绝对定位
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  position: absolute;
}
</style>