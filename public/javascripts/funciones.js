function btnescuchar(btn)
{
var ruta=btn.id;
var audio = document.getElementById('playlist');
audio.src= ruta;
audio.play();
}

function btnpause(btn)
{
var ruta=btn.id;
var audio = document.getElementById('playlist');
audio.src= ruta;
audio.pause();
}
