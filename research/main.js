const newsAPI = {
    headers: new Headers({
            'x-api-key':'0082a91c41964bc5a5c3a471968014f3'
        })};

function formatNewsQuery(search) {
    $('#re-search-box').val('');
    searchFirstWord = search.split(',');
    searchFirstWord = search[0];
    search = search.split(',').join('-');
    let URL = `https://newsapi.org/v2/everything?q=${search}&qInTitle=${searchFirstWord}&language=en&sortby=publishedAt&pageSize=5`
    getNews(URL,newsAPI);
}

function getNews(url, options) {
    fetch(url,options)
    .then(response => {if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}).then(responseJson => displayNews(responseJson))
    .catch(err => {
    $('#js-error-message-news').text(`Something went wrong: ${err.message}`);
})
}

function displayNews(responseJson) {
    $('#js-news-list').empty();
    $('#js-error-message-news').html(`<h3>Latest news</h3>`)
    for (let i = 0; i < responseJson['articles'].length; i++)
    $('#js-news-list').append(`<li><h5>${responseJson.articles[i].title}</h5>
    <p>${responseJson.articles[i].description}</p>
    <a target='_blank' href='${responseJson.articles[i].url}'>Click here for full article!</a></li>`);
}

/*This section is to find the stock info of your search, if applicable.

It utilizes the stockObj suggestions so that if someone searches for a company from the object
then it will find it, as these may not be stock symbols.*/

function formatStockQuery(symbol) {
    symbol = symbol.toUpperCase().split(',');
    symbol = symbol[0];
    if (stockObj.BIOPHARM[symbol] !== undefined) {
        symbol = stockObj.BIOPHARM[symbol];
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }

    if (stockObj.TECH[symbol] !== undefined) {
        symbol = stockObj.TECH[symbol];
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }

    if (stockObj.HEALTHCARE[symbol] !== undefined) {
        symbol = stockObj.HEALTHCARE[symbol];
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }

    if (stockObj.INDUSTRIAL[symbol] !== undefined) {
        symbol = stockObj.INDUSTRIAL[symbol];
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }

    if (stockObj.EDUCATION[symbol] !== undefined) {
        symbol = stockObj.EDUCATION[symbol];
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }

    else {
        let URL = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?types=quote,chart&format=json&token=pk_6fb83c4e188642e8902303f68dce3c6d`;
        getStock(URL);
    }
}

function getStock(url) {
    fetch(url)
    .then(response => {
        if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
    }).then(responseJson => displayStock(responseJson))
    .catch(err => {
        $('#js-message-error-stock').text(`No stock found. Something went wrong: ${err.message}`)
    })
}

function displayStock(responseJson) {
    $('#js-stock-ul').empty();
    $('#js-stock-header').html("<h3>Is this a stock you're looking for?</h3>")
    $('#js-message-error-stock').html('<a href="https://iexcloud.io">Data provided by IEX Cloud</a>')
    $('#js-suggestions').toggleClass('hidden');
    $('#response-stock-ul'). html(`<li>${responseJson.symbol} - ${responseJson.companyName}</li>
    <li>Exchange: ${responseJson.primaryExchange}
    <li>Last Price: &emsp;&emsp;$${responseJson.latestPrice}</li>
    <li>Previous Close: &ensp;$${responseJson.previousClose}
    <li><a href="https://iexcloud.io">IEX Cloud</a></li>`)
}

//HackerNews API format URL and fetch

function formatHackerQuery(search) {
    let URL = `https://hn.algolia.com/api/v1/search?query=${search}`
    getHacker(URL);
}

function getHacker(url) {
    fetch(url)
    .then(response => {if (response.ok) {
        return response.json();
    }
        throw new Error(response.statusText);
    }).then(responseJson => displayHacker(responseJson))
    .catch(err => {
        $('#js-message-error-hacker').text(`Search was unsuccessful: ${err.message}`)
    })}

function displayHacker(responseJson) {
    console.log(responseJson)
    $('#hacker-response-list').empty();
    $('#js-message-error-hacker').html(`<h3>HackerNews Latest</h3>`);
    for(let i = 0; i < 20; i++) {
        if (responseJson.hits[i].title !== null && 
            responseJson.hits[i].title !== undefined &&
            responseJson.hits[i].title !== '') {
    $('#hacker-response-list').append(`<li>
    <a target='_blank' href='${responseJson.hits[i].url}'>
    ${responseJson.hits[i].title}</a></li>`)
        }
    }
}

//The commented out function call below is one to be implemented in future versions.

function getResults(searchParam) {
    formatNewsQuery(searchParam);
    formatStockQuery(searchParam);
    formatHackerQuery(searchParam);
   /* formatCommunityQuery(searchParam);*/
}

function watchInputBox() {
    $('#input-box').submit(event => {
    event.preventDefault();
    let userSearch = $('#re-search-box').val().split(' ').join(',');
    $('#search-item').html(`search results for: ${userSearch.split(',').join(' ')}`)
    getResults(userSearch);
    });
}

function suggestFunc() {
    let randInt=Math.floor(Math.random()*10);
$('#response-stock-ul').append(`<ul id='js-suggestions' class='hidden'><li><h4>Biopharmaceuticals</h4>
${stockObj.BIOPHARM[Object.keys(stockObj.BIOPHARM)[randInt]]}</li>
<li><h4>Technology</h4>
${stockObj.TECH[Object.keys(stockObj.TECH)[randInt]]}</li>
<li><h4>Healthcare</h4>
${stockObj.HEALTHCARE[Object.keys(stockObj.HEALTHCARE)[randInt]]}</li>
<li><h4>Idustrial</h4>
${stockObj.INDUSTRIAL[Object.keys(stockObj.INDUSTRIAL)[randInt]]}</li>
<li><h4>Education</h4>
${stockObj.EDUCATION[Object.keys(stockObj.EDUCATION)[randInt]]}</li>
</ul>`);
$('#js-suggestions').toggleClass('hidden')
}

function topHeadlines() {
    let URL = `https://newsapi.org/v2/top-headlines?language=en&q=tech&pageSize=5`;
    getHeadlines(URL,newsAPI);
}

function getHeadlines(url, options) {
    fetch(url,options)
    .then(response => {if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}).then(responseJson => displayHeadlines(responseJson))
    .catch(err => {
    $('#js-error-message-news').text(`Something went wrong: ${err.message}`);
})
}

function displayHeadlines(responseJson) {
    $('#js-error-message-news').html(`<h3>Latest news</h3>`);
    for (let i = 0; i < responseJson['articles'].length; i++) {
    $('#js-news-list').append(`<li><h5>${responseJson.articles[i].title}</h5>
    <p>${responseJson.articles[i].description}</p>
    <a target='_blank' href='${responseJson.articles[i].url}'>Click here for full article!</a></li>`);
}
}

function hackerLatest() {
    let URL = `https://hn.algolia.com/api/v1/search?query=tech-stocks`
    getHackerLatest(URL);
}
function getHackerLatest(url) {
fetch(url)
.then(response => {if (response.ok) {
    return response.json();
}
    throw new Error(response.statusText);
}).then(responseJson => displayHackerLatest(responseJson))
.catch(err => {
    $('#js-message-error-hacker').text(`Search was unsuccessful: ${err.message}`)
})}

function displayHackerLatest(responseJson) {
    $('#js-message-error-hacker').html(`<h3>HackerNews Latest</h3>`);
    for(let i = 0; i < 20; i++) {
        if (responseJson.hits[i].title !== null){
    $('#hacker-response-list').append(`<li>
    <a target='_blank' href='${responseJson.hits[i].url}'>
    ${responseJson.hits[i].title}</a></li>`)
        }
    }
}

function handleEvents(){
    watchInputBox()
    suggestFunc()
    topHeadlines()
    hackerLatest()
}

$(handleEvents)