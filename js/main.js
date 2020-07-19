'use strict';

(function () {
  var COORD_LEFT_PIN_MAIN;
  var COORD_TOP_PIN_MAIN;

  var mapPinMain = document.querySelector('.map__pin--main');

  COORD_LEFT_PIN_MAIN = mapPinMain.style.left;
  COORD_TOP_PIN_MAIN = mapPinMain.style.top;

  var arrayDataRenterList = [];

  var isActivation = false;

  // var mapPins = document.querySelector('.map__pins');

  var activationPage = function () {
    /* if (isActivation) {
      var childMapPins = mapPins.querySelector('.map__pin--child');
      while (childMapPins !== null) {
        mapPins.removeChild(childMapPins);
        childMapPins = mapPins.querySelector('.map__pin--child');
      }
    } */

    if (!isActivation) {
      window.backend.load(window.pin.createMapPins, window.pin.createMapPins);
    }

    isActivation = true;

  };

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form__address');

  var mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('ad-form--disabled');
  var selectMapFiltersForm = mapFiltersForm.querySelectorAll('select');

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMapSvg = mapPinMain.querySelector('.map__pin-svg');

  var preActivationForm = function () {
    fieldsetsAdForm.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });

    selectMapFiltersForm.forEach(function (select) {
      select.setAttribute('disabled', '');
    });

    var centerX = mapPinMapSvg.getAttribute('width') / 2;
    var centerY = mapPinMapSvg.getAttribute('height') / 2;

    adFormAddress.value = centerX + ', ' + centerY;

    mapPinMain.style.left = COORD_LEFT_PIN_MAIN;
    mapPinMain.style.top = COORD_TOP_PIN_MAIN;

    var adFormPrice = adForm.querySelector('.ad-form__price');
    adFormPrice.placeholder = 1000;
  };

  var enabledElementForm = function (evt) {
    if (evt.button === 0 || evt.keyCode === 13) {

      document.querySelector('.map').classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFiltersForm.classList.remove('ad-form--disabled');

      fieldsetsAdForm.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });

      selectMapFiltersForm.forEach(function (select) {
        select.removeAttribute('disabled');
      });
      activationPage();
    }
  };

  preActivationForm();

  mapPinMain.addEventListener('mousedown', enabledElementForm);

  mapPinMain.addEventListener('keydown', enabledElementForm);

  var setArrayDataRenterList = function () {
    return arrayDataRenterList;
  };

  var disableElementForm = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('ad-form--disabled');

    preActivationForm();

    window.pin.deleteMapPins();

    isActivation = false;
  };

  window.main = {
    arrayDataRenterList: arrayDataRenterList,
    setArrayDataRenterList: setArrayDataRenterList,
    preActivationForm: preActivationForm,
    disableElementForm: disableElementForm
  };

})();
