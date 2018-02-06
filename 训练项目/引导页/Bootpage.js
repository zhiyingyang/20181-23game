$(".pxtop").click(function () {
	index_=$(this).parent().parent().index();
	if(index_==0){
       return;
	}else{
		var html;
		html = $(".xuList li").eq(index_).clone(true);
		$(".xuList li").eq(index_).remove();
		index_--;
		$(".xuList li").eq(index_).before(html);
	}
})

$(".pxbottom").click(function () {
	index_=$(this).parent().parent().index();
	if(index_>=$(".xuList li").length-1){
       return;
	}else{
		var html;
		html = $(".xuList li").eq(index_).clone(true);
		$(".xuList li").eq(index_).remove();
		$(".xuList li").eq(index_).after(html);
	}
})

var URLName;
$(".xuList li input").click(function(){
 //   $(this).children(input);
   // alert($(this).parent("li").index());
	 URLName = "";

	 if($(".xuList li input").is(":checked")){
	 	URLName = $(".xuList li input:checked").attr("urlname");
         var array= URLName.split("/");
         var sp=$(this).attr("value")*12/100;
         if( sp !==sp){
             document.cookie =  array[array.length-1]+'=' +1+";path=/";
         }else{
             document.cookie =  array[array.length-1]+'=' +Math.round(sp)+";path=/";
         }

	 }else{
	 	URLName = "";
	 	return;
	 }

})

$(".bottomright").click(function(){
	 location.href=URLName;
})
