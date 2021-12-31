const firebase = 'https://movies-30d6e-default-rtdb.firebaseio.com/';

let links = [];
let keys = [];

const getLinks = () => fetch(firebase + 'link.json')
    .then(res => res.json())
    .then(result => {
        let linkArray = Object.entries(result)
        console.log(linkArray)
        let [l, k] = parseLinks(linkArray);
        links = l;
        keys = k;
        console.log(keys)
        console.log(links)
    })

const renderLinks = async () => {
    await getLinks();
    let html = '';
        for(let i = 0; i < links.length; i++) {
            if(links[i].image !== undefined) {
                html += render(links[i])
            } else {
                html+= await createCard(links[i], i)
            }
        }
    $('#links').html(html);

    async function createCard(linkItem, index) {
        let getLinkInfo = `http://api.linkpreview.net/?key=${linkPreviewKey}&q=${linkItem.url}`;
        return fetch(getLinkInfo)
            .then(res => res.json())
            .then(async result => {

                console.log(JSON.stringify(result, null, 4));
                if (result.image) {
                    linkItem.image = result.image
                } else {
                    linkItem.image = "../img/missing-image.jpg";
                }
                linkItem.description = result.description;
                await fetch(firebase + 'link/' + keys[index] + '.json', {
                    method: 'PATCH',
                    body: JSON.stringify(linkItem)
                })


                return render(linkItem);
            })
            .catch(error => console.error(error));
    }

    //
    // loop through firebase keys
    // create variable for link data
    // fetch link data from linkpreview api and store in variables
    // for each key, make patch request to firebase url + current key



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

async function handlePost(linkItem) {
    let getLinkInfo = `http://api.linkpreview.net/?key=${linkPreviewKey}&q=${linkItem.url}`;
    fetch(getLinkInfo)
        .then(res => res.json())
        .then(result => {
            fetch(firebase + 'link/')
        })
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

    renderLinks();
}

function parseLinks(linkData) {
    let parsedLinks = [];
    let parsedKeys = [];
    linkData.forEach(([key, link]) => {
        parsedKeys.push(key);
        parsedLinks.push(link);
    })
    return [parsedLinks, parsedKeys];
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

    $(document).on('change', '#file-input', e => {

    })

});
