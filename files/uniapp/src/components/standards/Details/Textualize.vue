<template>
  <text-link :table="table" :field="field" :index="index" :form="form" :page="page">
    <text-copy :table="table" :field="field" :index="index" :form="form" :page="page">
      <template v-if="field.prefix">{{field.prefix}}</template>
      <text-autocomplete :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-if="field.control.type=='Autocomplete'"></text-autocomplete>
      <text-cascader :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Cascader'"></text-cascader>
      <text-checkbox :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Checkbox'"></text-checkbox>
      <text-code :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Code'"></text-code>
      <text-color :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Color'"></text-color>
      <text-copy :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Copy'"></text-copy>
      <text-csharp :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='CSharp'"></text-csharp>
      <text-date :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Date'"></text-date>
      <text-date-range :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='DateRange'"></text-date-range>
      <text-datetime :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Datetime'"></text-datetime>
      <text-decimal :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Decimal'"></text-decimal>
      <text-dictionary :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Dictionary'"></text-dictionary>
      <text-int :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Int'"></text-int>
      <text-json :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Json'"></text-json>
      <text-my-sql :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='MySql'"></text-my-sql>
      <text-progress :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Progress'"></text-progress>
      <text-radio :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Radio'"></text-radio>
      <text-rate :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Rate'"></text-rate>
      <text-rich-text :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='RichText'"></text-rich-text>
      <text-select :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Select'"></text-select>
      <text-sql :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Sql'"></text-sql>
      <text-switch :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Switch'"></text-switch>
      <text-text :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Text'"></text-text>
      <text-textarea :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Textarea'"></text-textarea>
      <text-upload :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Upload'"></text-upload>
      <text-password :table="table" :field="field" :index="index" :form="form" :from="from" :page="page" v-else-if="field.control.type=='Password'"></text-password>
      <view v-else>未支持的文本控件：{{field.control}}</view>
      <template v-if="field.suffix">{{field.suffix}}</template>
    </text-copy>
  </text-link>
</template>

<script>
  import TextCopy from '../Texts/TextCopy'
  import TextLink from './TextLink'
  import TextProgress from '../Texts/TextProgress'
  import TextRate from '../Texts/TextRate'
  import TextCascader from '../Texts/TextCascader'
  import TextCheckbox from '../Texts/TextCheckbox.vue'
  import TextUpload from '../Texts/TextUpload'
  import TextDictionary from '../Texts/TextDictionary'
  import TextColor from '../Texts/TextColor'
  import TextCode from '../Texts/TextCode'
  import TextAutocomplete from '../Texts/TextAutocomplete'
  import TextSelect from '../Texts/TextSelect'
  import TextRadio from '../Texts/TextRadio'
  import TextText from '../Texts/TextText'
  import TextSwitch from '../Texts/TextSwitch'
  import TextInt from '../Texts/TextInt'
  import TextDateRange from '../Texts/TextDateRange'
  import TextRichText from '../Texts/TextRichText'
  import TextTextarea from '../Texts/TextTextarea'
  import TextDatetime from '../Texts/TextDatetime'
  import TextJson from '../Texts/TextJson'
  import TextSql from '../Texts/TextSql'
  import TextCSharp from '../Texts/TextCSharp'
  import TextMySql from '../Texts/TextMySql'
  import TextDate from "../Texts/TextDate";
  import TextDecimal from "../Texts/TextDecimal";
  import TextPassword from "../Texts/TextPassword.vue"
  import {
    getValue
  } from '../../../plugins/standards/control-helper'

  export default {
    name: 'Textualize',
    components: {
      TextDecimal,
      TextDate,
      TextMySql,
      TextCSharp,
      TextSql,
      TextJson,
      TextDatetime,
      TextTextarea,
      TextRichText,
      TextDateRange,
      TextInt,
      TextSwitch,
      TextText,
      TextRadio,
      TextSelect,
      TextAutocomplete,
      TextCode,
      TextColor,
      TextDictionary,
      TextUpload,
      TextCascader,
      TextCheckbox,
      TextRate,
      TextProgress,
      TextLink,
      TextCopy,
      TextPassword
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
        default: -1
      },
      form: {
        type: Object,
        default: null
      },
      from: {
        type: String,
        default: null
      },
      page: {
        type: Number,
        default: -1 //Number默认值0，所以强制为-1，页码从0开始
      }
    },
    data() {
      return {}
    },
    computed: {
      value() {
        let value = getValue(this.form, this.index, this.table, this.field, this.page)
        return value
      }
    }
  }
</script>

<style scoped>

</style>
