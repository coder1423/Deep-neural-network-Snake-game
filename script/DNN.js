import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js";

const model_param = {
  layers: [
    tf.layers.dense({inputShape: [1], units: 32, activation: 'relu'}),
    tf.layers.dense({units: 32, activation: 'relu'}),
    tf.layers.dense({units: 1}),
  ]
}
const compile_param = {
  optimizer: tf.train.adam(),
  loss: tf.losses.meanSquaredError,
}
const fitParam = {
  epochs: 100,
  batchSize: 2,
}

class DNN {
  constructor() {
    this.#network = tf.sequential(model_param);
    this.#network.compile(compile_param);
  }
  #network;

  #replay_memory = [20,21,22,23,24,25];

  get replay_tensor() {
    return tf.tensor(this.#replay_memory);
  }

  learningModel() {
    this.#network.fit(this.replay_tensor, this.target_value, fitParam).then(async ()=> {
        this.#network.predict(시험).print();
    });
  }
  async updateTargetNetwork() {
    await this.#network.save('localstorage://my-model');
    network = await tf.loadLayersModel('localstorage://my-model');
  }
}



const 시험 = tf.tensor([20,21,22,23,24,25]);

const a = new DNN();
a.learningModel();