let links;
if(window.localStorage.links) {
    links = JSON.parse(window.localStorage.links);
} else {
    links = [
        {id: 1, url: 'https://css-tricks.com/almanac/properties/a/align-self/', name: 'align-self | CSS-Tricks'},
        {id: 2, url: 'https://www.rdegges.com/2012/how-to-have-fun-programming/', name: 'Randall Degges - How to Have Fun Programming'},
        //{id: 3, url: 'https://flukeout.github.io/CSS', name: 'Diner - Where we feast on CSS Selectors!'},
        //{id: 4, url: 'https://threejs-journey.xyz/Three.js', name: 'Journey — Learn WebGL with Three.js'},
        {id: 5, url: 'https://pcaro.es/p/hermit/', name: 'Pablo Caro - Hermit: a font for programmers, by a programmer'},
        {id: 6, url: 'https://mdbootstrap.com/docs/b4/jquery/components/tabs/', name: 'Bootstrap 4 Tabs - examples &amp; tutorial. Basic &amp; advanced usage - Material Design for Bootstrap'},
        {id: 7, url: 'https://codeburst.io/javascript-what-is-short-circuit-evaluation-ff22b2f5608c', name: ' JavaScript: What is short-circuit evaluation? | by Brandon Morelli | codeburst'},
        {id: 8, url: 'https://www.spillover.com/', name: 'Spillover | Restaurant Digital Software'},
        {id: 9, url: 'https://www.eatthis.com/best-healthy-cooking-hacks/', name: '21 Best Healthy Cooking Hacks of All Time | Eat This Not That'},
        {id: 10, url: 'https://www.githubstatus.com/', name: ' GitHub Status'},
        {id: 11, url: 'https://regex101.com/', name: 'regex101: build, test, and debug regex'},
        {id: 25, url:  'https://oscarotero.com/jquery/', name: 'jQuery Cheat Sheet'}
    ];
}

const renderLinks = () => {
    let html = '';
    links.forEach(link => {
        let getLinkInfo = `http://api.linkpreview.net/?key=${linkPreviewKey}&q=${link.url}`;
        fetch(getLinkInfo)

            .then(res => res.json())
            .then(link => {
                html += `
                        <div class="link-card card m-1 p-2" data-id="${link.id}" style="width: 18rem">
                            <div class="d-flex">
                                <img src="${link.image}" alt="image">
                                <a class="flex-grow-1" href=${link.url} target="_blank">${link.name}</a>
                                <a href="link.html?id=${link.id}" class="btn btn-sm btn-link text-danger">Edit</a>
                                <button type="button" class="delete-link-button btn btn-sm btn-link text-danger">&times;</button>
                            </div>
                        </div>
        `;
            });
    })
        .catch(error => console.error(error));
    $('#links').html(html);
}
let getNextId = () => {
    let maxId = 0;
    links.forEach(link => {
       if(link.id > maxId) {
           maxId = link.id;
       }
    });
    return maxId + 1;
}

let linksUpdated = () => {
    window.localStorage.links = JSON.stringify(links);
    renderLinks();
}

$(() => {
    renderLinks();
    $(document).on('click', '.add-link-button', function (e) {
        let linkId = getNextId();
        let linkItem = $('#add-link-address').val();
        let linkName = $('#add-link-title').val();
        let linkObj = {id: linkId, url: linkItem, name: linkName};
        links.push(linkObj);
        linksUpdated();
    });

    $(document).on('click', '.delete-link-button', (e) => {
        let deleteLinkId = $(e.target).closest('.link-card').data('id');
        links = links.filter(link => link.id !== deleteLinkId);
        linksUpdated();
    });
});
