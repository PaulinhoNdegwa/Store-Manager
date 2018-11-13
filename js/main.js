// const api_auth_url = 'http://localhost:5000/api/v2/auth';
// const api_url = 'http://localhost:5000/api/v2';

const api_auth_url = 'https://storemanager-paul-v2.herokuapp.com/api/v2/auth';
const api_url = 'https://storemanager-paul-v2.herokuapp.com/api/v2';


function toogleMenu() {
	var nav = document.getElementById("myNavbar");
	if (nav.className === "navbar") {
		nav.className += " responsive";
	} else {
		nav.className = "navbar";
	}
}

function deleteModal(id, user) {
	delete_modal.style.display = "block";
	window.localStorage.setItem('delete_id', id)
	document.getElementById("to_delete").innerHTML = user
}

function closeModal() {
	delete_modal.style.display = "none";
	window.localStorage.removeItem('delete_id')
}
function att_login_form_modal() {
	attendant_form_modal.style.display = "block";
}

function pdt_new_form_modal() {
	pdt_form_modal.style.display = "block";
	categories.get_categories()
}

function pdt_edit_form_modal(id, pdt_name, pdt_model, price) {
	pdt_form_modal.style.display = "block";
	categories.get_categories()

	window.localStorage.setItem('edit_id', id)
	document.getElementById('title').innerHTML = "Edit product details";
	title.style.color = "red"
	document.getElementById('name').value = pdt_name;
	document.getElementById('model').value = pdt_model;
	document.getElementById('price').value = price;
	document.getElementById('savepdt').value = "Edit Product";
	document.getElementById('savepdt').setAttribute("onclick", `products.edit_product('${id}')`)
}

function close_form_modal() {
	attendant_form_modal.style.display = "none";
	pdt_form_modal.style.display = "none";
	window.localStorage.removeItem('edit_id')
}
function close_pdt_modal() {
	pdt_form_modal.style.display = "none";
	window.localStorage.removeItem('cat_loc')
}
function make_admin_modal(id, user) {
	admin_modal.style.display = "block";
	window.localStorage.setItem('edit_id', id)
	document.getElementById("user_to_edit").innerHTML = user
}

function close_make_admin_modal() {
	admin_modal.style.display = "none";
}

function att_new_form_modal() {
	att_form_modal.style.display = "block";
}

function close_att_form_modal() {
	att_form_modal.style.display = "none";
}
function cat_new_form_modal() {
	cat_form_modal.style.display = "block";
}

function close_cat_form_modal() {
	cat_form_modal.style.display = "none";
}
function cat_edit_form_modal(id, cat_name, cat_desc) {
	cat_form_modal.style.display = "block";

	window.localStorage.setItem('edit_id', id)
	document.getElementById('title').innerHTML = "Edit product details";
	title.style.color = "red"
	document.getElementById('cat_name').value = cat_name;
	document.getElementById('cat_desc').value = cat_desc;
	document.getElementById('create_cat').value = "Edit Category";
	document.getElementById('create_cat').setAttribute("onclick", `categories.edit_category('${id}')`)
}

function set_cart_total() {
	cart_items = window.localStorage.getItem('cart_total');
	console.log(cart_items)
	if (cart_items == null) {
		window.localStorage.setItem('cart_total', 0);
	}
	cart_span = document.getElementById('cart-span');
	cart_items = window.localStorage.getItem('cart_total');
	cart_span.innerHTML = cart_items
}


function display_error(data) {
	const error = document.getElementById("error")
	error.innerHTML = data
	error.style.display = "block"
}

function display_form_error(data) {
	const error = document.getElementById("error-form")
	error.innerHTML = data
	error.style.display = "block"
}