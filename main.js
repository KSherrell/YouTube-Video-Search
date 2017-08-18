$(document).ready(function () {

    $(".js-search-form").submit(function (event) {
        event.preventDefault();
        var searchTerm = $(".js-query").val();
        console.log(searchTerm);
        getVideos(searchTerm)
    })

    function getVideos(searchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                key: "AIzaSyCJn4EgqP8i7Gt5S8yV1QGRFfXt53khN8k",
                part: "snippet",
                maxResults: 10,
                q: searchTerm,
                type: "video"
            },
            function (cake) {
                console.log(cake);
                if (cake.pageInfo.totalResults == 0) {
                    alert("No videos found!")
                } else {
                    console.log(cake.items);
                    displayResults(cake.items)
                }
            }
        )
    }

    function displayResults(videoList) {

        $.each(videoList, function (key, value) {
            $(".js-search-results").append(`
                            <li>
                                <p>${value.snippet.title}</p>
                                <a href='https://www.youtube.com/watch?v=${value.id.videoID} target='blank'>
                                <img src='${value.snippet.thumbnails.medium.url}'/>
                                </a>
                            </li>
                        `)

        })
    }
})
