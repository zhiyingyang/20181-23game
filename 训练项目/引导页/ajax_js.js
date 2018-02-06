
function output_score_ajax_fun(){
/*	var reaction_time_arr=new Array();
	for (var i=0;i<singleUseTime.length;i++){
		if(i==0){
            reaction_time_arr.push(singleUseTime[i])
		}else{
        reaction_time_arr.push(singleUseTime[i]-singleUseTime[i-1])}
	}*/
$.ajax({type:'POST',url:'/kfxl/jyfk/jyfkAction_resultAjaxJsonStr.action',cache:false,dataType:'json',
    data:{
		Number_of_operations:total,	//实际操作次数
		correct:successNum,							//正确次数
		incorrect:faildNum,						//错误次数
		duration:alllistenNumall,							//实际操作时间 (秒)
		reaction_correct:CorrectTime/successNum,          //平均正确反应时间
		reaction_incorrect:ErroneousTime/faildNum,		//平均错误反应时间
		reaction_all_time:alllistenNumall/total,		//平均反应时间
		score:score,								//分数
		highest_Number:endZlever,				//最高等级块数
		reaction_Sorting_arr:WrongSort,  //对错排序
		reaction_time_arr:singleUseTime,	//反应时间
        reaction_level_arr: levelArray		//级别记录
		},
	  success:function(e){
		//wokao(e["reaction_Sorting_arr"]);
		//wokao(e["reaction_time_arr"]);
             },
      complete:function(e){
       	//wokao(e);
             },
	  error:function (e){
		//wokao("失败");
			 }
	});	
}
