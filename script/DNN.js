import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js";

const model_param = {
  layers: [
    tf.layers.dense({inputShape: 29, units: 32, activation: 'relu'}),
    tf.layers.dense({units: 32, activation: 'relu'}),
    tf.layers.dense({units: 32, activation: 'relu'}),
    tf.layers.dense({units: 4}),
  ]
}
const compile_param = {
  optimizer: tf.train.adam(),
  loss: tf.losses.meanSquaredError,
}
const fitParam = {
  epochs: 100,
  batchSize: 1,
}

class 데이터 {
  #상태 = [];
  #행동 = [];

  #포인터 = 0;
  #메모리크기 = 1000;

  입력(상태, 행동) {
    this.#상태[this.#포인터] = 상태;
    let 임시 = [0,0,0,0];
    임시[행동] = 1;
    this.#행동[this.#포인터] = 임시;
    
    if (this.#포인터 >= this.#메모리크기) {
      this.#메모리크기 = 0;
    } else {
      this.#메모리크기 += 1;
    }
  }

  get 상태() {
    return tf.tensor(this.#상태);
  }
  get 행동() {
    return tf.tensor(this.#행동);
  }
}

export class 모델 {
  constructor() {
    this.#model = tf.sequential(model_param);
    this.#model.compile(compile_param);
  }
  #model;

  데이터 = new 데이터();

  async 학습() {
    await this.#model.fit(this.데이터.상태, this.데이터.행동, fitParam);
  }
  async 행동반환(상태) {
    return this.#model
    .predict(tf
      .tensor(상태).reshape([-1, 29]))
    .reshape([-1])
    .array()
    .then(array=> {
      return array.indexOf(Math.max(...array));
    })
  }

  async 저장() {
    await this.#model.save('localstorage://model');
  }
  async 불러오기() {
    this.#model = await tf.loadLayersModel('localstorage://model');
  }
}