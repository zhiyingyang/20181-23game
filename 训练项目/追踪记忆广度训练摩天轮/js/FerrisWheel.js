 document.title=title;
 window.onresize = function(){
  var winHeight = window.innerHeight;
  $(".allEnd").css("height",winHeight);
  $(".numWrap").css("height",$(window).height());
  $(".phoneNumListWrap").css("height",$(".phoneNumListWrap").width());
  calcDrg();
}
var winHeight = window.innerHeight;
$(".allEnd").css("height",winHeight);
$(".numWrap").css("height",$(window).height());
$(".phoneNumListWrap").css("height",$(".phoneNumListWrap").width());
$('.sycsNum').html(syNumall);
function calcDrg()
{
    var oDiv1= document.querySelectorAll(".phoneNumList li")
    var r=$(".phoneNumList").height()/2;
    for(i=0;i<12;i++)
    {
        var degress=360*i/12;
        var a=Math.sin(degress*Math.PI/180)*r;
        var b=Math.cos(degress*Math.PI/180)*r;
        $(".phoneNumList li").eq(i).css("left",$(".phoneNumList").height()/2-$(".phoneNumList li").width()/2+b+'px');
        $(".phoneNumList li").eq(i).css("top",$(".phoneNumList").height()/2-$(".phoneNumList li").width()/2-a+'px');
    }
}
   
   
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
    //失败超过2次降级
    if(leverFaileCount>=2){
        lever--;
        if(lever<1){
            lever = 1;
        }
        $(".leverCurrentNum").html(lever);
        newLever();
         daohang(lever);
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
        newLever();
        daohang(lever);
        return;
    }
    //当前级别初始化
    resetLever();
    genLever(lever);
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
    //需要玩家选中的水果名称数组
    leverNumber = [];
    leverNeddCheckNumber = [];
    leverNumber_cn = [];
    leverNeddCheckNumber_cn = [];
}

//生成关卡数据
function genLever(lever) {
    genLeverFruit(lever);
    GenHTML(leverNumber);
    playLeverAudio(leverNeddCheckNumber,function () {
        var timeNum=1500;
        setTimeout(function () {
            stopGameDJS();
            startGameDJS();
            setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},200);
            // 为li绑定事件
            setTimeout(function(){
            var number = $(".phoneNumList li");
        for (var i = 0; i < number.length; i++) {
            var clickNum=-1;
                number.eq(i).one('click', function(ev) {
                clickNum = clickNum+1;
                var thisEleClassNames = this.getAttribute("class");
                var thisEleNames = this.getAttribute("data-number");
                var thisEleNamesCn = this.getAttribute("data-numberCn");
                //成功或者失败数字的变化
                if (thisEleClassNames && thisEleClassNames.indexOf("check") !== -1) {
                    console.log("如果有check,不能再点击");
                }
                else
                {
                    var newClassName = "check";
                    var checkedFruit = document.querySelectorAll(".phoneNumList .check");
                     // console.log(checkedFruit.length+"测试");
                    if (checkedFruit) {
                        var checkedFruitCount = checkedFruit.length + 1;
                        newClassName =newClassName+ " index_" + checkedFruitCount+ " thisEleNames";
                        this.setAttribute("class", newClassName);
                    } else {
                        this.setAttribute("class", "check index_1");
                    }
                }
                //需要点击的数字2次以后
                function NeddClickNum(){
                    var blockNum=leverNeddCheckNumber_cn[listenNum];
                }
                //判断结果
                var checkfruit = $(".phoneNumList .check");
                var leverFruitCount = lever;
                if(checkfruit.length !== leverFruitCount){
                    if(leverNeddCheckNumber[clickNum] !== thisEleNames){
                        console.log(leverNeddCheckNumber[clickNum]+"对比"+thisEleNames);
                       // $(".phoneNumList .check").unbind();
                        setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100);
                        setTimeout(function(){$(".phoneNumList").css("display","none");$(".phonebg").css("display","none")},1200);
                        $(".phoneNumList").css("animation","rotate2 0.1s linear infinite");
                        setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                              stop();
                               $(".phoneNumListWrap").css("display","none");
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
                              $(".phoneNumListWrap").css("display","none");
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
                            },1300);
                           clickNum=0;
                           listenNum=0;
                           stopGameDJS();
                           leverFaileCount++;
                            faildNum++;
                            leverPassCount=leverPassCount-1;                                  
                             total=successNum+faildNum; 
                             syNum=syNumall-total;                                  
                            if(leverPassCount<0){
                                leverPassCount=0
                            }         WrongSort.push(true);
                        singleUseTime.push(alllistenNum);
                        levelArray.push(lever);

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
                              console.log(alllistenNum+"总用时");
                              $('.sycsNum').html(syNum);
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumB').innerHTML = faildNum;
                    }else{
                        listenNum++;
                        if(listenNum+1>lever){
                            listenNum=lever
                        }
                        setTimeout(function(){
                             $(".phoneNumList li.check").css("background-image","url(img/cabin_n.png)");
                             NeddClickNum(listenNum);
                            },800);
                        
                    }
                }else if(checkfruit && checkfruit.length == leverFruitCount){
                    var passed = true;
                    var checkfruitArray = [];
                    while(checkfruitArray.length < leverFruitCount)
                    {
                        var className = "index_"+(checkfruitArray.length+1);
                        for (var i = 0; i < checkfruit.length; i++) {
                            var thisFruitName = checkfruit[i].getAttribute("data-number");
                            var thisFruitClassName = checkfruit[i].getAttribute("class");
                            if(thisFruitClassName.indexOf(className) !== -1){
                                checkfruitArray.push(thisFruitName);
                            }else{                                  
                            }
                        }
                    }
                    for(var i = 0;i<leverFruitCount;i++){
                        if(leverNeddCheckNumber[i] !== checkfruitArray[i]){
                            passed = false;
                            }
                    }

                    if(passed){
                        $(".phoneNumList li").unbind();
                         setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                         setTimeout(function(){$(".phoneNumList").css("display","none");$(".phonebg").css("display","none");},1200);
                            setTimeout(function(){
                                 if(leverFaileCount==2 && lever==1){
                                 	alert(2)
                                  		stop();
                                       $("phoneNumListWrap").css("display","none");
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
                                     $(".phoneNumListWrap").css("display","none");
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
                            },1200);
                            clickNum=0;
                            listenNum=0;
                            stopGameDJS();
                            leverPassCount++;
                            successNum++;
                            leverFaileCount=leverFaileCount-1;
                            score+= 10;
                            total=successNum+faildNum;
                            syNum=syNumall-total; 
                             if(score>180){
                                    score=180
                                }
                            if(leverFaileCount<0){
                                leverFaileCount=0
                            }

                            WrongSort.push(true);
                            singleUseTime.push(alllistenNum);
                            levelArray.push(lever);
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
                              console.log(alllistenNum+"总用时");
                              $('.sycsNum').html(syNum);
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumT').innerHTML = successNum;
                    }else{
                        $(".phoneNumList li").unbind();
                        setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                        setTimeout(function(){$(".phoneNumList").css("display","none");$(".phonebg").css("display","none");},1200);
                            setTimeout(function(){
	                            if(leverFaileCount==2 && lever==1){
	                              stop();
	                               $(".phoneNumListWrap").css("display","none");
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
	                               $(".phoneNumListWrap").css("display","none");
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
                            },1200);
                            
                            clickNum=0;
                            listenNum=0;
                            stopGameDJS();
                            leverFaileCount++;
                            faildNum++;
                            leverPassCount=leverPassCount-1;                                    
                             total=successNum+faildNum;
                             syNum=syNumall-total;                                 
                            if(leverPassCount<0){
                                leverPassCount=0
                            }
                        WrongSort.push(true);
                        singleUseTime.push(alllistenNum);
                        levelArray.push(lever);

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
                              // console.log(alllistenNum+"总用时");
                              $('.sycsNum').html(syNum);
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumB').innerHTML = faildNum;
                    }
                }
            })
        }
            },1700)
        },timeNum)
    });
}
//导航
function daohang(lever){
    console.log(lever+"级别");
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
//生成关卡中玩家需要选中的数字
function genLeverFruit(lever) {
    var count = lever;
    for (var i = 0; i < 12; i++) {
        //获取随机索引
        var randomIndex = GerRandomByRange(12);
        //获取随机水果
        var tempFruit =allNumber[randomIndex];
        //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
        while(leverNumber.indexOf(tempFruit) !== -1){
            randomIndex = GerRandomByRange(12);
            tempFruit =allNumber[randomIndex];
        }
        //当前关卡显示水果追加刚刚随机选择的数字
        leverNumber.push(tempFruit);
        leverNumber_cn.push(allNumber_cn[allNumber.indexOf(tempFruit)]);
    }
    //从当前关卡显示水果(leverNumber)中选出count种，让玩家选择
    for (var i = 0; i < count; i++) {
        var randomIndex = GerRandomByRange(12);
        var tempFruit =leverNumber[randomIndex];
        while(leverNeddCheckNumber.indexOf(tempFruit) !== -1){
            tempFruit =leverNumber[GerRandomByRange(12)];
        }
        leverNeddCheckNumber.push(tempFruit);
        leverNeddCheckNumber_cn.push(leverNumber_cn[leverNumber.indexOf(tempFruit)]);
    }
   
    console.log(leverNumber)
    console.log(leverNeddCheckNumber)
    console.log(leverNumber_cn)
    console.log(leverNeddCheckNumber_cn)
   
}
 /*
 * 生成需要显示的水果html,并且绑定事件
 */
function GenHTML(leverAllFruit) {
    // setTimeout(function(){NoBg(leverNumber)},6000);
    $(".phoneNumList").css({
        "-webkit-transition-property": "-webkit-transform",
        "-webkit-transition-duration": "1s",
        "-moz-transition-property": "-moz-transform",
        "-moz-transition-duration": "1s",
        "-webkit-animation": mtlTime,
        "-moz-animation": mtlTime,
        "-o-animation": mtlTime,
        "animation": mtlTime
    });
     var html = "";
    for (var i = 0; i < leverAllFruit.length; i++) {
        var fruitName = leverAllFruit[i];
        html += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"></li>';
    }
    
    var listenNumtime=leverNeddCheckNumber_cn.length+3;
    function clickblockNum(){
            var blockNum=leverNeddCheckNumber_cn[0];
        }
    setTimeout(clickblockNum,listenNumtime*2000);
    $(".phoneNumList").css("display","block");
    $(".phonebg").css("display","block");
    document.getElementById('phoneNumList').innerHTML = html;
    $(".phoneNumList li").css("animation", mtlTimecc);
    calcDrg();
    
}
/*
 * 生成从0到max的随机整数
 * @max 随机整数最大值
 */
function GerRandomByRange(max) {
    if(!max){ max = 1; };
    return Math.floor(Math.random()*max);
}
//播放玩家需要选中的水果的音频
function playLeverAudio(audioNameArray,endCallback) {
    var time = 0;
    var audioCount = audioNameArray.length;
    var playedCount = 1;
    for (var i = 0; i < audioCount; i++) {
        (function() {
            var this_audio = audioNameArray[i];
            var className='.phoneNumList li.' + this_audio;
            setTimeout(function() {
                setTimeout(function () {
                        $(className).addClass("listen").siblings(".phoneNumList li").removeClass("listen");
                    },1600);
                setTimeout(function () {
                        $(".phoneNumList li.listen").removeClass("listen")
                        // alert(1)
                    },audioCount*2500);
               
                if(playedCount == audioCount && endCallback){
                    setTimeout(function () {
                        endCallback();
                    },1000);
                }
                playedCount++;
            }, time);
            time = ((i+1)*2000);
             
        })();
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
        $(".Tips").html("超过一分钟没有操作，超时一次").show(50).delay(1000).hide(50);
        total++;
        syNum=syNumall-total;
        $('.sycsNum').html(syNum);
        $(".phoneNumList li").unbind();
        setTimeout(function(){$(".phoneNumList").css("display","none");$(".phonebg").css("display","none");},1200);
        leverFaileCount++;
        faildNum++;
        document.getElementById("time").innerHTML=wait;
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
	        $(".phoneNumList").css("display","none");
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
    $(".gameNum,.phonebgWrap").css("display","block");
    startGame();
    startjs();
},startDjs*1000);
    
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