import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {icon && <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};