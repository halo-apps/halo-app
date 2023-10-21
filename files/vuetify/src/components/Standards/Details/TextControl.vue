<template>
  <text-link :field="field" :value="value" :row="row" :disabled="!field.link">
    <text-copy :text="getCopyText()" :disabled="!field.copy">
      <template v-if="value&&field.control!='Progress'">{{field.prefix}}</template>
      <text-color :field="field" :value="value"
                  v-if="field.control=='Autocomplete'||field.control=='Select'||field.control=='Radio'||field.control=='Checkbox'">
      </text-color>
      <text-cascader v-else-if="field.control=='Cascader'"
                     :field="field" :value="value">
      </text-cascader>
      <template v-else-if="field.control=='Json'">
        <pre class="json" v-html="getJson(value)" v-if="value"></pre>
      </template>
      <template v-else-if="field.control=='Image'">
        <a :href="value" target="_blank">
          <img class="detail-image" :src="value"/>
        </a>
      </template>
      <template v-else-if="field.control=='Progress'">
        <text-progress :value="value"></text-progress>
      </template>
      <template v-else-if="field.control=='Rate'">
        <text-rate :value="value"></text-rate>
      </template>
      <template v-else-if="field.control=='RichText'">
        <div v-html="value" v-if="from=='list'" style="height:18px;overflow: hidden;"></div>
        <div v-html="value" v-else></div>
      </template>
      <template v-else>
        {{value}}
      </template>
      <template v-if="value&&field.control!='Progress'">{{field.suffix}}</template>
    </text-copy>
  </text-link>
</template>

<script>
  import TextCopy from "./TextCopy";
  import TextLink from "./TextLink";
  import TextProgress from "./TextProgress";
  import TextColor from "./TextColor";
  import TextRate from "./TextRate";
  import TextCascader from "./TextCascader";

  export default {
    name: "TextControl",
    components: {TextCascader, TextRate, TextColor, TextProgress, TextLink, TextCopy},
    props: {
      field: {type: Object, default: null},
      value: {type: String, default: null},
      row: {type: Object, default: null},
      from: {type: String, default: null},
    },
    data() {
      return {}
    },
    methods: {
      getJson(value) {
        return JSON.stringify(JSON.parse(value), null, 2)
      },
      getCopyText() {
        if (this.value) {
          if (this.field.control == 'Json') {
            return this.getJson(this.value).replace(/"/g, "'")
          }
        }
        return this.value
      }
    }
  }
</script>

<style lang="scss">
  .list {
    .detail-image {
      height: 40px;
    }
  }
</style>
