<html lang="en">

<?php

$pdo = new PDO('mysql:host=localhost;post=3306;dbname=fullplate_users', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$errors = [];

$email = '';
$password1 = '';
$password2 = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $email = $_POST['email'];
    $password1 = $_POST['password1'];
    $password2 = $_POST['password2'];

    if (!$email) {
        $errors[] = 'Please provide a username.';
    }

    if (!$password1) {
        $errors[] = 'Please provide a password.';
    } else if (!$password2) {
        $errors[] = 'Please re-enter your password.';
    } else if ($password1 != $password2) {
        $errors[] = 'Your passwords do not match. Please make sure you entered them correctly.';
    }

    if (empty($errors)) {
        $statement = $pdo->prepare("INSERT INTO users (email, password)
                    VALUES (:email, :password)");

        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $password1);
        $statement->execute();
        header('Location: success_register.php');
    }
}

?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <title>Full-Plate</title>
    <link rel="stylesheet" type="text/css" href="css/materialize.css">
</head>

<body style="background-color: bisque;">
    <!-- login box -->
    <div class="container">
        <div class="row">
            <div class="col s12"></div>
            <div class="col s12 m7 l6">
                <div class="card">
                    <div class="card-content">
                        <div class="card-title">Full-Plate Registration</div>

                        <!-- print error messages for missing fields -->
                        <?php if (!empty($errors)) : ?>
                            <div class="class alert alert-danger">
                                <?php foreach ($errors as $error) : ?>
                                    <div><?php echo $error ?></div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>

                        <form action="" method="post">

                            <!-- email entry form -->
                            <div class="row">
                                <div class="input-field col s12 text-black">
                                    <i class="material-icons prefix">email</i>
                                    <input id="email" type="email" name="email" class="validate" value="<?php echo $email ?>">
                                    <label for="email">Enter your E-mail</label>
                                    <span class="helper-text" data-error="Please enter a valid e-mail addreess." data-success=""></span>
                                </div>
                            </div>

                            <!-- first password entry form -->
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">phonelink_lock</i>
                                    <input id="password1" type="password" name="password1" class="validate" value="<?php echo $password1 ?>">
                                    <label for="password1">Enter your password</label>
                                </div>
                            </div>

                            <!-- second password entry form -->
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix">phonelink_lock</i>
                                    <input id="password2" type="password" name="password2" class="validate">
                                    <label for="password2">Re-enter your password</label>
                                </div>
                            </div>

                            <!-- submit button -->
                            <p class="center-align flow-text">
                                <button type="submit" class="waves-effect waves-light btn-large center">Register</a></button><br><br><br>

                                <a href="../index.html" class="btn-floating btn-large waves-effect waves-light grey"><i class="material-icons">arrow_back</i></a><br>
                                <p class="center-align">Return to welcome screen.</p>
                            </p>
                        </form>
                        <!-- back button -->

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--JavaScript at end of body for optimized loading-->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script>
        $(document).ready(function() {

        });
    </script>


</body>

</html>