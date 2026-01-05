import FlavourSlider from "../../flavourSlider"
import FlavourTitle from "../../flavourTitle"
export default function FlavourSection() {
    return (
        <section className="flavor-section">
            <div className="h-full flex lg:flex-row flex-col items-center relative">
                <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
                    <FlavourTitle/>
                </div>
                <div className="h-full">
                    <FlavourSlider/>
                </div>
            </div>
        </section>
    )
}
