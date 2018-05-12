<template>
<div class="bg-cover"><div class="bg-mask"><div class="area">
  <div class="search padding">
      <div class="left"><img src="../../common/image/flower.png" alt=""></div>
      <div class="search-box-wrapper">
          <search-box @query="onQueryChange"></search-box>
      </div>
      <div>
          <prompt :query="query"></prompt>
      </div>
      </div>
      </div></div>
  </div>
</template>
<script>
import SearchBox from '../../base/search-box';
import Prompt from './prompt';
export default {
  data(){
      return {
          query:'青花瓷'
      }
  },
  methods:{
      onQueryChange(query){
          this.query=query
      }
  },
  components:{
      SearchBox,
      Prompt
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
@media screen and (min-width: 750px){
.bg-cover{
  background: #000;
  background-size:contain; 
    .bg-mask{
      width: 100%;
      height: 100%;
      background-color:rgba(226, 218, 218, 0);  
      .area{
          margin: 0 auto;
          width: 66%;
          text-align: center;
          min-height: 500px;
          .left{
              position: fixed;
              left:-40px;
              top:120px;
          }
      }}}}
      .search{
          background: rgba(226, 218, 218, 0);
          color:#eee;
      }
@media screen and (max-width:750px){
    @import '../../common/less/padding.less';
    .left{
        display: none;
    }
}
</style>


