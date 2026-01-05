"use client"
import { useGSAP } from "@gsap/react"
import "./stroke.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react"

export default function gsapStrokeAnimation() {
    const svgRef = useRef<SVGSVGElement>(null);
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger)
        const path =svgRef.current?.querySelector('path');
        const length = path?.getTotalLength();
        if(path){
            path.style.setProperty('stroke-dasharray', `${length}`);
            path.style.setProperty('stroke-dashoffset', `${length}`);
            gsap.to(path, {
                strokeDashoffset: 0,

                ease: "none",
                scrollTrigger: {
                trigger: ".spotlight",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                },
            });
        }
    },[])
    return (
        <main>
            <section className="hero">
                <h1>Designed to keep information clean and connected</h1>
            </section>
            <section className="spotlight">
                <div className="row">
                    <div className="img">
                        <img src="/6862825.jpg" alt="any" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <h2>A cleaner way to handle incomming update</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum neque, aut amet qui ipsum quaerat hic, similique odio veniam corporis rerum quo. Itaque velit fugit reiciendis sit dolore quia illum.</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="img">
                            <img src="/6846415.jpg" alt="any" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="img">
                            <img src="/6861232.jpg" alt="any" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <h2>Built for increasing information demands</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum neque, aut amet qui ipsum quaerat hic, similique odio veniam corporis rerum quo. Itaque velit fugit reiciendis sit dolore quia illum.</p>
                        </div>
                    </div>
                    
                </div>
                <div className="row">   
                    <div className="img">
                        <img src="/6850064.jpg" alt="any" />
                    </div>
                </div>
                <div className="svg-path">
                    <svg ref={svgRef} viewBox="0 0 321 694" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                        <path d="M204.007 25.0049C204.007 25.0049 30.463 59.9202 60.0076 157.005C97.2329 279.329 301.231 200.746 295.007 381.005C290.81 502.57 23.3901 540.162 25.0073 393.637C93.1253 219.875 299.564 569.144 227.007 669.005" stroke="#FF5F0A" strokeWidth="50" strokeLinecap="round"/>
                    </svg>
                </div>
            </section>
            <section className="outro">
                <h1>Clearer organization waiting for whatever comes out</h1>
            </section>
        </main>
    )
}
