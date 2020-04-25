

function watchSearchBox() {
    $('#search-box').click(event => {
    event.preventDefault();
    window.location.pathname = '/research/';
    });
}

function userInputHandler() {
    watchSearchBox()
}

$(userInputHandler)
