import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: number; // e.g., 16/9, 1/1
  fallbackSrc?: string;
  wrapperClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio,
  fallbackSrc = '/placeholder.svg',
  className,
  wrapperClassName,
  ...props
}) => {
  console.log("Rendering Image with src:", src);

  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src); // Update if src prop changes
  }, [src]);

  const handleError = () => {
    console.warn("Image failed to load:", src, "Falling back to:", fallbackSrc);
    setCurrentSrc(fallbackSrc);
  };

  const imgElement = (
    <img
      src={currentSrc}
      alt={alt}
      className={`object-cover w-full h-full ${className || ''}`}
      onError={handleError}
      {...props}
    />
  );

  if (aspectRatio) {
    return (
      <div className={wrapperClassName}>
        <AspectRatio ratio={aspectRatio} className="bg-muted">
          {imgElement}
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className={`relative ${wrapperClassName || ''}`}>
      {imgElement}
    </div>
  );
};

export default Image;