<template>
  <div class="search-box" id="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <span @click="clear" class="clearInput" v-show="query">×</span>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: '青花瓷'
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', (newQuery) => {
        this.$emit('query',newQuery);//派发一个query事件，把newQuery传出去
      })
    }
  }
</script>
<style  lang="less" rel="stylesheet/less" scoped>
*{
  margin: 0;
  padding: 0;
}
.clearInput{
  font-size: 28px;
  vertical-align: middle;
  cursor: pointer;
}

.box{
  width: 30%;
  height: 28px;
  margin:1px 0;
  vertical-align: middle;
}
@media screen and (max-width: 750px){
  input.box{
    width: 88%;
    border-radius: 30px;
    outline: none;
    border:1px solid #ccc;
    padding-left:8px;
    background-color: rgba(246, 246, 248, 0.8);
  }
  
  div#search-box{
  background-color: #666;
}
}

</style>

