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
                <form id="searchform" action="edit.php" method="post">
                    <input id="search" type="text" name="link1" placeholder="Link1" />
                    <input id="search" type="text" name="link1" placeholder="Link2" />
                    <input id="search" type="text" name="link1" placeholder="Link3" />
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