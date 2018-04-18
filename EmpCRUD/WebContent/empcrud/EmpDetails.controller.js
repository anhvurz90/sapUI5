sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/ODataModel"
], function(Controller, JSONModel, ODataModel) {
	"use strict";
	
	return Controller.extend("empcrud.EmpDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf empcrud.EmpDetails
*/
	onInit: function() {
		this.sServiceUrl = "http://10.0.0.48/sap/opu/odata/SAP/ZMM_EMP_SRV";
		var oModel = new ODataModel(this.sServiceUrl, true);

		var oJsonModel = new JSONModel();
		var controller = this;
		oModel.read("/EmployeeSet?", null, null, true, 
				function(oData, response) {
					oJsonModel.setData(oData);
					console.log(oData);
					controller.employees = oData.results;
				});
//		var data = {results: [{"Empid":"1234"}, {"Empid":"5678"}]};
//		var oJsonModel = new JSONModel(data);
		this.getView().setModel(oJsonModel, "employees");
	},
	
	itemPress: function(evt) {
		var path = evt.getParameter("listItem").getBindingContextPath();
		var idx = path.lastIndexOf("/");
		var order = path.substr(idx + 1);
		this.getView().byId("formDialog").setVisible(true);
		this.getView().byId("formDialog").open();
		
		this.getView().byId("btnUpdate").setVisible(true);
		this.getView().byId("btnDelete").setVisible(true);
		this.getView().byId("btnSave").setVisible(false);
		
		this.selectedEmployee = this.employees[order];
		var eJsonModel = new JSONModel();
		eJsonModel.setData(this.selectedEmployee);
		this.getView().setModel(eJsonModel, "selectedEmployee");
		
		this.getView().byId("EmpIdInput").setEnabled(false);
	},
	
	onUpdate: function(evt) {
		console.log(this.selectedEmployee);
		var selectedEmployee = {
			Empid: this.selectedEmployee.Empid,
			Empname: this.selectedEmployee.Empname,
			Empadd: this.selectedEmployee.Empadd,
			Empdes: this.selectedEmployee.Empdes,
		}
		var controller = this;
		OData.request({
				requestUri: controller.sServiceUrl + "/EmployeeSet",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}
			}, function(data, response) {
				var header_xcsrf_token = response.headers['x-csrf-token'];
				var oHeaders = {
					'x-csrf-token': header_xcsrf_token,
					'Accept': "application/json",
				};
				OData.request({
						requestUri: controller.sServiceUrl + "/EmployeeSet('" + selectedEmployee.Empid + "')",
						method: "PUT",
						headers: oHeaders,
						data: selectedEmployee
					}, function(data, request) {
						alert("Update Success");
						location.reload(true);
					}, function(err) {
						alert("Update Failed");
					} 
				);
			}, function(err) {
				var request = err.request;
				var response = err.response;
				alert("Error in Get -- Request " + request + " Response " + response);
			}
		);
		this.getView().byId("formDialog").close();
	},
	
	onDelete: function(evt) {
		console.log(this.selectedEmployee);
		var selectedEmployee = {
			Empid: this.selectedEmployee.Empid,
		}
		var controller = this;
		OData.request({
				requestUri: controller.sServiceUrl + "/EmployeeSet",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}
			}, function(data, response) {
				var header_xcsrf_token = response.headers['x-csrf-token'];
				var oHeaders = {
					'x-csrf-token': header_xcsrf_token,
					'Accept': "application/json",
				};
				OData.request({
						requestUri: controller.sServiceUrl + "/EmployeeSet('" + selectedEmployee.Empid + "')",
						method: "DELETE",
						headers: oHeaders,
						data: selectedEmployee
					}, function(data, request) {
						alert("Delete Success");
						location.reload(true);
					}, function(err) {
						alert("Detete Failed");
					} 
				);
			}, function(err) {
				var request = err.request;
				var response = err.response;
				alert("Error in Get -- Request " + request + " Response " + response);
			}
		);
		this.getView().byId("formDialog").close();
	},
	
	onCloseDialog: function(evt) {
		this.getView().byId("formDialog").close();
	},
	
	onNewEntry: function() {
		this.getView().byId("formDialog").setVisible(true);
		this.getView().byId("formDialog").open();
		
		this.getView().byId("btnUpdate").setVisible(false);
		this.getView().byId("btnDelete").setVisible(false);
		this.getView().byId("btnSave").setVisible(true);
		
		this.selectedEmployee = {};
		var eJsonModel = new JSONModel();
		eJsonModel.setData(this.selectedEmployee);
		this.getView().setModel(eJsonModel, "selectedEmployee");
		
		this.getView().byId("EmpIdInput").setEnabled(true);
	},
	
	onSave: function() {
		console.log(this.selectedEmployee);
		var selectedEmployee = {
			Empid: this.selectedEmployee.Empid,
			Empname: this.selectedEmployee.Empname,
			Empadd: this.selectedEmployee.Empadd,
			Empdes: this.selectedEmployee.Empdes,
		}
		var controller = this;
		OData.request({
				requestUri: controller.sServiceUrl + "/EmployeeSet",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}
			}, function(data, response) {
				var header_xcsrf_token = response.headers['x-csrf-token'];
				var oHeaders = {
					'x-csrf-token': header_xcsrf_token,
					'Accept': "application/json",
				};
				OData.request({
						requestUri: controller.sServiceUrl + "/EmployeeSet",
						method: "POST",
						headers: oHeaders,
						data: selectedEmployee
					}, function(data, request) {
						alert("Save Success");
						location.reload(true);
					}, function(err) {
						alert("Save Failed");
					} 
				);
			}, function(err) {
				var request = err.request;
				var response = err.response;
				alert("Error in Get -- Request " + request + " Response " + response);
			}
		);
		this.getView().byId("formDialog").close();
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf empcrud.EmpDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf empcrud.EmpDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf empcrud.EmpDetails
*/
//	onExit: function() {
//
//	}
	});
});