
ativacao = 0;
frequencias = [];

function Rndm(min, max) {
        return Math.random() * (max - min + 1) + min
}

/* estrelinha */
estrelas = 0;
function Pisca() {
        estrelas++;
        const novaEstrelinha = document.createElement('div');
        novaEstrelinha.classList.add('estrela');
        novaEstrelinha.setAttribute('id', 's_'+estrelas);
        document.body.appendChild(novaEstrelinha);

        estrelinha = Rndm(1.8,5);
        estrelinhaY = Rndm(67,($(document).height()-67));
        estrelinhaX = Rndm(67,($(document).width()-67));

        $(novaEstrelinha).css({
                'position':'absolute',
                'border-radius':'34px',
                'background-color':'var(--roxo)',
                'animation':'spin 12s linear infinite',
                'top':estrelinhaY,
                'left':estrelinhaX,
                'width':estrelinha,
                'height':estrelinha
        });

        $(novaEstrelinha).fadeIn(1200, function() {
                $(this).fadeOut(12000, function() {
                        setTimeout(function() {
                                novaEstrelinha.remove();
                        },1200);
                }); // fadeOut
        }); // fadeIn
}
/* estrelinha */

/* nuvem */
nuvens = 0;
function Ceu() {
        nuvens++;
        const novaNuvem = document.createElement('div');
        novaNuvem.setAttribute('id', 'n_'+nuvens);
        document.body.appendChild(novaNuvem);

        vento = Rndm(13,55);
        nuvem = Rndm(180,360);
        nuvemY = Rndm(-90,($(document).height()-nuvem));

        $(novaNuvem).css({
                'position':'fixed',
                'margin-left':'-720px',
                'background-color':'var(--bege)',
                'border-radius':'900px',
                'z-index':'-1',
                'top':nuvemY,
                'height':nuvem,
                'width':nuvem,
                'opacity':'0.26'
        });

        var s = 5;
        setInterval(function() {
                var eLeftPos = novaNuvem.offsetLeft;
                novaNuvem.style.marginLeft = (eLeftPos + s) + 'px';
                if (eLeftPos > ($(document).width()) + (nuvem + 180)) {
                        novaNuvem.remove();
                }
        }, vento);
}
/* nuvem */

setInterval(function() {
        Ceu();
}, 360);

/* array das notas relativo ao teclado do computador*/
notasDasTeclas = {
        65:'C3',
        87:'C3S',
        83:'D3',
        69:'D3S',
        68:'E3',
        70:'F3',
        84:'F3S',
        71:'G3',
        89:'G3S',
        72:'A3',
        85:'A3S',
        74:'B3'
};
/* array das notas relativo ao teclado do computador */

/* array com as frequencias das notas */
notasFreq = {
        'C3':130.810,
        'C3S':138.590,
        'D3':146.830,
        'D3S':155.560,
        'E3':164.810,
        'F3':174.610,
        'F3S':185.000,
        'G3':196.000,
        'G3S':207.650,
        'A3':220.000,
        'A3S':233.080,
        'B3':246.940
};
/* array com as frequencias das notas */

/* release */
release = $('#osc_dur').val();
$('#osc_dur').on('change', function () {
        release = $('#osc_dur').val();
});
/* release */

/* oitava */
// começa assim
oitava = setOitava($('.oitava.ativa').attr('id'));
function setOitava(oitava) {
        paraTudo();
        if (oitava == 25) {
                oitava = 0.25;
        } else if (oitava == 05) {
                oitava = 0.50;
        } else if (oitava == 1618) {
                oitava = 1.618;
        } else if (oitava == 1963) {
                oitava = 1.963;
        }
        return oitava;
}
$('.oitava').on("click", function() {
        oitava = setOitava($(this).attr('id'));
        $('.oitava').removeClass('ativa');
        $(this).addClass('ativa');
});
// para tudo quando muda de oitava com o teclado
function paraTudo() {
        for (freq=0;freq<frequencias.length;freq++) {
                frequencias[freq].stop();
                frequencias[freq].disconnect();
        }
        $('#notasAtivas').empty();
        notasAtivas = [];
}
/* oitava */

/* toca oscilador */
$('.osc').on('click', function() {
        nota = $(this).attr('id').split('_')[1];
        tocaSom(frequencias,release,nota,oitava);
});
/* toca oscilador */

/* trigger pelo pianinho */
$('.tecla').on('touchstart mousedown', function () {
        nota = $(this).attr('id');
        tecladoNota = $('#oscilador_'+nota).data('teclado');
        $('#oscilador_'+nota).trigger('click');
});
$('.tecla').on('touchend mouseup', function () {
        nota = $(this).attr('id');
        tecladoNota = $('#oscilador_'+nota).data('teclado');
        paraTudo();
});
/* trigger pelo pianinho */

/* mostra as notas na página */
notasAtivas = [];
function mostraNotas(nota) {
        notasAtivas.push(nota.replace('S','#').replace('3','')+' ');
        $('#notasAtivas').html(notasAtivas);
        $('#notasTocadas').prepend(notasAtivas);
}
/* mostra as notas na página */

/* trigger pelo teclado do computador */
window.onkeydown = tocaNota;
window.onkeyup = paraNota;

function paraNota(key) {
        var keyCode = key.keyCode;
        var novasFrequencias = [];

        if (frequencias.length===0) {
                // visualização da onda
                estaTocando = false;
                // visualização da onda
        }

        // para de tocar só a que parou de apertar
        for (freq=0;freq<frequencias.length;freq++) {
                if (Math.round(frequencias[freq].frequency.value) === (Math.round(notasFreq[notasDasTeclas[keyCode]]*oitava))) {
                        // se a que desapertou é igual a que chegou a vez no for, para de tocar
                        frequencias[freq].stop();
                        frequencias[freq].disconnect();
                } else {
                        // as outras do for continua tocando
                        novasFrequencias.push(frequencias[freq]);
                }
                notasAtivas = [];
        }
        frequencias = novasFrequencias;

        if (frequencias.length===0) {
                paraTudo();
        }

        $('#oscilador_'+notasDasTeclas[keyCode]).removeClass('ativo');
        $('#'+notasDasTeclas[keyCode]).removeClass('tocada');
}

function tocaNota(key) {

        if (key.repeat) {
                // previne de retrigar direto quando holda a tecla
                return
        }

        var keyCode = key.keyCode;

        $('#oscilador_'+notasDasTeclas[keyCode]).trigger('click');
        $('#'+notasDasTeclas[keyCode]).addClass('tocada');

        // muda a oitava
        if (keyCode==37) {
                // Arrow left
                if ($('.oitava.ativa').not(':first-child')) {
                        setOitava($('.oitava.ativa').prev().trigger('click'));
                }
        }
        if (keyCode==39) {
                // Arrow right
                if ($('.oitava.ativa').not(':last-child')) {
                        setOitava($('.oitava.ativa').next().trigger('click'));
                }
        }
        // muda a oitava

        // release/osc_dur
        if (keyCode==38) {
                // Arrow up
                release = $('#osc_dur').val();
                if (release>=5) {
                        $('#osc_dur').val(1);
                } else {
                        $('#osc_dur').val( function(i, release) {
                                return ++release;
                        });
                }
                release = $('#osc_dur').val();
        }

        if (keyCode==40) {
                // Arrow down
                release = $('#osc_dur').val();
                if (release<=1) {
                        $('#osc_dur').val(1);
                } else {
                        $('#osc_dur').val( function(i, release) {
                                return --release;
                        });
                }
                release = $('#osc_dur').val();
        }
        // release/osc_dur

        // toca o sequenciador
        if (keyCode==32) {
                //Spacebar
                if ($('#tocar').hasClass('tocando')==false) {
                        $('#tocar').trigger('click');
                } else {
                        $('#pausar').trigger('click');
                }
        }
        // toca o sequenciador
}
/* trigger pelo teclado do computador */

// visualização da onda
// https://stackoverflow.com/a/30632933
//draw function for canvas
function drawWave(analyser, ctx) {
        var buffer = new Float32Array(1024),
        w = ctx.canvas.width;

        ctx.strokeStyle = "#var(--roxo)";
        ctx.setTransform(1,0,0,-1,0,111); // flip y-axis and translate to center
        ctx.lineWidth = 1.8;

  (function loop() {
          analyser.getFloatTimeDomainData(buffer);

          ctx.clearRect(0, -100, w, ctx.canvas.height+86);
          ctx.beginPath();

          ctx.moveTo(0, buffer[0] * 90);

          for (var x = 2; x < w; x += 2) ctx.lineTo(x, buffer[x] * 90);
          ctx.stroke();

          if (estaTocando) requestAnimationFrame(loop)
  })();
}
// visualização da onda

function tocaSom(frequencias,release,nota,oitava) {
        if (ativacao == 0) {
                AudioContext = window.AudioContext || window.webkitAudioContext;
                contexto = new AudioContext({sampleRate: 48000});

                ganho = contexto.createGain();
                ganho.gain.value = 0.18;
                ganho.connect(contexto.destination);

                // visualização da onda
                analyser = contexto.createAnalyser();
                analyser.fftSize = 1024;
                ganho.connect(analyser);
                analyser.connect(contexto.destination);
                estaTocando = false;
                // visualização da onda

        }

        hertz = $('#hertz_'+nota).val()*oitava;
        oscilador = contexto.createOscillator();
        oscilador.frequency.setValueAtTime(hertz, contexto.currentTime);

        // custom waves
        // var real = new Float32Array([0,1,3,1,5,3,0]);
        //var real = new Float32Array([13,8,5,3,2,1,1]);
        var real = new Float32Array([34,21,13,8,5,3,2,1,1,0]);
        var imag = new Float32Array(real.length);
        var ondaCustomizada = contexto.createPeriodicWave(real,imag);
        oscilador.setPeriodicWave(ondaCustomizada);

        oscilador.connect(ganho);
        oscilador.start(0);

        // visualização da onda
        var c = document.getElementById('onda');
        ctx = c.getContext('2d');
        estaTocando = true;
        drawWave(analyser, ctx);
        // visualização da onda

        // visualização das notas ativas
        mostraNotas(nota);
        // visualização das notas ativas

        // estrelinha
        Pisca();
        // estrelinha

        //ganho.gain.exponentialRampToValueAtTime(0.000001, contexto.currentTime + release);

        frequencias.push(oscilador);
        ativacao++;
} /* tocaSom */
