sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function () {
			console.log("Detail Controller!!!");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
//			this.getView().bindElement({
//				path: "/" + oEvent.getParameter("arguments").invoicePath,
//				model: "invoice"
//			});
			var json = JSON.parse(oEvent.getParameter("arguments").invoicePath);
			var jm = new JSONModel(json);
			this.getView().setModel(
					jm, 
					"invoice");
		}
	});
});