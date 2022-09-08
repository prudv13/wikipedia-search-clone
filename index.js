let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

let createAndAppendSearchResult = (result) => {

    let {title, link, description} = result;

    // Create Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    // Create Title Element
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    // Create Break Element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // Create URL Element
    let resultUrlEl = document.createElement("a");
    resultUrlEl.textContent = link;
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    resultUrlEl.classList.add("result-url");
    resultItemEl.appendChild(resultUrlEl);

    // Create Break Element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // Create Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);


    searchResultsEl.appendChild(resultItemEl);
}


let displayResults = (searchResults) => {
    spinner.classList.toggle("d-none");
    for(let result of searchResults){
        createAndAppendSearchResult(result);
    }
    
}

var searchWikipedia = (event) =>{

    if(event.key === "Enter"){

        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");

        let searchInputValue = searchInputEl.value;
        // to view the content typed in the search input
        console.log(searchInputValue);

        // adding input content to wikipedia search api
        let wikipediaURL = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;

        let options ={
            method: "GET"
        };

        fetch(wikipediaURL, options)
        .then(function(response){
            // json() parses the response as JSON
            return response.json();
        })
        .then(function(jsonData){
            console.log(jsonData); // to view the JSON data that is fetched in the console
            let {search_results} = jsonData; // destructuring jsonData to get search_results
            displayResults(search_results); // passing search_results as parameter to this function
        })
    }
}

searchInputEl.addEventListener('keydown', searchWikipedia);







// Wikipedia API
// "https://apis.ccbp.in/wiki-search?search=" + searchInputValue