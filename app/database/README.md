# Database

## Docker image

https://hub.docker.com/_/mysql/


## Install mysql command on Mac OS

```sh
# Install mysql
HOMEBREW_NO_AUTO_UPDATE=1 brew install mysql

# Permission configuration required after install mysql
sudo chown -R _mysql:mysql /usr/local/var/mysql

# Check the docker container is running
docker ps -a

# Try to connect to the mysql server in the docker container
mysql -h 0.0.0.0 --port 3306 -u**user** -p**password**

# If you want to try running mysql server on local instead of the docker container one
#lsof -i TCP:3306
#docker stop ***PID***
#sudo mysql.server start
```

https://stackoverflow.com/questions/15450091/error-2002-hy000-cant-connect-to-local-mysql-server-through-socket-tmp-mys
