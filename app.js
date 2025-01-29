const createScene = async function(engine, canvas) {
    // Create scene
    const scene = new BABYLON.Scene(engine);

    // Create camera
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.6, 0), scene);
    camera.setTarget(new BABYLON.Vector3(0, 1.6, 1));

    // Create basic light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Create HUD text
    const instructionText = new BABYLON.GUI.TextBlock();
    instructionText.text = "think about the beach";
    instructionText.color = "white";
    instructionText.fontSize = 24;

    // Create GUI texture and container
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const container = new BABYLON.GUI.Container();
    advancedTexture.addControl(container);
    container.addControl(instructionText);

    // Position the text in front of the user
    instructionText.linkOffsetY = -60;

    // Setup XR
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            referenceSpaceType: "local-floor"
        }
    });

    // Enable camera passthrough
    if (xr.baseExperience) {
        xr.baseExperience.camera.setTransformationFromNonVRCamera(camera);
    }

    return scene;
};

// Set up Babylon.js engine and scene
window.addEventListener('DOMContentLoaded', async function() {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    
    const scene = await createScene(engine, canvas);

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
}); 