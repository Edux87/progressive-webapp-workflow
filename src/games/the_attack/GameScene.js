import {
  Engine,
  Scene,
  HemisphericLight,
  Vector3,
  FreeCamera,
  ShadowGenerator,
  PhysicsImpostor,
  CannonJSPlugin,
  Mesh,
  Color3,
  Sound,
  SceneOptimizer,
  PointLight,
  StandardMaterial,
  Texture,
  ArcRotateCamera,
  AssetsManager
} from 'babylonjs';

class GameScene {
  constructor(canvas, { onScore, onInit, onFinish }) {

    this._engine = new Engine(canvas, true);
    this._scene = new Scene(this._engine);
    this._canvas = canvas;
    this._onScore = onScore;
    this._onInit = onInit;
    this._onFinish = onFinish;
    this._scene.clearColor = new Color3(255, 255, 255);
    this.addCamera();
    this.addLoadingTasks();

  }

  addCamera() {
    this._camera = new ArcRotateCamera(
      'FreeCamera',
      Math.PI, Math.PI / 8, 150,
      new Vector3.Zero(),
      this.scene
    );

    this._camera.setTarget(Vector3.Zero());
    this._camera.attachControl(this._canvas, true);
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);
    light.intensity = 0.7;
    const sphere = new Mesh.CreateSphere('sphere1', 16, 2, this._scene);
    sphere.position.y = 1;

    let material = new StandardMaterial("texture3", this._scene);
    // material.wireframe = true;
    material.diffuseTexture = new Texture("./assets/images/grass.jpg", this._scene);
    // material.diffuseColor = new Color3(1, 0, 0); //Red

    sphere.material = material;
    const ground = new Mesh.CreateGround('ground1', 6, 6, 2, this._scene);
    this._onScore();

  }

  addLoadingTasks() {
    const assetsManager = new AssetsManager(this._scene);
    const textureLoaded = false;
    assetsManager.onFinish = tasks => {
      this._engine.runRenderLoop(() => {
        this._scene.render();
      });
    };
    assetsManager.load();
    this.beginPlay();
  }

  beginPlay() {
    this._onInit();
  }


}

export default GameScene;
