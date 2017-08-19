"use strict";

$(document).ready(function () {

    $(".js-search-form").submit(function (event) {
        event.preventDefault();
        var searchTerm = $(".js-query").val();
        console.log(searchTerm);
        getVideos(searchTerm);
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

        var htmlOutput = "";
        $.each(videoList, function (key, value) {

            htmlOutput += `
                            <li>
                                <a href='https://www.youtube.com/watch?v=${value.id.videoID} target='blank'>
                                <img src='${value.snippet.thumbnails.medium.url}'/>
                                </a>
                                <p>${value.snippet.title}</p>
                            </li>
                        `;

        });
        $(".js-search-results ul").html(htmlOutput);
        $("h2").text(`So you like ${searchTerm}, eh? Well, look what we have here!`);
    }
})
