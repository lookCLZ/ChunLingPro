export function star(maxw,time){

    let ele=[];
	setInterval(function updata(){
		for(let j=0;j<ele.length;j++){
		document.body.removeChild(ele[j]);
		}
		move();
	},time);

	function move(){
		let x=document.body.clientWidth-10; 
        let y=document.body.clientHeight-10; 
		for(let i=0;i<50;i++){
		let w=Math.random()*maxw+'px';
		let randomX=Math.random()*x+'px';
		 let randomY=Math.random()*y+'px';

        ele[i]=document.createElement("div");
        ele[i].style.width=w;
		ele[i].style.height=w;
		ele[i].style.position='absolute';
		ele[i].style.top=randomY;
		ele[i].style.left=randomX;
		ele[i].style.background="rgba(255,255,255,0.7)";
		ele[i].style.borderRadius='50%';
        ele[i].style.zIndex=1;
		document.body.appendChild(ele[i]);
    } 
	}
   
}