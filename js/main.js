const links = [
    {id: 1, url: 'https://css-tricks.com/almanac/properties/a/align-self/', name: 'align-self | CSS-Tricks'},
    {id: 2, url: 'https://www.rdegges.com/2012/how-to-have-fun-programming/', name: 'Randall Degges - How to Have Fun Programming'},
    {id: 3, url: 'https://flukeout.github.io/CSS', name: 'Diner - Where we feast on CSS Selectors!'},
    {id: 4, url: 'https://threejs-journey.xyz/Three.js', name: 'Journey — Learn WebGL with Three.js'},
    {id: 5, url: 'https://pcaro.es/p/hermit/', name: 'Pablo Caro - Hermit: a font for programmers, by a programmer'},
    {id: 6, url: 'https://mdbootstrap.com/docs/b4/jquery/components/tabs/', name: 'Bootstrap 4 Tabs - examples &amp; tutorial. Basic &amp; advanced usage - Material Design for Bootstrap'},
    {id: 7, url: 'https://codeburst.io/javascript-what-is-short-circuit-evaluation-ff22b2f5608c', name: ' JavaScript: What is short-circuit evaluation? | by Brandon Morelli | codeburst'},
    {id: 8, url: 'https://www.spillover.com/', name: 'Spillover | Restaurant Digital Software'},
    {id: 9, url: 'https://www.eatthis.com/best-healthy-cooking-hacks/', name: '21 Best Healthy Cooking Hacks of All Time | Eat This Not That'},
    {id: 10, url: 'https://www.githubstatus.com/', name: ' GitHub Status'},
    {id: 11, url: 'https://regex101.com/', name: 'regex101: build, test, and debug regex'},
    {id: 12, url:  'https://oscarotero.com/jquery/', name: 'jQuery Cheat Sheet'}
];

const renderLinks = () => {
    let html = '';
    links.forEach(link => {
        html += `
                    <div class="link-card p-2">
                        <div class="card mb-1 p-2" data-id="${link.id}" style="width: 18rem">
                            <a href=${link.url}>${link.name}</a>
<!--                            <button type="button" class="add-items-button">Add to Order</button>-->
                        </div>
                    </div>
               `;

    });
    $('#links').html(html);
}

$(() => {
    renderLinks();
    $('#add-link-button').on('click', function (e) {
        e.preventDefault();
        let linkId = $(this).closest('.card').data('id');
        let linkItem = JSON.parse(JSON.stringify(links.find(link => link.id === linkId)));
        links.push(linkItem);
        console.log(linkItem);
        renderLinks();

    });
});
// $("#submitMovie").on('click', function (e) {
//     e.preventDefault();
//     let currentMovie = $("#addMovie").val();
//     let currentRating = $("#rating").val();
//     let movieObj = {title: currentMovie, rating: currentRating};
//     addMovies(movieObj);
//     $('#movies').append(`<div class="card mb-1 p-2" style="width: 24rem">
//                     <h3>${currentMovie}</h3>
//                     <h4>Rating: ${currentRating}</h4>
//                     <button class="delMovie btn btn-outline-danger btn-sm">Delete</button></div>
//                     `);
// });