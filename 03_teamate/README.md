```
# 오늘 한 일
https://github.com/saarc/teamate/tree/master/contract 참고 체인코드 작성
01에서 설정한 환경 및 네트워크에 체인코드 설치 및 배포 +@ 체인코드 업그레이드


# 준비물 생성
cryptoconfig.yaml
config.yaml
gerate.sh -> 실행 결과
	crypto-config dir
	config dir - genesis.block / channel.tx


# 네트워크 구성
.env
docker-compose.yml
	네트워크 이름
	서비스 설정
		이미지 이름
		환경변수
		포트
		시작 폴더
		시작 명령
		공유 폴더
start.sh


# 채널 생성
peer channel create
peer channel join(각 peer 별로)


# 체인코드
사용 가능한 언어 : go / java / js
주요 요소 : shim / peer / contract
체인코드 설치는 피어
체인코드 배포는 채널


# 체인코드 업데이트
install은 동일
instantiate 대신 upgrade로 진행(instantiate는 되지 않음)


# cli 명령어
-n 체인코드 이름 : 원하는 별칭 사용
-p 체인코드 경로 : 도커에서 공유폴더로 설정하여 해당하는 경로를 잘 설정해야 함


# 실행 순서
- generate.sh : CA 및 MSP 등 인증서 생성(이미 생성되어 있다면 다시 하지 않아도 됨)
- start.sh : CA 키 값 설정 및 도커 컨테이너 up / 채널 생성 / 채널에 피어 조인 / 앵커 피어 설정
- cc.sh 등 체인코드 실행(공유폴더 위치에 체인코드가 위치해 있어야 하고 go build가 되어 있어야 함)
- teardown.sh : 컨테이너 down(가끔 모두 지워지지 않을 경우가 있어 docker ps로 확인 요망)
	지워지지 않는 컨테이너가 있을시 docker rm -rf 컨테이너 이름 또는 id로 삭제
```
