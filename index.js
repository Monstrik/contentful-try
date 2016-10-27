



var contentfulClient = contentful.createClient({
    accessToken: '82df3471a6036d71aa1cd0630fbd908365e7a74f0a21dbb0376837509a80a26f',
    space: '17o6z96yhcsx'
});

var PRODUCT_CONTENT_TYPE_ID = '1kUEViTN4EmGiEaaeC6ouY';

var content = document.getElementById('content');
var cats = document.getElementById('cats');
var title = document.getElementById('title');
var mark = document.getElementById('marked');


function render() {
    
    title.innerHTML = 'Content hello';
    renderCategories();
    renderContent();
    mark.innerHTML = marked('# Marked in browser\n\nRendered by **marked**.');
}

render();



function renderCategories() {
    contentfulClient.getEntries({
        content_type: "5KMiN6YPvi42icqAUQMCQe"
    })
    .then(function (entries) {
        cats.innerHTML = '<ul>' +
                entries.items.map(renderSingleCat).join('\n') +
            '</ul>';
    });
}

function renderContent() {
    contentfulClient.getEntries({
        content_type: PRODUCT_CONTENT_TYPE_ID
    })
     .then(function (entries) {
         //container.innerHTML = renderProducts(entries.items)
         content.innerHTML = renderItems(entries.items);
     });

}

function renderSingleCat(item) {
    return '<li>' + item.fields.title + '</li>';
}

function renderItems(items) {
    return '<div class="products">' +
        items.map(renderSingleItem).join('\n') +
        '</div>';
}






function renderProducts(products) {
    return '<h1>Products hello</h1>' +
        '<div class="products">' +
        products.map(renderSingleProduct).join('\n') +
        '</div>';
}

function renderSingleItem(item) {
    var fields = item.fields;
    console.log(fields);
    return '<div class="product-in-list">' +
        //'<div class="product-image">' +
        //renderImage(fields.image[0], fields.slug) +
        //'</div>' +
        '<div class="product-details">' +
        renderItemDetails(fields) +
        '</div>' +
        '</div>' +
    '<hr>';
}


function renderSingleProduct(product) {
    var fields = product.fields
    console.log(fields)
    return '<div class="product-in-list">' +
      '<div class="product-image">' +
      renderImage(fields.image[0], fields.slug) +
      '</div>' +
      '<div class="product-details">' +
      renderProductDetails(fields) +
      '</div>' +
      '</div>'
}


function renderItemDetails(fields) {
    //renderItemHeader(fields) + 
    return '<h2>' +
        marked(fields.name) +
        '</h2>' +
        '<p> ' +
        fields.biography +
        '</p>';
}



function renderProductDetails(fields) {
    return renderProductHeader(fields) +
      '<p class="product-categories">' +
      fields.categories.map(function (category) {
          return category.fields.title
      }).join(', ') +
      '</p>' +
      '<p>' + marked(fields.productDescription) + '</p>' +
      '<p>' + fields.price + ' &euro;</p>' +
      '<p class="product-tags"><span>Tags:</span> ' + fields.tags.join(', ') + '</p>'
}

function renderProductHeader(fields) {
    return '<div class="product-header">' +
      '<h2>' +
      '<a href="product/' + fields.slug + '">' +
      fields.productName +
      '</a>' +
      '</h2>' +
      ' by ' +
      '<a href="brand/' + fields.brand.sys.id + '">' + fields.brand.fields.companyName + '</a>' +
      '</div>'
}

function renderImage(image, slug) {
    if (image && image.fields.file) {
        return '<a href="product/' + slug + '">' +
          '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
          '</a>'
    } else {
        return ''
    }
}
