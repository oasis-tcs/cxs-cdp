#!/usr/bin/env bash
mvn clean install
pushd package/target
tar zxvf cxs-graphql-api-package-1.0-SNAPSHOT.tar.gz
cd cxs-graphql-api-package-1.0-SNAPSHOT/bin
./karaf debug
popd