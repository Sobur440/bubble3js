import "./style.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"


//Canvas
const canvas = document.querySelector("canvas.webgl")

//Scene
const scene = new THREE.Scene()

//Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//resize

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    

})

//Enviroment
const rgbeLoader = new RGBELoader()

rgbeLoader.load("/textures/environmentMap/2k.hdr", (enviromentMap) => {
    enviromentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = enviromentMap
    scene.environment = enviromentMap
})

//Object 
const geometry = new THREE.SphereGeometry(1, 64, 64)
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0


material.clearcoat = 1
material.clearcoatRoughness = 0

material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [ 100, 800 ]

material.transmission = 1
material.ior = 1.15
material.transparent = true
material.opacity = 0.6

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3

//controls

const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


const clock = new THREE.Clock()

const tick = () => {
    
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.x = elapsedTime * -0.15
    mesh.rotation.y = elapsedTime * 0.1

    mesh.position.x = Math.cos(elapsedTime * 0.4)
    mesh.position.y = Math.sin(elapsedTime * 0.4)
    mesh.position.z = Math.sin(elapsedTime * 0.4)

    controls.update()

    //renderer
    renderer.render(scene, camera)

    requestAnimationFrame(tick)
}
tick()