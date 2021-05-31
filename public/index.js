//----------------------------------
let championContainer = document.querySelector(".champion-list .row");
let addPanel = new bootstrap.Offcanvas(
  document.querySelector("#offcanvasRight")
);
let btnOpenAddPanel = document.querySelector(".btn-add");
let btnRecache = document.querySelector(".btn-recache");
let loading = document.querySelector(".loading");

let inputChampionName = document.querySelector("#champion-name");
let inputChampionTitle = document.querySelector("#champion-title");
let inputChampionHp = document.querySelector("#champion-hp");
let inputChampionMp = document.querySelector("#champion-mp");
let inputChampionAd = document.querySelector("#champion-ad");
let inputChampionAs = document.querySelector("#champion-as");
let inputChampionImg = document.querySelector("#champion-img");

let btnSaveAddChampion = document.querySelector(".btn-save-add");

// Loading hander

let loadingToggle = () => {
  loading.classList.toggle("active");

  setTimeout(() => {
    loading.classList.remove("active");
  }, 2000);
};

// Cache data to localStorage
let cacheData = (data) => {
  localStorage.removeItem("champions");
  localStorage.setItem("champions", JSON.stringify(data));
};

// Cache data for first time
if (!localStorage.getItem("champions")) {
  cacheData(champions);
}

// Get data from localStorage
let getAllData = () => {
  return JSON.parse(localStorage.getItem("champions"));
};

// Render data

let renderData = (data, containerEL) => {
  let html = data
    .map((item, index) => {
      return `<div class="col-md-3">
                        <div class="champion-card" >
                            <div class="btn-remove" data-index=${index}>
                                <i class="fas fa-times"></i>
                            </div>
                            <div class="champion-content">
                                <div class="champion-img">
                                    <img src="${item.img}"
                                        alt="champion-img" class="img-fluid">
                                </div>
                                <div class="champion-meta">
                                    <div class="champion-name">
                                        ${item.name}
                                        <span class="title">${item.title}</span>
                                    </div>
                                    <div class="champion-stat">
                                        <div class="stat-item">
                                            <div class="stat-label">HP</div>
                                            <div class="stat-value">
                                                <div class="stat-bar">
                                                    <div class="stat-bar-value" style="width: ${
                                                      (item.stats.hp / 625.64) *
                                                      100
                                                    }%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">MP</div>
                                            <div class="stat-value">
                                                <div class="stat-bar">
                                                    <div class="stat-bar-value" style="width: ${
                                                      (item.stats.mp / 500) *
                                                      100
                                                    }%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">AD</div>
                                            <div class="stat-value">
                                                <div class="stat-bar">
                                                    <div class="stat-bar-value" style="width: ${
                                                      (item.stats.attackdamage /
                                                        70) *
                                                      100
                                                    }%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="stat-item">
                                            <div class="stat-label">AS</div>
                                            <div class="stat-value">
                                                <div class="stat-bar">
                                                    <div class="stat-bar-value" style="width: ${
                                                      (item.stats.attackspeed /
                                                        0.8) *
                                                      100
                                                    }%" ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    })
    .join("");

  containerEL.innerHTML = html;
};

// Binding function onclick btn remove
let bindingFunctionRemove = () => {
  let btnRemove = document.querySelectorAll(".btn-remove");

  btnRemove.forEach((btn) => {
    btn.onclick = () => {
      removeChampionByIndex(btn.dataset.index, btn);
    };
  });
};

renderData(getAllData(), championContainer);
bindingFunctionRemove();

// Remove champion by index
let removeChampionByIndex = (index, btn) => {
  let existChampions = getAllData();
  existChampions.splice(index, 1);
  cacheData(existChampions);
  loadingToggle();

  let card = btn.parentElement;
  let cardCol = card.parentElement;

  card.classList.toggle("disabled");
  cardCol.classList.toggle("remove-col");
  setTimeout(() => {
    cardCol.remove();
    renderData(getAllData(), championContainer);
    bindingFunctionRemove();
  }, 400);
};

// Add new data
let addNewChampion = (data) => {
  let existChampions = getAllData();
  let newChampions = [data, ...existChampions];
  cacheData(newChampions);
  loadingToggle();
  renderData(getAllData(), championContainer);
  bindingFunctionRemove();
};

// Reset all input add form
let resetInputAddForm = () => {
  let allInput = document.querySelectorAll(".offcanvas-body input");
  allInput.forEach((input) => {
    input.value = "";
  });
};

// Open add panel when click btn
btnOpenAddPanel.onclick = () => {
  addPanel.show();
};

// Recache data
btnRecache.onclick = () => {
  cacheData(champions);
  loadingToggle();
  renderData(getAllData(), championContainer);
  bindingFunctionRemove();
};

btnSaveAddChampion.onclick = () => {
  let name = inputChampionName.value ? inputChampionName.value : "####";
  let title = inputChampionTitle.value ? inputChampionTitle.value : "########";
  let hp = inputChampionHp.value ? inputChampionHp.value : 0;
  let mp = inputChampionMp.value ? inputChampionMp.value : 0;
  let attackdamage = inputChampionAd.value ? inputChampionAd.value : 0;
  let attackspeed = inputChampionAs.value ? inputChampionAs.value : 0;
  let img = inputChampionImg.value
    ? inputChampionImg.value
    : "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg";

  let newChampion = {
    img,
    name,
    title,
    stats: {
      hp,
      mp,
      attackdamage,
      attackspeed,
    },
  };

  addNewChampion(newChampion);

  resetInputAddForm();
  addPanel.hide();
};
