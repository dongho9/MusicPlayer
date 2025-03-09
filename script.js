fetch("./api/artist.json")
  .then((response) => response.json())
  .then((datas) => {
    const section = document.querySelector("section");
    const prev = document.querySelector(".btnPrev");
    const next = document.querySelector(".btnNext");
    const deg = 45;
    const data = datas.data;
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.querySelector("figure").appendChild(modal);

    data.forEach((item, i) => {
      let num = 0;
      prev.addEventListener("click", () => {
        num++;
        section.style.transform = `rotate(${num * deg}deg)`;
      });
      next.addEventListener("click", () => {
        num--;
        section.style.transform = `rotate(${num * deg}deg)`;
      });
      const article = document.createElement("article");
      article.innerHTML = `
        <div class="inner">
        <div class="touch"></div>
          <p class ="number">
              ${i + 1}
          </p>
          <div class="pic" style="background-image: url(${item.img})";>
            <div class="dot"></div>
          </div>
            <div class="text">
            <h2>${item.name} - ${item.songName}</h2>
            <p>${item.desc}</p>
            <ul>
                  <li class="pause">
                    <i class="fas fa-pause"></i>
                  </li>
                  <li class="play">
                    <i class="fas fa-play"></i>
                  </li>
                  <li class="load">
                    <i class="fas fa-repeat"></i>
                  </li>
                </ul>
                <audio src="${item.audio}"></audio>
            </div>
          </div>
        </div>
      `;
      section.appendChild(article);

      article.style.transform = `rotate(${i * deg}deg) translateY(-100vh)`;
      const plays = document.querySelectorAll(".play");
      const pauses = article.querySelectorAll(".pause");
      const loads = document.querySelectorAll(".load");
      const audios = document.querySelectorAll("audio");
      const pics = document.querySelectorAll(".pic");
      const touch = article.querySelector(".touch");

      audios.forEach((audio) => {
        audio.addEventListener("ended", () => {
          pics.forEach((pic) => {
            pic.classList.remove("on");
          });
        });
      });

      plays.forEach((play) => {
        play.addEventListener("click", () => {
          pics.forEach((pic) => {
            pic.classList.remove("on");
          });
          audios.forEach((audio) => {
            audio.pause();
          });
          play.closest("article").querySelector("audio").play();
          play.closest("article").querySelector(".pic").classList.add("on");
        });
      });
      pauses.forEach((pause) => {
        pause.addEventListener("click", () => {
          pause.closest("article").querySelector("audio").pause();
          pause.closest("article").querySelector(".pic").classList.remove("on");
        });
      });
      loads.forEach((load) => {
        load.addEventListener("click", () => {
          pics.forEach((pic) => {
            pic.classList.remove("on");
          });
          audios.forEach((audio) => {
            audio.pause();
            audio.load();
          });
          load.closest("article").querySelector("audio").play();
          load.closest("article").querySelector(".pic").classList.add("on");
        });
      });

      touch.addEventListener("click", () => {
        modal.classList.add("active");
        modal.innerHTML = `
        <div class="modalBg" style="background-image: url('${item.bgImg}');">
          <div class="modalText">
            <p>${item.name}</p>
            <span>월별 리스너 ${item.listener}명</span>
          </div>
        </div>
        <div class="modalDesc">
          <p>
          ${item.desc}
          </p>
        </div>
        <i class="fas fa-close">
        `;
        modal.querySelector("i").addEventListener("click", () => {
          modal.classList.remove("active");
        });
      });
    });
  });
