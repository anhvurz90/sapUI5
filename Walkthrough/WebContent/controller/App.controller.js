sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use restrict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
		onShowHello: function() {
			MessageToast.show("Hello World!");
		}
	});
});