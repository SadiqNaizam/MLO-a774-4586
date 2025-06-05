import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ThemedContentCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  actionText?: string;
  onActionClick?: () => void;
  themeClass?: string; // For theme-specific styling
  children?: React.ReactNode; // For additional content
}

const ThemedContentCard: React.FC<ThemedContentCardProps> = ({
  title,
  description,
  imageUrl,
  actionText,
  onActionClick,
  themeClass = '',
  children,
}) => {
  console.log("Rendering ThemedContentCard:", title);

  return (
    <Card className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg ${themeClass}`}>
      {imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback placeholder
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-gray-600 line-clamp-3">{description}</CardDescription>}
        {children}
      </CardContent>
      {actionText && onActionClick && (
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={onActionClick}>
            {actionText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ThemedContentCard;