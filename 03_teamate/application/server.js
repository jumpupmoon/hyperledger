// 웹서버 모듈 포함 
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// 패브릭 연결정보 설정
const {FileSystemWallet, Gateway} = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// 웹서버 설정
const port = 8080;
const host = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 페이지 라우팅 index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

// REST 라우팅
// add user - name - POST
app.post('/user', async (req, res) => {
    const name = req.body.name;
    const result = await cc_call('addUser', name);
    res.status(200).send('Transaction has been submitted');
})

// add rating - name project rating - POST
app.post('/rating', async (req, res) => {
    const name = req.body.name;
    const project = req.body.project;
    const rating = req.body.rating;
    await cc_call('addRating', name, project, rating);
    res.status(200).send('Transaction has been submitted');
})

// read user - name - GET
app.get('/user/:name', async (req, res) => {
    const name = req.params.name;
    const result = await cc_call('readRating', name);
    if(!result.toString()) {
        res.status(400);
        return;
    }
    const myobj = JSON.parse(result);
    res.status(200).json(myobj);
})

// 체인코드 submitTransaction
async function cc_call(fn, ...args) {
    // 인증서 가져오기
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // 체인코드 수행 및 결과 반환
    const gateway = new Gateway();
    await gateway.connect(ccp, {wallet, identity: 'user1', discovery: {enabled: false}});
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('teamate');

    let result;
    
    if(fn == 'addUser' || fn == 'addRating') {
       result = await contract.submitTransaction(fn, ...args);
       console.log('Transaction has been submitted');
    } else if(fn == 'readRating') {
        result = await contract.evaluateTransaction(fn, ...args);
    }
    await gateway.disconnect();

    return result;
}

// 서버 시작
app.listen(port, host);
console.log(`running on http://${host}:${port}`);