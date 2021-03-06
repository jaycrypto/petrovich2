const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
const categoryUrlRegex = /^[\w\.-]{1,40}$/;
/**
* Given a trimmed string, returns true if the string matches
* a proper email format.
*/
export function validateEmail(email) {
	return emailRegex.test(email);
}

export function validateCategoryUrl(url) {
	return categoryUrlRegex.test(url);
}
