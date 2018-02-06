//游戏标题
var title="视听结合";
//游戏级别
var lever = getCookie('SeeListenIndex.html');
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
    if(arr=document.cookie.match(reg)){
        return parseInt(arr[2]);
    }
    else{
        return 1;
    }
}
//初始游戏级别
var cslever;
cslever = lever;
//结束游戏级别
var endLever = 12;
//结束最高级别
var endZlever;
endZlever = lever;
//游戏得分
var score = 0;
//总次数
var syNumall=10;
//剩余次数
var syNum;
//当前级别通过次数
var leverPassCount = 0;
//当前级别失败次数
var leverFaileCount = 0;
//表示游戏是否开始
var gameStarted = false;
//成功或失败次数
var successNum=0;
var faildNum=0;
//需要亮的数字
var count;
//在亮的当中需要点击的数字
var count2;
//当前关卡所有需要显示的数字
var leverNumber = [];
var leverNumber_cn = [];
//需要播放玩家选中的数字
var leverNeddCheckNumber = [];
  var leverNeddCheckNumber_cn = [];
//需要玩家选中的数字
var leverNeddCheckNumberEnd = [];
var leverNeddCheckNumberEnd_cn = [];
 //总次数
var total=successNum+faildNum;
//播放时间间隔
var bofangTime=2000;
//按钮亮的时间
var BtnLTime=0;
//按钮灭的时间
var BtnATime=1500;
//60秒倒计时
var wait = 60;
//60秒倒计时结束后赋值
var waitEnd = 60;
//开始倒计时
var startDjs = 3;
//下标
var listenNum=0;
//所有游戏累加的时间
var alllistenNum=0;
var alllistenNumall=0;
//累计时间总
var alllistenNumzg;
//正确用时
var CorrectTime = 0;
//错误用时
var ErroneousTime = 0;
//开始到结束用的总时间
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
var int;
//倒计时次数
var djsNum = 0;
//正确率
var CorrectRate;
//请进行下一次操作
var nextcz = "请进行下一次操作";
//恭喜你成功了
var gxncg = "恭喜你成功了";
//选择错误
var xzcw = "选择错误";
//继续开始游戏的间隔
var continueTime = 1000;
// 定义存放生成随机数的数组 
var array=new Array(); 
var array2=new Array();    
var allNumber = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine","zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var allNumber_cn = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9","0","1", "2", "3", "4", "5", "6", "7", "8", "9"];

//单次用时数组
var singleUseTime=new Array();
//错误数组
var WrongSort=new Array();


