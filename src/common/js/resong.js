import { ERR_OK } from "../../api/config";

export default class ReSong{
    constructor({id,mid,singer,name,album,duration,image,detail,ly,url}){
        this.id=id;
        this.mid=mid;
        this.singer=singer;
        this.name=name;
        this.album=album;
        this.duration=duration;
        this.image=image;
        this.detail=detail;
        this.ly=ly;
        this.url=url;
    }

    getLyric(){
        if(this.ly){
            return new Promise((resolve,reject)=>{
                        resolve(this.ly);
            })
        }
        return new Promise((resolve,reject)=>{
                    reject('no lyric');
        })
    }
}

export function createReSong(musicData){
    return new ReSong({
        id:musicData.id,
        mid:musicData.mid,
        singer:musicData.singer,
        name:musicData.name,
        album:musicData.album,
        duration:musicData.duration,
        image:musicData.image,
        detail:musicData.detail,
        ly:musicData.lyric,
        url:musicData.url        
    })
}









