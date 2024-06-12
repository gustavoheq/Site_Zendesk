const imgs = document.getElementById("img")
const img = document.querySelectorAll("#img img")

let idx = 0;

function Carrossel (){
    idx ++;
    if(idx > img.length -1){
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 700}px)`
}
setInterval(Carrossel,1999)

let items =  document.querySelectorAll(".BOX  .BOX1");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

let active = 3;

function LoadShow(){
    let stt = 0 ;

    items[active].transform = `none`;
    items[active].zIndex = 1;
    items[active].filter = `blur(5px)`
    items[active].opacity =stt > 2 ? 
}


