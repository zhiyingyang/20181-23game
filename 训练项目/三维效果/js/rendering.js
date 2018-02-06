document.title=title;
window.onresize = function(){
  $(".numWrap").css("height",$(window).height());
  var winHeight = window.innerHeight;
  $(".allEnd,body").css("height",winHeight);
}
$(".numWrap").css("height",$(window).height());
var winHeight = window.innerHeight;
$(".allEnd,body").css("height",winHeight);
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
  $(".phoneNumList li").removeClass("listen");
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
}
    //生成关卡数据
    function genLever(lever) {
        genLeverFruit(lever);
        GenHTML(leverNumber);
        playLeverAudio(leverNeddCheckNumber,function () {
            var timeNum=0;
            setTimeout(function () {
                stopGameDJS();
                startGameDJS();
                setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},400)
                 // 为li绑定事件
                setTimeout(function(){
                     var number = $(".phoneNumList li");
                        for (var i = 0; i < number.length; i++) {
                            var clickNum=-1;
                            number.eq(i).one('click', function(ev) {
                                clickNum = clickNum+1;
                                var thisEleClassNames = this.getAttribute("class");
                                var thisEleNames = this.getAttribute("data-number");
                                //成功或者失败数字的变化
                                if (thisEleClassNames && thisEleClassNames.indexOf("listen") !== -1) {
                                    console.log("如果有listen,不能再点击");
                                } else
                                {
                                  $(this).addClass("listen");
                                }
                                //判断结果
                                  if(leverNeddCheckNumber.length!=clickNum+1){
                                     if( leverNeddCheckNumber[clickNum]!=thisEleNames){ //正确
                                         $(".phoneNumList li").unbind();
                                        setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50)},100);
                                        setTimeout(function(){
                                           if(leverFaileCount==2 && lever==1){
                                            stop();
                                                  $(".phoneNumList,.gameNum").css("display","none");
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
                                              $(".phoneNumList,.gameNum").css("display","none");
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
                                        leverFaileCount++;
                                        faildNum++;
                                        leverPassCount=leverPassCount-1;
                                         total=successNum+faildNum;
                                         syNum=syNumall-total;
                                        if(leverPassCount<0){
                                            leverPassCount=0
                                        }

                                             if(alllistenNumall>60){
                                                 alllistenNumzg = parseInt(alllistenNumall/60)+"分";
                                             }else{
                                                 alllistenNumzg = alllistenNumall%60+"秒";
                                             }
                                             if(lever>cslever){
                                               endZlever = lever;
                                            }

                                        console.log(alllistenNum+"总用时");
                                        CorrectRate = (successNum/10)*100+".00%";
                                        $('.sycsNum').text(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumB').innerHTML = faildNum;

                                         WrongSort.push(true);
                                         singleUseTime.push(alllistenNum);
                                         levelArray.push(lever);

                                         alllistenNumall=alllistenNumall+alllistenNum;
                                         ErroneousTime = ErroneousTime+alllistenNum;
                                     }
                                  }else{
                                     if( leverNeddCheckNumber[clickNum]==thisEleNames){
                                       $(".phoneNumList li").unbind();
                                       setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50)},100);
                                        setTimeout(function(){
                                             if(leverFaileCount==2 && lever==1){
                                              stop();
                                                   $(".phoneNumList,.gameNum").css("display","none");
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
                                                 $(".phoneNumList,.gameNum").css("display","none");
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
                                        }
                                         WrongSort.push(true);
                                         singleUseTime.push(alllistenNum);
                                         levelArray.push(lever);

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
                                        console.log(alllistenNum+"总用时");
                                        $('.sycsNum').text(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumT').innerHTML = successNum;
                                     }else{
                                         if( leverNeddCheckNumber[clickNum]!=thisEleNames){
                                             $(".phoneNumList li").unbind();
                                          setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50)},100);
                                         setTimeout(function(){
                                           if(leverFaileCount==2 && lever==1){
                                            stop();
                                                   $(".phoneNumList,.gameNum").css("display","none");
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
                                              $(".phoneNumList,.gameNum").css("display","none");
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
                                        leverFaileCount++;
                                        faildNum++;
                                        leverPassCount=leverPassCount-1;
                                         total=successNum+faildNum;
                                         syNum=syNumall-total;
                                        if(leverPassCount<0){
                                            leverPassCount=0
                                        }

                                         WrongSort.push(false);
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
                                        $('.sycsNum').text(syNum);
                                        document.getElementById('allScore').innerHTML = score;
                                        document.getElementById('LeverNumB').innerHTML = faildNum;
                                        }
                                     }
                                  }
                            })
                        }

                },1900)
            },timeNum)
        });
    }
    //导航
    function daohang(lever){
        console.log(lever+"级别");
        var fruitLever = document.querySelectorAll(".gameNum li");
        for (var i = 0; i < fruitLever.length; i++) {
            $(".gameNum li:eq("+i+")").removeClass("bgc");
            var num=fruitLever[i].getAttribute("dataNum");
            if(num<=lever){
                fruitLever[i].setAttribute("class","bgc");
            }
        }
    }
    /*
     * 生成需要显示的镜子html,并且绑定事件
     */
    function GenHTML(leverAllFruit) {
        var html = "";
        for (var i = 0; i < leverAllFruit.length; i++) {
            var fruitName = leverAllFruit[i];
            // html += '<li data-number="' + fruitName + '" class="' + fruitName + '"></li>';
            html='<li data-number="zero" class="zero"></li>'+
                '<li data-number="one" class="one"></li>'+
                '<li data-number="two" class="two"></li>'+
                '<li data-number="three" class="three"></li>'+
                '<li data-number="four" class="four"></li>'+
                '<li data-number="five" class="five"></li>'+
                '<li data-number="six" class="six"></li>'+
                '<li data-number="seven" class="seven"></li>'+
                '<li data-number="eight" class="eight"></li>'+
                '<li data-number="nine" class="nine"></li>'+
                '<li data-number="ten" class="ten"></li>'+
                '<li data-number="eleven" class="eleven"></li>'+
                '<li data-number="twelve" class="twelve"></li>'+
                '<li data-number="thirteen" class="thirteen"></li>'+
                '<li data-number="fourteen" class="fourteen"></li>'+
                '<li data-number="fifteen" class="fifteen"></li>'+
                '<li data-number="sixteen" class="sixteen"></li>'+
                '<li data-number="seventeen" class="seventeen"></li>'+
                '<li data-number="eighteen" class="eighteen"></li>'+
                '<li data-number="nineteen" class="nineteen"></li>';
        }
        document.getElementById('phoneNumList').innerHTML = html;
    }
//生成关卡中玩家需要选中的数字
    function genLeverFruit(lever) {
        var count = lever;
        for (var i = 0; i < 20; i++) {
            //获取随机索引
            var randomIndex = GerRandomByRange(20);
            //获取随机水果
            var tempFruit =allNumber[randomIndex];
            //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
            while(leverNumber.indexOf(tempFruit) !== -1){
                randomIndex = GerRandomByRange(20);
                tempFruit =allNumber[randomIndex];
            }
            //当前关卡显示水果追加刚刚随机选择的数字
            leverNumber.push(tempFruit);
            leverNumberNum.push(allNumberNum[allNumber.indexOf(tempFruit)]);
        }
        //从当前关卡显示水果(leverNumber)中选出count种，让玩家选择
        for (var i = 0; i < count; i++) {
            var randomIndex = GerRandomByRange(19);
            var tempFruit =leverNumber[randomIndex];
            while(leverNeddCheckNumber.indexOf(tempFruit) !== -1){
                tempFruit =leverNumber[GerRandomByRange(20)];
            }
            leverNeddCheckNumber.push(tempFruit);
            leverNeddCheckNum.push(leverNumberNum[leverNumber.indexOf(tempFruit)]);
        }
        console.log(leverNumber);
         console.log(leverNumberNum);
        console.log(leverNeddCheckNumber);
        console.log(leverNeddCheckNum);
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
                setTimeout(function() {
                    var className='.phoneNumList li.' + this_audio;
                     var className2='.phoneNumList li.' + this_audio+'.listen';
                    console.log(className)
                        $(className).addClass("listen");
                    setTimeout(function () {
                        $(className2).removeClass("listen")
                    },1000);
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
    var timer;
    function start() {
        wait--;
         alllistenNum++;
        if (wait == 0) {
            wait = waitEnd;
            $(".Tips").html("选择超时").show(50).delay(1000).hide(50);
            leverFaileCount++;
            faildNum++;

            total++;
            syNum=syNumall-total;
            $('.sycsNum').html(syNumall);

            WrongSort.push(false);
            singleUseTime.push(alllistenNum);
            levelArray.push(lever);

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
},startDjs*1000)
//开始到结束的用时
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