sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use restrict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
		onShowHello: function() {
			alert("Hello World!");
		}
	});
});