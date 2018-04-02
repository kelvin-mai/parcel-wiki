const API =
	'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
const PAGE = 'https://en.wikipedia.org/?curid=';

const search = term => {
	fetchJsonp(`${API}&gsrsearch=${term}`)
		.then(res => res.json())
		.then(data => displaySearch(data.query.pages))
		.catch(err => console.log(err));
};

const displaySearch = obj => {
	document.getElementById('results').innerHTML = '';
	for (i in obj) {
		displayResult(obj[i]);
	}
};

const displayResult = obj => {
	document.getElementById('results').innerHTML += `
		<li>
			<div>
				<h3>${obj.title}</h3>
				<p>${obj.extract}</p>
				<a href='${PAGE}${obj.pageid}'>Read More</a>
			</div>
		</li>
	`;
};

(global => {
	document.getElementById('form').addEventListener('submit', e => {
		e.preventDefault();
		search(e.target[0].value);
	});
})(window);
