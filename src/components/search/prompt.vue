<template>
  <div class="prompt" id="prompt">
    <table>
              <tr class="title">
                  <td>歌曲名</td>
                  <td>歌手</td>
                  <td class="hidden">专辑</td>
                  <td class="optionTitle">播放</td>
              </tr>
              <tr class="active" id="active" :key="index" v-for="(item,index) in result">
                  <td nowrap="nowrap" class="songname" v-text="item.name"></td>
                  <td nowrap="nowrap"  v-text="item.singer"></td>
                  <td nowrap="nowrap" class="hidden"  v-text="item.album"></td>
                  <td class="bigfont" @click="selectItem(item)">▷</td>
              </tr>    
          </table>
           <div class="mention" v-show="mention">
          <mention></mention>
          </div>
          <table v-show="!mention">
            <tr ref="option" class="option">
            <td @click="subData"><<上一页</td>
            <td>当前页：{{page}}</td>
            <td @click="addData">下一页>></td>
          </tr>
          </table> 
            </div>
   
</template>
<script>
import { search } from "../../api/search";
import { ERR_OK } from "../../api/config";
import { createSong } from "../../common/js/song";
import { mapActions } from "vuex";
import Mention from "../../base/mention";

const perpage = 20;
export default {
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: "青花瓷"
    }
  },
  data() {
    return {
      page: 1,
      totalNum: 0,
      result: []
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      search(this.query, this.page, this.showSinger, perpage)
        .then(res => {
          if (res.code === ERR_OK) {
            this.totalNum = res.data.song.totalnum;
            this.result = this._genResult(res.data);
          }
        })
        .catch(() => {
          console.log(error);
        });
    },
    selectItem(item) {
      this.insertSong(item);
    },
    _genResult(data) {
      let ret = [];
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
    addData() {
      if (this.page >= this.totalNum / perpage) {
        return;
      }
      this.page++;
      this.search();
    },
    subData() {
      if (this.page <= 1) {
        return;
      }
      this.page--;
      this.search();
    },
    ...mapActions(["insertSong"])
  },
  computed: {
    mention() {
      return !this.result.length;
    }
  },
  watch: {
    query() {
      this.page = 1;
      this.search();
    }
  },
  components: {
    Mention
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
* {
  margin: 0 auto;
  list-style: none;
}
@media screen and (min-width: 750px) {
  table {
    text-shadow: 0 0 1px #fff;
    color: #eee;
    font-weight: 500;
    font-size: 15px;
    .active {
      &:hover {
        background-color: rgba(102, 102, 104, 0.6);
      }
    }
  }
}
.mention {
  margin: 20px auto;
  font-size: 28px;
}

.prompt {
  width: 100%;
  min-height: 566px;
  padding: 0;
  margin: 0;
  margin: 0 auto;
  table {
    width: 100%;
    text-align: center;
    border: 0px;
    border-collapse: collapse;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    .title {
      border-bottom: 1px solid #666;
      height: 20px;
    }
    .active {
      border-bottom: 1px solid #666;
      vertical-align: middle;
      cursor: pointer;
      .bigfont {
        font-size: 20px;
      }
      td{
        max-width: 260px;
        overflow: hidden; 
      }
    }
  }
  td.optionTitle {
    min-width: 30px;
  }
  .option {
    cursor: pointer;
  }
}
@media screen and (max-width: 750px) {
  #prompt {
    width: 100%;
    background-color: rgba(154, 156, 159, 0.2);
    table {
      color: rgb(214, 147, 147);
      border-collapse: collapse;
      tr {
        background-color: rgba(154, 156, 159, 0.2);
        &:hover {
          background-color: rgba(154, 156, 159, 0.2);
        }
      }
      .title {
        background: #666;
        td {
          border: 1px solid #666;
        }
      }
    }
    .title {
      font-size: 15px;
      font-weight: normal;
      height: 15px;
      margin: 0;
      &:hover {
        background-color: #666;
      }
      td {
        margin: 0;
      }
    }
    #active {
      height: 40px;
      margin: 0;
      color: rgb(138, 131, 131);
      background-color: rgba(154, 156, 159, 0.2);
      line-height: 40px;
      font-size: 13px;
      border-bottom: 1px solid rgb(138, 131, 131);
      &:hover {
        background-color: rgba(154, 156, 159, 0.2);
      }

      td {
        max-width: 80px;
        height: 12px;
        font-size: 13px;
        margin: 0;
        overflow: hidden;
        word-break: keep-all;
      }
      .songname {
        padding-left: 10px;
      }
      .bigfont {
        padding-right: 10px;
        font-size: 15px;
        width: 30px;
        margin-right: 8px;
      }
    }
  }
  .option {
    height: 36px;
    line-height: 36px;
  }
  .hidden {
    display: none;
  }
}
</style>

