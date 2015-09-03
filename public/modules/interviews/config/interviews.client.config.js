'use strict';

// Configuring the Interviews module
angular.module('interviews').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Interviews', 'interviews', 'dropdown', '/interviews(/create)?');
		Menus.addSubMenuItem('topbar', 'interviews', 'List Interviews', 'interviews');
		Menus.addSubMenuItem('topbar', 'interviews', 'New Interview', 'interviews/create');
	}
]);
