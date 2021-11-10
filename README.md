***Requirements***
+ composer require symfony/orm-pack
+ composer require --dev symfony/maker-bundle

----


**Indication of environment and configuration database in file .env**

+ install composer 
+ install mysql 5.7
+ run : composer install or  composer update
+ DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
+ you run:  php bin/console doctrine:database:create
+ php bin/console doctrine:schema:update --force