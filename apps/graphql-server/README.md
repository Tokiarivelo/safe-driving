docker run --rm -v "${PWD}:/data" ghcr.io/osgeo/gdal:alpine-small-latest `
>>   ogr2ogr -overwrite -f "PostgreSQL" PG:"host=host.docker.internal port=5433 dbname=tst_db user=tst_usr password=tst_pwd" `
>>   /data/hotosm_mdg_roads_lines_shp.shp -nln madagascar_roads -lco GEOMETRY_NAME=geom -nlt PROMOTE_TO_MULTI

docker run --rm -v "${PWD}:/data" `
  -e PGPASSWORD="tst_pwd" `
iboates/osm2pgsql:latest `
  osm2pgsql --create --slim --hstore `
--host=host.docker.internal `
  --port=5433 `
--database=tst_db `
  --username=tst_usr `
madagascar-latest.osm.pbf

docker run -d -p 8085:8082 --name ors `
  -v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\graphs:/ors-core/data/graphs" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\elevation_cache:/ors-core/data/elevation_cache" `
  -v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\conf:/ors-core/configs" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\pbf:/ors-core/data/osm_file" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\configs\ors-config.yml:/home/ors/config/ors-config.yml" `
-e "ORS_PBF_PATH=/ors-core/data/osm_file/madagascar-latest.osm.pbf" `
openrouteservice/openrouteservice

docker run -d -p 8085:8082 --name ors `
  -v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\graphs:/home/ors/graphs" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\elevation_cache:/home/ors/elevation_cache" `
  -v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\configs:/home/ors/config" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\configs\ors-config.yml:/home/ors/config/ors-config.yml" `
-v "C:\Users\razan\WebstormProject\safe-driving\apps\graphql-server\ors-data\pbf\madagascar-latest.osm.pbf:/home/ors/files/madagascar-latest.osm.pbf" `
openrouteservice/openrouteservice
