<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link href="./css/bootstrap.min.css" rel="stylesheet">
        <link href="./css/cover.css" rel="stylesheet">
        <script src="./js/bootstrap.file-input.js"></script>
        <title>Carl Passwords</title>
    </head>
    <body>
        <h1 style="margin-left: 50px">Need a Carl Password?</h1>
        <?php
        function generateStrongPassword() {
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
                $sets[] = '!@#$%&*?{[()]}|<>^\'\\/~-_^+.,:;= ';
            }

            $all = '';
            $password = '';
            foreach ($sets as $set) {
                $password .= $set[array_rand(str_split($set))];
                $all .= $set;
            }

            $all = str_split($all);
            for ($i = 0; $i < $length - count($sets); $i++) {
                $password .= $all[array_rand($all)];
            }

            $password = str_shuffle($password);
            return $password;
        }
        ?>
        <div class="site-wrapper">
            <div class="site-wrapper-inner">
                <div class="cover-container">
                    <div style="float: left">
                        <form role="form" action="" method="POST">

                            <label><input type="checkbox" name="l" checked>Lowercase letters</label><br>
                            <label><input type="checkbox" name="u" checked>Uppercase letters</label><br>
                            <label><input type="checkbox" name="d" checked>Numbers</label><br>
                            <label><input type="checkbox" name="s" checked>Special characters</label><br>

                            <label>Length: <input type="number" name="length" value="20" style="margin-top: 10p;width: 60px"></label><br>
                            <button class="btn btn-success " type="submit" name="login" style="margin-top: 5px" >Generate</button>
                        </form>
                    </div>
                    <div style="float: end;margin-left: 200px">
                        <p>New password:</p>
                        <input type="text" value="<?php echo generateStrongPassword() ?>" style="width: max-content" >
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>