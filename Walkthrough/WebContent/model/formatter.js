sap.ui.define([], function() {
	"use strict";
	
	return {
		statusText: function(sStatus) {
			var rB = this.getView().getModel("i18n").getResourceBundle();
			
			switch(sStatus) {
				case "A": return rB.getText("invoiceStatusA");
				case "B": return rB.getText("invoiceStatusB");
				case "C": return rB.getText("invoiceStatusC");
				default: return sStatus;
			}
		}
	};
})