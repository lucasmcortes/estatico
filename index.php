<!doctype html>
<html>

<head>
        <title>LucasCôrtes.com.br</title>
        <link rel="shortcut icon" href="https://www.lucascortes.com.br/img/favicon.ico">
        <link rel="icon" type="image/png" href="https://www.lucascortes.com.br/img/favicon.png" sizes="32x32">
        <link rel="apple-touch-icon" sizes="180x180" href="https://www.lucascortes.com.br/img/apple-touch-icon.png">
        <meta name="msapplication-TileImage" content="https://www.lucascortes.com.br/img/mstile-144x144.png">
        <meta name="msapplication-TileColor" content="#3b0055">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Mulish&display=swap" rel="stylesheet">
        <script src="jquery.min.js"></script>
        <script src="jquery-ui.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>

<div class='linha'>
        <div style='margin:8px;text-align:center;'>
                <img style='background-color:var(--bege);border-radius:34px;padding:8px;max-width:34px;' src='img/logo.png'></img>
        </div>
</div>

<div id='container'>
        <div id='sequenciador'>
                <?php
                        // toda subpasta da pasta audio (uma pasta com os sons do instrumento) tem o seu respectivo nome adicionado ao array $instrumentos
                        foreach ($dirs = array_filter(glob(__DIR__.'/audio/*'), 'is_dir') as $instrumento) {
                                $instrumentos[] = str_replace(__DIR__.'/audio/', '', $instrumento);
                        } // foreach
                        foreach ($instrumentos as $instrumento) {
                                echo "
                                        <div id='passoscontainer'>
                                ";
                                                // define quantos passos aqui [a partir da quantidade de áudios da pasta de áudio) e no seq.js também (que pega quantos div.passo foram criados)
                                                // $numPassos = iterator_count(new FilesystemIterator(__DIR__.'/audio', FilesystemIterator::SKIP_DOTS));
                                                $numPassos = 8;
                                                for ($i=1;$i<($numPassos+1);$i++) {
                                                        // coloca um 0 na frente se o passo tiver só um número
                                                        if (strlen($i) < 2) {
                                                                $passoAtual = '0'.$i;
                                                        } else {
                                                                $passoAtual = $i;
                                                        } // id passo

                                                        // mostra
                                                        echo "
                                                                <div class='passowrapper ".$instrumento."'>
                                                        ";
                                                        if ($instrumento == $instrumentos[0]) {
                                                                echo "
                                                                                <div id='ticwrapper_".$passoAtual."' class='ticwrapper ".$instrumento."'>
                                                                                        <p id='tic_".$passoAtual."' class='tic ".$instrumento."'></p>
                                                                                </div>
                                                                ";
                                                        }
                                                        echo "
                                                                        <div id='passo_".$passoAtual."' class='passo ".$instrumento."'>
                                                                                <audio id='audio_".$passoAtual."' class='".$instrumento."' name='play' src='audio/".$instrumento."/audio_".$instrumento."_".$passoAtual.".wav' type='audio/mp3'></audio>
                                                                        </div>
                                                                </div>
                                                        ";
                                                } // for
                                echo "
                                        </div> <!-- passos container -->
                                        <br>
                                ";
                        } // foreach
                ?>
        </div> <!-- sequenciador -->
        <div id='controles'>
                <div class='linha'>
                        <div id='tocar' class='controle menor'>
                                <img class='imgcontrole' src='img/sequenciador/tocar.png'></img>
                        </div>
                        <div id='pausar' class='controle menor'>
                                <img class='imgcontrole' src='img/sequenciador/pausar.png'></img>
                        </div>
                        <div id='parar' class='controle menor'>
                                <img class='imgcontrole' src='img/sequenciador/parar.png'></img>
                        </div>
                </div> <!-- linha -->
                <div class='linha'>
                        <div id='limpar' class='controle' style='width:auto;'>
                                <!-- <img class='imgcontrole' src='img/sequenciador/limpar.png'></img> -->
                                <p style='font-size:15px;'>limpar</p>
                        </div>
                        <div id='aleatorio' class='controle' style='width:auto;'>
                                <p style='font-size:15px;'>aleatório</p>
                        </div>
                </div> <!-- linha -->
                <div class='linha'>
                        <!-- <div class='node'> -->
                                <p>BPM</p>
                                <input id='velocidade' type='number' value='120' class='controle maior' style='font-size:18px;'></input>
                        <!-- </div>  node -->
                        <!-- <div class='node'> -->
                                <p style='display:none;'>Osc. Dur.</p>
                                <input id='osc_dur' type='number' value='1' class='controle maior' style='font-size:18px;display:none;'></input>
                        <!-- </div> node -->
                </div> <!-- linha -->

                <div id='teclas'>
                        <div class='linha'>
                                <p id='notasAtivas' class='notasDisplay'></p>
                        </div> <!-- linha -->
                        <div class='linha'>
                                <canvas id='onda'></canvas>
                        </div> <!-- linha -->
                        <div class='linha'>
                                <div id='pianinho'>
                                        <div id='C3' class='tecla'></div>
                                        <div id='C3S' class='tecla sustenido'></div>
                                        <div id='D3' class='tecla'></div>
                                        <div id='D3S' class='tecla sustenido'></div>
                                        <div id='E3' class='tecla'></div>
                                        <div id='F3' class='tecla' style='margin-left:0;'></div>
                                        <div id='F3S' class='tecla sustenido'></div>
                                        <div id='G3' class='tecla'></div>
                                        <div id='G3S' class='tecla sustenido'></div>
                                        <div id='A3' class='tecla'></div>
                                        <div id='A3S' class='tecla sustenido'></div>
                                        <div id='B3' class='tecla'></div>
                                </div> <!-- pianinho -->
                        </div> <!-- linha -->
                        <div id='oitava' class='linha' style='margin:8px auto;'>
                                <p id='25' class='oitava'>C1</p>
                                <p id='05' class='oitava'>C2</p>
                                <p id='1' class='oitava'>C3</p>
                                <p id='1618' class='oitava ativa'>C3 x 1.618</p>
                                <p id='1963' class='oitava'>432Hz</p>
                                <p id='2' class='oitava'>C4</p>
                        </div> <!-- linha -->
                        <div class='linha'>
                                <p id='notasTocadas' class='notasDisplay'></p>
                        </div> <!-- linha -->
                </div> <!-- teclas -->

                <?php
                        $freqs = array(
                                'C2'=>'65.406',
                                'C2S'=>'69.300',
                                'D2'=>'73.416',
                                'D2S'=>'77.780',
                                'E2'=>'82.407',
                                'F2'=>'87.307',
                                'F2S'=>'92.500',
                                'G2'=>'97.999',
                                'G2S'=>'103.830',
                                'A2'=>'110.000',
                                'A2S'=>'116.540',
                                'B2'=>'123.470',
                                'C3'=>'130.810',
                                'C3S'=>'138.590',
                                'D3'=>'146.830',
                                'D3S'=>'155.560',
                                'E3'=>'164.810',
                                'F3'=>'174.610',
                                'F3S'=>'185.000',
                                'G3'=>'196.000',
                                'G3S'=>'207.650',
                                'A3'=>'220.000',
                                'A3S'=>'233.080',
                                'B3'=>'246.940',
                                'C4'=>'261.630',
                                'C4S'=>'277.180',
                                'D4'=>'293.670',
                                'D4S'=>'311.130',
                                'E4'=>'329.630',
                                'F4'=>'349.230',
                                'F4S'=>'369.990',
                                'G4'=>'392.000',
                                'G4S'=>'415.300',
                                'A4'=>'440.000',
                                'A4S'=>'466.160',
                                'B4'=>'493.880'
                        );

                        $oscs = array(
                                [
                                        'nome'=>'01',
                                        'hertz'=>$freqs['C3'],
                                        'nota'=>'C3',
                                        'teclado'=>65
                                ],
                                [
                                        'nome'=>'02',
                                        'hertz'=>$freqs['C3S'],
                                        'nota'=>'C3S',
                                        'teclado'=>87
                                ],
                                [
                                        'nome'=>'03',
                                        'hertz'=>$freqs['D3'],
                                        'nota'=>'D3',
                                        'teclado'=>83
                                ],
                                [
                                        'nome'=>'04',
                                        'hertz'=>$freqs['D3S'],
                                        'nota'=>'D3S',
                                        'teclado'=>69
                                ],
                                [
                                        'nome'=>'05',
                                        'hertz'=>$freqs['E3'],
                                        'nota'=>'E3',
                                        'teclado'=>68
                                ],
                                [
                                        'nome'=>'06',
                                        'hertz'=>$freqs['F3'],
                                        'nota'=>'F3',
                                        'teclado'=>70
                                ],
                                [
                                        'nome'=>'07',
                                        'hertz'=>$freqs['F3S'],
                                        'nota'=>'F3S',
                                        'teclado'=>84
                                ],
                                [
                                        'nome'=>'08',
                                        'hertz'=>$freqs['G3'],
                                        'nota'=>'G3',
                                        'teclado'=>71
                                ],
                                [
                                        'nome'=>'09',
                                        'hertz'=>$freqs['G3S'],
                                        'nota'=>'G3S',
                                        'teclado'=>89
                                ],
                                [
                                        'nome'=>'10',
                                        'hertz'=>$freqs['A3'],
                                        'nota'=>'A3',
                                        'teclado'=>72
                                ],
                                [
                                        'nome'=>'11',
                                        'hertz'=>$freqs['A3S'],
                                        'nota'=>'A3S',
                                        'teclado'=>85
                                ],
                                [
                                        'nome'=>'12',
                                        'hertz'=>$freqs['B3'],
                                        'nota'=>'B3',
                                        'teclado'=>74
                                ]
                        );

                        foreach ($oscs as $osc) {
                                echo "
                                        <div class='linha' style='display:none;'>
                                                <div class='node'>
                                                        <p>Osc ".$osc['nome']."</p>
                                                        <div id='oscilador_".$osc['nota']."' data-teclado='".$osc['teclado']."' class='controle osc' style='width:auto;'>
                                                                <img class='imgcontrole osc1' src='img/sequenciador/tocar.png'></img>
                                                        </div>
                                                </div> <!-- node -->
                                                <div class='node'>
                                                        <p id='".$osc['nota']."'>".$osc['nota']." (".$osc['hertz']." Hz)</p>
                                                        <input id='hertz_".$osc['nota']."' type='number' value='".$osc['hertz']."' class='controle maior' style='font-size:18px;color:var(--bege);'></input>
                                                </div><!-- node -->
                                        </div> <!-- linha -->
                                ";
                        } // foreach
                ?>
        </div> <!-- controles -->
</div> <!-- container -->

<div class='linha' style='user-select:none;'>
        <div style='margin:13px;text-align:center;'>
                <img style='max-width:300px;' src='img/pianovoador.png'></img>
        </div>
</div>

<div class='linha' style='margin:3% auto;margin-bottom:34%;'>
        <p style='margin:1.8% 13%;'>
                sequência
                <br><br>
                sequências são determinadas pela sucessão de eventos, pela ação de seguir
                <br>
                um prosseguimento de ocorrências, uma depois da outra
                <br>
                por exemplo, uma música que tem vários sons em uma linha que o tempo segue
                <br><br>
                aqui você pode criar a sua própria e tocar junto com o teclado do seu computador
                <br>
                ou diretamente na sua tela (se tiver o recurso de toque)
                <br><br>
                criei alguns sons pra você poder usar na sua sequência
                <br>
                escolha uma série de sons para acompanhar sua melodia
                <br>
                e escreva no tempo (com o teclado) como as coisas devem acompanhar
                <br>
                o que já está predefinido
        </p>
</div> <!-- linha -->

<div id='sidecontainer'>
        <div id='sidecontainerwrap'>
                <div>
                        <a target='_blank' href='http://bit.ly/lucascortesbandcamp'>
                                <img alt='bandcamp' title='bandcamp' class='social' src='img/social/bandcamp.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='http://bit.ly/lucascortespotify'>
                                <img alt='spotify' title='spotify' class='social' src='img/social/spotify.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='https://www.youtube.com/channel/UC6ASrTN_Jyl0Rp8422feuAg'>
                                <img alt='youtube' title='youtube' class='social' src='img/social/youtube.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='http://bit.ly/lucascortesmedium'>
                                <img alt='medium' title='medium' class='social' src='img/social/medium.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='http://bit.ly/lucascortesgithub'>
                                <img alt='github' title='github' class='social' src='img/social/github.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='http://bit.ly/lucascortesfreesound'>
                                <img alt='freesound' title='freesound' class='social' src='img/social/freesound.png'></img>
                        </a>
                </div>
                <div>
                        <a target='_blank' href='mailto:lmattoscortes@gmail.com'>
                                <img alt='email' title='email' class='social' src='img/email-icon.png'></img>
                        </a>
                </div>
        </div>
</div>
<!-- sidecontainer -->

<div id='bottomcontainer'>
        <div class='linha'>
                <p style='padding:8px 0px;'>
                        © Lucas Côrtes 2021
                </p>
        </div>
</div>

<script src="osc.js"></script>
<script src="seq.js"></script>

</body>
</html>
