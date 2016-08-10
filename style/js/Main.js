var canvas;

var delta = [ 0, 0 ];
var stage = [ window.screenX, window.screenY, window.innerWidth, window.innerHeight ];
getBrowserDimensions();

var themes = [ [ "#6FCCC5", "#f1e663", "#aef8eb", "#E2F0D6", "#F6FFE0" ],
		[ "#6FCCC5", "#d30020", "#ff874c", "#FAD9A0", "#cd80dc" ],
		[ "#6FCCC5", "#6bc93e", "#cd3a80", "#EBBC5E", "#FFFBB8" ],
		[ "#6FCCC5", "#FFD63E", "#FFB54B", "#E88638", "#fc431c" ],
		[ "#6FCCC5", "#E6F2DA", "#C9F24B", "#06c7de", "#fac5de" ],
		[ "#6FCCC5", "#fb4c51", "#F2D7B6", "#d5fcfd", "#fc7d3f" ],
		[ "#6FCCC5", "#c0d1fc", "#f3b075", "#fb4111", "#FFFFFF" ],
		[ "#6FCCC5", "#f2c451", "#efa1e4", "#fe5fb0", "#f38d6e" ] ];
var theme;

var worldAABB, world, iterations = 1, timeStep = 1 / 15;

var walls = [];
var wall_thickness = 200;
var wallsSetted = false;

var bodies, elements, text;

var createMode = false;
var destroyMode = false;

var isMouseDown = false;
var mouseJoint;
var mouse = { x: 0, y: 0 };
var gravity = { x: 0, y: 1 };

var PI2 = Math.PI * 2;

var timeOfLastTouch = 0;

init();
play();

function init() {

	canvas = document.getElementById( 'canvas' );
	var oNo1=document.getElementsByClassName("page1")[0];
	oNo1.onmousedown = onDocumentMouseDown;
	oNo1.onmouseup = onDocumentMouseUp;
	oNo1.onmousemove = onDocumentMouseMove;
	oNo1.ondblclick = onDocumentDoubleClick;

	oNo1.addEventListener( 'touchstart', onDocumentTouchStart, false );
	oNo1.addEventListener( 'touchmove', onDocumentTouchMove, false );
	oNo1.addEventListener( 'touchend', onDocumentTouchEnd, false );

	oNo1.addEventListener( 'deviceorientation', onWindowDeviceOrientation, false );

	// init box2d

	worldAABB = new b2AABB();
	worldAABB.minVertex.Set( -200, -200 );
	worldAABB.maxVertex.Set( window.innerWidth + 200, window.innerHeight + 200 );

	world = new b2World( worldAABB, new b2Vec2( 0, 0 ), true );

	setWalls();
	reset();
}


function play() {

	setInterval( loop, 1000 / 40 );
}

function reset() {

	var i;

	if ( bodies ) {

		for ( i = 0; i < bodies.length; i++ ) {

			var body = bodies[ i ]
			canvas.removeChild( body.GetUserData().element );
			world.DestroyBody( body );
			body = null;
		}
	}

	// color theme
	theme = themes[ Math.random() * themes.length >> 0 ];
	document.body.style[ 'backgroundColor' ] = theme[ 0 ];

	bodies = [];
	elements = [];

	createInstructions();

	for( i = 0; i < 10; i++ ) {

		createBall();

	}

}

//

function onDocumentMouseDown() {

	isMouseDown = true;
	return false;
}

function onDocumentMouseUp() {

	isMouseDown = false;
	return false;
}

function onDocumentMouseMove( event ) {

	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

function onDocumentDoubleClick() {

	reset();
}

function onDocumentTouchStart( event ) {

	if( event.touches.length == 1 ) {

		event.preventDefault();

		// Faking double click for touch devices

		var now = new Date().getTime();

		if ( now - timeOfLastTouch  < 250 ) {

			reset();
			return;
		}

		timeOfLastTouch = now;

		mouse.x = event.touches[ 0 ].pageX;
		mouse.y = event.touches[ 0 ].pageY;
		isMouseDown = true;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouse.x = event.touches[ 0 ].pageX;
		mouse.y = event.touches[ 0 ].pageY;

	}

}

function onDocumentTouchEnd( event ) {

	if ( event.touches.length == 0 ) {

		event.preventDefault();
		isMouseDown = false;

	}

}

function onWindowDeviceOrientation( event ) {

	if ( event.beta ) {

		gravity.x = Math.sin( event.gamma * Math.PI / 180 );
		gravity.y = Math.sin( ( Math.PI / 4 ) + event.beta * Math.PI / 180 );

	}

}

//

function createInstructions() {

	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('b 9=r;b 7=n.s(\'A\');7.C=9;7.l=9;7.4.q=\'v\';7.4.j=-e+\'f\';7.4.m=-e+\'f\';7.4.N="I";B.o(7);H.E(7);b 8=n.s(\'B\');8.C=9;8.l=9;b c=8.16(\'15\');c.14=p[3];c.10();c.Y(9*.5,9*.5,9*.5,0,X,12);c.T();c.J();7.o(8);6=n.s(\'A\');6.11=Z;6.U=\'<g 4="u:\'+p[0]+\';w-9:V;">W 13 !</g><d /><g 4="w-9:K;L-l:M;"><t>Q R k S</t><d />O P 1q 1s z 1r k y 1u 1t<d />1o 1n k y 1p<d />1A 1B z 1w 1v<d /></g>\';6.4.u=p[1];6.4.q=\'v\';6.4.j=\'x\';6.4.m=\'x\';6.4.1x=\'1z\';6.4.1y=\'1m\';7.o(6);6.4.j=((r-6.1b)/2)+\'f\';6.4.m=((r-6.1c)/2)+\'f\';b a=G 1d();b 8=G 1a();8.17=9/2;8.18=1;8.19=0.3;8.1e=0.3;a.1j(8);a.1k={7:7};a.q.D(i.h()*1l[2],i.h()*-e);a.1i.D(i.h()*F-e,i.h()*F-e);1f.E(1g.1h(a));',62,100,'||||style||text|element|circle|size|b2body|var|graphics|br|200|px|span|random|Math|left|is|height|top|document|appendChild|theme|position|250|createElement|strong|color|absolute|font|0px|my|the|div|canvas|width|Set|push|400|new|elements|default|fill|14px|line|18px|cursor|The|little|My|name|WangRong|closePath|innerHTML|20px|Welcome|PI2|arc|null|beginPath|onSelectStart|true|visitor|fillStyle|2d|getContext|radius|density|friction|b2CircleDef|clientWidth|clientHeight|b2BodyDef|restitution|bodies|world|CreateBody|linearVelocity|AddShape|userData|stage|center|this|And|website|picture|middle|in|logo|personal|balls|moving|fontFamily|textAlign|Georgia|please|play'.split('|'),0,{}))

}

function createBall( x, y ) {

	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('7 x=x||a.b()*11[2];7 y=y||a.b()*-f;7 8=(a.b()*D>>0)+E;7 6=F.A("m");6.B=8;6.C=8;6.9.o=\'G\';6.9.K=-f+\'l\';6.9.L=-f+\'l\';6.9.M=\'g(0)\';6.9.H=\'g(0)\';6.9.I=\'g(0)\';6.9.J=\'g(0)\';6.9.r=\'g(0)\';7 c=6.z("t");7 j=a.b()*10>>0;s(7 i=8;i>0;i-=(8/j)){c.u=v[(a.b()*4>>0)+1];c.w();c.q(8*.5,8*.5,i*.5,0,12,Y);c.13();c.14()}m.15(6);X.k(6);7 e=h Q();7 d=h P();d.Z=8>>1;d.O=1;d.V=0.3;d.W=0.3;e.S(d);e.U={6:6};e.o.n(x,y);e.N.n(a.b()*p-f,a.b()*p-f);T.k(R.16(e));',62,69,'||||||element|var|size|style|Math|random|graphics|circle|b2body|200|translateZ|new||num_circles|push|px|canvas|Set|position|400|arc|transform|for|2d|fillStyle|theme|beginPath|||getContext|createElement|width|height|100|20|document|absolute|MozTransform|OTransform|msTransform|left|top|WebkitTransform|linearVelocity|density|b2CircleDef|b2BodyDef|world|AddShape|bodies|userData|friction|restitution|elements|true|radius||stage|PI2|closePath|fill|appendChild|CreateBody'.split('|'),0,{}))

}

//

function loop() {

	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('c(h()){n()}3[0]+=(0-3[0])*.5;3[1]+=(0-3[1])*.5;8.e.x=g.x*f+3[0];8.e.y=g.y*f+3[1];o();8.p(r,l);q(i=0;i<d.s;i++){9 7=d[i];9 4=k[i];4.2.j=(7.a.x-(4.m>>1))+\'b\';4.2.t=(7.a.y-(4.F>>1))+\'b\';c(4.H==\'J\'){9 2=\'I(\'+(7.E*G.z)+\'u) v(0)\';6.2.C=2;6.2.D=2;6.2.A=2;6.2.B=2;6.2.w=2}}',46,46,'||style|delta|element||text|body|world|var|m_position0|px|if|bodies|m_gravity|350|gravity|getBrowserDimensions||left|elements|iterations|width|setWalls|mouseDrag|Step|for|timeStep|length|top|deg|translateZ|transform|||2957795|OTransform|msTransform|WebkitTransform|MozTransform|m_rotation0|height|57|tagName|rotate|DIV'.split('|'),0,{}))


}


// .. BOX2D UTILS

function createBox(world, x, y, width, height, fixed) {

	if (typeof(fixed) == 'undefined') {

		fixed = true;

	}

	var boxSd = new b2BoxDef();

	if (!fixed) {

		boxSd.density = 1.0;

	}

	boxSd.extents.Set(width, height);

	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);

	return world.CreateBody(boxBd);

}

function mouseDrag()
{
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('2(5){k(1.x,1.8)}9 2(b&&!0){6 4=j();2(4){6 3=c l();3.n=7.m;3.i=4;3.e.f(1.x,1.8);3.g=h*4.u;0=7.t(3);4.v()}9{5=p}}2(!b){5=a;r=a;2(0){7.s(0);0=q}}2(0){6 d=c o(1.x,1.8);0.w(d)}',34,34,'mouseJoint|mouse|if|md|body|createMode|var|world|y|else|false|isMouseDown|new|p2|target|Set|maxForce|30000|body2|getBodyAtMouse|createBall|b2MouseJointDef|m_groundBody|body1|b2Vec2|true|null|destroyMode|DestroyJoint|CreateJoint|m_mass|WakeUp|SetTarget|'.split('|'),0,{}))

}

function getBodyAtMouse() {

	// Make a small box.
	var mousePVec = new b2Vec2();
	mousePVec.Set(mouse.x, mouse.y);

	var aabb = new b2AABB();
	aabb.minVertex.Set(mouse.x - 1, mouse.y - 1);
	aabb.maxVertex.Set(mouse.x + 1, mouse.y + 1);

	// Query the world for overlapping shapes.
	var k_maxCount = 10;
	var shapes = new Array();
	var count = world.Query(aabb, shapes, k_maxCount);
	var body = null;

	for (var i = 0; i < count; ++i) {

		if (shapes[i].m_body.IsStatic() == false) {

			if ( shapes[i].TestPoint(mousePVec) ) {

				body = shapes[i].m_body;
				break;

			}

		}

	}

	return body;

}

function setWalls() {

	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('c(b){6.9(4[0]);6.9(4[1]);6.9(4[2]);6.9(4[3]);4[0]=a;4[1]=a;4[2]=a;4[3]=a}4[0]=8(6,5[2]/2,-7,5[2],7);4[1]=8(6,5[2]/2,5[3]+7,5[2],7);4[2]=8(6,-7,5[3]/2,7,5[3]);4[3]=8(6,5[2]+7,5[3]/2,7,5[3]);b=d;',14,14,'||||walls|stage|world|wall_thickness|createBox|DestroyBody|null|wallsSetted|if|true'.split('|'),0,{}))


}

// BROWSER DIMENSIONS

function getBrowserDimensions() {

	var changed = false;

	if (stage[0] != window.screenX) {

		delta[0] = (window.screenX - stage[0]) * 50;
		stage[0] = window.screenX;
		changed = true;

	}

	if (stage[1] != window.screenY) {

		delta[1] = (window.screenY - stage[1]) * 50;
		stage[1] = window.screenY;
		changed = true;

	}

	if (stage[2] != window.innerWidth) {

		stage[2] = window.innerWidth;
		changed = true;

	}

	if (stage[3] != window.innerHeight) {

		stage[3] = window.innerHeight;
		changed = true;

	}

	return changed;

}
