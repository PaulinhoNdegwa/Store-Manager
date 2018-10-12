	function toogleMenu() {
	    var nav = document.getElementById("myNavbar");
	    if (nav.className === "navbar") {
	        nav.className += " responsive";
	    } else {
	        nav.className = "navbar";
	    }
	}

function deleteModal(){
	delete_modal.style.display = "block";
}

function closeModal(){
	delete_modal.style.display = "none";
}
function att_login_form_modal(){
	attendant_form_modal.style.display = "block";
}

function pdt_new_form_modal(){
	pdt_form_modal.style.display = "block";
}
function admin_login_form_modal(){
	admin_form_modal.style.display = "block";
}

function close_form_modal(){
	attendant_form_modal.style.display = "none";
	admin_form_modal.style.display = "none";
	pdt_form_modal.style.display = "none";
}
function close_pdt_modal(){
	pdt_form_modal.style.display = "none";
}
function make_admin_modal(){
	admin_modal.style.display = "block";
}

function close_make_admin_modal(){
	admin_modal.style.display = "none";
}

function att_new_form_modal(){
	att_form_modal.style.display = "block";
}

function close_att_form_modal(){
	att_form_modal.style.display = "none";
}