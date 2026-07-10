console.log("main.js 파일이 정상적으로 실행되었습니다.");

// JS가 정상적으로 로드 및 실행되었음을 HTML 최상단 태그에 표시 (CSS 호환성 처리 용도)
document.documentElement.classList.add('js');
/**
 * 1부터 45까지의 숫자 중 중복되지 않는 6개의 랜덤 숫자를 생성하여 오름차순으로 정렬해 반환합니다.
 * @returns {number[]} 6개의 로또 번호가 담긴 숫자 배열
 */
function generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
        const number = Math.floor(Math.random() * 45) + 1;
        if (!lottoNumbers.includes(number)) {
            lottoNumbers.push(number);
        }
    }
    return lottoNumbers.sort((a, b) => a - b);
}

const luckyNumbers = generateLottoNumbers();
console.log("이번 주 로또 예상 번호:", luckyNumbers);

// 더하기 함수
function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log("5와 3의 합:", result);

/* ==========================================
   포트폴리오 인터랙티브 기능 추가
========================================== */

// 1. 헤더 텍스트 타이핑 효과
document.addEventListener("DOMContentLoaded", () => {
    const headerTextElement = document.querySelector("header p");
    const text = headerTextElement.textContent;
    headerTextElement.textContent = ""; // 기존 텍스트 비우기
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            headerTextElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60); // 타이핑 속도 (ms 단위, 숫자가 작을수록 빠름)
        }
    }
    
    typeWriter();
});

// 2. 스크롤 등장 애니메이션 (Intersection Observer)
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 한 번 나타난 후에는 관찰 해제
        }
    });
}, { threshold: 0.15 }); // 섹션이 15% 정도 보일 때 실행

sections.forEach(section => {
    observer.observe(section);
});