# DoomFire
Implementation of doom fire algorithm in js

<html>

<head>
	<style>
		table {
			border-collapse: collapse;
			border: 1px solid #000;
		}

		td {
			width: 50px;
			height: 50px;
			border: 1px solid #000;
			text-align: center;
			vertical-align: center;
			font-family: monospace;
			font-size: 18px;
			position: relative;
		}

		.pixel-index {
			font-size: 10px;
			display: inline-block;
			position: absolute;
			top: 2px;
			right: 2px;
			color: #999;
		}

		td.pixel {
			width: 4px;
			height: 4px;
			border: 0;
		}
	</style>
</head>

<body>
	<div id="fireCanvas"></div>
	<script src="fire.js"></script>
	<button onclick="minusIntensity()">-</button>
	<button onclick="plusIntensity()">+</button>
	<button onclick="setDebug()">Debug</button>
</body>

</html>
