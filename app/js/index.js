document.addEventListener("DOMContentLoaded", function(e) {

  var links = document.getElementsByClassName('link');

  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
      e.preventDefault();
      var href = this.getAttribute('href') || this.getAttribute('to');

      getContent(href, true);
    }
  }
});

window.addEventListener("popstate", function(e) {
    getContent(location.pathname, false);
});

function getContent(url, addEntry) {
  var test = callAjax(url, function(data) {
    return data;
  })

  var promise = new Promise(function(resolve, reject) {
    callAjax(url, function(result) {

      resolve(result);
    })
  }).then(function(data) {

    var container = document.getElementById('contentContainer');

    container.innerHTML = data;

    if (addEntry == true) {
      history.pushState(null, null, url);
    }
  })
}

function callAjax(url, callback){
  var xmlhttp;

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
