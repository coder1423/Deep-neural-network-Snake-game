import {모델} from "./DNN.js";
import {SnakeGame} from "./object.js";

const MCtx = document.getElementById('mainScreen').getContext("2d");
const ACtx = document.getElementById('assistantScreen').getContext("2d");

/** @type {SnakeGame} */
let 메인;
/** @type {SnakeGame} */
let 보조;

function 학습시작() {
  ACtx.clearRect(0, 0, 1000, 1000);
  애니매이션간격 = 1000 / 3;
  메인 = new SnakeGame(1);
  실행함수 = 직접게임;
}

async function 직접게임() {
  메인.꼬리이동()
  학습인공지능.데이터.입력(메인.데이터, 화살표숫자화(화살표))
  const 반환 = 메인.머리이동( 화살표숫자화(화살표) )
  if (반환[0]) {
    if (반환[1]) {
      if (메인.길이증가()) {
        실행함수 = async function() {}
        ACtx.clearRect(0, 0, 1000, 1000);
        ACtx.fillStyle = "rgb(228, 226, 226)";
        ACtx.font ="20pt '맑은 고딕";
        ACtx.fillText("인공지능 학습중, 잠시 기다려주세요.", 10, 100);
        await 학습인공지능.학습();
        설명출력();
        입력대기 = true;
      }
    }
    메인.출력(MCtx, '0, 150, 255');
  } else {
    실행함수 = async function() {}
    ACtx.clearRect(0, 0, 1000, 1000);
    ACtx.fillStyle = "rgb(228, 226, 226)";
    ACtx.font ="20pt '맑은 고딕";
    ACtx.fillText("인공지능 학습중, 잠시 기다려주세요.", 10, 100);
    await 학습인공지능.학습();
    설명출력();
    입력대기 = true;
  }
}

async function 대결시작() {
  애니매이션간격 = 1000 / 5;
  메인 = new SnakeGame(5);
  보조 = new SnakeGame(5);
  실행함수 = 인공대결;
}

async function 인공대결() {
  메인.꼬리이동();
  보조.꼬리이동();
  const 메인반환 = 메인.머리이동( await 학습인공지능.행동반환(메인.데이터) );
  const 보조반환 = 보조.머리이동( await 대결인공지능.행동반환(보조.데이터) );
  if (메인반환[0]) {
    if (!보조반환[0]) {
      실행함수 = async function() {}
      await 학습인공지능.저장();
      await 대결인공지능.불러오기();
      학습인공지능 = new 모델();
      입력대기 = true;
      실행함수 = async function() {}
      ACtx.clearRect(0, 0, 1000, 1000);
      ACtx.fillStyle = "rgb(228, 226, 226)";
      ACtx.font ="20pt '맑은 고딕";
      ACtx.fillText("교체성공.", 10, 100);
      return;
    }
    if (메인반환[1] && !보조반환[1]) {
      메인.길이증가();
      보조.길이감소();
    } else if (보조반환[1] && !메인반환[1]) {
      메인.길이감소();
      보조.길이증가();
    }
    메인.출력(MCtx, '0, 150, 255');
    보조.출력(ACtx, '180, 30, 255');
  } else {
    실행함수 = async function() {}
    입력대기 = true;
    ACtx.clearRect(0, 0, 1000, 1000);
    ACtx.fillStyle = "rgb(228, 226, 226)";
    ACtx.font ="20pt '맑은 고딕";
    ACtx.fillText("교체실패.", 10, 100);
    return;
  }
}

설명출력();
let 학습인공지능 = new 모델();
let 대결인공지능 = new 모델();


function 설명출력() {
  ACtx.clearRect(0, 0, 1000, 1000);

  ACtx.fillStyle = "rgb(228, 226, 226)";
  ACtx.font ="20pt '맑은 고딕";

  ACtx.fillText("스네이크 게임입니다.", 10, 100);
  ACtx.fillText("인공지능은 당신의 행동을 바탕으로 학습합니다.", 10, 200);
  ACtx.fillText("이전 체험자의 인공지능을 이길 수 있도록 인공지능을 학습시키세요.", 10, 300);
  ACtx.fillText("승리한 인공지능이 이전 인공지능을 대체합니다.", 10, 400);

  ACtx.fillText("화살표로 게임 시작, 스페이스바로 대결 시작.", 10, 600);
  ACtx.fillText("F11을 눌러 최대화면, F5를 눌러 프로그램 초기화", 10, 700);
}

let 입력대기 = true;
function 화살표숫자화(화살표) {
  switch (화살표) {
    case 'ArrowUp':
    return 0;
    case 'ArrowDown':
    return 1;
    case 'ArrowLeft':
    return 2;
    case 'ArrowRight':
    return 3;
  }
}
let 화살표;
const 화살표배열 = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function 키보드입력(사건) {
  if ( 화살표배열.includes(사건.key) ) {
    화살표 = 사건.key;
    if (입력대기) {
      입력대기 = false;
      학습시작();
    }
  }

  if (사건.key == ' ' && 입력대기) {
    입력대기 = false;
    대결시작();
  }
}


let 실행함수 = async function() {}
let 출력애니매이션 = null;
let 애니매이션간격 = 1000 / 2;
let 이전작동시간 = 0;
async function 애니매이션(시간원점이후경과시간) {
  const 이전작동이후경과 = 시간원점이후경과시간 - 이전작동시간;
  if (이전작동이후경과 >= 애니매이션간격) {
    이전작동시간 = 시간원점이후경과시간 - (이전작동이후경과 % 애니매이션간격);
    await 실행함수();
  }
  출력애니매이션 = requestAnimationFrame(애니매이션);
}
애니매이션();

window.addEventListener("keydown", 키보드입력);