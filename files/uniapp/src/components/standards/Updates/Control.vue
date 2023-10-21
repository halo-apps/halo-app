<template>
  <view class="control">
    <view @submit="submit" @change="change" v-if="!field.textualize">
      <control-autocomplete :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-if="field.control.type=='Autocomplete'"></control-autocomplete>
      <control-cascader :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Cascader'"></control-cascader>
      <control-checkbox :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Checkbox'"></control-checkbox>
      <control-code :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Code'"></control-code>
      <control-color :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Color'"></control-color>
      <control-copy :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Copy'"></control-copy>
      <control-csharp :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='CSharp'"></control-csharp>
      <control-date :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Date'"></control-date>
      <control-date-range :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='DateRange'"></control-date-range>
      <control-datetime :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Datetime'"></control-datetime>
      <control-decimal :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Decimal'"></control-decimal>
      <control-dictionary :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Dictionary'"></control-dictionary>
      <control-int :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Int'"></control-int>
      <control-json :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Json'"></control-json>
      <control-mysql :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='MySql'"></control-mysql>
      <control-progress :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Progress'"></control-progress>
      <control-radio :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Radio'"></control-radio>
      <control-rate :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Rate'"></control-rate>
      <control-rich-text :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='RichText'"></control-rich-text>
      <control-select :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Select'"></control-select>
      <control-sql :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Sql'"></control-sql>
      <control-switch :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Switch'"></control-switch>
      <control-text :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Text'"></control-text>
      <control-textarea :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Textarea'"></control-textarea>
      <control-upload :table="table" :field="field" :index="index" :form="form" :from="from" @change="change" v-else-if="field.control.type=='Upload'"></control-upload>
      <control-password :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"
        v-else-if="field.control.type=='Password'"></control-password>
      <view v-else>未支持的控件类型：{{field.control.type}}</view>
    </view>
    <textualize :table="table" :field="field" :index="index" :form="form" v-else>
    </textualize>
    <view :v-if="field.tooltip">{{field.tooltip}}</span>
      <view class="control-operation" v-if="field.operation">
        <view :route="field.operation.route" :query="{}" :page-type="field.operation.page" :store-key="`${storeKey},${field.operation.route}`"
          :page-mode="field.operation.mode">
          <navigator :url="field.operation.route">
            {{field.operation.name}}
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import ControlText from '../Controls/ControlText'
  import ControlTextarea from '../Controls/ControlTextarea'
  import ControlAutocomplete from '../Controls/ControlAutocomplete'
  import ControlRadio from '../Controls/ControlRadio'
  import ControlCheckbox from '../Controls/ControlCheckbox'
  import ControlSelect from '../Controls/ControlSelect'
  import ControlDate from '../Controls/ControlDate'
  import ControlDateTime from '../Controls/ControlDateTime'
  import ControlTime from '../Controls/ControlTime'
  import ControlDecimal from '../Controls/ControlDecimal'
  import ControlCascader from '../Controls/ControlCascader'
  import ControlDateRange from '../Controls/ControlDateRange'
  import ControlUpload from '../Controls/ControlUpload'
  import ControlDateTimeRange from '../Controls/ControlDateTimeRange'
  import ControlProgress from '../Controls/ControlProgress'
  import ControlColor from '../Controls/ControlColor'
  import ControlRate from '../Controls/ControlRate'
  import ControlSwitch from '../Controls/ControlSwitch'
  import ControlJson from '../Controls/ControlJson'
  import ControlMysql from '../Controls/ControlMySql'
  import Textualize from '../Details/Textualize'
  import ControlRichText from '../Controls/ControlRichText'
  import ControlInt from '../Controls/ControlInt'
  import ControlCode from '../Controls/ControlCode'
  import ControlSql from '../Controls/ControlSql'
  import ControlPassword from '../Controls/ControlPassword.vue'

  export default {
    name: 'Control',
    components: {
      ControlSql,
      ControlCode,
      ControlInt,
      Textualize,
      ControlRichText,
      ControlJson,
      ControlSwitch,
      ControlRate,
      ControlColor,
      ControlProgress,
      ControlDateTimeRange,
      ControlUpload,
      ControlDateRange,
      ControlCascader,
      ControlDecimal,
      ControlTime,
      ControlDateTime,
      ControlDate,
      ControlSelect,
      ControlCheckbox,
      ControlRadio,
      ControlAutocomplete,
      ControlTextarea,
      ControlText,
      ControlMysql,
      ControlPassword
    },
    props: {
      table: {
        type: Object,
        default: null
      },
      field: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: -1 //小程序中，Number类型默认值是0，强制指定为null仍然为0
      }, //当前行的索引
      form: {
        type: Object,
        default: null
      }, //大表单数据
      from: {
        type: String,
        default: null
      }, //来源
      storeKey: {
        type: String,
        default: null
      }
    },
    data() {
      return {}
    },
    methods: {
      submit() {
        this.$emit('submit')
      },
      //不能删除，列表需要监控值变动
      change(form) {
        this.$emit('change', form)
      }
    },
    computed: {}
  }
</script>

<style lang="scss">
  .control {
    .control-operation {
      display: inline-block;
    }
  }
</style>
