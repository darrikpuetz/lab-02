'use strict';

const photos = [];
const pageDataFiles = ['data/page-1.json', 'data/page-2.json'];

let templateRender;

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
  $('#list-container').append(templateRender(this));
};

function loadImages(jsonFile) {
  console.log('load images');
  $.get(jsonFile, data => {
    console.log('got data', data.length);
    photos.splice(0);
    console.log('photos len:', photos.length);
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
  if (keyword !== 'default') {
    filterByKeyword(keyword);
  }
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

function sortPhotos(sortComparison) {
  photos.sort(sortComparison);
}

function sortCards(sortComparison) {
  sortPhotos(sortComparison);
  renderPhotos();
}

function onSortChange(e) {
  let sortComparison;
  switch ($(e.target).attr('data-sort')) {
  case 'title':
    sortComparison = (a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
    break;
  case 'horns':
    sortComparison = (a, b) => a.horns - b.horns;
    break;
  }
  sortCards(sortComparison);
}

function intPagination() {
  $('.pageButtons').on('click', onPageChange);
}

function intSortButtons() {
  $('.sortButtons').on('click', onSortChange);
}

function initTemplateRender() {
  // 1. Get the template from the HTML document
  let template = $('#photo-template').html();

  // 2. Use Handlebars to "compile" the HTML
  templateRender = Handlebars.compile(template);
}

initTemplateRender();
loadImages(pageDataFiles[0]);
intPagination();
intSortButtons();
