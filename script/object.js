// @ts-check

export class SnakeGame {
  /** @param {number} 길이 */
  constructor(길이) {
    this.#길이 = 길이;
    this.#타일 = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,길이,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
    ];
    this.사과이동();
  }
  #타일 = [[0]];

  #길이;
  #머리 = [2, 2]; // (Y, X)
  #사과 = [2, 2];

  get 데이터() {
    // @ts-ignore
    return [].concat(this.#타일[0], this.#타일[1], this.#타일[2], this.#타일[3], this.#타일[4], this.#머리, this.#사과);
  }

  /** return [게임오버가아님, 사과를먹음]
   * @param {Number} 방향
   * */
  머리이동(방향) {
    switch (방향) {
      case 0: // 상
        this.#머리[1] -= 1;
        break;

      case 1: // 하
        this.#머리[1] += 1;
        break;

      case 2: // 좌
        this.#머리[0] -= 1;
        break;

      case 3: // 우
        this.#머리[0] += 1;
        break;
    }
    const 임시 = this.머리검사_및_머리할당();
    return 임시;
  }
  /** return [게임오버가아님, 사과를먹음] */
  머리검사_및_머리할당() {
    if (
      this.#타일[this.#머리[0] ]?.[this.#머리[1] ] == undefined ||
      this.#타일[this.#머리[0] ]?.[this.#머리[1] ] > 0
      ) {
      return [false, false]
    }
    this.#타일[this.#머리[0] ][this.#머리[1] ] = this.#길이;
    if (this.#머리[0] == this.#사과[0] && this.#머리[1] == this.#사과[1]) {
      this.사과이동();
      return [true, true]
    }
    return [true, false]
  }
  사과이동() {
    let 임시 = [무작위정수(0, 4), 무작위정수(0, 4)]
    while (this.#타일[ 임시[0] ][ 임시[1] ] > 0) {
      임시 = [무작위정수(0, 4), 무작위정수(0, 4)]
    }
    this.#사과 = 임시;
  }
  꼬리이동() {
    this.#타일.forEach((줄,X)=> {
      줄.forEach((값,Y)=> {
        this.#타일[X][Y] = Math.max(0, 값 - 1);
      });
    });
  }
  /** return #길이 > 10 */
  길이증가() {
    this.#길이 += 1;
    return this.#길이 > 10;
  }
  /** return #길이 > 0 */
  길이감소() {
    this.#길이 -= 1;
    return this.#길이 > 0;
  }

  #칸넓이 = 200;
  /** @param {CanvasRenderingContext2D} ctx */
  출력(ctx, 색상) {
    ctx.clearRect(0, 0, 1000, 1000);
    this.#타일.forEach((줄, X)=> {
      줄.forEach((타일, Y)=> {
        ctx.fillStyle = `rgb(${색상}, ${타일 * 0.15})`;
        ctx.fillRect(this.#칸넓이 * X, this.#칸넓이 * Y, this.#칸넓이, this.#칸넓이);
      });
    });
    ctx.fillStyle = `rgb(255, 0, 0, 1)`;
    ctx.fillRect(this.#칸넓이 * this.#사과[0], this.#칸넓이 * this.#사과[1], this.#칸넓이, this.#칸넓이);
  }
}

/**
 * @param {number} min
 * @param {number} max
 */
function 무작위정수(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}