function me() {
				var timer=setInterval(zhuandong,1000);
				$(".tupian").mouseenter(
					function(event) {
					   	clearInterval(timer);
					}
				);
				$(".tupian").mouseleave(
					function(event) {
					   	clearInterval(timer);
					   	timer=setInterval(zhuandong,1000);
					}
				);
			  $("input").click(zhuandong);
			  	function zhuandong(){
			  		if($(".box").attr("class")=="box"){
						$("#guanyu .tupian .box").addClass("cur");
					}else{
						$("#guanyu .tupian .box").removeClass("cur");
					}
			  	}	
			}