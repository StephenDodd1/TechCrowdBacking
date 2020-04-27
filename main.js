

function watchSearchBox() {
    $('#search-box').click(event => {
    event.preventDefault();
    window.location.pathname = '/TechCrowdBacking/research/';
    });
}

function userInputHandler() {
    watchSearchBox()
}

$(userInputHandler)
