$(document).ready(function () {

    $(".js-search-form").submit(function (event) {
        event.preventDefault();
        console.log(searchTerm);
        var searchTerm = $(".js-query").val();
        getVideos(searchTerm)
    })

    function getVideos(searchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                key: "AIzaSyCJn4EgqP8i7Gt5S8yV1QGRFfXt53khN8k",
                part: "snippet",
                maxResults: 12,
                q: searchTerm,
                type: "video"
            },
            function (cake) {
                console.log(cake);
                if (cake.pageInfo.totalResults == 0) {
                    alert("No videos found!")
                } else {
                    console.log(cake.items);
                    displayResults(cake.items, searchTerm)
                }
            }
        )
    }

    function displayResults(videoList, searchTerm) {
        $.each(videoList, function (key, value) {
            $(".js-search-results").append(`
                            <li>
                                <a href='https://www.youtube.com/watch?v=${value.id.videoID} target='blank'>
                                <img src='${value.snippet.thumbnails.medium.url}'/>
                                </a>
                                <p>${value.snippet.title}</p>
                            </li>
                        `)

        })
        $("h2").text(`So you like ${searchTerm}, eh? Well, here it is!`);
    }
})
