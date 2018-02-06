document.title=title;
window.onresize = function(){
    var winHeight = window.innerHeight;
    $(".allEnd").css("height",winHeight);
    $(".gameImgList li").css("height",$(".gameImgList li").width())
    $(".gameNum li").css("line-height",$(".gameNum li").height()+"px")
}
var winHeight = window.innerHeight-120;
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
    //当前关卡所有需要显示的水果名称数组
    leverFruit = [];
    //需要玩家选中的水果名称数组
    leverNeddCheckFruit = [];
    leverNeddCheckFruitzhone =[];
}

//生成关卡数据
function genLever(lever) {
    genLeverFruit(lever);
    playLeverAudio(leverNeddCheckFruit,function () {
        var timeNum=2000;
        setTimeout(function () {
            stopGameDJS();
            startGameDJS();
            setTimeout(function(){$(".allBengin").html("开始").show().delay(1500).hide(0);},200)
            setTimeout(function(){GenHTML(leverNeddCheckFruitzhone)},1700)
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
//生成关卡显示水果，关卡中玩家需要选中的水果
function genLeverFruit(lever) {
    // var count = lever+2;
    var count = lever;
    for (var i = 0; i < 19; i++) {
        //获取随机索引
        var randomIndex = GerRandomByRange(19);
        //获取随机水果
        var tempFruit =allFruits[randomIndex];

        //如果当前关卡显示说过包含这个随机水果，再次随机选择，直到不重复
        while(leverFruit.indexOf(tempFruit) !== -1){
            randomIndex = GerRandomByRange(19);
            tempFruit =allFruits[randomIndex];
        }
        //当前关卡显示水果追加刚刚随机选择的水果
        leverFruit.push(tempFruit);
    }
    //从当前关卡显示水果(leverNumber)中选出12种，让玩家选择
    for (var i = 0; i < 12; i++) {
        var randomIndex = GerRandomByRange(19);
        var tempFruit =leverFruit[randomIndex];

        while(leverNeddCheckFruitzhone.indexOf(tempFruit) !== -1){
            tempFruit =leverFruit[GerRandomByRange(19)];
        }

        leverNeddCheckFruitzhone.push(tempFruit);
    }
    //从当前关卡显示水果(leverNeddCheckFruitzhone)中选出count种，让玩家选择
    for (var i = 0; i < count; i++) {
        var randomIndex = GerRandomByRange(12);
        var tempFruit =leverNeddCheckFruitzhone[randomIndex];

        while(leverNeddCheckFruit.indexOf(tempFruit) !== -1){
            tempFruit =leverNeddCheckFruitzhone[GerRandomByRange(12)];
        }

        leverNeddCheckFruit.push(tempFruit);
    }
    console.log(leverNeddCheckFruitzhone)
    console.log(leverNeddCheckFruit)
}
/*
 * 生成需要显示的水果html,并且绑定事件
 */
function GenHTML(leverAllFruit) {
    //生成HTML
    var html = "";

    for (var i = 0; i < leverAllFruit.length; i++) {
        console.log(leverAllFruit.length+"判断")
        var fruitName = leverAllFruit[i];
        html += '<li data-fruit="' + fruitName + '"><img id="' + "img_" +fruitName + '" src="img/'+fruitName + '.png"></li>';
    }
    document.getElementById('showFruit').innerHTML = html;
    $(".gameImgList li").css("height",$(".gameImgList li").width())
    $(".gameNum li").css("line-height",$(".gameNum li").height()+"px")
    //$(".gameImgList li img").css("width",$(".gameImgList li img").height()+"px")

    // 为li绑定事件
    var fruit = $(".gameImgList li");
    for (var i = 0; i < fruit.length; i++) {
        var clickNum=-1;
        fruit.eq(i).one('click', function(ev) {
            stopGameDJS();
            clickNum = clickNum+1;
            var thisEleClassNames = this.getAttribute("class");
            var thisEleNames = this.getAttribute("data-fruit");
            if (thisEleClassNames && thisEleClassNames.indexOf("check") !== -1) {
            } else {
                var newClassName = "check";
                var checkedFruit = document.querySelectorAll(".gameImgList .check");

                if (checkedFruit) {

                    var checkedFruitCount = checkedFruit.length + 1;
                    console.log(checkedFruitCount+"第几个")
                    newClassName += " index_" + checkedFruitCount;
                    this.setAttribute("class", newClassName);
                } else {
                    this.setAttribute("class", "check index_1");
                }
            }
            //判断结果
            var checkfruit = document.querySelectorAll(".gameImgList .check");
            // var leverFruitCount = lever+2;
            var leverFruitCount = lever;

            if(checkfruit.length !== leverFruitCount){

                if(leverNeddCheckFruit[clickNum] !== thisEleNames){
                    console.log(leverNeddCheckFruit[clickNum]+"对比"+thisEleNames);
                    $(".gameImgList li").unbind();
                    $("#errormsg").html(xzcw).show(50).delay(1000).hide(50);
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
                    $('.sycsNum').html(syNum);
                    document.getElementById('LeverNumB').innerHTML = faildNum;
                    allScore();
                }else{
                    // console.log("111")
                }
            }
            else if(checkfruit && checkfruit.length == leverFruitCount){
                var passed = true;
                var checkfruitArray = [];
                while (checkfruitArray.length < leverFruitCount) {
                    for (var i = 0; i < checkfruit.length; i++) {
                        var thisFruitName = checkfruit[i].getAttribute("data-fruit");
                        var thisFruitClassName = checkfruit[i].getAttribute("class");
                        var selectIndex = thisFruitClassName.match(/\d+/g);
                        if(selectIndex == (checkfruitArray.length+1)){
                            checkfruitArray.push(thisFruitName);
                        }
                    }
                }

                for(var i = 0;i<leverFruitCount;i++){

                    if(leverNeddCheckFruit[i] !== checkfruitArray[i]){
                        console.log(leverNeddCheckFruit[clickNum]+"对比"+thisEleNames);
                        passed = false;
                    }
                }

                if(passed){
                    $(".gameImgList li").unbind();
                    $("#errormsg").html(gxncg).show(50).delay(1000).hide(50);
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
                    }
                    WrongSort.push(true);
                    singleUseTime.push(alllistenNum);    alllistenNumall=alllistenNumall+alllistenNum;
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
                    allScore();

                }else{
                    $(".gameImgList li").unbind();
                    $("#errormsg").html(xzcw).show(50).delay(1000).hide(50);
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
                    allScore();


                }
            }
        })

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
/*
 * 得分
 */
function allScore() {
    document.getElementById('allScore').innerHTML = score;
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
                var eleID = 'ad_' + this_audio;
                document.getElementById(eleID).play();
                if(playedCount == audioCount && endCallback){
                    setTimeout(function () {
                        endCallback();
                    },1500);
                }
                playedCount++;
            }, time);
            time = ((i+1)*audioSpeed);
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