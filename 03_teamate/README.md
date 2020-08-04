```
# 오늘 한 일
teamate web - fabric 연동
실행순서
generate.sh > start.sh > cc_tea.sh > node enrollAdmin.js > node registerUser.js > npm server.js > teardown.sh


#패브릭과 웹서버 연결을 위해 필요한 요소

1.SDK
fabric-ca-client : ca 접근
fabric-network : 체인코드 호출
fabric-client : 네트워크 설정 변경 등(체인코드 설치/피어 추가 - 관리자 권한이 있을 경우)

2.인증서

3.연결 정보
connection.js



#vscode 리눅스 연결
$ apt-get install openssh-server
$ sudo systemctl start sshd
포트포워딩
vscode 확장프로그램 SSH FS 설치
F1 -> Create new configuration(하단 설정)
	host : localhost
	username : bstudent
	password : 1234
	Root : ~/dev
탐색기 하단 SSH FILE SYSTEMS

# 터미널-리눅스 연결
ssh bstudent@localhost



# app - fabric 연동시
invoke = submitTransaction
query = evaluateTransaction
```
