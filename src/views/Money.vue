<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <!--    如果想给一个组件初始值，然后在更新时拿到最新的值，就使用.sync-->
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="请在这里输入备注"
                @update:value="onUpdateNotes"
      />
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';

@Component({
  components: {Tags, FormItem, Types, NumberPad},
  computed:{
    recordList(){
      return store.recordList;//地址recordList复制到recordList
    }
  }
})
export default class Money extends Vue {

  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>

