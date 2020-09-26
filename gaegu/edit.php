<?php 

$devel = [];
$info = [];
$video = [];
$social = [];

if (isset($_POST['link1'])) { 
    foreach ($_POST as $key => $value) {
        $nome = preg_replace('/[0-9]+/', '', $key);

        if ($nome == 'devel') {
            $devel[] = 
        }

        



        $arr = [
            $key=>[
                ['nome'=>'Google','url'=>'google.com'],
                ['nome'=>'Facebook','url'=>'facebook.com']
            ]
        ];
    }

    file_put_contents('json/links.json', json_encode($arr));
    
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>StartPage - Gaegu</title>
    <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="css/theme.css" />
</head>
<body>
    <div class="container">
        <div class="inner">
            <nav>
                <div class="esquerda">
                    <span id="weather">clima</span>
                </div>
                <div class="centro">
                    <span id="hora">hora</span>
                </div>
                <div class="direita">
                    <img id="icon" src="img/moon.svg">
                </div>
            </nav>

            <main>
                <img id="logo" src="img/mountain.png" />
                <?php if (isset($arr)) { echo json_encode($arr); } ?>
                <form id="searchform" action="edit.php" method="post">
                    <input id="search" type="text" name="nome1" placeholder="Nome1" />
                    <input id="search" type="text" name="link1" placeholder="Link1" />
                    <input id="search" type="text" name="nome2" placeholder="Nome2" />
                    <input id="search" type="text" name="link2" placeholder="Link2" />
                    <input id="search" type="text" name="nome3" placeholder="Nome3" />
                    <input id="search" type="text" name="link3" placeholder="Link3" />
                    <input type="submit" value="Enviar" />
                </form>
            </main>

            <footer>
            </footer>
        </div>
    </div>
    <script src="js/links.js"></script>
    <script src="js/theme.js"></script>
    <script src="js/weather.js"></script>
    <script src="js/time.js"></script>
</body>
</html>