// -----------------------------轮播图  B站效果
var r_ColSpans = document.querySelectorAll('#r_Col span');
var r_CulLi = document.querySelectorAll('#r_Cul li');
var r_Carousel = document.querySelector('#r_Carousel');

var nowIndex = 0;
var now = 0;

for(var i=0;i<r_ColSpans.length;i++){
    r_ColSpans[i].index = i;
    r_ColSpans[i].onmouseover = function(){
        for(var i=0;i<r_ColSpans.length;i++){
            r_ColSpans[i].className = '';
        }
        this.className = 'active';

        if( nowIndex < this.index ){   // 向左移动
            //初始位置在右侧
            r_CulLi[this.index].style.left = 1519 + 'px';
            move({
                elem : r_CulLi[nowIndex],
                objTarget : { left : -1519 }
            });
        }
        else if( nowIndex > this.index){   // 向右移动
            //初始位置在左侧
            r_CulLi[this.index].style.left = - 1519 + 'px';
            move({
                elem : r_CulLi[nowIndex],
                objTarget : { left : 1519 }
            });
        }
        move({
            elem : r_CulLi[this.index],
            objTarget : { left : 0 }
        });
        nowIndex = this.index;  //这样可以进行下一次的切换
        // console.log(this.index);
        now = this.index;
    };
}

r_Carousel.onmouseover = function(){
    clearInterval(timer);
}

r_Carousel.onmouseout = function(){
    timer = setInterval(run,2000);
}

timer = setInterval(run,2000);

function run(){
    if(now == r_ColSpans.length-1){
        now = 0;
    }
    else{
        now++;
    }
    for(var i=0; i<r_ColSpans.length; i++){
        r_ColSpans[i].className = '';
    }
    r_ColSpans[now].className = 'active';
    if( nowIndex < now ){   // 向左移动
        //初始位置在右侧
        r_CulLi[now].style.left = 1519 + 'px';
        move({
            elem : r_CulLi[nowIndex],
            objTarget : { left : -1519 }
        });
    }
    else if( nowIndex > now){   // 向右移动
        //初始位置在左侧
        r_CulLi[now].style.left = - 1519 + 'px';
        move({
            elem : r_CulLi[nowIndex],
            objTarget : { left : 1519 }
        });
    }
    move({
        elem : r_CulLi[now],
        objTarget : { left : 0 }
    });
    nowIndex = now;  //这样可以进行下一次的切换
}



