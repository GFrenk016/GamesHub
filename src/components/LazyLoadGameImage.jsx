import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
            src={image}
            alt="game image"
            effect="blur"
            width="100%"
            height="190px"
            wrapperProps={{
                style: {transitionDelay: "0.2s"},
            }}
            />
    )
} 