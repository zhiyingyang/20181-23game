//游戏级别
var title="蔬菜";
//语音播放间隔
var audioSpeed =2100;
//游戏满分上线
var maxScore = 240;
  //当前关卡所有需要显示的水果名称数组
var leverFruit = [];
//需要玩家选中的水果名称数组
var leverNeddCheckFruitzhone =[];
var leverNeddCheckFruit = [];
//游戏级别
var lever = getCookie('fruitIndex.html');
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
// var endLever = 12;
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
//总次数
var total=successNum+faildNum;
//60秒倒计时
var wait = 60;
//60秒倒计时结束后赋值
var waitEnd = 60;
//开始倒计时
var startDjs = 3;
//所有游戏累加的时间
var alllistenNum=0;
var alllistenNumall=0;
//累计时间总
var alllistenNumzg;
//倒计时次数
var djsNum = 0;
//正确率
var CorrectRate;
//开始到结束用的总时间
var hour,minute,second;//时 分 秒
hour=minute=second=0;//初始化
var millisecond=0;//毫秒
var int;
//正确用时
var CorrectTime = 0;
//错误用时
var ErroneousTime = 0;
//请进行下一次操作
var nextcz = "请进行下一次操作";
//恭喜你成功了
var gxncg = "恭喜你成功了";
//选择错误
var xzcw = "选择错误";
//继续开始游戏的间隔
var continueTime = 2000;
var allFruits = 
["bean_sprout", "cabbage", "carrot", "celery", "corn", "cucumber", "eggplant", "garlic", 
"ginger", "green_pepper", "lotos", "mushroom", "onion", "peas","potato","pumpkin","spinach","ternip","tomato"];
var allFruits_cn = 
["豆芽", "白菜", "胡萝卜", "芹菜", "玉米", "黄瓜", "茄子", "大蒜", "生姜", "青椒", 
"莲藕", "蘑菇", "洋葱", "豌豆","土豆","南瓜","菠菜","白萝卜","西红柿"];


//单次用时数组
var singleUseTime=new Array();
//错误数组
var WrongSort=new Array();
