document.title=title;
window.onresize = function(){
  var winHeight = window.innerHeight;
  $(".allEnd").css("height",winHeight);  
  $(".phonebg,.numWrap").css("height",$(window).height());
  $(".NumList li").css("line-height",$(".NumList li").height()+"px");
}
 var winHeight = window.innerHeight;
$(".allEnd").css("height",winHeight);  
$(".phonebg,.numWrap").css("height",$(window).height());
$(".NumList li").css("line-height",$(".NumList li").height()+"px");
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
  numHtml = [];
      document.getElementById('NumList').innerHTML = "";
   document.getElementById('BlockNum').innerHTML = "";
console.log(leverFaileCount+"判断失败");
console.log(leverPassCount+"判断成功");
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
    //需要播放玩家选中的数字
   leverNumber = [];
     leverNumber_cn = [];
     leverNeddCheckNumberClick_cn = [];
   leverNumberxe=[];
}

        //生成关卡数据
        function genLever(lever) {
            genLeverFruit(lever);
            
            playLeverAudio(leverNumber,function () {
                var timeNum=1500;
                setTimeout(function () {
                    stopGameDJS();
                    startGameDJS();
                    setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},200)
                    
                // 为li绑定事件
                setTimeout(function(){
                    GenHTML(leverNumber_cn,allNumber_cn);
                  var number = $(".NumList li");
               for (var i = 0; i < number.length; i++) {
                var clickNum=-1;
                number.eq(i).one('click', function(ev) {
                  clickNum = clickNum+1;
                  var thisEleClassNames = this.getAttribute("class");
                       var thisEleNames = this.getAttribute("data-num"); 
                        if (thisEleClassNames && thisEleClassNames.indexOf("check") !== -1) {
                            console.log("如果有check,不能再点击");
                        } else 
                        {
                          var newClassName = "check";
                          newClassName =newClassName+ " index_" + thisEleNames;
                            this.setAttribute("class", newClassName);
                        }
                        //判断结果
                        var checkfruit = document.querySelectorAll(".NumList .check");
                        if(clickNum==0){
                          numHtml=thisEleNames;
                         }else if(clickNum==1){
                            numHtml = numHtml+" "+thisEleNames;
                         }else if(clickNum==2){
                             numHtml = numHtml+" "+thisEleNames;
                         }
                     console.log(numHtml+"数组")
                       document.getElementById('BlockNum').innerHTML =numHtml;
                        var leverFruitCount = lever+2;
                        if(checkfruit.length !== leverFruitCount){
                          console.log(clickNum+"点击次数1");
                            if(leverNeddCheckNumberClick_cn[clickNum] !== thisEleNames){
                                 console.log(leverNeddCheckNumberClick_cn[clickNum]+"对比"+thisEleNames);$(".NumList li").unbind();
                                setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                                setTimeout(function(){
                                         /*if(leverFaileCount==2 && lever==1){
                                           stop();
                                           $(".NumListWrap").css("display","none");
                                          $(".allEnd").css("display","block");
                                          $(".endTip").html("训练结束");
                                           $('.endS').html(successNum);
                                           $('.endF').html(faildNum);
                                           $('.endT').html(total);
                                           $('.glever').html(endZlever);
                                            $('.endlever').html(lever);
                                           $('.cslever').html(cslever);
                                          return;
                                        }*/
                                        if(total==10){
                                           stop();
                                          $(".NumListWrap").css("display","none");
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
                                    clickNum=-1;
                                leverFaileCount++;
                                faildNum++;
                                 stopGameDJS();
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
                                    
                                console.log(alllistenNum+"总用时");
                                $('.sycsNum').html(syNum);
                                document.getElementById('allScore').innerHTML = score;
                                document.getElementById('LeverNumB').innerHTML = faildNum;
                            }else{
                            }
                        }else if(checkfruit.length == leverFruitCount){
                          var lastnum=parseFloat(leverNeddCheckNumberClick_cn.pop())
                            console.log(lastnum)
                          thisEleNames=parseFloat(thisEleNames);
                             console.log(thisEleNames)
                          if( lastnum == thisEleNames){$(".NumList li").unbind();
                        setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                        setTimeout(function(){
                                        if(total==10){
                                           stop();
                                             $(".NumListWrap").css("display","none");
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
                                        document.getElementById('NumList').innerHTML = "";
                                        setTimeout(function(){ continueGame();},continueTime);
                                    },1300);
                                    clickNum=-1;
                                    leverPassCount++;
                                    successNum++;
                                     stopGameDJS();
                                    leverFaileCount=leverFaileCount-1;
                                    score+= 10;
                                    total=successNum+faildNum;
                                    syNum=syNumall-total;
                                     if(score>120){
                                            score=120
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
                                    document.getElementById('allScore').innerHTML = score;
                                    document.getElementById('LeverNumT').innerHTML = successNum;
                          }else{$(".NumList li").unbind();
                            setTimeout(function(){$(".Tips").html(nextcz).show(50).delay(1000).hide(50);},100)
                            setTimeout(function(){
                                        if(total==10){
                                           stop();
                                          $(".NumListWrap").css("display","none");
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
                                        document.getElementById('NumList').innerHTML = "";
                                        setTimeout(function(){ continueGame();},continueTime);
                                    },1300);
                                clickNum=-1;
                                leverFaileCount++;
                                faildNum++;
                                 stopGameDJS();
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
                                  console.log(alllistenNum+"总用时");
                                  $('.sycsNum').html(syNum);
                                 document.getElementById('allScore').innerHTML = score;
                                    document.getElementById('LeverNumB').innerHTML = faildNum;

                          }
                       
                        }
                    })
               }
                },timeNum)
                  },1700)
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
        /*
         * 生成需要显示的水果html,并且绑定事件
         */
          function GenHTML(leverNeddCheckNumber_cn,allNumber_cn) {
            
		  html= '<li data-num="0"></li>'+
  		   	 	'<li data-num="1"></li>'+
  		   	 	'<li data-num="2"></li>'+
  		   	 	'<li data-num="3"></li>'+
  		   	 	'<li data-num="4"></li>'+
  		   	 	'<li data-num="5"></li>'+
  		   	 	'<li data-num="6"></li>'+
  		   	 	'<li data-num="7"></li>'+
  		   	 	'<li data-num="8"></li>'+
  		   	 	'<li data-num="9"></li>'+
            '<li data-num="10"></li>';
   	 	 
   	 	 document.getElementById('NumList').innerHTML = html;
	           
        }
        
    //生成关卡中玩家需要选中的数字
        function genLeverFruit(lever) {
            var startcount = lever+1;
            for (var i = 0; i < 1; i++) {
                    var randomIndex = GerRandomByRange(4);
                    var tempFruit =allNumberxz[randomIndex];
                    while(leverNumberxe.indexOf(tempFruit) !== -1){
                        tempFruit =allNumberxz[GerRandomByRange(4)];
                    }
                    leverNumberxe.push(tempFruit);
                }
            for (var i = 0; i < leverNumberxe; i++) {
                //获取随机索引
                var randomIndex = GerRandomByRange(10);
                //获取随机水果
                var tempFruit =allNumber[randomIndex];
                //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
                while(leverNumber.indexOf(tempFruit) !== -1){
                    randomIndex = GerRandomByRange(10);
                    tempFruit =allNumber[randomIndex];
                }
                //当前关卡显示水果追加刚刚随机选择的数字
                leverNumber.push(tempFruit);
                leverNumber_cn.push(allNumber_cn[allNumber.indexOf(tempFruit)]);
              }
                leverNeddCheckNumberClick_cn=leverNumber_cn.slice(leverNumberxe-3,leverNumberxe)
                
                console.log(leverNumberxe)
                console.log(leverNumber)
                console.log(leverNumber_cn)
                console.log(leverNeddCheckNumberClick_cn)
                var time = 0;
                 var audioCount = leverNumber_cn.length;
	            for (var i = 0; i < audioCount; i++) {
	                (function() {
	                    var numName = leverNumber_cn[i];     
    	                    setTimeout(function() {
                                // console.log($(".BlockNum").height())
                                 $(".BlockNum").css("line-height",$(".BlockNum").height()+"px")
    	                        setTimeout(function(){
                                     document.getElementById('BlockNum').innerHTML = numName;  
                                 },1000)                 
    	                    }, time);
    	                    time = ((i+1)*2000);
    	                    setTimeout(function(){
    	                       document.getElementById('BlockNum').innerHTML = ""; 
    	                    },audioCount*2000)
	                })();
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
        function playLeverAudio(leverNeddCheckNumber,endCallback) {
            var time = 0;
             var playedCount = 1;
            var audioCount = leverNeddCheckNumber.length;
            for (var i = 0; i < audioCount; i++) {
                (function() {
                    var this_audio = leverNeddCheckNumber[i];
                    setTimeout(function() {
                        // var eleID = 'ad_' + this_audio;
                        // document.getElementById(eleID).play();
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
    $(".NumListWrap").css("display","block");
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