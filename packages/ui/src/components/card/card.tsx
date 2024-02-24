import React from "react";
import "./card.css";

type CardVariant = "default" | "circle";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
}

interface CardImageProps extends React.HTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

export const CardImage: React.FC<CardImageProps> = React.forwardRef<
    HTMLImageElement,
    CardImageProps
>(({ children, ...props }, ref) => {
    return <img ref={ref} className="card__image" {...props} />;
});

export const Card: React.FC<CardProps> = ({ children, variant = "default", ...props }) => {
    return (
        <div className="card" {...props}>
            {children}
        </div>
    );
};
