document.title=title;
var cssflag=true; var cssname="animalsStyes0.css";
window.onresize = function(){
  var winHeight = window.innerHeight;
  var winWidth = window.innerWidth;
  $(".numWrap,body,.allEnd").css("height",winHeight);
}
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
$(".numWrap,body,.allEnd").css("height",winHeight);
$('.sycsNum').html(syNumall);
//开始游戏
function startGame() {
    if(!gameStarted){
        genLever(lever);
         daohang(lever);
        gameStarted = true;
    }
}
//继续游戏
function continueGame() {
  alllistenNum=0;
console.log(leverFaileCount+"判断失败");
console.log(leverPassCount+"判断成功");
    if(leverFaileCount>=2){
        lever--;
        if(lever<1){
            lever = 1;
        }
        newLever();
         daohang(lever);
         $(".leverCurrentNum").html(lever);
        return;
    }

    //成功超过2次，升级
    if(leverPassCount>=2){
        lever++;
         endZlever++;
          if(endZlever>12){
              endZlever == 12;
          }
        if(lever>12){
            lever == 12;
        }

        $(".leverCurrentNum").html(lever);
        /*关于升级后随机变场景*/
        if(Math.random()>0.5){
            if(Math.random()>0.5) {
                replacejscssfile(cssname, "animalsStyes0.css", "css")
                cssname="animalsStyes0.css";
            }else{
                replacejscssfile(cssname, "animalsStyes2.css", "css")
                cssname="animalsStyes2.css";
            }
            cssflag = true;
            $(".numWrap").css("background-image", "url(img/bg.png)");
            console.log(cssname+"one")

        }else{

            if(Math.random()>0.5) {
                replacejscssfile(cssname, "animalsStyes3.css", "css")
                cssname="animalsStyes3.css";
            }else{
                replacejscssfile(cssname, "animalsStyes1.css", "css")
                cssname="animalsStyes1.css";
            }

            console.log(cssflag+"cssflag-----------")
            // replacejscssfile("animalsStyes0.css", "animalsStyes1.css", "css")
            cssflag = false;
            $(".numWrap").css("background-image", "url(img/bgtwo.png)");
            console.log(cssname+"two")

        }

        newLever();
        daohang(lever);
        $(".leverCurrentNum").html(lever);
        return;
    }
    //当前级别初始化
    resetLever();
    genLever(lever);
}

//切换css样式文件
function replacejscssfile(oldfilename, newfilename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none";
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none";
    var allsuspects=document.getElementsByTagName(targetelement);
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
            var newelement=createjscssfile(newfilename, filetype);
            allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
        }
    }
}


function createjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    return fileref
}



//新的关卡
function newLever() {
    //当前级别通过次数
    leverPassCount = 0;
    //当前级别失败次数
    leverFaileCount = 0;
    resetLever();
    genLever(lever);
}

//关卡重置
function resetLever() {
    leverNumber = [];
    leverNumber_cn = [];
     moveArr=[];
     result = [];
}

//生成关卡数据
function genLever(lever) {
    genLeverFruit(lever);
    GenHTML(leverNumber);
}
//生成关卡中玩家需要选中的数字
function genLeverFruit(lever) {
    var count = lever;
    for (var i = 0; i < count; i++) {
    //获取随机索引
    var randomIndex = GerRandomByRange(12);
    //获取随机水果
    var tempFruit =allFruits[randomIndex];
    //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
    while(leverNumber.indexOf(tempFruit) !== -1){
    randomIndex = GerRandomByRange(12);
    tempFruit =allFruits[randomIndex];
    }
    //当前关卡显示水果追加刚刚随机选择的数字
    leverNumber.push(tempFruit);
    leverNumber_cn.push(allFruits_cn[allFruits.indexOf(tempFruit)]);
    }
    // console.log(leverNumber)
    // console.log(leverNumber_cn)
}
//播放玩家需要选中的水果的音频
function playLeverAudio(leverNumber) {
    var time = 0;
    for (var i = 0; i < leverNumber.length; i++) {
        (function() {
            var fruitName = leverNumber[i];
            setTimeout(function() {
                var className = '.phoneNumList li.'+fruitName+' img';
                console.log(className)
                $(className).css("display","block");

            }, time);
            time = ((i+1)*animalsTime);
        })();
    }
}
 /*
 * 生成需要显示的水果html,并且绑定事件
 */
  var result = []//去重数组
function GenHTML(leverAllFruit) {
    var html = "";
    var html2 = "";
    for (var i = 0; i < leverNumber.length; i++) {
        var fruitName = leverNumber[i];
        if (cssflag) {
            html += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"><img id="' + "img_" + fruitName + '" src="img/' + fruitName + '.png"></li>';
            html2 += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"></li>';
        } else {
            html2 += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"></li>';
            html += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"><img id="' + "img_" + fruitName + '" src="img/' + fruitName + '1.png"></li>';
        }

    }
    document.getElementById('phoneNumList').innerHTML = html;
    playLeverAudio(leverNumber);
     
     setTimeout(function(){
        $(".phoneNumList li").css({"background-image":"url(./img/vacant.png)","background-repeat":"no-repeat","background-position":"center center"});
        $(".phoneNumList li img").css("display","none");
        document.getElementById('buttonImg').innerHTML = html2;
        for (var i = 0; i < leverNumber.length; i++) {
            var fruitName = leverNumber[i];
            var className= ".buttonImg li."+fruitName
            var imgurl ;

            if (cssflag){
                imgurl= 'img/'+fruitName+'.png'
            }else{
                imgurl= 'img/'+fruitName+'1.png'
            }

            // console.log(className,imgurl)
            $(className).css(
                {"background-image":"url("+imgurl+") ","background-size":"contain"});
        }

        // 为li绑定事件
        var move=false;//移动标记
        var _index ;
        var x ;//控件左上角到屏幕左上角的相对位置
        var y ;
        var offsetLeft2;//控件坐标
        var offsetTop2;
        var _x,_y;//鼠标离控件左上角的相对位置
        var offsetLeft;//需要对应的li
        var offsetTop;
        var moveArr=[];//找到动物的数量
        var classNamewh;
        var classNamebutton;
        var classNamenomals ;
        document.body.onselectstart = function(){ return false;}
        $("#buttonImg li").mousedown(function(e){
            _index = $(this).index();
            classNamewh= ".phoneNumList li."+$("#buttonImg li").eq(_index).attr("data-number");
            classNamebutton= ".buttonImg li."+$("#buttonImg li").eq(_index).attr("data-number");
            move=true;
            _x=e.pageX-parseInt($("#buttonImg li").eq(_index).css("left"));
            _y=e.pageY-parseInt($("#buttonImg li").eq(_index).css("top"));
        });
        $("#img_"+classNamenomals).css("display","block");

        $("body").mousemove(function(e){

                if(move){ 
                  x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置 
                  y=e.pageY-_y; 
                  $("#buttonImg li").eq(_index).css({"top":y,"left":x}); 
                  offsetLeft=$("#phoneNumList li").eq(_index).offset().left;
                  offsetTop=$("#phoneNumList li").eq(_index).offset().top;
                  offsetLeft2=$("#buttonImg li").eq(_index).offset().left;
                  offsetTop2=$("#buttonImg li").eq(_index).offset().top;
                  moveArr.push(_index);
                  // console.log(_index+"第几个")
                  // console.log(moveArr+"11111")
                  // console.log(y+"yyyy")
                } 
             })
         $("#buttonImg li").mouseup(function(){
                // console.log(offsetLeft2,offsetTop2+"777")
                //判断
                var offsetLeftL = offsetLeft-50;
                var offsetLeftR = offsetLeft+50;
                var offsetTopT = offsetTop-50;
                var offsetTopB = offsetTop+50;
                var offsetLeftL2 = offsetLeft;
                var offsetTopT3 = offsetTop+10;
                var offsetLeftL4 = offsetLeft-10;
            shake(classNamewh+" img");
                var qcArr=unique(moveArr);
                //  console.log(moveArr+"数组")
                // console.log(qcArr+"数组2")

                if (qcArr.length!==leverNumber.length) {
                 
                      if(offsetLeftL < offsetLeft2 && offsetLeft2< offsetLeftR && offsetTopT<offsetTop2 && offsetTop2< offsetTopB){
                        $(classNamewh).css("background-image","none");
                        $(classNamebutton).css("background-image","none");
                        $(classNamewh+" img").css("display","block");
                        
                       result=[];
                    }else{
                     
                      $(classNamewh).css("background-image","none");
                      $(classNamebutton).css("background-image","none");
                       $(classNamewh+" img").css("display","block");
                        console.log(classNamewh+" img"+"222222222222222");
                       moveArr=[];
                       result=[];
                      $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);

                        setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                               stop();
                                  $(".buttonImg,.phoneNumListWrap").css("display","none");
                                  $(".allEnd").css("display","block");
                                  $(".endTip").html("训练结束");
                                 $('.endS').html(successNum);
                                   $('.endF').html(faildNum);
                                   $('.endT').html(total);
                                   $('.glever').html(endZlever);
                                    $('.endlever').html(lever);
                                   $('.cslever').html(cslever);
                                  return;
                            }
                            if(total==10){
                               stop();
                              $(".buttonImg,.phoneNumListWrap").css("display","none");
                               $(".allEnd").css("display","block");
                               $(".endTip").html("训练结束");
                                $('.endS').html(successNum);
                                   $('.endF').html(faildNum);
                                   $('.endT').html(total);
                                   $('.glever').html(endZlever);
                                    $('.endlever').html(lever);
                                   $('.cslever').html(cslever);
                               return;
                            }
                            setTimeout(function(){ continueGame();},continueTime);
                        },1100);
                        
                        stopGameDJS();
                        leverFaileCount++;
                        leverPassCount=leverPassCount-1;
                        faildNum++;
                         total=successNum+faildNum;
                         syNum=syNumall-total;             
                        if(leverPassCount<0){
                            leverPassCount=0
                        }    WrongSort.push(false);
                          singleUseTime.push(alllistenNum);
                        alllistenNumall=alllistenNumall+alllistenNum;
                        ErroneousTime = ErroneousTime+alllistenNum;
                         if(alllistenNumall>60){
                             alllistenNumzg = parseInt(alllistenNumall/60)+"分";
                         }else{
                             alllistenNumzg = alllistenNumall%60+"秒";
                         }
                         CorrectRate = (successNum/10)*100+".00%";
                          if(lever>cslever){
                               endZlever = lever;
                            }
                            $('.sycsNum').html(syNum);
                        document.getElementById('LeverNumB').innerHTML = faildNum;
                        document.getElementById('allScore').innerHTML = score;
                        document.getElementById('phoneNumList').innerHTML = "";  
                       document.getElementById('buttonImg').innerHTML = "";
                    }
                }else if(qcArr.length == leverNumber.length){
                  var  passed = false;
                  if(offsetLeftL < offsetLeft2 && offsetLeft2< offsetLeftR && offsetTopT<offsetTop2 && offsetTop2< offsetTopB){
                    $(classNamewh).css("background-image","none");
                     $(classNamewh+" img").css("display","block");
                     $(classNamebutton).css("background-image","none");
                       passed = true;
                  }
                   if(passed){

                    $(classNamewh).css("background-image","none");
                     $(classNamewh+" img").css("display","block");
                     $(classNamebutton).css("background-image","none");
                        moveArr=[];
                        result = [];
                        $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);
                        setTimeout(function(){
                           if(leverPassCount==2 && lever==endLever){
                             stop();
                             $(".buttonImg,.phoneNumListWrap").css("display","none");
                              $(".allEnd").css("display","block");
                              $(".endTip").html("训练成功");
                               $('.endS').html(successNum);
                               $('.endF').html(faildNum);
                               $('.endT').html(total);
                               $('.glever').html(endZlever);
                                $('.endlever').html(lever);
                               $('.cslever').html(cslever);
                               return;
                        }
                        if(total==10){
                           stop();
                                $(".buttonImg,.phoneNumListWrap").css("display","none");
                                $(".allEnd").css("display","block");
                                $(".endTip").html("训练结束");
                                 $('.endS').html(successNum);
                                   $('.endF').html(faildNum);
                                   $('.endT').html(total);
                                   $('.glever').html(endZlever);
                                    $('.endlever').html(lever);
                                   $('.cslever').html(cslever);
                                return;
                            }
                             document.getElementById('buttonImg').innerHTML = "";
                              document.getElementById('phoneNumList').innerHTML = ""; 
                              setTimeout(function(){ continueGame();},continueTime);
                        },1100);
                        stopGameDJS();
                        leverPassCount++;
                        successNum++;
                        leverFaileCount=leverFaileCount-1;
                        score+= 10;
                        total=successNum+faildNum;
                        syNum=syNumall-total;
                         if(score>240){
                                score=240
                            }
                        if(leverFaileCount<0){
                            leverFaileCount=0
                        } WrongSort.push(true);
                       singleUseTime.push(alllistenNum);
                         alllistenNumall=alllistenNumall+alllistenNum;
                         CorrectTime = CorrectTime+alllistenNum;
                             if(alllistenNumall>60){
                                 alllistenNumzg = parseInt(alllistenNumall/60)+"分";
                             }else{
                                 alllistenNumzg = alllistenNumall%60+"秒";
                             }
                         CorrectRate = (successNum/10)*100+".00%";
                          if(lever>cslever){
                               endZlever = lever;
                            }
                            $('.sycsNum').html(syNum);
                        document.getElementById('LeverNumT').innerHTML = successNum;
                          document.getElementById('allScore').innerHTML = score;
                          
                    }else{
                      $(classNamewh).css("background-image","none");
                       $(classNamewh+" img").css("display","block");
                       $(classNamebutton).css("background-image","none");
                       moveArr=[];
                       result = [];
                        $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);
                        setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                               stop();
                                 $(".buttonImg,.phoneNumListWrap").css("display","none");
                                $(".allEnd").css("display","block");
                                $(".endTip").html("训练结束");
                                   $('.endS').html(successNum);
                                   $('.endF').html(faildNum);
                                   $('.endT').html(total);
                                   $('.glever').html(endZlever);
                                    $('.endlever').html(lever);
                                   $('.cslever').html(cslever);
                                return;
                            }
                            if(total==10){
                               stop();
                                $(".buttonImg,.phoneNumListWrap").css("display","none");
                                $(".allEnd").css("display","block");
                                $(".endTip").html("训练结束");
                                $('.endS').html(successNum);
                                $('.endF').html(faildNum);
                                $('.endT').html(total);
                                $('.glever').html(endZlever);
                                $('.endlever').html(lever);
                                $('.cslever').html(cslever);
                                return;
                            }
                             document.getElementById('buttonImg').innerHTML = "";
                              document.getElementById('phoneNumList').innerHTML = "";
                              setTimeout(function(){ continueGame();},continueTime);
                        },1100);
                           clickNum=0;
                           stopGameDJS();
                        leverFaileCount++;
                        faildNum++;
                        leverPassCount=leverPassCount-1;                
                         total=successNum+faildNum;
                         syNum=syNumall-total;            
                        if(leverPassCount<0){
                            leverPassCount=0
                        }    WrongSort.push(false);
                       singleUseTime.push(alllistenNum);
                          alllistenNumall=alllistenNumall+alllistenNum;
                          ErroneousTime = ErroneousTime+alllistenNum;
                           if(alllistenNumall>60){
                               alllistenNumzg = parseInt(alllistenNumall/60)+"分";
                           }else{
                               alllistenNumzg = alllistenNumall%60+"秒";
                           }
                          CorrectRate = (successNum/10)*100+".00%";
                           if(lever>cslever){
                               endZlever = lever;
                            }
                            $('.sycsNum').html(syNum);
                        document.getElementById('LeverNumB').innerHTML = faildNum;
                         document.getElementById('buttonImg').innerHTML = "";
                          document.getElementById('phoneNumList').innerHTML = "";  
                        document.getElementById('allScore').innerHTML = score;  
                    }
                }
                 move=false; 
             })
                stopGameDJS();
                startGameDJS();
      },(lever+1)*1500)


}
//数组去重
function unique(arr){
          var len = arr.length;
          for(var i=0;i<len;i++){
              var flag = true;
             for(var j = i;j<arr.length-1;j++){
                  if(arr[i]==arr[j+1]){
                      flag = false;
                      break;
                 }
             }
             if(flag){
                 result.push(arr[i])
             }
         }
         return result;
     }
/*
* 生成从0到max的随机整数
* @max 随机整数最大值
*/
function GerRandomByRange(max) {
    if(!max){ max = 1; };
    return Math.floor(Math.random()*max);
}
//导航
function daohang(lever){
    var fruitLever = document.querySelectorAll(".gameNum li");
    for (var i = 0; i < fruitLever.length; i++) {
        // console.log(fruitLever[i]);
        $(".gameNum li:eq("+i+")").removeClass("bgc");
        //afruitLever[i].removeClass("bgc");
        var num=fruitLever[i].getAttribute("dataNum");
        // console.log(num);
        if(num<=lever){
            fruitLever[i].setAttribute("class","bgc");
        }
    }
}
//60秒倒计时
var wait = 60;
var timer;
  function start() {
        wait--;
         alllistenNum++;
    if (wait == 0) {
        wait = waitEnd;
        $(".Tips").html("超过一分钟没有操作，失败一次").show(50).delay(1000).hide(50);

        total++;
        syNum=syNumall-total;
        $('.sycsNum').html(syNum);

        leverFaileCount++;
        faildNum++;
         document.getElementById("time").innerHTML=wait;
       document.getElementById('phoneNumList').innerHTML = "";  
        document.getElementById('buttonImg').innerHTML = "";
        document.getElementById('LeverNumB').innerHTML = faildNum;
        setTimeout(function(){
	       	djsNum++;
	        if(djsNum==3){
                stopGameDJS();
                $(".phoneNumList,.gameNum").css("display","none");
                $(".allEnd").css("display","block");
                $(".endTip").html("训练结束");
                $('.endS').html(successNum);
                $('.endF').html(faildNum);
                $('.endT').html(total);
                $('.glever').html(endZlever);
                $('.endlever').html(lever);
                $('.cslever').html(cslever);
                stop();
	            return;
	        }
	        continueGame();
	      },2100)
    }
    document.getElementById("time").innerHTML=wait;
}
//开始定时器
  function startGameDJS() {
    clearInterval(timer);
    wait = waitEnd;
    timer = setInterval(start, 1000);
}
//停止定时器
function stopGameDJS() {
    clearInterval(timer);
     wait = waitEnd;
     document.getElementById("time").innerHTML=wait;
}
 //开始倒计时
 $(".leverCurrentNum").html(lever);
function startDjs2() {
startDjs--;
if (startDjs == 0) {
startDjs = 0;
 document.getElementById("startDjs").innerHTML=startDjs;
}
document.getElementById("startDjs").innerHTML=startDjs;
}
setInterval(function(){startDjs2()},1000)
setTimeout(function(){
$("#startDjs").css("display","none");
$(".gameNum,.phonebgWrap,.buttonImg").css("display","block");
startGame();
startjs();
},startDjs*1000)

function Reset()//重置
{
  clearInterval(int);
  millisecond=hour=minute=second=0;
  document.getElementById('timetext').innerHTML='0:0:0';
}

function startjs()//开始
{ 
  clearInterval(int);
  int=setInterval(timer,50);
}

function timer()//计时
{
  millisecond=millisecond+50;
  if(millisecond>=1000)
  {
    millisecond=0;
    second=second+1;
  }
  if(second>=60)
  {
    second=0;
    minute=minute+1;
  }

  if(minute>=60)
  {
    minute=0;
    hour=hour+1;
  }
  document.getElementById('timetext').innerHTML=hour+':'+minute+':'+second;

}

function stop()//暂停
{
    clearInterval(int);
    //上传数据
   output_score_ajax_fun();
}

//抖动效果
function shake(o){
    var $panel = $(o);
    box_top =  $panel.offset().top;
    $panel.css({'top': box_top,'position':'absolute'});
    for(var i=1; 2>=i; i++){
        $panel.animate({top:box_top-(20-10*i)},100);
        $panel.animate({top:box_top+2*(20-10*i)},100);
    }

}