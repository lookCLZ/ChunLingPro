import {playMode} from '../common/js/config';
import {loadFavorite} from '../common/js/cache';

const state={
    user:false,
    singer:{},
    playing:false,
    fullScreen:false,
    playlist:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    topList:{},
    favoriteList:loadFavorite()
}
export default state;