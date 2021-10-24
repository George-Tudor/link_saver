let links;
if(window.localStorage.links) {
    links = JSON.parse(window.localStorage.links);
} else {
    links = [
        {id: 1, url: 'https://css-tricks.com/almanac/properties/a/align-self/', name: 'align-self | CSS-Tricks'},
        {id: 2, url: 'https://www.rdegges.com/2012/how-to-have-fun-programming/', name: 'Randall Degges - How to Have Fun Programming'},
        // {id: 3, url: 'https://flukeout.github.io/CSS', name: 'Diner - Where we feast on CSS Selectors!'},
        {id: 4, url: 'https://threejs-journey.xyz/Three.js', name: 'Journey — Learn WebGL with Three.js'},
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

const renderLinks = async () => {
    let html = '';
        for(let i = 0; i < links.length; i++) {
            html+= await createCard(links[i])
        }
    $('#links').html(html);

    function createCard(linkItem) {
        let getLinkInfo = `http://api.linkpreview.net/?key=${linkPreviewKey}&q=${linkItem.url}`;
        return fetch(getLinkInfo)
            .then(res => res.json())
            .then(result => {
                console.log(JSON.stringify(result, null, 4));
                if (result.image) {
                    linkItem.image = result.image
                } else {
                    linkItem.image = "../img/missing-image.jpg";
                }
                linkItem.description = result.description;
                return render(linkItem);
            })
            .catch(error => console.error(error));
    }

    function render(linkItem) {
        return `
            <div class="link-card card m-1 p-2" data-id="${linkItem.id}" style="width: 18rem">
                <div>
                    <img src="${linkItem.image}"  alt="image" class="d-block">
                    <a class="d-block" href=${linkItem.url} target="_blank">${linkItem.name}</a>
                    <p class="item-description">${linkItem.description}</p>
                    <a href="link.html?id=${linkItem.id}" class="btn btn-sm btn-link text-danger">Edit</a>
                    <button type="button" class="delete-link-button btn btn-sm btn-link text-danger">&times;</button>
                </div>
            </div>`;
    }
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

    $('.import-bookmarks').on('click', (e) => {
        $('#file-input').trigger('click');
     });
});
