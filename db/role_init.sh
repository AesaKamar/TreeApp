psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER dev;
    CREATE DATABASE treeApp;
    GRANT ALL PRIVILEGES ON DATABASE treeApp TO dev;
EOSQL