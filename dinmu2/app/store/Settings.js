Ext.define('Dinmu.store.Settings', {
	extend: 'Ext.data.Store',
	requires: [
		'Dinmu.model.Setting'
	],
	alias: 'store.settings',
	storeId: 'Settings',

	model: 'Dinmu.model.Setting',
	autoLoad: true
});
