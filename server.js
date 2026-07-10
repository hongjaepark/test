const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 80;

// 데이터를 저장할 JSON 파일 경로 (간단한 DB 역할)
const DATA_FILE = path.join(__dirname, 'notes.json');

// 미들웨어 설정
app.use(cors()); // 프론트엔드와 백엔드의 도메인/포트가 달라도 통신할 수 있게 허용
app.use(express.json()); // JSON 형태의 요청 Body를 파싱
app.use(express.static(__dirname)); // 포트폴리오 프로젝트 폴더 전체를 웹 서버로 제공

// 파일이 없으면 초기화
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// [GET] 모든 노트 불러오기
app.get('/api/notes', (req, res) => {
    try {
        const notes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: '서버 에러: 데이터를 읽을 수 없습니다.' });
    }
});

// [POST] 새 노트 추가
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    if (text) {
        const notes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
        notes.push({ text, timestamp });
        fs.writeFileSync(DATA_FILE, JSON.stringify(notes));
        res.status(201).json({ message: '노트가 성공적으로 추가되었습니다.' });
    } else {
        res.status(400).json({ message: '노트 내용이 비어있습니다.' });
    }
});

// [PUT] 노트 수정
app.put('/api/notes/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { text } = req.body;
    const notes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    if (index >= 0 && index < notes.length && text) {
        if (typeof notes[index] === 'string') {
            notes[index] = { text, timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) };
        } else {
            notes[index].text = text;
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(notes));
        res.json({ message: '노트가 성공적으로 수정되었습니다.' });
    } else {
        res.status(400).json({ message: '유효하지 않은 요청입니다.' });
    }
});

// [DELETE] 노트 삭제
app.delete('/api/notes/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const notes = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
        fs.writeFileSync(DATA_FILE, JSON.stringify(notes));
        res.json({ message: '노트가 성공적으로 삭제되었습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 서버가 실행 중입니다: http://localhost:${PORT}`);
});