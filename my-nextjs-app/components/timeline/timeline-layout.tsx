'use client';

import React from 'react';
import { Timeline, TimelineItem } from './timeline';
import type { TimelineElement } from '@/types';

interface TimelineLayoutProps {
  items: TimelineElement[];
  size?: 'sm' | 'md' | 'lg';
  iconColor?: 'primary' | 'secondary' | 'muted' | 'accent';
  customIcon?: React.ReactNode;
  connectorColor?: 'primary' | 'secondary' | 'muted' | 'accent';
  className?: string;
}

export const TimelineLayout = ({
  items,
  size = 'md',
  iconColor,
  customIcon,
  connectorColor,
  className,
}: TimelineLayoutProps) => {
  return (
    <Timeline size={size} className={className}>
      {[...items].reverse().map((item, index) => (
        <div key={index}>
          <TimelineItem
            date={item.date}
            title={item.title}
            description={item.description}
            icon={
              typeof item.icon === 'function'
                ? item.icon()
                : item.icon || customIcon
            }
            iconColor={item.color || iconColor}
            connectorColor={item.color || connectorColor}
            showConnector={index !== items.length - 1}
          />
        </div>
      ))}
    </Timeline>
  );
};
