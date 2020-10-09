<template>
  <div class="des-list">
    <div class="action-row">
      <input type="text" v-model="des" />
      <div class="button" @click="onAddButtonClick">添加</div>
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="item in dataList"
        :key="item.tag"
        @click="onListItemClick(item.tag)"
      >
        {{ item.description }}
      </div>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getCommonDesList, addCommonDes } from '@/api/commonDes.ts';
import qrcode from 'qrcode';

export default {
  setup() {
    const route = useRoute();
    const open = route.query.ddd === 'momo';

    const dataList = ref([]);
    const page = ref({
      page: 1,
      size: 5,
      total: 0
    });
    const getPageData = async () => {
      if (!open) return;
      const { list } = await getCommonDesList({
        page: page.value.page,
        size: page.value.size
      });
      dataList.value = list;
    };

    const des = ref('');
    const onAddButtonClick = async () => {
      if (des.value === '') {
        return;
      }
      await addCommonDes(des.value);
      des.value = '';
      getPageData();
    };

    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    const getUrl = (tag: string) => {
      return `https://meizizi.me/?tag=${tag}`;
    };
    const changeCanvasImg = (tag: string) => {
      if (!canvas.value) {
        return;
      }
      const url = getUrl(tag);
      qrcode.toCanvas(canvas.value, url, function(error: string) {
        if (error) console.error(error);
      });
    };

    const onListItemClick = (tag: string) => {
      if (!open) return;
      changeCanvasImg(tag);
    };
    onMounted(() => {
      getPageData();
    });

    return {
      dataList,
      page,
      des,
      onAddButtonClick,
      getPageData,
      canvas,
      onListItemClick
    };
  }
};
</script>

<style lang="less" scoped>
.des-list {
  width: 100vw;
  .action-row {
    padding: 10px;
    display: flex;
    input {
      flex: 1;
    }
    .button {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .list {
    margin-top: 20px;
    .list-item {
      padding: 10px;
      margin: 10px 0;
      width: 100vw;
      text-align: center;
      border: 1px solid rgb(207, 206, 206);
    }
  }
  canvas {
    width: 100vw !important;
    height: 100vw !important;
  }
}
</style>
