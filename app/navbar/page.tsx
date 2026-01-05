"use client"
import { useGSAP } from "@gsap/react"
import "./nav.css"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef, useState } from "react"
import { CustomEase } from "gsap/CustomEase"
import Lenis from "lenis"
import { Stack_Sans_Notch } from "next/font/google"
const Stack_Sans= Stack_Sans_Notch({
  variable: "--font-stack-sans",
  subsets: ["latin"],
});
export default function page() {
    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const [isAnimating,setIsAnimating]=useState(false)
    const menuOpenRef=useRef(isMenuOpen)
    const animatingRef=useRef(isAnimating)
    
    useGSAP(()=>{
        menuOpenRef.current=isMenuOpen
        animatingRef.current=isAnimating
        gsap.registerPlugin(SplitText,CustomEase)
        CustomEase.create("hop",".87,0,.13,1")
        const lenis = new Lenis()
        function raf(time:any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)


        const textContainers=document.querySelectorAll<HTMLElement>('.menu-col')
        let splitTextByContainer:any=[]
        textContainers.forEach((container)=>{
            const textElements=container.querySelectorAll("a , p")
            let containerSplit:any=[]
            textElements.forEach((elements)=>{
                const split=SplitText.create(elements,{
                    type:"lines",
                    mask:"lines",
                    linesClass:"line"
                })
                containerSplit.push(split)
                gsap.set(split.lines, {y:"-110%"})
            })
            splitTextByContainer.push(containerSplit)
        })

        const container=document.querySelector(".co")
        const menuToggleBtn=document.querySelector(".menu-toggle-btn")
        const menuOverlay=document.querySelector(".menu-overlay")
        const menuOverlayContainer=document.querySelector(".menu-overlay-content")
        const menuMediaWrapper=document.querySelector(".menu-media-wrapper")
        const copyContainers=document.querySelector(".menu-col")
        const menuToggleLabel=document.querySelector(".menu-toggle-label p")
        const hamburgerIcon=document.querySelector(".menu-hamburger-icon")
        
        
        const handleToggleMenu=()=>{
            if (animatingRef.current) return
            if (!menuOpenRef.current) {
                console.log("open menu")
                setIsAnimating(true)
                lenis.stop()

                const tl=gsap.timeline()
                tl.to(menuToggleLabel,{
                    y:"-110%",
                    duration:1,
                    ease:"hop"
                }).to(container,{
                    y:"100svh",
                    duration:1,
                    ease:"hop"
                },"<").to(menuOverlay,{
                    
                    duration:1,
                    ease:"hop"
                },"<").to(menuOverlayContainer,{
                    // clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    y:"0%",
                    duration:1,
                    ease:"hop"
                },"<").to(menuMediaWrapper,{
                    opacity:1,
                    duration:0.75,
                    delay:0.5,
                    ease:"hop"
                })

                splitTextByContainer.forEach((containerSplits:any)=>{
                    const copyLines=containerSplits.flatMap((split:any)=>split.lines)
                    tl.to(copyLines,{
                        y:0,
                        duration:2,
                        ease:"hop",
                        stagger:-0.075
                    },-0.15)
                })

                hamburgerIcon?.classList.add("active")
                tl.call(()=>{
                    menuOpenRef.current=true
                    setIsAnimating(false)
                    setIsMenuOpen(true)
                })
            }else{
                console.log("what could be the problem here")
                setIsAnimating(true)
                hamburgerIcon?.classList.remove("active")
                const tl=gsap.timeline()

                tl.to(container,{
                    y:"0svh",
                    duration:1,
                    ease:"hop"
                }).to(menuOverlay,{
                    duration:1,
                    ease:"hop",
                    // clipPath:"polygon(0% 0% , 100% 0%,100% 0% ,0% 0%)"
                },"<").to(menuOverlayContainer,{
                    y:"-100%",
                    duration:1,
                    ease:"hop"
                },"<").to(menuToggleLabel,{
                    y:"0%",
                    duration:1,
                    ease:"hop"
                },"<").to(copyContainers,{
                    opacity:0.25,
                    duration:1,
                    ease:"hop"
                })
                tl.call(()=>{
                    splitTextByContainer.forEach((containerSplits:any)=>{
                        const copyLines=containerSplits.flatMap((split:any)=>split.lines)
                        gsap.set(copyLines,{y:"-110%"})    
                    })
                    gsap.set(copyContainers,{opacity:1})
                    gsap.set(menuMediaWrapper,{opacity:0})

                    menuOpenRef.current=false
                    setIsAnimating(false)
                    setIsMenuOpen(false)
                    lenis.start()
                })
            }
        }
        menuToggleBtn?.addEventListener("click",handleToggleMenu)
    },[])
  return (
   <main className={Stack_Sans.className}>
    <nav>
        <div className="menu-bar">
            <div className="menu-logo">
                <a href="#">
                    <img src="/logo.svg" alt="" />
                </a>
            </div>
            <div className="menu-toggle-btn">
                <div className="menu-toggle-label">
                    <p>Menu</p>
                </div>
                <div className="menu-hamburger-icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="menu-overlay z-20">
            <div className="menu-overlay-content">
                <div className="menu-media-wrapper">
                    <img src="/bg2.jpg" alt="" />
                </div>
                <div className="menu-content-wrapper">
                    <div className="menu-content-main">
                        <div className="menu-col">
                            <div className="menu-link"><a href="#">Index</a></div>
                            <div className="menu-link"><a href="#">Portfolio</a></div>
                            <div className="menu-link"><a href="#">Studio</a></div>
                            <div className="menu-link"><a href="#">Journal</a></div>
                            <div className="menu-link"><a href="#">Connect</a></div>
                        </div>
                        <div className="menu-col">
                            <div className="menu-tag"><a href="#">Web Animations</a></div>
                            <div className="menu-tag"><a href="#">Interactive Media</a></div>
                            <div className="menu-tag"><a href="#">Motion Craft</a></div>
                        </div>
                    </div>
                    <div className="menu-footer">
                        <div className="menu-col">
                            <p>Toronto, Canada</p>
                        </div>
                        <div className="menu-col">
                            <p>+1 437 555 0199</p>
                            <p>hello@gsap.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div className="co">
       <section className="hero">   
              <h1>Modern design system made that looks timeless</h1>
        </section> 
       <section className="banner">
            <img src="/bg2.jpg" alt="any" />
       </section>
       <section className="outro">
            <h1>Simple and clean navbar animation using GSAP</h1>
       </section>
    </div>
   </main>
  )
}
