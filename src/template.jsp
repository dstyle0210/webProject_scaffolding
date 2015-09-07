<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>Bootstrap 101 Template</title>

	<!-- reset : dstyle -->
	<link href="asset/css/lib/reset.min.css" rel="stylesheet">
	<!-- Bootstrap -->
	<link href="asset/css/lib/bootstrap.min.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="asset/js/lib/html5shiv.min.js"></script>
    <script src="asset/js/lib/respond.min.js"></script>
  <![endif]-->
  
</head>
<body>

<div ng-app="dataApp">
	<ul ng-controller="customersCtrl">
		<li ng-repeat="x in cells">
			<div class="item">
				<div>{{x.pfxNm}}</div>
				<div class="thumb"><a href="{{x.link}}"><img src="{{x.fileName}}" alt="{{x.prdNm}}" /></a></div>
				<div class="title"><a href="{{x.link}}">{{x.prdNm}}</a></div>
				<div class="price">{{x.cnmerUprc}}</div>
			</div>
		</li>
	</ul>
</div>




<div id="test">
	
</div>

<script data-main="asset/js/main" src="asset/js/lib/require.js"></script>
</body>
</html>