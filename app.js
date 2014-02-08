console.log(PSD);

function main() {
  hideLoading();

  PSD.Actions.visible = false;
  PSD["Actions Shadow"].visible = false;

  PSD.Buttons.visible = false;
  PSD["Button 1"].visible = false;
  PSD["Button 2"].visible = false;
  PSD["Button 3"].visible = false;
  PSD["Button 4"].visible = false;
  PSD["Button 13"].visible = false;
  PSD["Button 16"].visible = false;

  PSD["Button 13"].on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    showActions();
  });

  var longTapTimer = null;
  var touching = false;

  PSD["BG"].on('touchstart', function (e) {
    touching = true;

    if (PSD.Buttons.visible) {
      main();
    } else {
      longTapTimer = setTimeout(function () {
        if (touching) {
          showButtons();
        }
      }, 500);
    }
  });

  PSD["BG"].on('touchend', function (e) {
    touching = false;

    if (!PSD.Buttons.visible) {
      clearTimeout(longTapTimer);
      longTapTimer = null;
    }
  });

  PSD.ShareButton.on('click', function (e) {
    showLoading();
  });

  PSD.CancelButton.on('click', function (e) {
    hideLoading();
  });

  PSD.CancelActions.on('click', function (e) {
    hideActions();
  });
}

function showButtons() {
  PSD.Buttons.visible = true;
  PSD["Button 1"].visible = true;
  PSD["Button 2"].visible = true;
  PSD["Button 3"].visible = true;
  PSD["Button 4"].visible = true;
  PSD["Button 13"].visible = true;
  PSD["Button 16"].visible = true;
}

function showLoading() {
  PSD.Hands.visible = true;
  PSD.CancelButton.visible = true;
  PSD.Progress.visible = true;
  PSD.Overlay.visible = true;

  PSD.Actions.visible = false;
  PSD["Actions Shadow"].visible = false;
}

function hideLoading() {
  PSD.Hands.visible = false;
  PSD.CancelButton.visible = false;
  PSD.Progress.visible = false;
  PSD.Overlay.visible = false;

  showActions();
}

function hideActions() {
  PSD.Actions.visible = false;
  PSD["Actions Shadow"].visible = false;
}

function showActions() {
  PSD.Actions.visible = true;
  PSD["Actions Shadow"].visible = true;
}

main();
