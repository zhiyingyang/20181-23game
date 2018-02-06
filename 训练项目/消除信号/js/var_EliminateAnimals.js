//游戏级别
var lever = getCookie('EliminateSignalIndex.html');
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
//游戏标题
var title="消除信号";
//游戏满分上线
var maxScore = 240;
//选出成对出现的数组
var leverFruit=[];
//copy数组
var leverFruit2 = [];
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
//图片显示5秒隐藏
var imgNone=5000;
//横的方块
var W_widthhe;
//竖的方块
var W_heightshu;
//总共多少方块
var allhsfk;
//请进行下一次操作
var nextcz = "请进行下一次操作";
//恭喜你成功了
var gxncg = "恭喜你成功了";
//选择错误
var xzcw = "选择错误";
//继续开始游戏的间隔
var continueTime = 1000;
var allFruits =
    ["battleship","sailing","train","trolley","policecar","bus","taxi","vehicle","tricycle","bicycle","plane","ufo","Rectangle"];
var allFruits_cn =
    ["轮船","帆船","高铁","有轨电车","警车","巴士","小汽车","越野车","卡车","自行车","直升机","飞船","大游轮"];
//单次用时数组
var singleUseTime=new Array();
//错误数组
var WrongSort=new Array();