'use strict';

let photos = [];
const pageDataFiles = ['data/page-1.json', 'data/page-2.json'];

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
  $('#list-container').append($newSection);
};

function loadImages(jsonFile) {
  console.log('load images');
  $.get(jsonFile, data => {
    console.log('got data', data.length);
    photos = [];
    data.forEach(photo => {
      new Photo(photo);
    });
    populateKeywords();
    renderPhotos();
  });
}

function renderPhotos() {
  console.log('render photos', photos);
  $('#list-container').empty();
  photos.forEach(photo => {
    photo.render();
  });
}

function filterByKeyword(keyword) {
  console.log(keyword);
  const $selected = $(`#list-container>section[data-keyword="${keyword}"]`);
  const $notSelected = $(`#list-container>section[data-keyword!="${keyword}"]`);
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
  $select.empty();
  // recreating the default option text
  const $option = $('<option></option>');
  $option.attr('value', 'default');
  $option.text('Filter by Keyword');
  $select.append($option);

  keywords.forEach(keyword => {
    const $option = $('<option></option>');
    $option.attr('value', keyword);
    $option.text(keyword);
    $select.append($option);
  });
  $select.on('change', onSelectionChange);
}

function onPageChange(e) {
  const i = $(e.target).attr('data-page');
  const jsonFile = pageDataFiles[i];
  console.log(jsonFile);
  loadImages(jsonFile);
}

function intPagination() {
  $('.pageButtons').on('click', onPageChange);
}


loadImages(pageDataFiles[0]);
intPagination();
