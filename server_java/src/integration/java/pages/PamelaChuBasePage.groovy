package pages

import geb.Page;

class PamelaChuBasePage extends Page {

	static content = {
		dropDownMenu { $("ul.dropdown-menu") } // <ul class="dropdown-menu">
		adminLink(required: false) {
			// <a href="/pamelaChu/admin"> // href returns absolute url so we need to filter with endsWith ...
			dropDownMenu.find("a",href:endsWith('/pamelaChu/admin'))
		}
	}
	
}
