// MySite — 极简交互层
// 1) 仅在允许动效时启用入场动画；2) 页脚年份。
// 脚本失效时页面内容依然完整可见（样式默认 opacity: 1）。
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');

    var targets = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

    // 兜底：若观察器未触发（例如打印或异常），2 秒后全部显示
    window.setTimeout(function () {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
    }, 2000);
  }

  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
