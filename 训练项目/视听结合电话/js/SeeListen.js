document.title=title;
window.onresize = function(){
    var winHeight = window.innerHeight;
    $(".allEnd").css("height",winHeight);
    $(".numWrap").css("height",$(window).height());
    $(".phoneNumListWrap").css("height",$(".phonebgWrap").width()*0.4);
   calcDrg();
}
 var winHeight = window.innerHeight;
$(".allEnd").css("height",winHeight);
$(".numWrap").css("height",$(window).height());
$(".phoneNumListWrap").css("height",$(".phonebgWrap").width()*0.4);
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
     $(".numCenter").html("");
    console.log(leverFaileCount+"判断失败");
    console.log(leverPassCount+"判断成功");
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
    leverNeddCheckNumberEnd = [];
    leverNeddCheckNumber = [];
    leverNeddCheckNumber_cn = [];
     leverNumber_cn = [];
    leverNeddCheckNumberEnd_cn = [];
    array=[];
    array2=[];
    leverFruit2=[];
    leverFruit3=[];
    leverFruit4=[];
    leverFruit5=[];
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
            setTimeout(clickblockNum,1700)
            // 为li绑定事件
           setTimeout(function(){
                var number = $(".phoneNumList li");
                    for (var i = 0; i < number.length; i++) {
                        var clickNum=-1;
                            number.eq(i).one('click', function(ev) {
                            stopGameDJS();
                            clickNum = clickNum+1;
                            var thisEleClassNames = this.getAttribute("class");
                            var thisEleNames = this.getAttribute("data-number");
                            var thisEleNamesCn = this.getAttribute("data-numberCn");
                            //成功或者失败数字的变化
                            if (thisEleClassNames && thisEleClassNames.indexOf("check") !== -1) {
                                console.log("如果有check,不能再点击");
                            } else 
                            {
                                    var newClassName = "check move";
                                    var checkedFruit = document.querySelectorAll(".phoneNumList .check");
                                     // console.log(checkedFruit.length+"测试");
                                    if (checkedFruit) {
                                        var checkedFruitCount = checkedFruit.length + 1;
                                        newClassName =newClassName+ " index_" + checkedFruitCount+ " thisEleNames";
                                        this.setAttribute("class", newClassName);
                                    } else {
                                        this.setAttribute("class", "check move index_1");
                                    }
                            }
                            //需要点击的数字2次以后
                            function NeddClickNum(){
                                var blockNum=leverNeddCheckNumberEnd_cn[listenNum];
                                $(".numCenter").html(blockNum);
                            }
                            //判断结果
                            var checkfruit = document.querySelectorAll(".phoneNumList .check");
                            var leverFruitCount = count2;
                            if(checkfruit.length !== leverFruitCount){
                                if(leverNeddCheckNumberEnd[clickNum] !== thisEleNames){
                                     console.log(leverNeddCheckNumberEnd[clickNum]+"对比"+thisEleNames);
                                      $(".numCenter").html("");
                                    $(".phoneNumList li").unbind();
                                    setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                                        setTimeout(function(){
                                       if(leverFaileCount==2 && lever==1){
                                            stop();
                                               $(".phonebgWrap").css("display","none");
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
                                          $(".phonebgWrap").css("display","none");
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
                                        }
                                        $('.sycsNum').html(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumB').innerHTML = faildNum;
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
                                }else{
                                     $(".numCenter").html("");
                                    listenNum++;
                                    if(listenNum+1>lever){
                                        listenNum=lever
                                    }
                                    setTimeout(function(){
                                         $(".phoneNumList li.check").css("background-image","url(img/btn.png)");
                                         NeddClickNum(listenNum);
                                        },800);
                                    
                                }
                            }else if(checkfruit && checkfruit.length == leverFruitCount){
                                 console.log(leverNeddCheckNumberEnd[clickNum]+"对比"+thisEleNames);
                                var passed = true;
                                var checkfruitArray = [];
                                 while (checkfruitArray.length < leverFruitCount) {
                                 for (var i = 0; i < checkfruit.length; i++) {
                                     var thisFruitName = checkfruit[i].getAttribute("data-number");
                                     var thisFruitClassName = checkfruit[i].getAttribute("class");
                                     var selectIndex = thisFruitClassName.match(/\d+/g);
                                     if(selectIndex == (checkfruitArray.length+1)){
                                         checkfruitArray.push(thisFruitName);
                                     }
                                 }
                             }

                                for(var i = 0;i<leverFruitCount;i++){
                                    if(leverNeddCheckNumberEnd[i] !== checkfruitArray[i]){
                                        passed = false;
                                        }
                                }

                                if(passed){
                                     $(".numCenter").html("");
                                    $(".phoneNumList li").unbind();
                                     setTimeout(function(){
                                        $(".Tips").html(nextcz).show(50).delay(1000).hide(50);
                                    },100)
                                        setTimeout(function(){
                                            if(leverFaileCount==2 && lever==1){
                                                stop();
                                                   $(".phonebgWrap").css("display","none");
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
                                                 $(".phonebgWrap").css("display","none");
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
                                        $('.sycsNum').html(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumT').innerHTML = successNum;
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
                                        console.log(alllistenNum+"总用时");
                                        if(lever>cslever){
                                           endZlever = lever;
                                        }
                                }else{
                                     $(".numCenter").html("");
                                    $(".phoneNumList li").unbind();
                                    setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                                        setTimeout(function(){
                                         if(leverFaileCount==2 && lever==1){
                                                stop();
                                                   $(".phonebgWrap").css("display","none");
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
                                              $(".phonebgWrap").css("display","none");
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
                                        $('.sycsNum').html(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumB').innerHTML = faildNum;
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
                                          console.log(alllistenNum,alllistenNumall+"总用时");
                                          if(lever>cslever){
                                           endZlever = lever;
                                        }
                                }
                            }
                        })
                    }
           },1700)
        },timeNum)
    });
}
//需要点击显示的数字
 function clickblockNum(){
    var blockNum=leverNeddCheckNumberEnd_cn[0];
    $(".numCenter").html(blockNum);
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
var leverFruit2=[];
    var leverFruit3=[];
     var leverFruit4=[];
    var leverFruit5=[];
function genLeverFruit(lever) {
    count = lever+1;
    if(lever==9||lever==10||lever==11){
            count=10;
    }else if(lever==12){
        count=12;
    }
    count2 = 1;
    if(lever>2){
         count2=lever-1;
    }      
    for (var i = 0; i < 10; i++) {
        //获取随机索引
        var randomIndex = GerRandomByRange(10);                
        //获取随机水果
        var tempFruit =allNumber[randomIndex];
        //当前关卡显示水果追加刚刚随机选择的数字
        while(leverNumber.indexOf(tempFruit) !== -1){
            randomIndex = GerRandomByRange(10);
            tempFruit =allNumber[randomIndex];
        }
        leverNumber.push(tempFruit);
        leverFruit3.push(tempFruit);
        leverNumber_cn.push(allNumber_cn[allNumber.indexOf(tempFruit)]);
        leverFruit5.push(allNumber_cn[allNumber.indexOf(tempFruit)]);
                          
    }
    
    leverFruit2 = leverFruit3.slice(0);
    leverFruit3.push.apply(leverFruit3,leverFruit2);
    leverFruit4 = leverFruit5.slice(0);
    leverFruit5.push.apply(leverFruit5,leverFruit4);
    
    
    if(lever>10){
                //当前关卡显示水果追加刚刚随机选择的数字
            // 循环N次生成随机数 
            for(var i = 0 ; ; i++){ 
                // 只生成10个随机数 
                if(array.length<count){ 
                      generateRandom(12); 
                }else{ 
                  break; 
               } 
            } 
             // 生成随机数的方法 
            function generateRandom(count){ 

                 var rand = parseInt(Math.random()*count); 
                 for(var i = 0 ; i < array.length; i++){ 
                      if(array[i] == rand){ 
                           return false; 
                      }      
                 } 
                 array.push(rand); 
                 leverNeddCheckNumber.push(leverFruit3[rand]);
                 leverNeddCheckNumber_cn.push(leverFruit5[rand])
            } 
                
            //从当前关卡显示数字(leverNeddCheckNumber)中选出count2个数字，让玩家选择
            for (var i = 0; i < count2; i++) {
                var lishiN=count-1;
                //当前关卡显示水果追加刚刚随机选择的数字
                    // 循环N次生成随机数 
                    for(var i = 0 ; ; i++){ 
                        // 只生成10个随机数 
                        if(array2.length<count2){ 
                              generateRandom(count); 
                        }else{ 
                          break; 
                       } 
                    } 
                     // 生成随机数的方法 
                    function generateRandom(count2){ 
                         var rand = parseInt(Math.random()*count2); 
                         for(var i = 0 ; i < array.length; i++){ 
                              if(array2[i] == rand){ 
                                   return false; 
                              }    
                         } 
                         array2.push(rand); 
                         leverNeddCheckNumberEnd.push(leverNeddCheckNumber[rand]);
                         leverNeddCheckNumberEnd_cn.push(leverNeddCheckNumber_cn[rand])
                    } 
            } 
    }else{
            //从当前关卡显示水果(leverNumber)中选出count种，让玩家选择
            for (var i = 0; i < count; i++) {
                var randomIndex = GerRandomByRange(10);
                var tempFruit =leverNumber[randomIndex];
                while(leverNeddCheckNumber.indexOf(tempFruit) !== -1){
                    tempFruit =leverNumber[GerRandomByRange(10)];
                }
                leverNeddCheckNumber.push(tempFruit);
                leverNeddCheckNumber_cn.push(leverNumber_cn[leverNumber.indexOf(tempFruit)]);
            }
            //从当前关卡显示数字(leverNeddCheckNumber)中选出lever个数字，让玩家选择
            for (var i = 0; i < lever; i++) {
                var lishiN=count-1;
                var randomIndex = GerRandomByRange(count);
                var tempFruit =leverNeddCheckNumber[randomIndex];
                while(leverNeddCheckNumberEnd.indexOf(tempFruit) !== -1){
                    tempFruit =leverNeddCheckNumber[GerRandomByRange(count)];
                }
                leverNeddCheckNumberEnd.push(tempFruit);
                leverNeddCheckNumberEnd_cn.push(leverNeddCheckNumber_cn[leverNeddCheckNumber.indexOf(tempFruit)]);
            }
    }
    console.log(leverNumber)
    console.log(leverNumber_cn)
    console.log(leverFruit3)
    console.log(leverFruit5)
    console.log(leverNeddCheckNumber)
    console.log(leverNeddCheckNumber_cn)
    console.log(leverNeddCheckNumberEnd)            
    console.log(leverNeddCheckNumberEnd_cn)
}
/*
* 生成需要显示的水果html,并且绑定事件
*/
//显示的数字
var listenNumtime;
function GenHTML(leverAllFruit) {
    // setTimeout(function(){NoBg(leverNumber)},6000);
     var html = "";
    for (var i = 0; i < leverAllFruit.length; i++) {
        var fruitName = leverAllFruit[i];
        html += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"></li>';
    }
    listenNumtime=leverNeddCheckNumber_cn.length;
    console.log(listenNumtime+"播报时间");
    
    document.getElementById('phoneNumList').innerHTML = html;
    $(".phoneNumList").append('<li></li><li></li>');
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
    function GerRandomByRange2(max) {
    if(!max){ max = 1; };
    return parseInt(Math.random()*max);
}
//播放玩家需要选中的水果的音频
function playLeverAudio(audioNameArray,endCallback) {
    var time = 0;
    var audioCount = audioNameArray.length;
    var playedCount = 1;
    for (var i = 0; i < audioCount; i++) {          
        (function() {
            var this_audio = audioNameArray[i];
            var this_audio2 = leverNeddCheckNumber_cn[i];
              var index_i=array[i];
            var className='.phoneNumList li.' + this_audio;
            setTimeout(function() {
                var eleID = '.ad_' + this_audio;
                var eleID2 = 'ad_' + this_audio;
                 console.log(eleID);
                $(eleID).get(0).play();
                var audio = document.getElementById(eleID2); 
                audio.currentTime=0;
                 setTimeout(function(){ $(className).addClass("listen");$(".numCenter").html(this_audio2);},BtnLTime)
                 setTimeout(function(){$(className).removeClass("listen");$(".numCenter").html("");},BtnATime)
                if(playedCount == audioCount && endCallback){
                    setTimeout(function () {
                        endCallback();
                    },1500);
                }
                playedCount++;
            }, time);
            time = ((i+1)*bofangTime);
            
        })();

    }
}
        
//60秒倒计时
var timer;
  function start() {
        wait--;
        alllistenNum++;
    if (wait == 0) {
        wait = waitEnd;
        $(".numCenter").html("");
         document.getElementById("endTime").play();
        $(".Tips").html("超过一分钟没有操作，超时一次").show(50).delay(2000).hide(50);            total++;
        syNum=syNumall-total;
        $('.sycsNum').html(syNum);
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
      clearInterval(int); //上传数据
        output_score_ajax_fun();
    }