document.title=title;
window.onresize = function(){
    $(".numWrap").css("height",$(window).height());
    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    $(".games,body").css("height",winHeight);
    var windowWidth=document.body.clientWidth;
    console.log(windowWidth+"视图宽度")
    var gameImgListWidth = W_widthhe*($(".gameImgList li img").width()+8);
    var MaxWidth = 7*($(".gameImgList li img").width()+8);
    var left;
    var top;
    left = (windowWidth-W_widthhe*($(".gameImgList li img").width()+8))/2;
    top = (winHeight- W_heightshu*($(".gameImgList li img").width()+8))/2;    
    $(".gameImgList").css({"width":gameImgListWidth,"left":left,"top":top});
    $(".gameImgList li").css("height",$(".gameImgList li img").width());
    $(".gameImgList li").css("width",$(".gameImgList li img").width());
}
$(".numWrap").css("height",$(window).height());
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
$(".games,body").css("height",winHeight);
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
        if(endZlever>9){
            endZlever == 9;
        }
        if(lever>9){
            lever == 9;
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
    leverFruit = [];
    leverFruit2 = [];
}

//生成关卡数据
function genLever(lever) {
    genLeverFruit(lever);
    GenHTML(leverFruit);
    setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},5000);
}
  /*
 * 生成需要显示的水果html,并且绑定事件
 */
function GenHTML(leverAllFruit) {
    setTimeout(function(){
       stopGameDJS();
       startGameDJS();
       $(".gameImgList li img").css("display","none")
       setTimeout(function(){
           //2次点击事件
         var end;
         var end2;
         var index=true;
         var clickNum=0;
         var NeedClickLength=leverAllFruit.length;
        $(".gameImgList li").click(function(){  
            clickNum++;
            var index_num=$(this).index();
            $(this).addClass("check");
            $(".gameImgList li:eq("+index_num+") img").css("display","block")
            if(clickNum!==NeedClickLength){
                if(index==true){
                     end = $(this).attr("data-fruit");
                     index=false;
                }else if(index==false){
                     end2 = $(this).attr("data-fruit");
                    index=true;
                     //判断结果
                     if(end == end2){
                        setTimeout(function(){$(".gameImgList li.check").css("visibility","hidden");},50)
                     }else{
                        $(".gameImgList li").unbind();
                        $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);
                        setTimeout(function(){
                            if(leverFaileCount==2 && lever==1){
                                stop();
                                   $(".gameImgList").css("display","none");
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
                              $(".gameImgList").css("display","none");
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
                            document.getElementById('showFruit').innerHTML = "";
                            setTimeout(function(){ continueGame();},continueTime);
                        },1100);
                        
                        clickNum=0;
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
                          console.log(alllistenNum+"总用时");
                          $('.sycsNum').html(syNum);
                            document.getElementById('LeverNumB').innerHTML = faildNum;
                            document.getElementById('allScore').innerHTML = score;
                    }
                }
            }
            else if(clickNum == NeedClickLength && index==false)
            {
                end2 = $(this).attr("data-fruit");
             if(end == end2){
                 setTimeout(function(){$(".gameImgList li.check").css("visibility","hidden");},50)
                 $(".gameImgList li").unbind();
                    $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);
                    setTimeout(function(){
                       if(leverFaileCount==2 && lever==1){
                           stop();
                               $(".gameImgList").css("display","none");
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
                             $(".gameImgList").css("display","none");
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
                        document.getElementById('showFruit').innerHTML = "";
                        setTimeout(function(){ continueGame();},continueTime);
                    },1100);
                    clickNum=0;
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
                    console.log(alllistenNum+"总用时");
                    $('.sycsNum').html(syNum);
                    document.getElementById('LeverNumT').innerHTML = successNum;
                     document.getElementById('allScore').innerHTML = score;
                 }else{
                 $(".gameImgList li").unbind();
                    $("#errormsg").html(nextcz).show(50).delay(1000).hide(50);
                     setTimeout(function(){
                        if(leverFaileCount==2 && lever==1){
                            stop();
                               $(".gameImgList").css("display","none");
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
                          $(".gameImgList").css("display","none");
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
                        document.getElementById('showFruit').innerHTML = "";
                        setTimeout(function(){ continueGame();},continueTime);
                    },1100);
                     clickNum=0;
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
                    console.log(alllistenNum+"总用时");
                    $('.sycsNum').html(syNum);
                    document.getElementById('LeverNumB').innerHTML = faildNum;
                   document.getElementById('allScore').innerHTML = score;
                 }
            }
            
        })      
       },1500)  
    },imgNone)
    //生成HTML
    var html = "";
    for (var i = 0; i < leverAllFruit.length; i++) {
        var fruitName = leverAllFruit[i];
        html += '<li data-fruit="' + fruitName + '"><img id="' + "img_" +fruitName + '" src="img/'+fruitName + '.png"></li>';
    }
    document.getElementById('showFruit').innerHTML = html;
    var windowWidth=document.body.clientWidth;
    console.log(windowWidth+"视图宽度")
    var gameImgListWidth = W_widthhe*($(".gameImgList li img").width()+8);
    var MaxWidth = 7*($(".gameImgList li img").width()+8);
    var left;
    var top;
    left = (windowWidth-W_widthhe*($(".gameImgList li img").width()+8))/2;
    top = (winHeight- W_heightshu*($(".gameImgList li img").width()+8))/2;    
    $(".gameImgList").css({"width":gameImgListWidth,"left":left,"top":top});
    $(".gameImgList li").css("height",$(".gameImgList li img").width());
    $(".gameImgList li").css("width",$(".gameImgList li img").width());
     
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
//生成关卡显示水果，关卡中玩家需要选中的水果
function genLeverFruit(lever) {
     var count = lever+1;
     if(lever==1){
        W_widthhe=2;
     }else if(lever==2){
       W_widthhe=3;
     }else if(lever==3 ||lever==5 || lever==6 || lever==7){
       W_widthhe=4;
     }else if(lever==4 || lever==8 || lever==9){
       W_widthhe=5;
     }else if(lever==10 || lever==11){
       W_widthhe=6;
     }else if(lever==12){
       W_widthhe=7;
     }
      if(lever==1 || lever==2 || lever==3||lever==4){
        W_heightshu=2;
     }else if(lever==5){
       W_heightshu=3;
     }else if(lever==6 || lever==7 || lever==8||lever==9 || lever==10 || lever==11 || lever==12){
       W_heightshu=4;
     }
    for (var i = 0; i < count; i++) {
        //获取随机索引
        var randomIndex = GerRandomByRange(13);
        //获取随机水果
        var tempFruit =allFruits[randomIndex];

        //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
        while(leverFruit.indexOf(tempFruit) !== -1){
            randomIndex = GerRandomByRange(13);
            tempFruit =allFruits[randomIndex];
        }
        //当前关卡显示水果追加刚刚随机选择的水果
        leverFruit.push(tempFruit);
    }
    leverFruit2 = leverFruit.slice(0);
    leverFruit.push.apply(leverFruit,leverFruit2);
    function randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }
    leverFruit.sort(randomsort);
    console.log(leverFruit+"随机生成的数组")
}
/*
* 生成从0到max的随机整数
* @max 随机整数最大值
*/
function GerRandomByRange(max) {
    if(!max){ max = 1; };
    return Math.floor(Math.random()*max);
}
       
//60秒倒计时
var wait = 60;
var timer;
  function start() {
        wait--;
        alllistenNum++;
    if (wait == 0) {
        wait = waitEnd;
         document.getElementById("endTime").play();
        $(".Tips").html("超过一分钟没有操作，超时一次").show(50).delay(1000);            total++;
        syNum=syNumall-total;
        $('.sycsNum').html(syNum);
        leverFaileCount++;
        faildNum++;
         document.getElementById("time").innerHTML=wait;
        document.getElementById('showFruit').innerHTML = "";
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
 var hour,minute,second;//时 分 秒
    hour=minute=second=0;//初始化
    var millisecond=0;//毫秒
    var int;
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