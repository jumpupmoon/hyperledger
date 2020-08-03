docker exec cli peer chaincode install -n mc -v 1.0 -p github.com/mysacc
docker exec cli peer chaincode instantiate -n mc -v 1.0 -C mychannel -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member", "Org3MSP.member")'
sleep 3

docker exec cli peer chaincode invoke -n mc -C mychannel -c '{"Args":["set", "b", "200"]}'
sleep 3

docker exec cli peer chaincode query -n mc -C mychannel -c '{"Args":["get", "b"]}'

echo '-----------------------------------1 END----------------------------------------'


docker exec cli peer chaincode install -n mc -v 1.1 -p github.com/mysacc
docker exec cli peer chaincode upgrade -n mc -v 1.1 -C mychannel -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member", "Org3MSP.member")'
sleep 3

docker exec cli peer chaincode invoke -n mc -C mychannel -c '{"Args":["set", "h", "400"]}'
sleep 3

docker exec cli peer chaincode query -n mc -C mychannel -c '{"Args":["getAllKeys"]}'

echo '-----------------------------------2 END----------------------------------------'