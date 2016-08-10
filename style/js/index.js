function running(){
	$("#welcome span").click(function(){
		$("#bigbox").animate({"top":"-110%","left":"-100%"}, 1000,function(){
			$("#bigbox #content .header").addClass(' current');
		});
	});
	$(".two-cont dl").mouseenter(function(){
		$(this).children('dt').stop(true).animate(
		{
			"height":242,
		}
		,1000);
	});
	$(".two-cont dl").mouseleave(function(){
		$(this).children('dt').stop(true).animate(
		{
			"height":30,
		}
		,1000);
	});
	$(window).scroll(
		function(){
			var a=$(window).scrollTop();
			var b=$(window).height();
			var c=$(".rightnav").height();
			$(".rightnav").stop(true).animate({"top":a+(b-c)/2},1000);
		}
	);	
}
var nowpage = 0;
function run2(){
	
	var lock = true;
	$(document).mousewheel(
		function(event,delta){
			if(!$("#content").is(":animated")){
				nowpage = nowpage - delta; //滚轮下滚，-1；上滚1。
				// console.log(nowpage);
				//滞后验收
				if(nowpage >3){
					nowpage = 3;
				}
				if(nowpage < -1){
					nowpage = -1;
				}
				$("#content").animate({"top":-100 * nowpage + "%"},1000);
				$(".header-cont .rightnav a").eq(nowpage+1).addClass('cur').siblings().removeClass('cur');
			}
		}
	);
}
function nav1(){
	$(".layout-one nav li").click(
			function(){
				var page = $(this).index();
				if(page<0){
					page=0;
				}
				if(page>4){
					page=4;
				}
				$("#content").stop(true).animate({"top": (-100 * page +100)+ "%"},1000);
				$(".header-cont .rightnav a").eq(page).addClass('cur').siblings().removeClass('cur');	
			}
		);
		$(".four-center").mouseenter(function(){
				$(this).children('.photo').stop(true).fadeOut(1000);
			});
			$(".four-center").mouseleave(function(){
				$(this).children('.photo').stop(true).fadeIn(1000);
			});
			//异型滚动
			var json0 = {"width": 132,"height": 235,"left": -181,"top": 150};
			var json1 = {"width":132,"height":235,"left":0,"top":178};
			var json2 = {"width":162,"height":289,"left":303,"top":151};
			var json3 = {"width":132,"height":235,"left":625,"top":178};
			var json4 = {"width":132,"height":235,"left":822,"top":175};
			var json5 = {"width":132,"height":235,"left":860,"top":175};
			var json6 = {"width":132,"height":235,"left":-156,"top":146};

				var timer=setInterval(zidong, 2000);
				$(".imagelist ul li").mouseenter(
						function(){
							clearInterval(timer);
						}
					);
				$(".imagelist ul li").mouseleave(
						function(){
							clearInterval(timer);
							timer=setInterval(zidong, 2000);
						}
					);
				 $("span.arow-r").click(zidong);
					function zidong(){
						if(!$(".imagelist ul li").is(":animated")){
							//【先交换位置】
							$(".imagelist .no1").animate(json0,300);
							$(".imagelist .no2").animate(json1,300);
							$(".imagelist .no3").animate(json2,300);
							$(".imagelist .no4").animate(json3,300);
							$(".imagelist .no5").animate(json4,300);
							$(".imagelist .no6").css(json5,300);
							$(".imagelist .no0").css(json6);
							//先要备忘一下，原有的no6
							var myno6 = $(".no6");
							$(".no0").attr("class","no6");
							$(".no1").attr("class","no0");
							$(".no2").attr("class","no1");
							$(".no3").attr("class","no2");
							$(".no4").attr("class","no3");
							$(".no5").attr("class","no4");
							$(".no6").attr("class","no5");
							if(myno6.next().length != 0){
								//如果myno6后面有人，那么就让这个人的类名为mo6
								myno6.next().attr("class","no6");
							}else{
								$(".imagelist ul li").eq(0).attr("class","no6");
							}
							$(".no6").css(json6);
						}
					}
				$("span.arow-l").click(
					function(){
						if(!$(".imagelist ul li").is(":animated")){
							//【先交换位置】
							$(".imagelist .no0").animate(json1,300);
							$(".imagelist .no1").animate(json2,300);
							$(".imagelist .no2").animate(json3,300);
							$(".imagelist .no3").animate(json4,300);
							$(".imagelist .no4").animate(json5,300);
							$(".imagelist .no5").css(json6,300);
							$(".imagelist .no6").css(json0);
							//【再交换身份】
							//先要备忘一下，原有的no6
							var myno0 = $(".no0");
							$(".no5").attr("class","no6");
							$(".no4").attr("class","no5");
							$(".no3").attr("class","no4");
							$(".no2").attr("class","no3");
							$(".no1").attr("class","no2");
							$(".no0").attr("class","no1");
						 	if(myno0.prev().length != 0){
								//如果myno6后面有人，那么就让这个人的类名为mo6
								myno0.prev().attr("class","no0");
							}else{
								$(".imagelist ul li:last").attr("class","no0");
							}
							
							$(".no0").css(json0);
				}
			}
		);
}
		

