window.onresize = function(){
	clearLine();
}
document.title=title;
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
$(".numWrap,body").css("height",winHeight);
$(".allEnd").css("height",winHeight);
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
   setTimeout(function(){
        playLeverAudio(leverNeddCheckNumber);
   },2000) 
    setTimeout(function(){
        stopGameDJS();
        startGameDJS();
        setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},200)
        // 为li绑定事件
        setTimeout(function(){
            var number = document.querySelectorAll(".phoneNumList li");
        for (var i = 0; i < number.length; i++) {
            var clickNum=-1;
                number[i].addEventListener('click', function(ev) {
                clickNum = clickNum+1;
                $(this).find("img").attr("src","img/white.png");
                var thisEleClassNames = this.getAttribute("class");
                var thisEleNames = this.getAttribute("data-number");
                var thisEleNamesCn = this.getAttribute("data-numberCn");
                //成功或者失败数字的变化
                if (thisEleClassNames && thisEleClassNames.indexOf("check") !== -1) {
                    console.log("如果有check,不能再点击");
                } else 
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
                //判断结果
                var checkfruit = document.querySelectorAll(".phoneNumList .check");
                var leverFruitCount = leverNeddCheckNumber.length;
                if(checkfruit.length !== leverFruitCount){
                    if(leverNeddCheckNumber.indexOf(thisEleNames) == -1){
                      // alert(leverNeddCheckNumber.indexOf(thisEleNames));
                        // console.log(leverNeddCheckNumber.indexOf(thisEleNames)+"对比"+thisEleNames);
                        setTimeout(function(){$(".Tips").html(xzcw).show(50).delay(1000).hide(50);},100)
                            setTimeout(function(){
                              if(leverFaileCount==2 && lever==1){
                                stop();
                                   $(".phoneNumListWrap").css("display","none");
                                   $(".allEnd").css("display","block");
                                   $(".endTip").html("训练失败");
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
                            }
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
                            console.log(ErroneousTime+"错误用时111");
                            $('.sycsNum').html(syNum);
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumB').innerHTML = faildNum;
                    }else{
                        listenNum++;
                        if(listenNum+1>lever){
                            listenNum=lever
                        }
                     }   
                    
                }else if(checkfruit && checkfruit.length == leverFruitCount){
                    var passed = true;
                    var checkfruitArray = [];
                    while(checkfruitArray.length < leverFruitCount)
                    {
                        var className = "index_"+(checkfruitArray.length+1);
                        for (var i = 0; i < checkfruit.length; i++) {
                            var thisFruitName = checkfruit[i].getAttribute("data-numberCn");
                            var thisFruitClassName = checkfruit[i].getAttribute("class");
                            if(thisFruitClassName.indexOf(className) !== -1){
                                checkfruitArray.push(thisFruitName);
                            }else{                                  
                            }
                        }
                    }
                    if(leverNeddCheckNumber_cn.sort().toString()!==checkfruitArray.sort().toString() ){
                        passed = false;
                    }

                    if(passed){
                         setTimeout(function(){$(".Tips").html(gxncg).show(50).delay(1000).hide(50);},100)
                            setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                              stop();
                                 $(".phoneNumListWrap").css("display","none");
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
                            },1500);
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
                            }    WrongSort.push(true);
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
                            console.log(CorrectTime+"正确用时");
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumT').innerHTML = successNum;
                    }else{
                        setTimeout(function(){$(".Tips").html(xzcw).show(50).delay(1000).hide(50);},100)
                            setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                                   stop();
                                   $(".phoneNumListWrap").css("display","none");
                                   $(".allEnd").css("display","block");
                                   $(".endTip").html("训练失败");
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
                            console.log(ErroneousTime+"错误用时");
                            $('.sycsNum').html(syNum);
                            document.getElementById('allScore').innerHTML = score;
                            document.getElementById('LeverNumB').innerHTML = faildNum;
                    }
                }
            })
        }
        },1700)
   },4000)                                                                                                
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
   var count = 2;
   if(lever>2){
      count=lever;
   }
      //横竖方块
      if(lever==1 || lever==2){
          H_heightShu=2
      }else if(lever==3 || lever==4){
           H_heightShu=3
      }else if(lever==5 || lever==6){
         H_heightShu=4
      }else if(lever==7 || lever==8){
         H_heightShu=5
      }else if(lever==9 || lever==10 || lever==11 || lever==12){
         H_heightShu=6
      }
      if(lever==1){
          W_widthhe=2
      }else if(lever==2 || lever==3){
           W_widthhe=3
      }else if(lever==4 || lever==5){
         W_widthhe=4
      }else if(lever==6 || lever==7){
         W_widthhe=5
      }else if(lever==8 ||lever==9 || lever==10 || lever==11){
         W_widthhe=6
      }else if(lever==12){
         W_widthhe=7
      }
    numFK = W_widthhe*H_heightShu;
    for (var i = 0; i < numFK; i++) {
        //获取随机索引
        var randomIndex = GerRandomByRange(numFK);
        //获取随机水果
        var tempFruit =allNumber[randomIndex];
        //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
        while(leverNumber.indexOf(tempFruit) !== -1){
            randomIndex = GerRandomByRange(numFK);
            tempFruit =allNumber[randomIndex];
        }
        //当前关卡显示水果追加刚刚随机选择的数字
        leverNumber.push(tempFruit);
        leverNumber_cn.push(allNumber_cn[allNumber.indexOf(tempFruit)]);
    }
    //从当前关卡显示水果(leverNumber)中选出count种，让玩家选择
    for (var i = 0; i < count; i++) {
        var randomIndex = GerRandomByRange(numFK);
        var tempFruit =leverNumber[randomIndex];
        while(leverNeddCheckNumber.indexOf(tempFruit) !== -1){
            tempFruit =leverNumber[GerRandomByRange(numFK)];
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
var listenNum=0;
function GenHTML(leverAllFruit) {
    // setTimeout(function(){NoBg(leverNumber)},6000);
     var html = "";
    for (var i = 0; i < leverNumber.length; i++) {
        var fruitName = leverNumber[i];
        html += '<li data-number="' + fruitName + '" data-numberCn="' + leverNumber_cn[i] + '" class="' + fruitName + '"><img src="img/black.png" /></li>';
    }
    var listenNumtime=leverNeddCheckNumber_cn.length+3;
    document.getElementById('phoneNumList').innerHTML = html;
    

    
    clearLine();
}
function clearLine(){
      // 去掉边角线
      var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
$(".numWrap,body").css("height",winHeight);
$(".allEnd").css("height",winHeight);
     var ulkuan = W_widthhe*$(".phoneNumList li").width()+W_widthhe*(parseInt($(".phoneNumList li").css("margin-left"))+3.35);
    var ulgao = H_heightShu*1.5+"rem";
    console.log(W_widthhe*$(".phoneNumList li").width(),H_heightShu*parseInt($(".phoneNumList li").css("margin-left")),H_heightShu,ulkuan+"11");
    var ulWidth=(winWidth-ulkuan)/2;
    var ulHeight=(winHeight-(H_heightShu*$(".phoneNumList li").width()))/2;
    $(".phoneNumList").css("height",ulgao);
    $(".phoneNumListWrap").css({"width":ulkuan,"top":ulHeight,"left":ulWidth,"height":ulgao})
    $(".phoneNumList li img").css({"animation":LatticeVelocity,"animation-iteration-count":"1"});
     var bordernone;
     var borderbottomnone;
     for (var i = 0; i < H_heightShu; i++) {
        bordernone = W_widthhe*i-1;
        $(".phoneNumList li").eq(bordernone).css("border-top","none");
    }
     for (var i = 0; i < W_widthhe+1; i++) {
     	lilength = $(".phoneNumList li").length;
        borderbottomnone = lilength-i;
        $(".phoneNumList li").eq(borderbottomnone).css("border-left","3px solid transparent");
    }
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
            var className='.phoneNumList li.' + this_audio+' img';
            $(className).attr('src',"img/white.png"); 
           $(".phoneNumList li img").css({"animation":"","animation-iteration-count":""});
           setTimeout(function(){
            $(".phoneNumList li img").css({"animation":LatticeVelocity,"animation-iteration-count":"1"});
            $(className).attr('src',"img/black.png"); 
        },1000)
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
         document.getElementById("endTime").play();
        $(".Tips").html("超过一分钟没有操作，超时一次").show(50).delay(1000).hide(50);            total++;
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
$(".gameNum,.gameImgList").css("display","block");
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
    }
