<template>
  <div>
      <div class="bg-cover">
    <div class="bg-mask">
      <div class="area">
      <div class="container">
        <div class="waterfall">
            <div class="next"><span @click="next" class="iconfont icon-xiayiye"></span></div>
            <div class="pre"><span @click="prev" class="iconfont icon-shangyiye"></span></div>
            <div class="item" v-for="item in data">
                <h4>{{item.title}}</h4>
                <p v-html="item.detail"></p>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
  </div>
</template>
<script>
import { getSmile } from "../../api/smile";
const ERR_OK = 0;
export default {
  data() {
    return {
      page: 1,
      data: {}
    };
  },
  created() {
    this.getSmile();
  },
  methods: {
    getSmile() {
      getSmile(this.page).then(res => {
        if (res.length>0) {
          this.data = res;
        }else{
          this.page--;
          return;
        }
      });
    },
    next() {
        this.page++;
        this.getSmile();
    },
    prev() {
      this.page--;
      if(this.page<1){
        this.page=1;
        return ;
      } 
      this.getSmile()
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
* {
  list-style: none;
  padding: 0;
  margin: 0;
}
.icon-xiayiye,.icon-shangyiye{
    font-size: 100px;
}
.bg-cover {
  background: #000;
  background-size:contain; 
  .bg-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(226, 218, 218, 0.4);
    .area {
      margin: 0 auto;
      width: 100%;
      text-align: center;
      min-height: 500px;
    }
  }
}
.container {
  width: 68%;
  margin: 0 auto;
  .waterfall {
    column-count: 4;
    column-gap: 1.5em;

    .next {
      position: fixed;
      top: 280px;
      right: 80px;
      span {
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          color: #fff;
        }
      }
    }
    .pre {
      position: fixed;
      top: 280px;
      left: 80px;
      span {
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          color: #fff;
        }
      }
    }
    .item {
      padding: 1em;
      margin: 0 0 1em 0;
      break-inside: avoid;
      border: 1px solid #000;
      background: #eff;
      p {
        text-indent: 2em;
        max-height: 999px;
        overflow: auto;
        text-align: left;
        width: 100%;
        margin-bottom: 10px;
        font-size: 13px;
      }
    }
  }
}
</style>


