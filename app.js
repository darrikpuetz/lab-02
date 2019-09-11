'use strict';

const photos = [];

function Photo(photo) {
    this.image_url = photo.image_url;
    this.title = photo.title;
    this.description = photo.description;
    this.keyword = photo.keyword;
    this.horns = photo.horns;
    photos.push(this);
    console.log('photo contructor', this);
}

Photo.prototype.render = function() {
    const templateHtml = $('#photo-template').html();
    console.log('template', templateHtml);
    const $newSection = $('<section></section>');
    $newSection.html(templateHtml);
    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('.description').text(this.description);
    $newSection.find('.keyword').text(this.keyword);
    $newSection.find('.horns').text(this.horns);
    $('main').append($newSection);
}

function loadImages() {
    console.log('load images');
    $.get('assets/page-1.json', data => {
        console.log('got data', data);
        data.forEach(photo => {
            new Photo(photo);
        });
        renderPhotos();
    });
}

function renderPhotos() {
    console.log('render photos', photos);
    photos.forEach(photo => {
        photo.render();
    });
}

loadImages();