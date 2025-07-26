import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
    <div className="w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        <LazyLoadImage
        src={image}
        alt="game image"
        effect="blur"
        className="w-full h-full object-cover"
        wrapperProps={{
            style: { transitionDelay: "0.2s" },
        }}
        />
    </div>
    );
}
