"use strict";

;(function () {
	var socket = void 0;
	var _path = void 0;
	function ws(path, f) {
		if (socket) {
			socket.close();
			socket.onerror = null;
		}
		socket = new WebSocket(path);
		socket.onerror = function () {
			ws(path);
		};
		socket.onmessage = f;
		_path = path;
	}
	function send(data) {
		if (socket) {
			switch (socket.readyState) {
				case 2:
				case 3:
					socket = new WebSocket(_path);
				case 0:
					socket.onopen = function () {
						socket.send(data);
					};
					break;
				case 1:
					socket.send(data);
					break;
			}
		} else {
			socket = new WebSocket(_path);
			socket.onopen = function () {
				socket.send(data);
			};
		}
	}

	function close() {
		if (socket) {
			socket.close();
			socket = null;
		}
	}

	function makeRequest(path, f, f2) {
		var xhr = new XMLHttpRequest();
		if (f) {
			xhr.onload = function () {
				f(this.response);
			};
		}
		if (f2) {
			xhr.onerror = function (e) {
				f2(e);
			};
		}
		xhr.open("GET", path, true);
		xhr.send(null);
	}

	window.NetworkUtils = {
		ws: ws,
		send: send,
		close: close,
		makeRequest: makeRequest
	};
})();