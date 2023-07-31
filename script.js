const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
  return fruit.filter(f => f.toLowerCase().includes(str.toLowerCase()));
}

function sortResults(results, inputVal) {
  let startsWithArr = [];
  let substring = [];
  for (let fruit of results) {
    if (fruit.toLowerCase().startsWith(inputVal.toLowerCase())) {
      startsWithArr.push(fruit)
    } else {
      substring.push(fruit);
    }
  }
  return startsWithArr.concat(substring);
}

function searchHandler(e) {
  if (!e.target.value) {
    suggestions.innerHTML = '';
    return;
  }
  let results = search(e.target.value);
  let sortedResults = sortResults(results, e.target.value);
  showSuggestions(sortedResults, e.target.value);
}

function showSuggestions(results, inputVal) {
  let html = results.map(r => {
    let regex = new RegExp(inputVal, 'gi');
    let name = r.replace(regex, `<b>${inputVal}</b>`);

    let char = r.toLowerCase().startsWith(inputVal.toLowerCase())
        ? name.charAt(3).toUpperCase()
        : name.charAt(3)
    name = name.slice(0, 3) + char + name.slice(4).toLowerCase();

    return (`
      <li>
        <button>${name}</button>
      </li>
    `);
  });

  suggestions.innerHTML = html.length > 0
      ? html.join('')
      : `¯\\_(ツ)_/¯ no results found`
}

function useSuggestion(e) {
  if (e.target.tagName === 'BUTTON') {
    input.value = e.target.textContent;
    let results = search(e.target.textContent);
    showSuggestions(results, e.target.textContent);
  }
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);