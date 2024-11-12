import Image from "next/image";
import {Spacer} from "@nextui-org/spacer";

export default function Home() {
    return (
        <main>
            <section className="relative h-96 bg-secondary/20 backdrop-blur-md p-12">
                <div className="z-30">
                    <h1 className="text-9xl font-black text-white">MD-GPT</h1>
                    <h6 className="text-lg font-light text-white">Elevating Healthcare, Empowering Diagnosis</h6>
                </div>
                <div className="z-10">
                    <div className="absolute w-full h-full top-0 left-0 opacity-10">
                        <Image
                            src='/images/doctor.jpg'
                            alt=""
                            fill={true}
                            style={{
                                objectFit: 'cover',
                            }}/>
                    </div>
                </div>
            </section>
            <section id="about" className="p-12 flex justify-center">
                <div className="w-1/2">
                    <h3 className="text-primary text-3xl font-bold">About Us</h3>
                    <Spacer y={3}/>
                    <article
                        className="whitespace-pre-wrap">{"Welcome to MD-GPT, where healthcare meets innovation! At MD-GPT, we're a team of dedicated professionals with a shared vision of transforming the medical field through the power of advanced technology.\n\nOur mission is simple: to empower doctors and healthcare providers to diagnose patients more efficiently and accurately. With years of data from the medical industry and a deep understanding of the challenges faced by healthcare professionals, we've developed MD-GPT, a state-of-the-art AI-powered tool.\n\nOur commitment to bridging the gap between medicine and technology drives us to continually refine and expand our capabilities. We believe that by harnessing the potential of AI, we can elevate the standard of care, leading to better patient outcomes.\n\nJoin us on this journey to revolutionize healthcare, one diagnosis at a time. Together, we're creating a smarter, healthier future."}</article>
                </div>
            </section>
        </main>
    )
}