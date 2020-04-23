

function watchSearchBox() {
    $('#search-box').click(event => {
    event.preventDefault();
    window.location.pathname = 'C:/Users/skdod/Pro/TechCrowdBacking/research/';
    });
}

function userInputHandler() {
    watchSearchBox()
}

$(userInputHandler)
