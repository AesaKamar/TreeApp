FROM    postgres:9.5

ADD ./role_init.sh /init/
WORKDIR /init
ENV     PGDATA=/var/run/pgdata
RUN     psql -v ON_ERROR_STOP=1 --username "postgres"  "CREATE USER dev;CREATE DATABASE treeApp;GRANT ALL PRIVILEGES ON DATABASE treeApp TO dev;"