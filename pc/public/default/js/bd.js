var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?534ba5549d70e863c9dfde2d6ddbf5d5";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

_hmt.push(['_requirePlugin', 'UrlChangeTracker', {
  shouldTrackUrlChange: function (newPath, oldPath) {
    return newPath && oldPath;
  }
}]);