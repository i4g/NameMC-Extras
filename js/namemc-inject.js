/* copyright 2022 | Faav#6320 | github.com/bribes */
function endsWithNumber(str) {
  return /[0-9]+$/.test(str);
}

if (endsWithNumber(location.pathname) && location.pathname) {
  const waitForUUID = function (callback) {
    if (document.querySelector('.order-lg-2')) {
      callback();
    } else {
      setTimeout(function () {
        waitForUUID(callback);
      }, 1);
    }
  };

  window.addEventListener("message", (json) => {
    if (json.origin !== 'https://gadgets.faav.top') return;
    if (typeof json.data.accountType !== 'undefined') {
      var creationDate = json.data.creationDate;
      var accountType = json.data.accountType;
      var tooltip = json.data.tooltip;
      acctype.innerHTML = accountType;
      $('#acctype').tooltip({"placement":"top","boundary":"viewport","title":tooltip});
      if (creationDate !== 'null') {
        cdate.innerHTML = `${new Date(creationDate).toLocaleDateString()} <i id="warningcd" class="fas fa-exclamation-circle"></i>`;
        $('#warningcd').tooltip({"placement":"top","boundary":"viewport","title":"Creation dates are inaccurate for a lot of accounts due to a breaking change on Mojang's end. We are currently fetching dates from Ashcon's API. Please yell at Mojang (WEB-3367) in order for accurate creation dates to return."});
      } else {
        cdate.innerHTML = 'Not Found!';
      }
    }
  });

  waitForUUID(async () => {
    var username = document.querySelector('.text-nowrap[translate=no]').innerText;
    var uuid = document.querySelector('.order-lg-2').innerText;
    var views = document.querySelector('.card-body > :nth-child(3)');

    views.outerHTML += `
  <div class="row no-gutters">
    <div class="col col-lg-4"><strong>Account Type</strong></div>
    <div id="acctype" class="col-auto">Loading... <i class="fal fa-spinner icon-spin"></i></div>
  </div>
  <div class="row no-gutters">
    <div class="col col-lg-4"><strong>Creation Date</strong></div>
    <div id="cdate" class="col-auto">Loading... <i class="fal fa-spinner icon-spin"></i></div>
  </div>
  <div class="row no-gutters">
    <div class="col order-lg-1 col-lg-4"><strong>Links</strong></div>
    <div class="col-12 order-lg-2 col-lg"><a href="https://mcuserna.me/${uuid}" target="_blank">mcuserna.me</a>, <a href="https://capes.me/${uuid}" target="_blank">capes.me</a>, <a href="https://laby.net/${uuid}" target="_blank">LABY.net</a>, <a href="https://livzmc.net/user/${uuid}" target="_blank">LivzMC</a></div>
  </div>
  `

    var gadgetIf = document.createElement('iframe');
    gadgetIf.src = `https://gadgets.faav.top/namemc-info/${uuid}?url=${location.href}`;
    gadgetIf.id = 'nmcIf';

    document.body.append(gadgetIf);
    
    // add legendarisk clown emoji and remove verification
    if (uuid == '55733f30-8907-4851-8af3-420f6f255856' || uuid == '0dd649c1-40c7-47f5-a839-0b98eaefedf2' || uuid == '70296d53-9fc3-4e53-97eb-269e97f14aad') {
      document.querySelector('h1 .emoji').src = 'https://s.namemc.com/img/emoji/twitter/1f921.svg';
      document.querySelectorAll('[title=Verified]').forEach(el => el.remove());
    }
  });
}
