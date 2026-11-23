// ==UserScript==
// @name         덕천도서관 서가위치 출력
// @namespace    dclibrary
// @version      2026-11-22
// @description  도서관 서가위치&지도 표시
// @author       IdeaCannon
// @match        https://library.busan.go.kr/dcbooks/book/search/bookPrint
// @icon         https://www.google.com/s2/favicons?sz=64&domain=library.busan.go.kr
// @grant        none
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://raw.githubusercontent.com/bslibdev/dcliblocation/refs/heads/main/dcliblocation.js
// @downloadURL  https://raw.githubusercontent.com/bslibdev/dcliblocation/refs/heads/main/dcliblocation.js
// ==/UserScript==

(function () {
    'use strict';

    function onDocumentReady(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }

    onDocumentReady(() => {
        // 프린트 함수 가로채기
        window.newPrint = window.print;
        window.print = () => { };

        // 윈도우 닫기 함수 가로채기
        window.newClose = window.close;
        window.close = () => { };

        $('colgroup col').eq(0).css('width', '65px');
        $('table').css('width', '235px');

        let trList = $('tr');
        console.log(trList);

        let 서명 = trList.eq(1).find('td:eq(1)').text().trim();
        let 청구기호 = trList.eq(2).find('td:eq(1)').text().trim();
        let 등록번호 = trList.eq(3).find('td:eq(1)').text().trim();
        let 저자 = trList.eq(4).find('td:eq(1)').text().trim();
        let 자료실 = trList.eq(5).find('td:eq(1)').text().trim();

        // 기존 tr 삭제
        trList.eq(1).remove();
        trList.eq(2).remove();
        trList.eq(3).remove();
        trList.eq(4).remove();
        trList.eq(5).remove();

        const 서가번호표 = [
            { 별치기호: '영유아', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '영유아' },
            { 별치기호: '보드북', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '보드북' },
            { 별치기호: '팝업', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '팝업북' },
            { 별치기호: '사운드북', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '사운드북' },
            { 별치기호: '빅북', 시작번호: '000-1', 끝번호: '813.8-90', 서가번호: '빅북1' },
            { 별치기호: '빅북', 시작번호: '813.8-91', 끝번호: '999.999', 서가번호: '빅북2' },
            { 별치기호: '아동', 시작번호: '000-1', 끝번호: '082-4', 서가번호: '아동-01' },
            { 별치기호: '아동', 시작번호: '082-5', 끝번호: '099', 서가번호: '아동-02' },
            { 별치기호: '아동', 시작번호: '100', 끝번호: '199.999', 서가번호: '아동-03' },
            { 별치기호: '아동', 시작번호: '200', 끝번호: '299.999', 서가번호: '아동-04' },
            { 별치기호: '아동', 시작번호: '300', 끝번호: '360.999', 서가번호: '아동-05' },
            { 별치기호: '아동', 시작번호: '361', 끝번호: '399.999', 서가번호: '아동-06' },
            { 별치기호: '아동', 시작번호: '400', 끝번호: '408-8', 서가번호: '아동-07' },
            { 별치기호: '아동', 시작번호: '408-9', 끝번호: '599.999', 서가번호: '아동-08' },
            { 별치기호: '아동', 시작번호: '600', 끝번호: '808.3-28', 서가번호: '아동-09' },
            { 별치기호: '아동', 시작번호: '808.3-29', 끝번호: '808.3-89', 서가번호: '아동-10' },
            { 별치기호: '아동', 시작번호: '808.3-90', 끝번호: '813.8-160', 서가번호: '아동-11' },
            { 별치기호: '아동', 시작번호: '813.8-161', 끝번호: '813.8-880', 서가번호: '아동-12' },
            { 별치기호: '아동', 시작번호: '813.8-881', 끝번호: '843-140', 서가번호: '아동-13' },
            { 별치기호: '아동', 시작번호: '843-141', 끝번호: '999.999', 서가번호: '아동-14' },
            { 별치기호: '유아', 시작번호: '813.8-71', 끝번호: '899.999', 서가번호: '아동-15' },
            { 별치기호: '유아', 시작번호: '000-1', 끝번호: '813.8-70', 서가번호: '아동-16' },
            { 별치기호: '유아', 시작번호: '900', 끝번호: '999.999', 서가번호: '아동-17' },
            { 별치기호: 'AR도서', 시작번호: '000-1', 끝번호: '999.999', 서가번호: 'AR,더책' },
            { 별치기호: '더책', 시작번호: '000-1', 끝번호: '999.999', 서가번호: 'AR,더책' },
            { 별치기호: '아동영어', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '아동영어' },
            { 별치기호: '아동잡지', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '아동잡지' },
            { 별치기호: '', 시작번호: '000-1', 끝번호: '028', 서가번호: '2층-01' },
            { 별치기호: '', 시작번호: '029', 끝번호: '126.4', 서가번호: '2층-02' },
            { 별치기호: '', 시작번호: '126.5', 끝번호: '189-29', 서가번호: '2층-03' },
            { 별치기호: '', 시작번호: '189-30', 끝번호: '199.999', 서가번호: '2층-04' },
            { 별치기호: '', 시작번호: '200', 끝번호: '229.999', 서가번호: '2층-05' },
            { 별치기호: '', 시작번호: '230', 끝번호: '299.999', 서가번호: '2층-06' },
            { 별치기호: '', 시작번호: '300', 끝번호: '321.5-19', 서가번호: '2층-07' },
            { 별치기호: '', 시작번호: '321.5-20', 끝번호: '325.1-49', 서가번호: '2층-08' },
            { 별치기호: '', 시작번호: '325.1-50', 끝번호: '325.211-159', 서가번호: '2층-09' },
            { 별치기호: '', 시작번호: '325.211-160', 끝번호: '325.22', 서가번호: '2층-10' },
            { 별치기호: '', 시작번호: '325.23', 끝번호: '326', 서가번호: '2층-11' },
            { 별치기호: '', 시작번호: '327', 끝번호: '331.11', 서가번호: '2층-12' },
            { 별치기호: '', 시작번호: '331.12', 끝번호: '336.84', 서가번호: '2층-13' },
            { 별치기호: '', 시작번호: '337', 끝번호: '363.999', 서가번호: '2층-14' },
            { 별치기호: '', 시작번호: '364', 끝번호: '399.999', 서가번호: '2층-15' },
            { 별치기호: '', 시작번호: '400', 끝번호: '419.999', 서가번호: '2층-16' },
            { 별치기호: '', 시작번호: '420', 끝번호: '499.999', 서가번호: '2층-17' },
            { 별치기호: '', 시작번호: '500', 끝번호: '579.11', 서가번호: '3층-18' },
            { 별치기호: '', 시작번호: '579.12', 끝번호: '599.999', 서가번호: '3층-19' },
            { 별치기호: '', 시작번호: '600', 끝번호: '699.999', 서가번호: '3층-20' },
            { 별치기호: '', 시작번호: '700', 끝번호: '799.999', 서가번호: '3층-21' },
            { 별치기호: '', 시작번호: '800', 끝번호: '808-5', 서가번호: '3층-22' },
            { 별치기호: '', 시작번호: '808-6', 끝번호: '810.8', 서가번호: '3층-23' },
            { 별치기호: '', 시작번호: '810.9', 끝번호: '813.7-549', 서가번호: '3층-24' },
            { 별치기호: '', 시작번호: '813.7-550', 끝번호: '814.7-219', 서가번호: '3층-25' },
            { 별치기호: '', 시작번호: '814.7-220', 끝번호: '818-789', 서가번호: '3층-26' },
            { 별치기호: '', 시작번호: '818-790', 끝번호: '833.6-469', 서가번호: '3층-27' },
            { 별치기호: '', 시작번호: '833.6-470', 끝번호: '843-519', 서가번호: '3층-28' },
            { 별치기호: '', 시작번호: '843-520', 끝번호: '859.999', 서가번호: '3층-29' },
            { 별치기호: '', 시작번호: '860', 끝번호: '909-49', 서가번호: '3층-30' },
            { 별치기호: '', 시작번호: '909-50', 끝번호: '911.058', 서가번호: '3층-31' },
            { 별치기호: '', 시작번호: '911.059', 끝번호: '999.999', 서가번호: '3층-32' },
            { 별치기호: '큰글자', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '부산,큰글자' },
            { 별치기호: '부산출판', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '부산,큰글자' },
            { 별치기호: '부모교육', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '부모교육' },
            { 별치기호: '웹툰', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '웹툰' },
            { 별치기호: '다문화', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '다문화' },
            { 별치기호: '영어원서', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '영어원서' },
            { 별치기호: '점자도서', 시작번호: '000-1', 끝번호: '999.999', 서가번호: '점자' }
        ];

        // 복합 번호 비교 함수
        function compareCompoundNumbers(num1, num2) {
            let parts1 = num1.split('-');
            let parts2 = num2.split('-');

            // 소수점 부분을 포함하여 각 파트를 비교
            for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                let part1 = parts1[i] ? parseFloat(parts1[i]) : 0; // 없으면 0으로 채움
                let part2 = parts2[i] ? parseFloat(parts2[i]) : 0;

                if (part1 < part2) return -1;
                if (part1 > part2) return 1;
            }
            return 0; // 완전히 같으면 0
        }

        // 청구기호에서 별치기호와 번호 추출
        let 청구기호부분들 = 청구기호.split(' ');

        // 청구기호가 별치기호 없이 숫자만 있을 경우를 처리
        let 별치기호 = 청구기호부분들.length === 2 ? 청구기호부분들[0] : ''; // 별치기호가 없으면 빈칸
        let 번호 = 청구기호부분들.length === 2 ? 청구기호부분들[1] : 청구기호부분들[0]; // 번호는 항상 두 번째 요소

        // 자료실 값에 따른 서가위치 설정
        let 서가위치 = '서가번호를 찾을 수 없습니다';
        if (자료실.includes('종합자료실(신간코너)')) {
            서가위치 = '종합자료실-신간';
        } else if (자료실.includes('어린이자료실(신간코너)')) {
            서가위치 = '어린이자료실-신간';
        } else {
            // 서가번호 찾기
            for (let i = 0; i < 서가번호표.length; i++) {
                let 항목 = 서가번호표[i];
                if (항목.별치기호 === 별치기호 && compareCompoundNumbers(번호, 항목.시작번호) >= 0 && compareCompoundNumbers(번호, 항목.끝번호) <= 0) {
                    서가위치 = 항목.서가번호;
                    break;
                }
            }
        }


        // 표 정렬을 위한 새로운 tr 추가
        trList.eq(0).find('td:eq(0)').html("<div style='border-top: 1px dashed black;'></div>");

        const labelStyle = "width: 65px; white-space: nowrap; font-size: 14px; text-align: justify; font-weight: bold; font-family:MalgunGothic;";
        const valueStyle = "font-size: 14px; font-weight: bold; font-family:MalgunGothic;";

        function createRow(labelHtml, valueText) {
            const $tr = $("<tr class='first td1'></tr>");
            const $labelTd = $(`<td style='${labelStyle}'></td>`).html(labelHtml);
            const $valTd = $(`<td class='last td2' style='${valueStyle}'></td>`).text(valueText);
            return $tr.append($labelTd, $valTd);
        }

        $('tr').eq(1).before(createRow('제&nbsp;&nbsp;&nbsp;&nbsp;목:', 서명));
        $('tr').eq(2).before(createRow('청구기호:', 청구기호));
        $('tr').eq(3).before(createRow('등록번호:', 등록번호));
        $('tr').eq(4).before(createRow('저&nbsp;&nbsp;&nbsp;&nbsp;자:', 저자));

        const is신간 = 자료실.includes('(신간)') || 자료실.includes('(신간코너)');

        자료실 = 자료실
            .replace('[덕천]', '')
            .replace('종합자료실(신간코너)', '[2층]-종합자료실')
            .replace('(신간코너)', '')
            .replace('종합자료실 1(2층)', '[2층]-종합자료실')
            .replace('종합자료실 2(3층)', '[3층]-종합자료실')
            .replace('어린이자료실', '[1층]-어린이자료실')
            .replace('그림책방', '[1층]-어린이실 내부')
            .replace('영유아자료실', '[1층 외부]-영유아실')
            .trim();

        $('tr').eq(5).before(createRow('자&nbsp;료&nbsp;실: ', 자료실));

        trList.eq(6).find('td:eq(0)').html("");

        const 주제분류 = {
            '0': '총류',
            '1': '철학',
            '2': '종교',
            '3': '사회과학',
            '4': '자연과학',
            '5': '기술과학',
            '6': '예술',
            '7': '언어',
            '8': '문학',
            '9': '역사'
        };
        const 별치기호매핑 = {
            '영유아': '영유아',
            '보드북': '보드북',
            '팝업북': '팝업북',
            '사운드북': '사운드북',
            '빅북': '빅북',
            'AR': 'AR도서',
            '더책': '더책(오디오북)',
            '아동영어': '아동영어',
            '아동잡지': '아동잡지',
            '부산': '부산출판',
            '큰글자': '큰글자',
            '부모교육': '부모교육',
            '웹툰': '웹툰',
            '다문화': '다문화',
            '영어원서': '영어원서',
            '점자': '점자도서'
        };
        let lastTr = $('tr:last');
        const matched별치기호 = Object.keys(별치기호매핑).find(key => 청구기호.includes(key));
        const firstDigitMatch = 청구기호.match(/\d/);
        const 서가위치출력 = is신간
            ? '신간자료 코너'
            : (matched별치기호
                ? `${별치기호매핑[matched별치기호]} 서가`
                : (firstDigitMatch
                    ? `${firstDigitMatch[0]}00(${주제분류[firstDigitMatch[0]]}) 서가`
                    : 서가위치));
        lastTr.before(createRow('서가위치: ', 서가위치출력));

        // 서가위치에 따라 이미지 호출
        let imageUrl;

        if (서가위치 === '영유아') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-영유아.png';
        } else if (서가위치 === '보드북') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-보드북.png';
        } else if (서가위치 === '팝업북') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-팝업북.png';
        } else if (서가위치 === '사운드북') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-사운드북.png';
        } else if (서가위치 === '빅북1') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-빅북1.png';
        } else if (서가위치 === '빅북2') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/영유아실-빅북2.png';
        } else if (서가위치 === '어린이자료실-신간') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-신간.png';
        } else if (서가위치 === '아동-01') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-01.png';
        } else if (서가위치 === '아동-02') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-02.png';
        } else if (서가위치 === '아동-03') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-03.png';
        } else if (서가위치 === '아동-04') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-04.png';
        } else if (서가위치 === '아동-05') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-05.png';
        } else if (서가위치 === '아동-06') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-06.png';
        } else if (서가위치 === '아동-07') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-07.png';
        } else if (서가위치 === '아동-08') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-08.png';
        } else if (서가위치 === '아동-09') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-09.png';
        } else if (서가위치 === '아동-10') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-10.png';
        } else if (서가위치 === '아동-11') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-11.png';
        } else if (서가위치 === '아동-12') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-12.png';
        } else if (서가위치 === '아동-13') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-13.png';
        } else if (서가위치 === '아동-14') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-14.png';
        } else if (서가위치 === '아동-15') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-15.png';
        } else if (서가위치 === '아동-16') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-16.png';
        } else if (서가위치 === '아동-17') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-17.png';
        } else if (서가위치 === 'AR,더책') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-AR,더책.png';
        } else if (서가위치 === '아동영어') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-아동영어.png';
        } else if (서가위치 === '아동잡지') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/어린이실-잡지.png';
        } else if (서가위치 === '2층-01') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-01.png';
        } else if (서가위치 === '2층-02') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-02.png';
        } else if (서가위치 === '2층-03') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-03.png';
        } else if (서가위치 === '2층-04') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-04.pngg';
        } else if (서가위치 === '2층-05') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-05.png';
        } else if (서가위치 === '2층-06') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-06.png';
        } else if (서가위치 === '2층-07') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-07.png';
        } else if (서가위치 === '2층-08') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-08.png';
        } else if (서가위치 === '2층-09') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-09.png';
        } else if (서가위치 === '2층-10') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-10.png';
        } else if (서가위치 === '2층-11') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-11.png';
        } else if (서가위치 === '2층-12') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-12.png';
        } else if (서가위치 === '2층-13') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-13.png';
        } else if (서가위치 === '2층-14') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-14.png';
        } else if (서가위치 === '2층-15') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-15.png';
        } else if (서가위치 === '2층-16') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-16.png';
        } else if (서가위치 === '2층-17') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-17.png';
        } else if (서가위치 === '3층-18') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-18.png';
        } else if (서가위치 === '3층-19') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-19.png';
        } else if (서가위치 === '3층-20') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-20.png';
        } else if (서가위치 === '3층-21') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-21.png';
        } else if (서가위치 === '3층-22') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-22.png';
        } else if (서가위치 === '3층-23') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-23.png';
        } else if (서가위치 === '3층-24') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-24.png';
        } else if (서가위치 === '3층-25') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-25.png';
        } else if (서가위치 === '3층-26') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-26.png';
        } else if (서가위치 === '3층-27') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-27.png';
        } else if (서가위치 === '3층-28') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-28.png';
        } else if (서가위치 === '3층-29') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-29.png';
        } else if (서가위치 === '3층-30') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-30.png';
        } else if (서가위치 === '3층-31') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-31.png';
        } else if (서가위치 === '3층-32') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(3층)-32.png';
        } else if (서가위치 === '종합자료실-신간') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-신간.png';
        } else if (서가위치 === '부산,큰글자') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-부산,큰글자.png';
        } else if (서가위치 === '부모교육') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-부모교육.png';
        } else if (서가위치 === '웹툰') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-웹툰.png';
        } else if (서가위치 === '다문화') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-다문화.png';
        } else if (서가위치 === '영어원서') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-영어원서.png';
        } else if (서가위치 === '점자') {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/종합자료실(2층)-점자.png';
        } else {
            imageUrl = 'https://bslibdev.github.io/dcliblocation/img/이미지 추가중.png';//  기본이미지
        }

        // 이미지 추가
        lastTr.before(`
            <tr>
                <td colspan="2" style="text-align: center;">
                    <img src="${imageUrl}"
                         style="width: 235px; height: auto; float: left;"/>
                </td>
            </tr>
        `);


        // 이미지 로드가 완료되면 창 닫기
        let imageCount = $('img').length;
        let loadedImageCount = 0;

        $('img').on('load', function () {
            loadedImageCount++;
            if (loadedImageCount === imageCount) {
                window.newPrint();
                setTimeout(window.newClose, 1000); // 1초 지연 후 창 닫기
            }
        });
    });
})();
