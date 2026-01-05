"use client"
import { Stack_Sans_Notch } from "next/font/google"
import "./footer.css"
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Stack_Sans= Stack_Sans_Notch({
  variable: "--font-stack-sans",
  subsets: ["latin"],
});
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
export default function page() {
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis()
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time)=>{
            lenis.raf(time*1000)
        });
        gsap.ticker.lagSmoothing(0)
        const footerContainer = document.querySelector(".footer-container");
        const mouse :{x:number,y:number}={x:0,y:0}
        window.addEventListener("mousemove",(e)=>{
            mouse.x=(e.clientX /window.innerWidth) * 2 - 1 ;
            mouse.y=(e.clientY / window.innerHeight) * 2 + 1
        })
        const container=document.getElementById("footer-canvas")
        const scene=new THREE.Scene()
        const camera=new THREE.PerspectiveCamera(
            30,
            container && container?.offsetWidth / container?.offsetHeight,
            0.1,
            1000
        )
        camera.position.set(0,0,0.75)

        const renderer=new THREE.WebGLRenderer({
            alpha:true,
            antialias:true
        })
        renderer.setSize(container?.offsetWidth,container?.offsetHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        container?.appendChild(renderer.domElement)
        const directionalLight=new THREE.DirectionalLight(0xffffff , 5)
        directionalLight.position.set(1,1,0)
        scene.add(directionalLight)



        let loader =new GLTFLoader()
        let model:any
        let modelBaseRotationX=0.5
        let modelBaseZ=-1

        loader.load("/model.glb",(gltf:any)=>{
            model=gltf.scene

            const box =new THREE.Box3().setFromObject(model)
            const center=box.getCenter(new THREE.Vector3())
            const size=box.getSize(new THREE.Vector3())

            model.position.sub(center)
            model.position.y=0
            model.position.z=-1
            model.rotation.x=0.5

            const maxDim=Math.max(size.x,size.y,size.z)
            const scale=1/maxDim
            model.scale.setScalar(scale)
            scene.add(model)
        })
        ScrollTrigger.create({
            trigger: "footer",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self)=>{
                const scrollProgress = self.progress;
                const yValue=-35 * (1-scrollProgress )
                gsap.set(footerContainer,{
                    y: `${yValue}%`
                });
                modelBaseZ=-1 * (1 - scrollProgress)
                modelBaseRotationX=0.5 * (1 - scrollProgress)
                // Use scrollProgress to manipulate Three.js scene or other elements
            }

        })

        function animate(){
            requestAnimationFrame(animate)
            if (model){
                const targetRotationY=mouse.x * 0.3
                const targetRotationX=-mouse.y *0.2 +modelBaseRotationX

                model.rotation.y +=(targetRotationY -model.rotation.y) *0.05
                model.rotation.x +=(targetRotationX -model.rotation.x) *0.05
                model.rotation.z +=(modelBaseZ -model.rotation.z) *0.05
            }
            renderer.render(scene,camera)
        }
        animate()

        window.addEventListener("resize",()=>{
            camera.aspect=container && container?.offsetWidth /container?.offsetHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container?.offsetWidth,container?.offsetHeight)
        })
    },[])
  return (
    <main className={Stack_Sans.className}>
        <section className="one">
            <h1>Section 1</h1>
        </section>
        <section className="two">
            <h1>Section 2</h1>
        </section>
        <section className="three">
            <h1>Section 3</h1>
        </section>
        <footer>
            <div className="footer-container">
                <div id="footer-canvas">

                </div>
                <div className="footer-content">
                    <div className="footer-row">
                        <div className="footer-col">
                            <h2>Restoring meaning to the things we build</h2>
                        </div>
                        <div className="footer-col">
                            <div className="footer-sub-col">
                                <h3>Work resumes</h3>
                                <h3>2026</h3>
                            </div>
                            <div className="footer-sub-col">
                                <a href="#">Write to me</a>
                                <a href="#">Professional orbit</a>
                                <a href="#">Loose thoughts</a>
                                <a href="#">Long form</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-row">
                        <p>Experiment 518</p>
                        <p>Built by Codegrid</p>
                    </div>

                </div>
            </div>
        </footer>
    </main>
  )
}
