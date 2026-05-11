'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden bg-[#0B0908]">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

                    const getPositionClasses = (idx: number) => {
                        switch (idx) {
                            case 0: return "relative h-[25vh] w-[25vw]";
                            case 1: return "relative h-[30vh] w-[35vw] -top-[30vh] left-[5vw]";
                            case 2: return "relative h-[45vh] w-[20vw] -top-[10vh] -left-[25vw]";
                            case 3: return "relative h-[25vh] w-[25vw] left-[27.5vw]";
                            case 4: return "relative h-[25vh] w-[20vw] top-[27.5vh] left-[5vw]";
                            case 5: return "relative h-[25vh] w-[30vw] top-[27.5vh] -left-[22.5vw]";
                            case 6: return "relative h-[15vh] w-[15vw] top-[22.5vh] left-[25vw]";
                            default: return "relative h-[25vh] w-[25vw]";
                        }
                    };

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className="absolute top-0 flex h-full w-full items-center justify-center"
						>
							<div className={`${getPositionClasses(index)} rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10`}>
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
