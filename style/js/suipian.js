
function suipian(time){
	var nowimg = 1;

	$(".tutu").prepend("<div class='maoni'></div>");

	for(var i = 0 ; i <= 35 ; i++){
		$(".maoni").append("<p></p>");
		$(".maoni p").eq(i).css("top",parseInt(i / 9) * 82);
		$(".maoni p").eq(i).css("left",i % 9 * 194);
		$(".maoni p").eq(i).css("background-position", (i % 9 * -194) + "px " + parseInt(i / 9) * -82 +  "px");
	}
	var timer=setTimeout(baozhal, time);

		function baozhal(){
			
			if(nowimg < 9){
				nowimg++;
			}else{
				nowimg = 0;
			}
			$(".zhentu").attr("src","images/banner"+nowimg + ".jpg");

			$(".maoni p").css("transition","all 1s ease 0s");
			$(".tutu").addClass("fei");

			
			//添加飞的方向：
			$(".maoni p").each(
				function(){
					$(this).css("-webkit-transform","rotateX(" + -parseInt(Math.random() * 90)+ "deg) rotateY(" + parseInt(Math.random() *  100) + "deg) translateZ(500px)")
				}
			);
			setTimeout(function(){
				$(".tutu").removeClass("fei");
				$(".maoni p").css("transition","none");
				$(".maoni p").css("background-image","url(images/banner"+nowimg + ".jpg)");
				
				$(".maoni p").css("-webkit-transform","none");
			},1000);
		}

}
