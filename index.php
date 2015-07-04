<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Generate good passwords">
        <meta name="author" content="Carlgo11">
        <link rel="icon" type="image/vnd.microsoft.icon"  href="./resources/media/32.ico"/>
        <link href="./css/bootstrap.min.css" rel="stylesheet">
        <link href="./css/main.css" rel="stylesheet">
        <title>Carl Passwords</title>
    </head>
    <body>
        <a href="https://github.com/Carlgo11/password"><img class="github" src="./resources/media/GitHub-Mark-64px.png" alt="github"></a>
        <h1 class="title">Need a Carl Password?</h1>
        <?php

        function str_split_unicode($str, $l = 0) {
            if ($l > 0) {
                $ret = array();
                $len = mb_strlen($str, "UTF-8");
                for ($i = 0; $i < $len; $i += $l) {
                    $ret[] = mb_substr($str, $i, $l, "UTF-8");
                }
                return $ret;
            }
            return preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
        }

        function generateStrongPassword() {

            if (isset($_POST['length']) && $_POST['length'] < 2000000) {
                $length = $_POST['length'];
            
            $sets = array();
            if (isset($_POST['l'])) {
                $sets[] = 'abcdefghjkmnpqrstuvwxyz';
            }
            if (isset($_POST['u'])) {
                $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
            }
            if (isset($_POST['d'])) {
                $sets[] = '123456789';
            }
            if (isset($_POST['s'])) {
                $sets[] = '!@#$%&*?{[()]}|<>^\'\\/~-_^+.,:;=~£€¨§½¤µ';
            }
            if (isset($_POST['un'])) {
                $sets[] = 'åäöÅÄÖøØéèÉÈüÜâÂôÔǽǼ■□▢▣▶●◐◑◒◓◔※‼⁈⁉￠￭￮￩￫￪￬┚├┤';
            }
            if (isset($_POST['sp'])) {
                $sets[] = ' ';
            }
            }else{
                return null;
            }

            $all = '';
            $password = '';
            foreach ($sets as $set) {
                $password .= $set[array_rand(str_split_unicode($set))];
                //    echo $set;
                $all .= $set;
            }

            $all = str_split_unicode($all);

            for ($i = 0; $i < $length - count($sets); $i++) {
                $a = $all[array_rand($all)];
                echo $a;
                $password .= $a;
            }

            $password = str_shuffle($password);
            // return $password;
        }

        function value($id) {
            if (isset($_POST['submit'])) {
                if (isset($_POST[$id])) {
                    return "checked";
                } else {
                    return "";
                }
                echo $_POST[$id];
            } else {
                if($id == "un"){
                 return "";   
                }else{
                return "checked";
                }
            }
        }
        ?>

        <div class="vertical-center">
            <div class="container" >
                <div class="options">
                    <form role="form" action="" method="POST">

                        <label><input type="checkbox" name="l" <?php echo value('l'); ?>>Lowercase letters</label><br>
                        <label><input type="checkbox" name="u" <?php echo value('u'); ?>>Uppercase letters</label><br>
                        <label><input type="checkbox" name="d" <?php echo value('d'); ?>>Numbers</label><br>
                        <label><input type="checkbox" name="s" <?php echo value('s'); ?>>Special characters</label><br>
                        <label><input type="checkbox" name="un" <?php echo value('un'); ?>>Unicode characters</label><br>
                        <label><input type="checkbox" name="sp" <?php echo value('sp'); ?>>Spaces</label><br>

                        <label>Length: <input type="number" name="length" id="length" value="<?php
                            if (isset($_POST['submit'])) {
                                if (isset($_POST['length'])) {
                                    echo $_POST['length'];
                                } else {
                                    echo "20";
                                }
                            } else {
                                echo "20";
                            }
                            ?>" style="margin-top: 10p;width: 60px" maxlength="2000000"></label><br>

                        <button class="btn btn-success " type="submit" name="submit" style="margin-top: 5px" onclick="generateStrongPassword()">Generate</button>
                    </form>
                </div>
                <div style="margin-left: 200px">
                    <p>New password:</p>
                    <input type="text" class="input-sm" value="<?php echo generateStrongPassword() ?>" style="width: 30em"><br>
                    <?php if (isset($_POST['length']) && $_POST['length'] < 20 && !isset($_POST['s'])) { ?>
                        <div class="alert alert-danger bad-password-alert" id="" style="">
                            <b>It looks like you're password is rather weak.</b>
                            <p><br></p>
                            <p>Passwords < 20 characters and without special characters are easy to crack.</p>
                            <p>If possible, consider generating a stronger password.</p>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div id='footer' class="footer">For a better security turn on <a href="https://twofactorauth.org/">TFA</a> when available!<div style="margin-top: 40px">&copy; <?php echo date("Y"); ?> <a href="https://carlgo11.com/">Carlgo11</a></div></div>
    </body>
</html>