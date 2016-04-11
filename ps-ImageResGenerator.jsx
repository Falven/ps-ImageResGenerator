﻿// responsive-web-gen.jsx// 2016 Francisco Aguilera// License: none (public domain)// v1.0//// This script is for Photoshop CC 2015. It outputs images of the  // provided sizes from a source PSD.//// bring Photoshop into focus#target photoshopmain();function main() {  var docs = app.documents;  var openDocs = docs.length  if(openDocs > 0) {      var query = 'Generate web images for the following documents?\n';    for (var i = 0; i < openDocs; ++i) {      query += docs[i].name + '\n';    }          if(confirm(query)) {      reses = resPrompt();      if(reses) {        var startRulerUnits = app.preferences.rulerUnits;        var startTypeUnits = app.preferences.typeUnits;        app.preferences.rulerUnits = Units.PIXELS;        app.preferences.typeUnits = TypeUnits.PIXELS;              var resesLength = reses.length;        for (var i = 0; i < openDocs; ++i) {          var doc = docs[i];          for(var j = 0; j < resesLength; ++j) {            genWeb(doc, reses[j]);          }        }              app.preferences.rulerUnits = startRulerUnits;        app.preferences.typeUnits = startTypeUnits;                  alert('Generated ' + resesLength + ' PNGs for '        + openDocs + ' documents totalling '        + resesLength * openDocs + ' images!');      }    }  }}function resPrompt() {  var reses = prompt(    'What resolution widths do you need?',    '5120, 4096, 3200, 2560, 1920, 1440, 1024, 768, 425, 375, 320'  );  if(reses) {    var resArray = reses.split(/[,\s]+/);    resArray.sort(function(a, b) {      return b - a;    });    return resArray;  }  return null;}function genWeb(doc, newWidth) {  var oldDoc = doc;  app.activeDocument = oldDoc;  var newDoc = oldDoc.duplicate();  app.activeDocument = newDoc;    var oldWidth = parseInt(oldDoc.width.toString().replace(' px', ''));  var oldHeight = parseInt(oldDoc.height.toString().replace(' px', ''));    var newHeight = (oldHeight / oldWidth) * parseInt(newWidth);  if(oldWidth > newWidth) {    newDoc.resizeImage(newWidth + 'px', newHeight + 'px');  }    var options = new ExportOptionsSaveForWeb();  options.interlaced = false;  options.format = SaveDocumentType.JPEG;  options.includeProfile = false;  options.optimized = true;  options.quality = 100;  options.transparency = true;    var newName = oldDoc.name.replace('.psd', '') + '_' + newWidth + 'px.jpg';    newDoc.exportDocument(new File(oldDoc.path + '/' + newName), ExportType.SAVEFORWEB, options);  newDoc.close(SaveOptions.DONOTSAVECHANGES);}