<template>
<div>
  <div class="isLogin" v-show="!user">
    <img src="../../common/image/cat.png" alt="">
    <span>登录后可查看当前收藏的歌曲</span></div>
  <div class="bg-cover" v-show="user" id="bg-cover">
    <div class="bg-mask">
      <div class="area">
      <div class="container padding">       
<table class="tableData" id="tableData"> 
              <tr class="title">
                  <td class="songname">歌曲名</td>
                  <td>歌手</td>
                  <td class="hidden">专辑</td>
                  <td class="optionTitle">播放</td>
                  <td class="defavor">取消</td>
              </tr>
              <tr v-for="item in favoriteList" class="iconfont contain list">
                  <td class="songname">{{item.name}}</td>
                  <td>{{item.singer}}</td>
                  <td class="hidden">{{item.album}}</td>
                  <td><span class="bofang" @click="selectSong(item)">▷</span></td>
                  <td><span class="icon-xiai defavor" @click.stop="toggleFavorite(item)"></span></td>
              </tr>  
          </table>
          <div class="leftTop"><img src="../../common/image/02.png" alt=""></div>
          <div class="bottomthree"><img src="../../common/image/03.png" alt=""></div>
          <div class="bottomseven"><img src="../../common/image/07.png" alt=""></div>
          </div>
          <div class="mention" v-show="mention">
          <mention></mention>
          </div>
          </div>
    </div>  
  </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Song from "../../common/js/song";
import Mention from "../../base/mention";
import { playerMixin } from "../../common/js/mixin";
export default {
  mixins: [playerMixin],
  data() {
    return {
      currentIndex: 0,
      song: {}
    };
  },
  computed: {
    mention() {
      return !this.favoriteList.length;
    },
    ...mapGetters(["favoriteList","user"])
  },
  methods: {
    selectSong(song) {
      this.insertSong(new Song(song));
    },
    ...mapActions(["insertSong"])
  },
  components: {
    Mention
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.isLogin{
  position: relative;
  width:100%;
  background:#E8E5E5; 
  min-height: 300px;
  padding-top:12% ;
  z-index: 2;
}
.bg-cover {
  background-size: cover;
  position: relative;
  z-index: 2;
  .bg-mask {
    width: 100%;
    height: 100%;
    .area {
      margin: 0 auto;
      width: 56%;
      text-align: center;
      min-height: 620px;
      background-color: rgba(255, 255, 0, 0.2);
      .leftTop{
        position: fixed;
        left:-8px;
        top:40px;
        z-index: -1;
      }
      .bottomthree{
        width: 800px;
        position: fixed;
        right:-10px;
        bottom:58px;
        z-index: -1;
        pointer-events: none;
        img{
          width: 100%;
        }
      }
      .bottomseven{
        position: fixed;
        left:-88px;
        bottom:-128px;
        z-index: -1;
      }
      .tableData {
        width: 100%;
        color:#555;
        border-collapse: collapse;
        text-shadow: 0 0 5px #fff;
        tr{
        border-bottom: 1px solid #666;
        height: 30px;
        }
        .list {
          cursor: pointer;
          &:hover {
            background-color: rgba(90, 105, 231, 0.3);
          }
          .icon-xiai {
            color: red;
          }
        }
      }
    }
    .mention {
      margin: 0 auto;
      font-size: 28px;
    }
  }
}
@media screen and (max-width: 750px) {
  @import '../../common/less/padding.less';
  .isLogin{
  position: relative;
  width:100%;
  background:#fff; 
  min-height: 479px;
  padding-top:20% ;
}
  .mention {
    margin: 0 auto;
    font-size: 14px;
  }
  #bg-cover .bg-mask .area {
    width: 100%;
    background:rgb(181, 185, 190);
    .container {
      width: 100%;

      table#tableData {
        text-shadow: none;
        font-size: 15px;
        color: rgb(185, 153, 153);
        .title{
          background: #666;
          font-size: 13px;
          height: 20px;
          line-height: 15px;
          .defavor{
            padding-right: 5px;
          }
          .songname{
            padding-left: 5px;
          }
        }
        .list {
          width: 100%;
          font-size: 13px;
          text-shadow: none;
          padding:0 10px;
          color: rgb(138, 131, 131);
          border-bottom: 1px solid rgb(138, 131, 131);
          .defavor{
            padding-right: 5px;
            font-size: 18px;
          }
          .bofang{
            font-size:15px;
          }
          .songname{
            padding-left: 5px;
          }
          td {
            height: 40px;
            overflow: hidden;
            word-break: keep-all;
          }
        }
      }
    }
  }
  .hidden {
    display: none;
  }
}
</style>

