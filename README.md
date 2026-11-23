# dcliblocation
덕천도서관 서가위치 출력 저장소

PC 웹 브라우저(구글 Chrome 기준)에서 Chrome 웹 스토어에 접속하여 'Tampermonkey' 설치
Chrome 우측 상단 퍼즐(확장 프로그램) 아이콘 → [확장 프로그램 관리] (chrome://extensions) 접속 후 우측 상단의 [개발자 모드] 활성화
Tampermonkey 항목의 [세부정보] 클릭 → [사용자 스크립트 허용] 옵션 활성화
브라우저 우측 상단 Tampermonkey 아이콘 클릭 → [대시보드] 선택
열린 대시보드 화면에 첨부 제출한 스크립트 파일(dcliblocation.js 또는 juryeliblocation.js)을 드래그 앤 드롭한 뒤, 나타나는 설치 확인 화면에서 [설치] 버튼 클릭
부산광역시 공공도서관 통합 도서검색 페이지 접속
덕천도서관: https://library.busan.go.kr/dcbooks/
주례열린도서관: https://library.busan.go.kr/juryebooks/
임의의 도서를 검색한 뒤, 대출가능한 도서의 상세정보에서 [청구기호 출력(인쇄)] 버튼 클릭
팝업창이 열리며 스크립트가 자동 실행되고, 서가위치·주제분류명 및 층별 서가 약도 이미지가 포함된 인쇄 미리보기 화면이 자동 표시됨
