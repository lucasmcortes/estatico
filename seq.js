        /* lista de instrumentos */
        instrumentos = [];
        $('audio').each(function() {
                instrumentos.push($(this).attr('class'));
        });
        /* pega só os unique entries do array */
        instrumentos = instrumentos.filter((x, i, a) => a.indexOf(x) == i);
        /* exemplo: instrumentos[0] = bateria */
        banda = instrumentos.length;
        /* lista de instrumentos */

        /* velocidade */
        velInput = $('#velocidade');
        velocidade = 1000 * 60 /  velInput.val();
        velInput.on('change', function () {
                if ((velInput.val() == 0) || (velInput.val() >1000)) {
                        velocidade = 1000 * 60 / 120;
                        velInput.val('120');
                } else {
                        velocidade = 1000 * 60 /  velInput.val();
                }

                if ($('#tocar').hasClass('tocando')!==false) {
                        Pausar();
                        Tocar();
                }
        });
        /* velocidade */

        /* conta os passos */
        numPassos = $('.passo').length;
        totalTics = $('.tic').length;
        ticAtual = 00;
        caminhada = 0;

        /* adiciona todos os ids dos passos num array */
        Passos = [];
        $('.passo').each(function() {
                 Passos.push($(this).attr('id').split('_')[1]);
        });

        /* ativa passo */
        $('.passo').on('click', function() {
                $(this).toggleClass('ativo');
        });
        /* ativa passo */

        /* desativa passos */
        function desativaPassos() {
                $('.passo').each(function() {
                        $(this).removeClass('ativo');
                });
        }
        /* desativa passos */

        /* desativa tics */
        function desativaTics() {
                $('.tic').each(function() {
                        $(this).removeClass('ativo');
                });
        }
        /* desativa tics */

        /* maestro */
        function Maestro() {
                desativaTics();
                $('#tic_' + Passos[batuta]).addClass('ativo');
                for (inst=0;inst<banda;inst++) {
                        if ($('#passo_' + Passos[batuta] + '.' + instrumentos[inst]).hasClass('ativo')) {
                                /* se o passo desse tic respectivo tá marcado */
                                /* toca o arquivo de som */
                                $('#audio_' + Passos[batuta] + '.' + instrumentos[inst])[0].play();
                                /* toca o osc[inst] */
                                //$('#oscplay_'+osc[inst]).trigger('click');
                        }
                }
                batuta++;
                if (batuta==numPassos) {batuta=00;}
        }
        /* maestro */

        /* move tics */
        function moveTics() {
                /* se tá pausado/parado, toca */
                if ($('#tocar').hasClass('tocando')==false) {
                        $('#pausar').removeClass('pausado');
                        batuta = ticAtual;
                        if (batuta!==00) {
                                /* arruma o contador pra continuar de onde pausou */
                                batuta = (ticAtual-1);
                        }
                        caminhada = setInterval(function(batuta) {
                                Maestro(batuta);
                        }, velocidade);
                } else {
                        /* se tá tocando */
                        $('#pausar').removeClass('pausado');
                }
        }
        /* move tics */

        /* parar os tics */
        function pararTics() {
                clearInterval(caminhada);
        }
        /* parar os tics */

        /* tocar */
        function Tocar() {
                moveTics();
                $('#tocar').addClass('tocando');
        }
        $('#tocar').on('click', function () {
                Tocar();
        });
        /* tocar */

        /* pausar */
        function Pausar() {
                pararTics();
                ticAtual = $('.tic.ativo').attr('id').split('_')[1];
                $('#tocar').removeClass('tocando');
                $('#pausar').addClass('pausado');
        }
        $('#pausar').on('click', function () {
                Pausar();
        });
        /* pausar */

        /* parar */
        function Parar() {
                pararTics();
                desativaTics();
                $('#tocar').removeClass('tocando');
                $('#pausar').removeClass('pausado');
                $('#tic_01').addClass('ativo');
                ticAtual = 00;
        }
        $('#parar').on('click', function () {
                Parar();
        });
        /* parar */

        /* limpar passos */
        function Limpar() {
                desativaPassos();
                ticAtual = 00;
        }
        $('#limpar').on('click', function () {
                Limpar();
        });
        /* limpar passos */

        /* inicializa com passos marcados */
        function randomPassos() {
                /* inicializa o array pra colocar os passos ativados */
                passosAtivados = [];
                /* pra cada tic */
                for (tic=0;passosAtivados.length<8;tic++) {
                        /* pra cada instrumento */
                        for (inst=0;inst<banda;inst++) {
                                /* pega um random dentro do total de tics */
                                Random = Math.floor(Math.random() * totalTics);
                                /* faz até dar um passo marcado pra cada tic */
                                if (passosAtivados.includes(Random)==false) {
                                        /* ativa quando for um passo que ainda não foi ativado naquele tic em nenhum instrumento */
                                        $('#passo_' + Passos[Random] + '.' + instrumentos[inst]).addClass('ativo');
                                        /* quando ativa um passo novo, coloca ele no array pra continuar ativando passos diferentes */
                                        passosAtivados.push(Random);
                                }
                        }
                }
        }
        randomPassos();
        $('#aleatorio').on('click', function () {
                Limpar();
                randomPassos();
        });
        /* inicializa com passos marcados */

        /* bota o primeiro tic aceso */
        $('#tic_01').addClass('ativo');
        /* bota o primeiro tic aceso */
