let links = window.localStorage.links ? JSON.parse(window.localStorage.links) : [];
const params = new URLSearchParams(document.location.search);
const linkId = Number(params.get('id'));

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
}

let getById = (id) => {
    return links.find(link => link.id === id);
}
console.log(getById(linkId));

$(() => {
    $(document).on('click', '.save-link-button', function (e) {
        let linkId = getNextId();
        let linkItem = $('#save-link-address').val();
        let linkName = $('#save-link-title').val();
        let linkObj = {id: linkId, url: linkItem, name: linkName};
        links.push(linkObj);
        linksUpdated();
    });
});

