<template>
  <div class="padding">
    <div class="container" id="container">
      <div class="upselect">
        <div class="picture">
          <img :src="songs[3].image" alt="">
        </div>
        <div class="info">
          <span class="dissName">天空之蓝</span>
          <span class="detail" >蓝色天空白色云彩，
康乐爱山水，赏心千载同。结茅依翠微，伐木开蒙笼。 
孤峰倚青霄，一径去不穷。候客石苔上，礼僧云树中。 
旷然见沧洲，自远来清风。五马留谷口，双旌薄烟虹。 
沉沉众香积，眇眇诸天空。独往应未遂，苍生思谢公。 
</span>
        </div>
      </div>
      <div class="downselect">
    <div class="songlist">
          <table>
              <tr class="title">
                  <th>歌曲名</th>
                  <th>歌手</th>
                  <th id="option">播放</th>
              </tr>
              <tr v-for="(song,index) in songs" class="active" id="active" :key="index">
                  <td class="songname">{{song.name}}</td>
                  <td >{{song.singer}}</td>
                  <td class="bigfont" @click="selectItem(song,index)">▷</td>
              </tr>    
          </table>
      </div>
      </div>
    </div>
  </div>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
import { ERR_OK } from "../../api/config";
import { createSong } from "../../common/js/song";
import { getRankList } from "../../api/rank";

export default {
  data() {
    return {
      songs: [],
      so: []
    };
  },
  created() {
    this._getRankList();
  },
  methods: {
    _getRankList() {
      getRankList(this.topList.id).then(res => {
        this.so = res;
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
     selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions(["selectPlay"])
  },
  computed: {
    ...mapGetters(["topList"])
  },
  watch:{
      '$route'(to,from){
          this._getRankList();
      }
  }
};
</script>
 <style scoped lang="less" rel="stylesheet/less">
.container {
  width: 70%;
  min-height: 500px;
  background-color: rgba(255, 55, 118, 0.3);
  margin: 0 auto;
  .upselect {
    height: 200px;
    margin: 0 auto;
    width: 100%;
    color: #ddd;
    border: 22px solid rgba(255, 255, 200, 0);
    .picture {
      float: left;
      width: 27%;
      img {
        width: 100%;
      }
    }
    .info {
      float: right;
      width: 55%;
      padding: 15px 70px 30px 10px;
      span {
        display: block;
        margin-bottom: 10px;
      }
      .dissName {
        width: 100%;
        text-align: center;
        font-size: 26px;
      }
      .detail {
        width: 100%;
        font-size: 18px;
        max-height: 200px;
        overflow-y: auto;
      }
    }
    &::after {
      clear: both;
    }
  }
  .downselect {
    width: 100%;
    text-align: center;
    .songlist {
      table {
        font-size: 16px;
        width: 100%;
        border-collapse: collapse;
        color: #eee;
        // text-shadow: 0 0 2px #ddd;
        .active{
          border-bottom: 1px solid rgba(255, 255, 255, 1);
          padding: 10px;
          // text-shadow: 0 0 1px #fff;
          &:hover {
            background-color: rgba(10, 77, 3, 0.6);
          }
          .bigfont {
            cursor: pointer;
            width: 10%;
            text-align: center;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 750px) {
  .padding{
     background: #000;
  }
}
@media screen and (max-width: 750px) {
  @import '../../common/less/padding.less';
  #container{
    padding: 0;
    margin: 0;
    min-height: 300px;
    width:100%;
    height: 100%;
    background:rgba(154, 156, 159, 0.2);
    .upselect{
     height: 47px;
     margin: 0 auto;
     width: 100%;
     color:#888;
     border:0;
     .picture{
       float: left;
       width: 26%;
       padding: 0;
       margin: 0;
       img{
         vertical-align: middle;
         width: 100%;
       }
     }
     .info{
       float: left;
       width: 60%;
       padding:5px 5px 0px 20px;
       span{
         display: block;
         margin-bottom: 5px;
       }
       .dissName{
         width: 100%;
        text-align: center;
         font-size:13px;
       }
       .detail{
         width: 100%;
         font-size:12px;
         max-height: 55px;
         overflow-y: auto;
         margin: 0;
       }
     }
     &::after{
       clear: both;
     }
   }
   .downselect{
     width: 100%;
     text-align: center;
     padding:0;
     .songlist{
       table {
      color: rgb(214, 147, 147);
      background-color: rgba(154, 156, 159, 0.2);
      text-shadow: none;
      width: 99%;
      border-collapse: collapse;
    }
    .title {
      font-size: 13px;
      font-weight: normal;
      height: 15px;
      margin: 0;
      text-shadow: none;
      border-bottom: 1px solid #666;
      background: #666;
      #option{
        padding-right:8px;
        text-align: left;
      }
      td {
        margin: 0;
      }
    }
    #active {
      height: 40px;
      margin: 0;
      color: rgb(138, 131, 131);
      line-height: 40px;
      text-shadow: none;
      font-size: 15px;
      overflow: hidden;
      border-bottom: 1px solid rgb(138, 131, 131);
      background-color: rgba(154, 156, 159, 0.2);
      &:hover{
        background-color: rgba(154, 156, 159, 0.2);
      }
      tr{
        height: 40px;
      }
      td {
        max-width: 76px;
        height: 40px;
        font-size: 12px;
        margin: 0;
        overflow: hidden;
        text-shadow: none;
        word-break: keep-all;
      }
      .songname {
        padding-left: 6px;
        text-shadow: none;
        overflow: hidden;
        margin: 0;
      }
      .bigfont {
        padding-right: 16px;
        width: 30px;
        font-size: 15px;
        text-shadow: none;
      }
    }
  }
     }
   }
 }
</style>
 
 
