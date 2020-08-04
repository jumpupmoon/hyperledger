docker exec cli peer chaincode install -n teamate -v 1.0 -p github.com/teamate
docker exec cli peer chaincode instantiate -n teamate -v 1.0 -C mychannel -c '{"Args":[]}' -P 'OR ("Org1MSP.member", "Org2MSP.member", "Org3MSP.member")'
sleep 3
docker exec cli peer chaincode invoke -n teamate -C mychannel -c '{"Args":["addUser", "user1"]}'
sleep 3
docker exec cli peer chaincode query -n teamate -C mychannel -c '{"Args":["readRating", "user1"]}'
docker exec cli peer chaincode invoke -n teamate -C mychannel -c '{"Args":["addRating", "user1", "p1", "5.0"]}'
sleep 3
echo '------------------------------------ END----------------------------------------'