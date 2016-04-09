﻿// responsive-web-gen.jsx// 2016 Francisco Aguilera// License: none (public domain)// v1.0//// This script is for Photoshop CC 2015. It outputs images of the  // provided sizes from a source PSD.//// bring Photoshop into focus#target photoshopmain();function main() {  if(confirm('Generate web images for current document?')) {    reses = resPrompt();    if(reses) {      var startRulerUnits = app.preferences.rulerUnits;      var startTypeUnits = app.preferences.typeUnits;      app.preferences.rulerUnits = Units.PIXELS;      app.preferences.typeUnits = TypeUnits.PIXELS;            if (app.documents.length === 0) {        var file = File.openDialog('Select a document to generate from.');        if(file) {          app.open(file);        } else {          return;        }      }        for(var i = 0; i < reses.length; ++i) {        resize(reses[i]);      }        app.preferences.rulerUnits = startRulerUnits;      app.preferences.typeUnits = startTypeUnits;            alert('Done!');    }  }}function resPrompt() {  var reses = prompt(    'What resolution widths do you need?',    '5120, 4096, 3200, 2560, 1920, 1440, 1024, 768, 425, 375, 320'  );  if(reses) {    var resArray = reses.split(/[,\s]+/);    resArray.sort(function(a, b) {      return b - a;    });    return resArray;  }  return null;}function resize(newWidth) {  var oldDoc = app.activeDocument;  var newDoc = oldDoc.duplicate();    var oldWidth = parseInt(oldDoc.width.toString().replace(' px', ''));  var oldHeight = parseInt(oldDoc.height.toString().replace(' px', ''));    var newHeight = (oldHeight / oldWidth) * parseInt(newWidth);    if(oldWidth > newWidth) {    newDoc.resizeImage(newWidth + 'px', newHeight + 'px');  }    var options = new ExportOptionsSaveForWeb();  options.format = SaveDocumentType.PNG;  options.PNG8 = false;    var newName = oldDoc.name.replace('.psd', '') + '_' + newWidth + 'px.png';    newDoc.exportDocument(new File(oldDoc.path + '/' + newName), ExportType.SAVEFORWEB, options);  newDoc.close(SaveOptions.DONOTSAVECHANGES);}