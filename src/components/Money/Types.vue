<template>
  <div>
    <ul class="types">
      <li :class="value === '-' && 'selected'"
          @click="selectType('-')">支出
        <!--          如果type === '-'，则class等于selected-->
      </li>
      <li :class="value === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch, Prop} from 'vue-property-decorator';

@Component//修饰器的作用：type会自动被处理成data，selectType会自动被处理成methods
export default class Types extends Vue {
  // '-'表示支出，'+'表示收入
  @Prop() readonly value!:string;
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value',type)
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #fde3cc;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      background: #ffb13d;
    }
  }
}

</style>