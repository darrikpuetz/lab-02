'use strict';

const photos = [];

function Photo(photo) {
  this.image_url = photo.image_url;
  this.title = photo.title;
  this.description = photo.description;
  this.keyword = photo.keyword;
  this.horns = photo.horns;
  photos.push(this);
  console.log('photo constructor', this);
}

Photo.prototype.render = function() {
  const templateHtml = $('#photo-template').html();
  console.log('template', templateHtml);
  const $newSection = $('<section></section>');

  $newSection.attr('data-keyword', this.keyword);
  $newSection.html(templateHtml);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('.description').text(this.description);
  $newSection.find('.keyword').text(this.keyword);
  $newSection.find('.horns').text(this.horns);
  $('main').append($newSection);
};

function loadImages() {
  console.log('load images');
  $.get('assets/page-1.json', data => {
    console.log('got data', data);
    data.forEach(photo => {
      new Photo(photo);
    });
    populateKeywords();
    renderPhotos();
  });
}

function renderPhotos() {
  console.log('render photos', photos);
  photos.forEach(photo => {
    photo.render();
  });
}

function filterByKeyword(keyword) {
  console.log(keyword);
  const $selected = $(`main>section[data-keyword="${keyword}"]`);
  const $notSelected = $(`main>section[data-keyword!="${keyword}"]`);
  console.log('selected: ', $selected);
  console.log('not selected: ', $notSelected);

  $selected.removeClass('hidden');
  $notSelected.addClass('hidden');
}

function onSelectionChange(e) {
  const keyword = e.target.value;
  filterByKeyword(keyword);
}

function populateKeywords() {
  // create a de-duped keyword list
  const keywords = [];
  photos.forEach(photo => {
    if (!keywords.includes(photo.keyword)) {
      keywords.push(photo.keyword);
    }
  });

  // for each keyword append and option element to the select element
  const $select = $('#keyword-select');
  keywords.forEach(keyword => {
    const $option = $('<option></option>');
    $option.attr('value', keyword);
    $option.text(keyword);
    $select.append($option);
  });
  $select.on('change', onSelectionChange);
}

loadImages();
