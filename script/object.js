// @ts-check

export class SnakeGame {
  constructor(절반=2, 길이=5) {
    this.타일 = new Array(절반 * 2 + 1).fill(new Array(절반 * 2 + 1).fill(0));
    this.머리 = [절반, 절반];
    this.사과 = [절반, 절반];
    this.길이 = 길이;
  }
  /** @type {Number[][]} */
  타일;

  길이;

  머리;
  사과;

  /** @param {Number} 방향  */
  머리이동(방향) {
    switch (방향) {
      case 0: // 상
        
        return;
      case 1: // 하
        
        return;
      case 2: // 좌
        
        return;
      case 3: // 우
        
        return;
    }
  }
  꼬리이동() {
    this.타일.forEach(X=> {
      X.forEach(값=> {
        값 = Math.max(0, 값 - 1);
      });
    });
  }
  길이감소() {
    this.길이 -= 1;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  출력(ctx) {

  }
}