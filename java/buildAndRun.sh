#!/usr/bin/env bash
mvn clean install
if [ $? -ne 0 ]
then
    exit 1;
fi
pushd package/target
tar zxvf cxs-graphql-api-package-1.0-SNAPSHOT.tar.gz
cd cxs-graphql-api-package-1.0-SNAPSHOT/bin
./karaf debug
popd