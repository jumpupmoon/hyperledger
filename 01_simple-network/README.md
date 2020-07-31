```하이퍼레저 패브릭을 위한 기본 환경설정

-필요한 구성요소
linux
curl
go
docker
python/git(ubuntu 설치시 기본 설치 됨)

- 도커 설치
$ sudo apt-get update
$ sudo rm -rf /var/lib/dpkg/lock* : 잠금 파일 때문에 설치가 안 될 경우 해당 경로에 모든 잠금 파일을 삭제 하고 설치 진행
$ sudo apt-get install docker.io
$ sudo apt-get install docker-compose software-properties-common (확인 docker version, docker-compose version)
$ sudo usermod -aG docker $USER
$ sudo reboot

- curl 설치
$ sudo apt-get install curl -y(curl --version)
- 추가 유틸(리눅스)
$ sudo apt-get install build-essential -y libssl-dev -y

- node 설치를 위한 nvm 설치
$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh (확인 tail install_nvm.sh)
$ bash install_nvm.sh
$ source ~/.profile
$ nvm install v12 (확인 node -v, npm -v)

- go 설치 PATH 설정
$ curl -O https://storage.googleapis.com/golang/go1.13.14.linux-amd64.tar.gz
$ tar -xvf go1.13.14.linux-amd64.tar.gz
$ sudo mv go /usr/local
$ sudo ln -s /usr/local/go/bin/go /usr/local/bin/go
$ nano ~/.profile
	export GOPATH=$HOME/go
	export PATH=$PATH:/usr/local/go/bin
$ source ~/.profile (확인 : go version)

- 하이퍼레저 패브릭 / 카우치db / 관련 유틸 설치 및 PATH 설정
$ curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.7 1.4.7 0.4.21
$ vi ~/.profile
	export PATH=$PATH:/usr/local/go/bin:~/fabric-samples/bin
$ source ~/.profile (확인 : echo $PATH, cryptogen version)

- 추가 유틸(리눅스)
$ apt-get install vim tree openssh-server







### 네트워크 확장

- 프로젝트 폴더 생성 + basic-network에서 관련 파일 복사
$ mkdir dev
$ cd dev
$ mkdir simple-network
$ cd simple-network
$ mkdir network contract application
$ cd ~/fabric-samples/basic-network
$ cp .env configtx.yaml crypto-config.yaml generate.sh docker-compose.yml start.sh teardown.sh ~/dev/simple-network/network
$ cd ~/dev/simple-network/network

crypto-config.yaml 수정(org 추가)
configtx.yaml 수정(org 추가)
generate.sh 수정(명령어 수정)
$ ./generate.sh (확인 : tree config, tree -L 3 crypto-config)
docker-compose.yml 수정
start.sh 수정
$ ./start.sh


- 확인
$ docker exec peer0.org1.example.com peer channel list
$ docker exec peer0.org2.example.com peer channel list
$ docker exec peer0.org3.example.com peer channel list


- CA 추가
docker-compose.yml 수정
start.sh 수정


- 앵커 피어 추가
gerate.sh 수정
start.sh 수정```
