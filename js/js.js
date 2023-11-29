const  playbtn = document.querySelector('.playbtn'),
       prevBtn = document.querySelector('.prevbtn'),
        nextBtn = document.querySelector('.nextbtn'),
        audio = document.querySelector('.audio'),
        progressContainer = document.querySelector('.line'),
        progress = document.querySelector('.progress'),
        nametrek = document.querySelector('.name_trek'),
        btnMobile = document.querySelector('.btn_mobile'),
        imgMusic = document.querySelector('.img_music')
       
let songs =['glaza_ne_vrut','dimond','svininalyne','Topajj'];//Название песен

const musicPlaylist = document.querySelector(".treeks"); 
// Цикл для добавления песен в плейлист
for (let i = 0; i < songs.length; i++) {
  const songAdd = document.createElement("div");
  songAdd.classList.add("trek");
  songAdd.id = (songs[i])
  const pAdd = document.createElement("p");
  pAdd.textContent = songs[i]; 
  
  const circleAdd = document.createElement("div");
  circleAdd.classList.add("cirlc");
  circleAdd.id = "cirlc"+i;

  
  musicPlaylist.appendChild(songAdd); 
  songAdd.appendChild(pAdd);
  songAdd.appendChild(circleAdd); 
  
}

let activeSongs = 0;//Индекс активной песни



//Загрузка начальной музыки
function loadSong(song){   
    nametrek.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
    imgMusic.src = `img/${song}.jpg`;

const activeline = document.getElementById(songs[activeSongs]);
const activecircl = document.getElementById("cirlc"+activeSongs)


    activeline.style.transform  = "scale(1.05)";
    activecircl.classList.add("active-circl");
}
loadSong(songs[activeSongs])



//функция запуска музыки
function playSong(){
    audio.play(); 
    audio.classList.add('play');


}

playbtn.addEventListener('click',()=>{
    const isPlaying= audio.classList.contains('play')
    if(isPlaying){
        pauseSong()
        playbtn.src = `img/pause.svg`;
    }else{
        playSong()
        playbtn.src = `img/play.svg`;
    }

})
//функция паузы 
function pauseSong(){
    audio.pause();  
    audio.classList.remove('play');
 
   
}
//функция для запуска следующего трека 
function nextSong(){
    const activeline = document.getElementById(songs[activeSongs]);
const activecircl = document.getElementById("cirlc"+activeSongs)
    activeline.style.transform  = "scale(1)";
    activecircl.classList.remove("active-circl");

    activeSongs++
    if (activeSongs > songs.length - 1){
        activeSongs= 0;
    }
    loadSong(songs[activeSongs])
    playSong()
    playbtn.src = `img/play.svg`;

}
nextBtn.addEventListener('click',nextSong)
//функция для запуска предыдущего трека 
function prevtSong(){
    const activeline = document.getElementById(songs[activeSongs]);
    const activecircl = document.getElementById("cirlc"+activeSongs)
        activeline.style.transform  = "scale(1)";
        activecircl.classList.remove("active-circl");

    activeSongs--
    if (activeSongs < 0){
        activeSongs= songs.length - 1;
    }
    loadSong(songs[activeSongs])
    playSong()
    playbtn.src = `img/play.svg`;
}

prevBtn.addEventListener('click',prevtSong)

//Функция обновления прогрессбара

function updateProgress(e){
    const {duration,currentTime} =e.srcElement
    const progressPercent = (currentTime/duration) * 100
    console.log(progressPercent);
    progress.style.width = `${progressPercent}%`
    if( progressPercent == 100){
       nextSong();
   
    }
}
audio.addEventListener('timeupdate',updateProgress)


function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX 
    const duration = audio.duration

    audio.currentTime = (clickX/width) *duration;


}
progressContainer.addEventListener('click',setProgress)


//выбор конкретного трека
const treks = document.querySelectorAll('.trek'); 
treks.forEach(function(track) {
    track.addEventListener('click', function() {

        const activeline = document.getElementById(songs[activeSongs]);
        const activecircl = document.getElementById("cirlc"+activeSongs)
        activeline.style.transform  = "scale(1)";
        activecircl.classList.remove("active-circl");
        console.log(activeSongs);
        let songIndex = songs.indexOf(this.id);

        activeSongs = songIndex;
        console.log(activeSongs);
        console.log(this.id);
        loadSong(this.id);
        playSong();
        playbtn.src = `img/play.svg`; 
        
        console.log(activeSongs);
        console.log(activeSongs);
    });


    

});











let indexPler = 0;


function musicList(){
    const pleerRow = document.querySelector('.pleer_row')
    
    if(indexPler==0){
    pleerRow.style.transform = "translateX(-100%)";
    indexPler ++;
    btnMobile.style.background ="white";
    }else{
        pleerRow.style.transform = "translateX(0%)";
        indexPler --;
        btnMobile.style.background ="black";
    }

}


btnMobile.addEventListener('click',musicList)