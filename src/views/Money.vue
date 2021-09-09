<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <!--    如果想给一个组件初始值，然后在更新时拿到最新的值，就使用.sync-->
    <!--    <Types :value="record.type" @update:value="onUpdateType"/>-->
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';

const recordList = recordListModel.fetch();

type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,//数据类型
  createdAt?: Date//类or构造函数
}

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣服', '吃饭', '交通', '水电', '房租', '彩妆'];
  recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

